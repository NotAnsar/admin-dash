'use client';

import { Category, Color, ProductALL, Size } from '@/types/db';
import { Button } from '@/components/ui/button';
import { Edit, Loader } from 'lucide-react';

import BreadCrumb from '@/components/BreadCrumb';
import { useFormState, useFormStatus } from 'react-dom';
import { ProductState, createProduct } from '@/actions/product-action';
import ProductDetails from '../form-items/ProductDetails';
import ProductStock from '../form-items/ProductStock';
import FeaturedProduct from '../form-items/FeaturedProduct';
import ProductCategory from '../form-items/ProductCategory';
import ProductImages from '../form-items/ProductImages';
import ProductStatus from '../form-items/ProductStatus';

export default function EditProductForm({
	categories,
	colors,
	sizes,
	product,
}: {
	product: ProductALL;
	categories: Color[];
	colors: Size[];
	sizes: Category[];
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
							link: `/products/edit/{product.id}`,
							text: 'Edit Product',
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
					<ProductDetails state={state} product={product} />
					<ProductStock
						colors={colors}
						sizes={sizes}
						state={state}
						product={product}
					/>
					<FeaturedProduct initialValue={product.featured} />
				</div>
				<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
					<ProductCategory
						categories={categories}
						state={state}
						product={product}
					/>
					<ProductImages product={product} />
					<ProductStatus product={product} />
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
				<Edit className='w-4 h-auto' />
			)}
			Edit Product
		</Button>
	);
}
