'use server';

import { Enums } from '@/database.types';
import { createClientSSR } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/user';
import { AuthError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const userSchema = z.object({
	f_name: z
		.string()
		.min(3, { message: 'First Name must be at least 3 characters long.' })
		.max(30, { message: 'First Name must be no longer than 30 characters.' }),
	l_name: z
		.string()
		.min(3, { message: 'Last Name must be at least 3 characters long.' })
		.max(30, { message: 'Last Name must be no longer than 30 characters.' }),
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long.' })
		.max(30, { message: 'Password must be no longer than 30 characters.' }),
	role: z.enum(['user', 'admin'], {
		message: 'Role must be either "user" or "admin".',
	}),
});

export async function createUser(prevState: UserState, formData: FormData) {
	const validatedFields = userSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
		f_name: formData.get('f_name'),
		l_name: formData.get('l_name'),
		role: formData.get('role'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Create User.',
		};
	}

	try {
		const { email, f_name, password, l_name, role } = validatedFields.data;

		const supabase = createClientSSR(true);
		const { data, error } = await supabase.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
			user_metadata: { f_name, l_name, role: role as Enums<'role'> },
		});

		if (error) throw error;
	} catch (error) {
		let message = 'Database Error: Failed to Create User Data.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}

	revalidatePath('/users', 'layout');
	redirect('/users');
}

export async function updateUser(
	id: string,
	prevState: UserStateUpdate,
	formData: FormData
) {
	const validatedFields = userSchema.omit({ password: true }).safeParse({
		email: formData.get('email'),
		f_name: formData.get('f_name'),
		l_name: formData.get('l_name'),
		role: formData.get('role'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Update User.',
		};
	}

	try {
		const { email, f_name, l_name, role } = validatedFields.data;

		const supabase = createClientSSR(true);
		const { error: emailError } = await supabase.auth.admin.updateUserById(id, {
			email,
			email_confirm: true,
			user_metadata: { f_name, l_name, role },
		});

		if (emailError) throw emailError;

		const { error } = await supabase
			.from('user')
			.update({
				f_name,
				l_name,
				role,
				email: email.toLowerCase(),
			})
			.eq('id', id);

		if (error) throw error;
	} catch (error) {
		let message = 'Database Error: Failed to Update User.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}

	revalidatePath('/users', 'layout');
	redirect('/users');
}

export type DeleteUserState = {
	message?: string | null;
	type?: string | null;
};

export async function deleteUser(id: string) {
	try {
		const supabase = createClientSSR(true);

		const user = await getCurrentUser();

		if (user.id === id) {
			return { message: 'You cannot delete yourself.' };
		}

		const { error } = await supabase.auth.admin.deleteUser(id);

		if (error) throw error;
	} catch (error) {
		console.error(error);
		let message = 'Database Error: Failed to Delete User.';
		if (error instanceof AuthError) message = error.message;

		return { message, type: 'error' };
	}
	revalidatePath('/users');
	return { message: 'User Was Deleted Successfully.' };
}

export type UserState =
	| {
			errors?: {
				email?: string[];
				password?: string[];
				f_name?: string[];
				l_name?: string[];
				role?: string[];
			};
			message?: string | null;
	  }
	| undefined;

export type UserStateUpdate =
	| {
			errors?: {
				email?: string[];
				f_name?: string[];
				l_name?: string[];
				role?: string[];
			};
			message?: string | null;
	  }
	| undefined;
