import { columns } from '@/components/color/table/columns';
import { DataTable } from '@/components/color/table/data-table';
import { buttonVariants } from '@/components/ui/button';
import { fetchColors } from '@/lib/product';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function Products() {
	const colors = await fetchColors();

	return (
		<>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Colors</h1>
				<Link href={'/colors/create'} className={cn(buttonVariants())}>
					Add colors
				</Link>
			</div>

			<DataTable columns={columns} data={colors} />
		</>
	);
}
