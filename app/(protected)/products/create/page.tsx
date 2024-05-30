import CreateProductForm from '@/components/product/CreateProductForm';
import { fetchCategories, fetchColors, fetchSizes } from '@/lib/db';

export default async function page() {
	const [colors, sizes, categories] = await Promise.all([
		fetchColors(),
		fetchSizes(),
		fetchCategories(),
	]);

	return (
		<CreateProductForm categories={categories} colors={colors} sizes={sizes} />
	);
}
