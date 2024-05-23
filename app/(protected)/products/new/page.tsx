import { createProduct } from '@/actions/product-action';
import FeaturedProduct from '@/components/product/new/FeaturedProduct';
import ProductCategory from '@/components/product/new/ProductCategory';
import ProductDetails from '@/components/product/new/ProductDetails';
import ProductImages from '@/components/product/new/ProductImages';
import ProductStatus from '@/components/product/new/ProductStatus';
import ProductStock from '@/components/product/new/ProductStock';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function page() {
	return (
		<div>
			<div className='flex gap-4 flex-col sm:flex-row justify-between'>
				<Breadcrumb>
					<BreadcrumbList className='h-10 flex items-center'>
						<BreadcrumbItem>
							<BreadcrumbLink className='text-2xl font-bold' href='/products'>
								Products
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className='[&>svg]:size-5' />
						<BreadcrumbItem>
							<BreadcrumbLink
								className='text-2xl font-bold text-foreground'
								href='/new'
							>
								Create Products
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<Button
					className='flex gap-1 justify-center items-center'
					type='submit'
					form='new-product'
					// formAction={async (a) => {
					// 	'use server';
					// 	console.log(a);
					// }}
					formAction={createProduct}
				>
					<Plus className='w-4 h-auto' /> Create Product
				</Button>
			</div>

			<form
				className='grid gap-4 lg:gap-y-8 lg:gap-x-0 lg:grid-cols-1 xl:grid-cols-3 xl:gap-8 my-4'
				id='new-product'
			>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
					<ProductDetails />
					<ProductStock />
					<FeaturedProduct />
				</div>
				<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
					<ProductCategory />
					<ProductImages />
					<ProductStatus />
				</div>
			</form>
		</div>
	);
}
