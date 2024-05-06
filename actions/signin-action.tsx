'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long.' })
		.max(30, { message: 'Password must be no longer than 30 characters.' }),
});

export async function signOut() {
	const supabase = createClientSSR();
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.log(error);
	} else {
		redirect('/signin');
	}
}

// This is temporary until @types/react-dom is updated
export type State =
	| {
			errors?: { email?: string[]; password?: string[] };
			message?: string | null;
	  }
	| undefined;

export async function signinAction(prevState: State, formData: FormData) {
	const validatedFields = formSchema.safeParse({
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

		if (error) {
			throw error;
		}
	} catch (error: any) {
		console.log(error.message);

		return {
			message:
				(error?.message as string) || 'Database Error: Failed to Sign in User.',
		};
	}
	revalidatePath('/', 'layout');
	redirect('/');
}
