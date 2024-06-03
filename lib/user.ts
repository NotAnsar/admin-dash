import { User } from '@/types/user';
import { createClientSSR } from './supabase/server';

export async function getCurrentUser() {
	const supabase = createClientSSR();
	const { data } = await supabase.auth.getUser();
 
	const { data: user } = await supabase
		.from('user')
		.select('*')
		.eq('id', data.user?.id)
		.single();

	return user as User;
}

export async function fetchUsers() {
	try {
		const supabase = createClientSSR();
		const { data: users, error } = await supabase
			.from('user')
			.select('*')
			.returns<User[]>();

		if (error) throw error;

		return users;
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch Products.');
	}
}
