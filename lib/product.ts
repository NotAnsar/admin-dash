import { createClientSSR } from './supabase/server';
import {
	Category,
	Color,
	ProductALL,
	ProductWithImages,
	Size,
} from '@/types/db';

export async function fetchProducts() {
	try {
		const supabase = createClientSSR();
		const { data: products, error } = await supabase
			.from('product')
			.select('*,category(*),colors(*),sizes(*)')
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
			.select('*,category(*),colors(*),sizes(*)')
			.eq('id', id)
			.returns<ProductALL[]>();

		if (error) throw error;

		return product[0] as ProductALL;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error(`Failed to fetch Product with the id ${id}.`);
	}
}
export async function fetchProductImagesById(id: string) {
	try {
		const supabase = createClientSSR();
		const { data, error } = await supabase.storage
			.from('product_images')
			.list(`${id}/`);

		console.log(data, error);

		if (error) throw error;

		return data;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error(`Failed to fetch Images of the product id ${id}.`);
	}
}

export async function fetchProductWithImages(id: string) {
	try {
		const supabase = createClientSSR();

		// Fetch product details
		const { data: product, error: productError } = await supabase
			.from('product')
			.select('*,category(*),colors(*),sizes(*)')
			.eq('id', id)
			.returns<ProductALL[]>();

		if (productError) throw productError;

		// Fetch product images
		const { data: images, error: imagesError } = await supabase.storage
			.from('product_images')
			.list(`${id}/`);

		if (imagesError) throw imagesError;
		// Get public URLs for each image
		const imageUrls = await Promise.all(
			images.map(async (image) => {
				const { data } = supabase.storage
					.from('product_images')
					.getPublicUrl(`${id}/${image.name}`);
				return data.publicUrl;
			})
		);

		return { ...product[0], images: imageUrls } as ProductWithImages;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error(`Failed to fetch Product and Images with the id ${id}.`);
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
