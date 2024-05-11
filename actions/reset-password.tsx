'use server';

import { createClientSSR } from '@/lib/supabase/server';
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
		const supabase = createClientSSR();
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'http://localhost:3000/auth/update-password',
		});

		if (error) throw error;
	} catch (error) {
		console.log(error);
		return { message: 'Database Error: Failed to Send Reset Link.' };
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
	prevState: UpdatePassState,
	formData: FormData
) {
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
		console.log(await supabase.auth.getSession());

		const { data, error } = await supabase.auth.updateUser({ password });
		console.log(data, error);

		if (error) throw error;
	} catch (error) {
		console.log(error);

		return { message: 'Database Error: Failed to Update Password.' };
	}
}
