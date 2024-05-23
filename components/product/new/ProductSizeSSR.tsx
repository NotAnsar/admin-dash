import { createClientSSR } from '@/lib/supabase/server';
import { Size } from '@/types/db';
import ProductSize from './ProductSize';

export default async function ProductSizeSSR() {
	const supabase = createClientSSR(true);
	const { data: sizes, error } = await supabase
		.from('sizes')
		.select()
		.returns<Size[]>();

	if (error && sizes === null) throw error;

	return <ProductSize sizes={sizes} />;
}
