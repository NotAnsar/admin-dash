'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const orderSchema = z.object({
	user_id: z.string({ message: 'Please provide a valid User.' }),
	status: z.enum(['pending', 'shipped', 'delivered', 'canceled'], {
		message:
			'Status must be either "pending", "shipped", "delivered", or "canceled".',
	}),
	total: z.coerce
		.number()
		.positive({ message: 'Price must be a positive number' }),
	order_Items: z.array(
		z.object({
			product_id: z.string({ message: 'Please provide a valid Product ID.' }),
			quantity: z.coerce
				.number()
				.positive({ message: 'Quantity must be a positive number' }),
			unit_price: z.coerce
				.number()
				.positive({ message: 'Unit price must be a positive number' }),
		})
	),
});

export type OrderFormState = {
	errors?: {
		user_id?: string[];
		status?: string[];
		total?: string[];
		order_Items?: Array<{
			product_id?: string[];
			quantity?: string[];
			unit_price?: string[];
		}>;
	};
	message?: string | null;
};

export async function createOrder(
	prevState: OrderFormState,
	formData: FormData
): Promise<OrderFormState> {
	const validatedFields = orderSchema.safeParse({
		user_id: formData.get('user_id'),
		status: formData.get('status'),
		total: formData.get('total'),
		order_Items: JSON.parse(formData.get('order_Items') as string),
	});

	if (!validatedFields.success) {
		const fieldErrors = formatOrderItemErrors(
			validatedFields.error.flatten().fieldErrors
		);
		return {
			errors: fieldErrors,
			message: 'Validation failed. Please check your order items.',
		};
	}

	try {
		const { status, total, user_id, order_Items } = validatedFields.data;

		const supabase = createClientSSR(true);
		const { data, error } = await supabase
			.from('orders')
			.insert([{ total, status, user_id }])
			.single();

		if (error) throw error;
	} catch (error) {
		let message = 'Database Error: Failed to Create Order Data.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}

	revalidatePath('/', 'layout');
	redirect('/orders');
}

export async function updateOrder(
	id: string,
	prevState: OrderFormState,
	formData: FormData
): Promise<OrderFormState> {
	const validatedFields = orderSchema.safeParse({
		user_id: formData.get('user_id'),
		status: formData.get('status'),
		total: formData.get('total'),
		order_Items: JSON.parse(formData.get('order_Items') as string),
	});

	if (!validatedFields.success) {
		const fieldErrors = formatOrderItemErrors(
			validatedFields.error.flatten().fieldErrors
		);
		return {
			errors: fieldErrors,
			message: 'Validation failed. Please check your order items.',
		};
	}

	try {
		const { status, total, user_id, order_Items } = validatedFields.data;

		const supabase = createClientSSR(true);

		const { data, error } = await supabase
			.from('orders')
			.update({ total, status, user_id })
			.eq('id', id);

		if (error) throw error;
	} catch (error) {
		let message = 'Database Error: Failed to Update User.';
		if (error instanceof AuthError) message = error.message;

		return { message };
	}

	revalidatePath('/users', 'layout');
	redirect('/orders');
}

export type DeleteOrderState = {
	message?: string | null;
	type?: string | null;
};

export async function deleteOrder(id: string) {
	try {
		const supabase = createClientSSR(true);
		const { error } = await supabase.from('orders').delete().eq('id', id);

		if (error) throw error;
	} catch (error) {
		console.error(error);
		let message = 'Database Error: Failed to Delete Order.';
		if (error instanceof AuthError) message = error.message;

		return { message, type: 'error' };
	}

	revalidatePath('/orders', 'layout');
	return { message: 'Order Was Deleted Successfully.' };
}

function formatOrderItemErrors(fieldErrors: any) {
	if (fieldErrors?.order_Items) {
		fieldErrors.order_Items = fieldErrors.order_Items.map(
			(item: any, index: number) => {
				const messages: Record<string, string[]> = {};
				for (const [field, errors] of Object.entries(item)) {
					messages[field] = (errors as string[]).map(
						(msg) => `Item ${index + 1}: ${msg}`
					);
				}
				return messages;
			}
		);
	}
	return fieldErrors;
}
