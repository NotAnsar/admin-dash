'use server';

import { z } from 'zod';

const formSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long.' })
		.max(30, { message: 'Password must be no longer than 30 characters.' }),
});

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
		await new Promise((resolve) => setTimeout(resolve, 3000));
		console.log(email, password);
	} catch (error) {
		console.log(error);

		return { message: 'Database Error: Failed to Update User Information.' };
	}
}
