'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Product Name must be at least 3 characters long.' }),
	description: z.string(),
	price: z.coerce
		.number()
		.positive({ message: 'Price must be a positive number' }),
	stock: z.coerce
		.number()
		.int()
		.min(0, { message: 'Stock must be a non-negative integer' }),
	category_id: z.string({
		message: 'Please provide a valid category identifier.',
	}),
	color_id: z.string({ message: 'Please provide a valid color identifier.' }),
	size_id: z.string({ message: 'Please provide a valid size identifier.' }),

	archived: z.boolean(),
	featured: z.boolean(),
});

export type ProductState =
	| {
			errors?: {
				name?: string[];
				description?: string[];
				price?: string[] | undefined;
				stock?: string[] | undefined;
				category_id?: string[] | undefined;
				archived?: string[] | undefined;
				featured?: string[] | undefined;
				color_id?: string[] | undefined;
				size_id?: string[] | undefined;
			};
			message?: string | null;
	  }
	| undefined;

export async function createProduct(
	prevState: ProductState,
	formData: FormData
) {
	const validatedFields = formSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
		stock: formData.get('stock'),
		price: formData.get('price'),
		color_id: formData.get('color'),
		category_id: formData.get('category'),
		size_id: formData.get('size'),
		featured: formData.get('featured') === 'on',
		archived: formData.get('status') === 'archived',
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Sign in.',
		};
	}

	if (validatedFields.data.archived && validatedFields.data.featured) {
		return { message: 'Archived products cannot be featured.' };
	}

	try {
		const supabase = createClientSSR(true);

		const { data, error } = await supabase
			.from('product')
			.insert([
				{
					...validatedFields.data,
					description:
						validatedFields.data.description === ''
							? null
							: validatedFields.data.description,
				},
			])
			.select('id')
			.single();

		if (error) throw error;

		const product_id = data.id;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Create Product.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}
	revalidatePath('/products', 'layout');
	redirect('/products');
}

export async function updateProduct(
	id: string,
	prevState: ProductState,
	formData: FormData
) {
	const validatedFields = formSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
		stock: formData.get('stock'),
		price: formData.get('price'),
		color_id: formData.get('color'),
		category_id: formData.get('category'),
		size_id: formData.get('size'),
		featured: formData.get('featured') === 'on',
		archived: formData.get('status') === 'archived',
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Sign in.',
		};
	}

	if (validatedFields.data.archived && validatedFields.data.featured) {
		return { message: 'Archived products cannot be featured.' };
	}

	try {
		const supabase = createClientSSR(true);

		const { data, error } = await supabase
			.from('product')
			.update([
				{
					...validatedFields.data,
					description:
						validatedFields.data.description === ''
							? null
							: validatedFields.data.description,
				},
			])
			.eq('id', id)
			.select('id')
			.single();

		if (error) throw error;

		// const product_id = data.id;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Update Product.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}
	revalidatePath('/products', 'layout');
	redirect('/products');
}

export type DeleteProductState = {
	message?: string | null;
	type?: string | null;
};

export async function deleteProduct(id: string) {
	try {
		const supabase = createClientSSR(true);
		const { error } = await supabase.from('product').delete().eq('id', id);

		if (error) throw error;
	} catch (error) {
		console.log(error);
		let message = 'Database Error: Failed to Delete Product.';
		if (error instanceof AuthError) message = error.message;

		return { message, type: 'error' };
	}
	revalidatePath('/products', 'layout');
	return { message: 'Product Was Deleted Successfully.' };
}
