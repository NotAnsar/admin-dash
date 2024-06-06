'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Size Name must be at least 1 characters long.' }),
	fullname: z
		.string()
		.min(3, { message: 'Size Full Name must be at least 3 characters long.' }),
});

export type SizeState =
	| {
			errors?: {
				name?: string[];
				fullname?: string[];
			};
			message?: string | null;
	  }
	| undefined;

export async function createSize(prevState: SizeState, formData: FormData) {
	const validatedFields = formSchema.safeParse({
		name: formData.get('name'),
		fullname: formData.get('fullname'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Create Product size.',
		};
	}

	const { fullname, name } = validatedFields.data;
	try {
		const supabase = createClientSSR(true);

		const { data, error } = await supabase
			.from('sizes')
			.insert([{ fullname, name }])
			.single();

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Create Product Size.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}
	revalidatePath('/sizes', 'layout');
}

export async function updateSize(
	id: string,
	prevState: SizeState,
	formData: FormData
) {
	const validatedFields = formSchema.safeParse({
		name: formData.get('name'),
		fullname: formData.get('fullname'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Update Product Size.',
		};
	}

	const { fullname, name } = validatedFields.data;
	try {
		const supabase = createClientSSR(true);

		const { data, error } = await supabase
			.from('sizes')
			.update([{ fullname, name }])
			.eq('id', id)
			.select('id')
			.single();

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Update Product Size.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}
	revalidatePath('/sizes', 'layout');
}

export type DeleteSizeState = {
	message?: string | null;
	type?: string | null;
};

export async function deleteSize(id: string) {
	try {
		const supabase = createClientSSR(true);
		const { error, data } = await supabase.from('sizes').delete().eq('id', id);
		console.log(error, data);

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Delete Product Size.';
		if (error instanceof AuthError) message = error.message;

		return { message, type: 'error' };
	}

	revalidatePath('/sizes', 'layout');
	return { message: 'Product Size Was Deleted Successfully.' };
}
