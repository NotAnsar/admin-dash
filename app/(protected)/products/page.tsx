import FilterProduct from '@/components/product/FilterProduct';
import ProductListGrid from '@/components/product/ProductListGrid';
import ProductListTable from '@/components/product/ProductListTable';
import { columns } from '@/components/product/columns';
import { DataTable } from '@/components/product/data-table';
import { buttonVariants } from '@/components/ui/button';
import { fetchCategories, fetchProducts } from '@/lib/db';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { promise } from 'zod';

export type ProductSeachParams = {
	type?: string;
	search?: string;
	select?: string;
};
export default async function Products({
	searchParams,
}: {
	searchParams: ProductSeachParams;
}) {
	const products = await fetchProducts();
	console.log(products[0]);

	return (
		<div>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Products</h1>
				<Link href={'/products/create'} className={cn(buttonVariants())}>
					Add Product
				</Link>
			</div>

			<FilterProduct searchParams={searchParams} />
			{/* {searchParams.type ? (
				<ProductListTable />
			) : (
				<ProductListGrid products={products} />
			)} */}
			<DataTable columns={columns} data={products} />
		</div>
	);
}
