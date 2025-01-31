import { fetchUsers } from '@/lib/user';
import React from 'react';
import EditOrderForm from './EditOrderForm';
import { fetchOrderById } from '@/lib/order';
import { notFound } from 'next/navigation';

export default async function page({
	params: { id },
}: {
	params: { id: string };
}) {
	console.log('edit');

	const [users, order] = await Promise.all([
		fetchUsers().then((users) => users.filter((user) => user.role === 'user')),
		fetchOrderById(id),
	]);

	if (!order) notFound();

	return <EditOrderForm users={users} id={id} initialData={order} />;
}
