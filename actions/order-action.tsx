'use server';

import { createClientSSR } from '@/lib/supabase/server';
import { AuthError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

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
