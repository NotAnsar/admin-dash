'use client';

import ProductDetails from './ProductDetails';
import ProductStock from './ProductStock';
import FeaturedProduct from './FeaturedProduct';
import ProductImages from './ProductImages';
import ProductStatus from './ProductStatus';
import ProductCategory from './ProductCategory';
import { Category, Color, Size } from '@/types/db';
import { Button } from '@/components/ui/button';
import { Loader, Plus } from 'lucide-react';

import BreadCrumb from '@/components/BreadCrumb';
import { useFormState, useFormStatus } from 'react-dom';
import { State, createProduct } from '@/actions/product-action';

export default function CreateProductForm({
	categories,
	colors,
	sizes,
}: {
	categories: Color[];
	colors: Size[];
	sizes: Category[];
}) {
	const initialState: State = { message: null, errors: {} };
	const [state, action] = useFormState(createProduct, initialState);

	return (
		<form action={action}>
			<div className='flex gap-4 flex-col sm:flex-row justify-between'>
				<BreadCrumb
					items={[
						{ link: '/products', text: 'Product' },
						{
							link: '/products/create',
							text: 'Create Product',
							isCurrent: true,
						},
					]}
				/>

				<PendingButton />
			</div>
			{(state?.message || state?.errors) && (
				<p className='text-sm font-medium text-destructive'>{state.message}</p>
			)}
			<div className='grid gap-4 lg:gap-y-8 lg:gap-x-0 lg:grid-cols-1 xl:grid-cols-3 xl:gap-8 my-4'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
					<ProductDetails state={state} />
					<ProductStock colors={colors} sizes={sizes} state={state} />
					<FeaturedProduct />
				</div>
				<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
					<ProductCategory categories={categories} state={state} />
					<ProductImages />
					<ProductStatus />
				</div>
			</div>
		</form>
	);
}

function PendingButton() {
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
			Create Product
		</Button>
	);
}
