export type User = {
	id: string;
	created_at: string;
	f_name: string;
	l_name: string;
	role: 'admin' | 'user';
	email: string;
};

export type Address = {
	id: string;
	user_id: string;
	country: string;
	city: string;
	address: string;
	postal_code: string;
	mobile: string;
};
