import { Database, Tables } from '@/database.types';

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

export type OrderWithItems = Tables<'orders'> & {
	order_Items: (Tables<'order_Items'> & { product: Tables<'product'> })[];
	user: Tables<'user'>;
};

type StatusEnum = Database['public']['Enums']['status'];

export const statusEnumValues: StatusEnum[] = [
	'pending',
	'shipped',
	'delivered',
	'canceled',
];
