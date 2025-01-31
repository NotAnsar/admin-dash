import { OrderWithItems } from '@/types/db';
import { createClientSSR } from './supabase/server';

export async function fetchOrders() {
    try {
        const supabase = createClientSSR();
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_Items(*, product(*)),
                user(*) as user_id
            `).returns<OrderWithItems[]>();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Orders.');
    }
}

export async function fetchOrderById(id:string) {
    try {
        const supabase = createClientSSR();
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_Items(*, product(*)),
                user(*) as user_id
            `)
            .eq('id', id).returns<OrderWithItems[]>();

        console.log(data);
            
        if (error) throw error;

        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Orders.');
    }
}
