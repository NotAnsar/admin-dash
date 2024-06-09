import { Archive, CreditCard, DollarSign, Users } from 'lucide-react';
import { createClientSSR } from './supabase/server';
import { ProductALL } from '@/types/db';

export async function fetchTotalClients() {
	try {
		const supabase = createClientSSR();
		const { error, count } = await supabase
			.from('user')
			.select('*', { count: 'exact', head: true })
			.eq('role', 'user');

		if (error) throw error;

		return {
			id: 'dashboard-01-chunk-1',
			title: 'Total Clients',
			icon: Users,
			value: `+${count}`,
			description: 'Number Of all your clients',
		};
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error(`Failed to fetch Total Clients.`);
	}
}

export async function fetchTotalProducts() {
	try {
		const supabase = createClientSSR();
		const { error, count } = await supabase
			.from('product')
			.select('*', { count: 'exact', head: true });

		if (error) throw error;

		return {
			id: 'dashboard-01-chunk-3',
			title: 'Total Products',
			icon: Archive,
			value: `+${count}`,
			description: 'Number of all your products',
		};
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error(`Failed to fetch Total Clients.`);
	}
}

export async function fetchLowestInStock() {
	try {
		const supabase = createClientSSR();
		const { error, data: products } = await supabase
			.from('product')
			.select('*,category(*)')
			.order('stock', { ascending: true })
			.limit(5)
			.returns<ProductALL[]>();

		if (error) throw error;
		return products;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error(`Failed to fetch Products Low In Stock.`);
	}
}

export async function fetchTotalRevenue() {
	return {
		id: 'dashboard-01-chunk-0',
		title: 'Total Revenue',
		icon: DollarSign,
		value: '$0',
		description: '+20.1% from last month',
	};
}

export async function fetchTotalSales() {
	return {
		id: 'dashboard-01-chunk-2',
		title: 'Total Sales',
		icon: CreditCard,
		value: '+12,234',
		description: '+19% from last month',
	};
}
