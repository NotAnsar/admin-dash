import { User } from '@/types/user';
import { createClientSSR } from './supabase/server';

export async function getUser() {
	const supabase = createClientSSR();
	const { data: user } = await supabase.from('user').select('*').single();

	return user as User;
}
