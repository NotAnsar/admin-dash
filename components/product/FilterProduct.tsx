import { Grid2x2Icon, Table } from 'lucide-react';

import Link from 'next/link';

import SelectProduct from './SelectProduct';
import { type ProductSeachParams } from '@/app/(protected)/products/page';
import Search from '../Search';
import { fetchCategories } from '@/lib/db';

export default async function FilterProduct({
	searchParams,
}: {
	searchParams: ProductSeachParams;
}) {
	const categories = await fetchCategories();

	const params = new URLSearchParams(searchParams);
	if (searchParams.type === 'table') params.delete('type');
	else params.set('type', 'table');

	return (
		<div className='flex flex-col md:flex-row justify-between items-center my-4 gap-2'>
			<Search
				placeholder='Filter by name'
				className='flex gap-1 w-full md:w-[270px] '
			/>
			<div className='flex gap-1 w-full md:w-[270px] '>
				<SelectProduct categories={categories} />

				<Link
					href={`/products?${params.toString()}`}
					className='h-10 w-auto aspect-square flex items-center justify-center rounded-md border border-border cursor-pointer'
				>
					{searchParams.type ? (
						<Grid2x2Icon width={18} height={18} />
					) : (
						<Table width={18} height={18} />
					)}
				</Link>
			</div>
		</div>
	);
}
