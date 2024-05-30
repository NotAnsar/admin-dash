'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const signInSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long.' })
		.max(30, { message: 'Password must be no longer than 30 characters.' }),
});

export async function signinAction(prevState: AuthState, formData: FormData) {
	const validatedFields = signInSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Sign in.',
		};
	}

	const { email, password } = validatedFields.data;

	try {
		const supabase = createClientSSR();
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error)
			return { message: 'Signin failed. Please check your credentials.' };
	} catch (error) {
		return { message: 'Database Error: Failed to Sign in User.' };
	}

	revalidatePath('/', 'layout');
	redirect('/');
}

export type AuthState =
	| {
			errors?: { email?: string[]; password?: string[] };
			message?: string | null;
	  }
	| undefined;

export async function signOut() {
	try {
		const supabase = createClientSSR();
		const { error } = await supabase.auth.signOut();

		if (error) throw error;
	} catch (error) {
		return { message: 'Cannot Signout ' };
	}

	redirect('/auth/signin');
}
