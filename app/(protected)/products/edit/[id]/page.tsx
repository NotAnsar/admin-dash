import EditProductForm from '@/components/product/EditProductForm';
import {
	fetchCategories,
	fetchColors,
	fetchProductById,
	fetchSizes,
} from '@/lib/product';
import { notFound } from 'next/navigation';

export default async function page({
	params: { id },
}: {
	params: { id: string };
}) {
	const [colors, sizes, categories, product] = await Promise.all([
		fetchColors(),
		fetchSizes(),
		fetchCategories(),
		fetchProductById(id),
	]);

	if (!product) notFound();

	return (
		<EditProductForm
			categories={categories}
			colors={colors}
			product={product}
			sizes={sizes}
		/>
	);
}
