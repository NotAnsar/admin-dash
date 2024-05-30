import { User } from '@/types/user';
import { createClientSSR } from './supabase/server';
import { Category, Color, ProductALL, Size } from '@/types/db';

export async function getUser() {
	const supabase = createClientSSR();
	const { data } = await supabase.auth.getUser();

	const { data: user } = await supabase
		.from('user')
		.select('*')
		.eq('id', data.user?.id)
		.single();

	return user as User;
}

export async function fetchProducts() {
	try {
		const supabase = createClientSSR();
		const { data: products, error } = await supabase
			.from('product')
			.select('*,category(*),colors(*),sizes(*),product_images(*)')
			.returns<ProductALL[]>();

		if (error) throw error;

		return products as ProductALL[];
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch Products.');
	}
}
export async function fetchProductById(id: string) {
	try {
		const supabase = createClientSSR();
		const { data: products, error } = await supabase
			.from('product')
			.select('*,category(*),colors(*),sizes(*),product_images(*)')
			.eq('id', id)
			.returns<ProductALL>()
			.single();

		if (error) throw error;

		return products as ProductALL;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error(`Failed to fetch Product with the id ${id}.`);
	}
}

export async function fetchCategories() {
	try {
		const supabase = createClientSSR();
		const { data: category, error } = await supabase
			.from('category')
			.select()
			.returns<Category[]>();

		if (error) throw error;

		// await new Promise((resolve) => setTimeout(resolve, 3000));

		return category;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch Categories.');
	}
}

export async function fetchSizes() {
	try {
		const supabase = createClientSSR();
		const { data: sizes, error } = await supabase
			.from('sizes')
			.select()
			.returns<Size[]>();

		if (error) throw error;

		return sizes;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch Sizes.');
	}
}

export async function fetchColors() {
	try {
		const supabase = createClientSSR();
		const { data: colors, error } = await supabase
			.from('colors')
			.select()
			.returns<Color[]>();

		if (error) throw error;

		return colors;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch Sizes.');
	}
}
