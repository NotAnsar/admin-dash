import FilterProduct from '@/components/product/FilterProduct';
import ProductListGrid from '@/components/product/ProductListGrid';
import ProductListTable from '@/components/product/ProductListTable';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export type ProductSeachParams = {
	type?: string;
	search?: string;
	select?: string;
};
export default function Products({
	searchParams,
}: {
	searchParams: ProductSeachParams;
}) {
	return (
		<div>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold'>Products</h1>
				<Link href={'/products/new'} className={cn(buttonVariants())}>
					Add Product
				</Link>
			</div>

			<FilterProduct searchParams={searchParams} />
			{searchParams.type ? <ProductListTable /> : <ProductListGrid />}
		</div>
	);
}
