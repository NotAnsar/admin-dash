import { FileObject } from '@supabase/storage-js';

export type Color = {
	id: string;
	name: string;
	value: string;
	created_at: string;
};

export type Category = {
	id: string;
	name: string;
	created_at: string;
};

export type Size = {
	id: string;
	name: string;
	fullname: string;
	created_at: string;
};

export type Product = {
	id: string;
	name: string;
	price: number;
	stock: number;
	category_id: string;
	created_at: string;
	description: string;
	archived: boolean;
	featured: boolean;
	color_id: string;
	size_id: string;
};

export type ProductALL = Product & {
	colors: Color;
	sizes: Size;
	category: Category;
};

export type ProductWithImages = {
	id: string;
	name: string;
	price: number;
	stock: number;
	category_id: string;
	created_at: string;
	description: string;
	archived: boolean;
	featured: boolean;
	color_id: string;
	size_id: string;
	images: FileObject[];
};
