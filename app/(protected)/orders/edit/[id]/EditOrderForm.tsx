'use client';

import { Button } from '@/components/ui/button';
import { Loader, Plus } from 'lucide-react';
import BreadCrumb from '@/components/BreadCrumb';
import { useFormState, useFormStatus } from 'react-dom';
import OrderFormDetails from '../../../../../components/order/OrderDetails';
import {
	createOrder,
	OrderFormState,
	updateOrder,
} from '@/actions/order-action';
import { User } from '@/types/user';
import { OrderWithItems } from '@/types/db';

export default function EditOrderForm({
	initialData,
	users,
	id,
}: {
	users: User[];
	id: string;
	initialData: OrderWithItems;
}) {
	const initialState: OrderFormState = { message: null, errors: {} };
	const [state, action] = useFormState(
		updateOrder.bind(null, id),
		initialState
	);

	return (
		<form action={action}>
			<div className='flex gap-4 flex-col sm:flex-row justify-between'>
				<BreadCrumb
					items={[
						{ link: '/orders', text: 'Orders' },
						{
							link: '/orders/edit',
							text: 'Edit Order',
							isCurrent: true,
						},
					]}
				/>

				<PendingButton />
			</div>
			{(state?.message || state?.errors) && (
				<p className='text-sm font-medium text-destructive'>{state.message}</p>
			)}
			<OrderFormDetails state={state} users={users} initialData={initialData} />
		</form>
	);
}

export function PendingButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			className='flex gap-1 justify-center items-center'
			type='submit'
			aria-disabled={pending}
			disabled={pending}
		>
			{pending ? (
				<Loader className='mr-2 h-4 w-4 animate-spin' />
			) : (
				<Plus className='w-4 h-auto' />
			)}
			Edit Order
		</Button>
	);
}
