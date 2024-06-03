import { buttonVariants } from '@/components/ui/button';
import { columns } from '@/components/user/table/columns';
import { DataTable } from '@/components/user/table/data-table';
import { fetchUsers } from '@/lib/user';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function Products() {
	const users = await fetchUsers();

	return (
		<>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Users</h1>
				<Link href={'/users/create'} className={cn(buttonVariants())}>
					Add User
				</Link>
			</div>

			<DataTable columns={columns} data={users} />
		</>
	);
}
