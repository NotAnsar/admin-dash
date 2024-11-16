import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Orders() {
	return (
		<>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Orders</h1>
				<Link href={'/orders/create'} className={buttonVariants()}>
					Add Order
				</Link>
			</div>

			{/* <DataTable columns={columns} data={sizes} /> */}
		</>
	);
}
