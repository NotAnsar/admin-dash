export type User = {
	id: string;
	created_at: string;
	f_name: string;
	l_name: string;
	role: 'admin' | 'user ';
	email: string;
};
