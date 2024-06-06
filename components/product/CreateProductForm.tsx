'use client';

import ProductDetails from './form-items/ProductDetails';
import ProductStock from './form-items/ProductStock';
import FeaturedProduct from './form-items/FeaturedProduct';
import ProductImages from './form-items/ProductImages';
import ProductStatus from './form-items/ProductStatus';
import ProductCategory from './form-items/ProductCategory';
import { Category, Color, Size } from '@/types/db';
import { Button } from '@/components/ui/button';
import { Loader, Plus } from 'lucide-react';

import BreadCrumb from '@/components/BreadCrumb';
import { useFormState, useFormStatus } from 'react-dom';
import { ProductState, createProduct } from '@/actions/product-action';

export default function CreateProductForm({
	categories,
	colors,
	sizes,
}: {
	categories: Category[];
	colors: Color[];
	sizes: Size[];
}) {
	const initialState: ProductState = { message: null, errors: {} };
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
			Create Product
		</Button>
	);
}
