import { User } from '@/types/user';
import { createClientSSR } from './supabase/server';

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
