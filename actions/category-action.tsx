'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const formSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Category Name must be at least 3 characters long.' }),
});

export type CategoryState =
	| {
			errors?: {
				name?: string[];
			};
			message?: string | null;
	  }
	| undefined;

export async function createCategory(
	prevState: CategoryState,
	formData: FormData
) {
	const validatedFields = formSchema.safeParse({ name: formData.get('name') });

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Create Product Category.',
		};
	}

	const { name } = validatedFields.data;
	try {
		const supabase = createClientSSR(true);

		const { data, error } = await supabase
			.from('category')
			.insert([{ name }])
			.single();

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Create Product Category.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}
	revalidatePath('/categories', 'layout');
}

export async function updateCategory(
	id: string,
	prevState: CategoryState,
	formData: FormData
) {
	const validatedFields = formSchema.safeParse({
		name: formData.get('name'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Update Product Category.',
		};
	}

	const { name } = validatedFields.data;
	try {
		const supabase = createClientSSR(true);

		const { data, error } = await supabase
			.from('category')
			.update([{ name }])
			.eq('id', id)
			.select('id')
			.single();

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Update Product Category.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}
	revalidatePath('/categories', 'layout');
}

export type DeleteCategoryState = {
	message?: string | null;
	type?: string | null;
};

export async function deleteCategory(id: string) {
	try {
		const supabase = createClientSSR(true);
		const { error } = await supabase.from('category').delete().eq('id', id);

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Delete Product Category.';
		if (error instanceof AuthError) message = error.message;

		return { message, type: 'error' };
	}

	revalidatePath('/categories', 'layout');
	return { message: 'Product Category Was Deleted Successfully.' };
}
