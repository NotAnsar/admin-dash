import { Tables } from '@/database.types';

export type Color = Tables<'colors'>;

export type Category = Tables<'category'>;

export type Size = Tables<'sizes'>;

export type Product = Tables<'product'>;

export type ProductALL = Product & {
	colors: Color;
	sizes: Size;
	category: Category;
};

export type ProductWithImages = Product & { images: string[] };
