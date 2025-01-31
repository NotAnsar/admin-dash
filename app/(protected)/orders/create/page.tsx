import CreateOrderForm from './CreateOrderForm';
import { fetchUsers } from '@/lib/user';
import React from 'react';

export default async function page() {
	const users = (await fetchUsers()).filter((user) => user.role === 'user');

	return <CreateOrderForm users={users} />;
}
