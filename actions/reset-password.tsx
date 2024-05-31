'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const resetPasswordSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export type ResetState =
	| {
			errors?: { email?: string[] };
			message?: string | null;
	  }
	| undefined;

export async function recoverPassword(
	prevState: ResetState,
	formData: FormData
) {
	const validatedFields = resetPasswordSchema.safeParse({
		email: formData.get('email'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Send Reset Link.',
		};
	}

	const { email } = validatedFields.data;

	try {
		const origin = headers().get('origin');
		const supabase = createClientSSR(true);

		const { error: userNotFoundError } = await supabase
			.from('user')
			.select('*')
			.eq('email', email)
			.single();

		if (userNotFoundError)
			return { message: 'User with the provided email is not found.' };

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${origin}/auth/update-password`,
		});

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Send Reset Link.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}
}

const updatePasswordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters long.'),
		confirmPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters long.'),
	})
	.refine(
		(values) => {
			return values.password === values.confirmPassword;
		},
		{
			message: 'Passwords must match!',
			path: ['confirmPassword'],
		}
	);

export type UpdatePassState =
	| {
			errors?: { password?: string[]; confirmPassword?: string[] };
			message?: string | null;
	  }
	| undefined;

export async function updatePassword(
	code: string,
	prevState: UpdatePassState,
	formData: FormData
) {
	if (!code) redirect('/auth/password-recovery');

	const validatedFields = updatePasswordSchema.safeParse({
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Send Reset Link.',
		};
	}

	const { password } = validatedFields.data;

	try {
		const supabase = createClientSSR();
		const { error: codeSessionError } =
			await supabase.auth.exchangeCodeForSession(code);

		if (codeSessionError) throw codeSessionError;

		const { error } = await supabase.auth.updateUser({ password });

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Unable to reset Password. Try Again';

		if (error instanceof AuthError) {
			if (error.code === 'same_password') redirect('/');
			message = error.message;
		}

		return { message };
	}
	redirect('/');
}
