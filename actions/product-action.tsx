'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Product Name must be at least 3 characters long.' }),
	price: z.coerce
		.number()
		.positive({ message: 'Price must be a positive number' }),
	stock: z.coerce
		.number()
		.int()
		.min(0, { message: 'Stock must be a non-negative integer' }),
	category_id: z.string(),
	description: z.string(),
	archived: z.boolean(),
	featured: z.boolean(),
	color_id: z.string(),
	size_id: z.string(),
});

export type State =
	| {
			errors?: { lname?: string[]; fname?: string[] };
			message?: string | null;
	  }
	| undefined;

// export async function createProduct(prevState: State, formData: FormData) {
export async function createProduct(formData: FormData) {
	const validatedFields = formSchema.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
		stock: formData.get('stock'),
		price: formData.get('price'),
		category_id: formData.get('category'),
		featured: formData.get('featured') === 'on',
		archived: formData.get('status') === 'archived',
		color_id: formData.get('color'),
		size_id: formData.get('size'),
	});

	if (!validatedFields.success) {
		console.log(validatedFields.error);

		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Sign in.',
		};
	}

	// const { fname, lname } = validatedFields.data;

	try {
		console.log(validatedFields.data);
		console.log('done');
	} catch (error: any) {
		console.log(error.message);

		// return {
		// 	message:
		// 		(error?.message as string) ||
		// 		'Database Error: Failed to Update User Data.',
		// };
	}
	// revalidatePath('/product', 'layout');
	// redirect('/product');
}
