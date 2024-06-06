'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
	name: z
		.string()
		.min(1, 'Color Name is required')
		.max(50, 'Color Name must be at most 50 characters'),
	value: z
		.string()
		.regex(
			/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
			'Color Value must be a valid hexadecimal color code (e.g., #ffffff or #fff)'
		),
});

export type ColorState =
	| {
			errors?: {
				name?: string[];
				value?: string[];
			};
			message?: string | null;
	  }
	| undefined;

export async function createColor(prevState: ColorState, formData: FormData) {
	const validatedFields = formSchema.safeParse({
		name: formData.get('name'),
		value: formData.get('value'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Create Product Color.',
		};
	}

	const { name, value } = validatedFields.data;
	try {
		const supabase = createClientSSR(true);

		const { data, error } = await supabase
			.from('colors')
			.insert([{ name, value }])
			.single();

		console.log(data, error);

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Create Product Color.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}
	revalidatePath('/categories', 'layout');
}

export async function updateColor(
	id: string,
	prevState: ColorState,
	formData: FormData
) {
	const validatedFields = formSchema.safeParse({
		name: formData.get('name'),
		value: formData.get('value'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Update Product Color.',
		};
	}

	const { name, value } = validatedFields.data;
	try {
		const supabase = createClientSSR(true);

		const { data, error } = await supabase
			.from('colors')
			.update([{ name, value }])
			.eq('id', id)
			.select('id')
			.single();
		console.log(data, error);

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Update Product Color.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}
	revalidatePath('/categories', 'layout');
}

export type DeleteColorState = {
	message?: string | null;
	type?: string | null;
};

export async function deleteColor(id: string) {
	try {
		const supabase = createClientSSR(true);
		const { error } = await supabase.from('colors').delete().eq('id', id);

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Delete Product Color.';
		if (error instanceof AuthError) message = error.message;

		return { message, type: 'error' };
	}

	revalidatePath('/categories', 'layout');
	return { message: 'Product Color Was Deleted Successfully.' };
}
