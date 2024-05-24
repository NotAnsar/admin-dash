export type Color = {
	id: string;
	name: string;
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
	archived: string;
	featured: string;
	color_id: string;
	size_id: string;
};
