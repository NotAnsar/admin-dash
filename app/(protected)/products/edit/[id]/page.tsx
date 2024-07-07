import EditProductForm from '@/components/product/EditProductForm';
import ProductFormClient from '@/components/product/ProductFormClient';
import {
	fetchCategories,
	fetchColors,
	fetchProductById,
	fetchProductImagesById,
	fetchProductWithImages,
	fetchSizes,
} from '@/lib/product';
import { createClientSSR } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function page({
	params: { id },
}: {
	params: { id: string };
}) {
	const [colors, sizes, categories, product /* images */] = await Promise.all([
		fetchColors(),
		fetchSizes(),
		fetchCategories(),
		fetchProductWithImages(id),
		// fetchProductById(id),
		// fetchProductImagesById(id),
	]);

	if (!product) notFound();

	return (
		<ProductFormClient
			categories={categories}
			colors={colors}
			product={product}
			sizes={sizes}
		/>
	);
}
