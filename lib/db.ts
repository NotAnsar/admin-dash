import { User } from '@/types/user';
import { createClientSSR } from './supabase/server';
import { Category, Color, Size } from '@/types/db';

const supabase = createClientSSR();

export async function getUser() {
	const { data } = await supabase.auth.getUser();

	const { data: user } = await supabase
		.from('user')
		.select('*')
		.eq('id', data.user?.id)
		.single();

	return user as User;
}

export async function fetchCategories() {
	try {
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
