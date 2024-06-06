import { columns } from '@/components/size/table/columns';
import { DataTable } from '@/components/color/table/data-table';
import { buttonVariants } from '@/components/ui/button';
import { fetchSizes } from '@/lib/product';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function Products() {
	const sizes = await fetchSizes();

	return (
		<>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Sizes</h1>
				<Link href={'/colors/create'} className={cn(buttonVariants())}>
					Add sizes
				</Link>
			</div>

			<DataTable columns={columns} data={sizes} />
		</>
	);
}
