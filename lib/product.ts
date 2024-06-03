
import { createClientSSR } from './supabase/server';
import { Category, Color, ProductALL, Size } from '@/types/db';


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
		const { data: product, error } = await supabase
			.from('product')
			.select('*,category(*),colors(*),sizes(*),product_images(*)')
			.eq('id', id)
			.returns<ProductALL[]>();

		

		if (error) throw error;

		return product[0] as ProductALL;
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
