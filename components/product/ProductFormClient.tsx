'use client';

import { Category, Color, ProductALL, Size } from '@/types/db';
import BreadCrumb from '@/components/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Loader, Plus } from 'lucide-react';
import { z } from 'zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { useState } from 'react';
import { ProductDetailsClient } from './form-items/ProductDetails';
import { ProductStockClient } from './form-items/ProductStock';
import { FeaturedProductClient } from './form-items/FeaturedProduct';
import { ProductCategoryClient } from './form-items/ProductCategory';
import { ProductStatusClient } from './form-items/ProductStatus';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AuthError } from '@supabase/supabase-js';

const formSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Product Name must be at least 3 characters long.' }),
	description: z.string(),
	price: z.coerce
		.number()
		.positive({ message: 'Price must be a positive number' }),
	stock: z.coerce
		.number()
		.int()
		.min(0, { message: 'Stock must be a non-negative integer' }),
	color_id: z.string({ message: 'Please provide a valid color identifier.' }),
	size_id: z.string({ message: 'Please provide a valid size identifier.' }),
	featured: z.boolean(),
	category_id: z.string({
		message: 'Please provide a valid category identifier.',
	}),
	archived: z.boolean(),
});

export type ProductForm = UseFormReturn<
	{
		featured: boolean;
		name: string;
		description: string;
		price: number;
		stock: number;
		color_id: string;
		size_id: string;
		archived: boolean;
		category_id: string;
	},
	any,
	undefined
>;

export default function ProductFormClient({
	categories,
	colors,
	sizes,
	product,
}: {
	product?: ProductALL;
	categories: Category[];
	colors: Color[];
	sizes: Size[];
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: product ? product.name : '',
			description: product ? product.description || '' : '',
			size_id: product
				? product.size_id
				: sizes.find((s) => s.name === 'M')?.id || '',
			featured: product ? product.featured : false,
			archived: product ? product.archived : false,
			category_id: product ? product.category_id : '',
			color_id: product ? product.color_id : '',
			price: product ? product.price : undefined,
			stock: product ? product.stock : undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);

		if (values.featured && values.archived) {
			setIsLoading(false);
			toast({
				description: 'Archived products cannot be featured.',
				variant: 'destructive',
			});
			return;
		}

		try {
			const supabase = createClient();
			if (product) {
				// update
				const { data, error } = await supabase
					.from('product')
					.update([
						{
							...values,
							description:
								values.description === '' ? null : values.description,
						},
					])
					.eq('id', product.id)
					.select('id')
					.single();
				console.log(data, error);

				if (error) throw error;
			} else {
				// create
				const { data, error } = await supabase
					.from('product')
					.insert([
						{
							...values,
							description: values.description || null,
						},
					])
					.select('id')
					.single();

				if (error) throw error;
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			let message = `Database Error: Failed to ${
				product ? 'Update' : 'Create'
			} Product.`;
			if (error instanceof AuthError) message = error.message;

			toast({ description: message, variant: 'destructive' });
			return;
		}

		router.push('/products');
		router.refresh();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				encType='multipart/form-data'
			>
				<div className='flex gap-4 flex-col sm:flex-row justify-between'>
					<BreadCrumb
						items={[
							{ link: '/products', text: 'Product' },
							{
								link: product
									? `/products/edit/${product.id}`
									: '/products/create',
								text: `${product ? 'Edit' : 'Create'} Product`,
								isCurrent: true,
							},
						]}
					/>

					<Button
						className='flex gap-1 justify-center items-center'
						type='submit'
						aria-disabled={isLoading}
						disabled={isLoading}
					>
						{isLoading ? (
							<Loader className='mr-2 h-4 w-4 animate-spin' />
						) : (
							<Plus className='w-4 h-auto' />
						)}
						{product ? 'Edit Product' : 'Create Product'}
					</Button>
				</div>

				<div className='grid gap-4 lg:gap-y-8 lg:gap-x-0 lg:grid-cols-1 xl:grid-cols-3 xl:gap-8 my-4'>
					<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
						<ProductDetailsClient form={form} isLoading={isLoading} />

						<ProductStockClient
							colors={colors}
							sizes={sizes}
							form={form}
							isLoading={isLoading}
						/>

						<FeaturedProductClient form={form} isLoading={isLoading} />
					</div>
					<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
						<ProductCategoryClient
							categories={categories}
							form={form}
							isLoading={isLoading}
						/>

						{/* <ProductImages /> */}

						<ProductStatusClient form={form} isLoading={isLoading} />
					</div>
				</div>
			</form>
		</Form>
	);
}
