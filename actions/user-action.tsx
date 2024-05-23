'use server';

import { getUser } from '@/lib/db';
import { createClientSSR } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
	fname: z
		.string()
		.min(3, { message: 'First Name must be at least 3 characters long.' })
		.max(30, { message: 'First Name must be no longer than 30 characters.' }),
	lname: z
		.string()
		.min(3, { message: 'Last Name must be at least 3 characters long.' })
		.max(30, { message: 'Last Name must be no longer than 30 characters.' }),
});

export async function deleteAccount() {
	try {
		const supabase = createClientSSR(true);

		const { count, error: countError } = await supabase
			.from('user')
			.select('*', { count: 'estimated' })
			.eq('role', 'admin');

		if (countError || count === 1) {
			throw new Error('This user is the only admin and cannot be deleted.');
		}

		const user = await getUser();
		await supabase.auth.signOut();

		const { error } = await supabase.auth.admin.deleteUser(user?.id);

		if (error) throw error;
	} catch (error) {
		let message = 'Failed to delete user. Please try again later.';
		let title = 'Database error';

		if (error instanceof Error) {
			message = error.message;
			title = '';
		}
		return { message, title };
	}
	redirect('/auth/signin');
}

export type State =
	| {
			errors?: { lname?: string[]; fname?: string[] };
			message?: string | null;
	  }
	| undefined;

export async function updateUser(prevState: State, formData: FormData) {
	const validatedFields = formSchema.safeParse({
		fname: formData.get('fname'),
		lname: formData.get('lname'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Sign in.',
		};
	}

	const { fname, lname } = validatedFields.data;

	try {
		const supabase = createClientSSR();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		const { error, data } = await supabase
			.from('user')
			.update({ f_name: fname, l_name: lname })
			.eq('id', user?.id);

		console.log(error, data);

		if (error) throw error;
	} catch (error: any) {
		console.log(error.message);

		return {
			message:
				(error?.message as string) ||
				'Database Error: Failed to Update User Data.',
		};
	}
	revalidatePath('/', 'layout');
	redirect('/');
}
