import ProductDetails from './ProductDetails';
import ProductStock from './ProductStock';
import FeaturedProduct from './FeaturedProduct';
import ProductCategory from './ProductCategory';
import ProductImages from './ProductImages';
import ProductStatus from './ProductStatus';

export default function NewProductForm() {
	return (
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
	);
}
