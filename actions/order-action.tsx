'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { State } from './utils';
import { statusEnumValues } from '@/types/db';

const orderSchema = z.object({
	user_id: z.string({ message: 'Please provide a valid User.' }),
	status: z.enum(['pending', 'shipped', 'delivered', 'canceled'], {
		message:
			'Status must be either "pending", "shipped", "delivered", or "canceled".',
	}),
	total: z.coerce
		.number()
		.positive({ message: 'Price must be a positive number' }),
});

type OrderData = z.infer<typeof orderSchema>;

export type OrderFormState = State<OrderData>;

export async function createOrder(
	prevState: OrderFormState,
	formData: FormData
) {
	const validatedFields = orderSchema.safeParse({
		user_id: formData.get('user_id'),
		status: formData.get('status'),
		total: formData.get('total'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Create Order.',
		};
	}

	try {
		const { status, total, user_id } = validatedFields.data;

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
) {
	const validatedFields = orderSchema.safeParse({
		user_id: formData.get('user_id'),
		status: formData.get('status'),
		total: formData.get('total'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Invalid Credentials. Unable to Update User.',
		};
	}

	try {
		const { status, total, user_id } = validatedFields.data;

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
