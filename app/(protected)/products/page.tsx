import { columns } from '@/components/product/table/columns';
import { DataTable } from '@/components/product/table/data-table';
import { buttonVariants } from '@/components/ui/button';
import { fetchProducts } from '@/lib/db';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function Products() {
	const products = await fetchProducts();

	return (
		<>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Products</h1>
				<Link href={'/products/create'} className={cn(buttonVariants())}>
					Add Product
				</Link>
			</div>

			<DataTable columns={columns} data={products} />
		</>
	);
}
