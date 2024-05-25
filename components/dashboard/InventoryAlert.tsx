import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';

import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';
import { cn } from '@/lib/utils';

export default function InventoryAlert({ className }: { className?: string }) {
	return (
		<Card x-chunk='dashboard-01-chunk-5' className={className}>
			<CardHeader>
				<CardTitle className='flex justify-between items-end '>
					<span>Inventory Alert</span>

					<Link
						href='/products'
						className='text-sm text-muted-foreground font-normal tracking-wide hover:text-foreground duration-200 transition ease-out  rounded-sm'
					>
						View all
					</Link>
				</CardTitle>

				<CardDescription>
					Some of your products are out of stock and running low in inventory
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead className='hidden sm:table-cell'>Price</TableHead>

							<TableHead className='text-right'>Stock</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((p) => (
							<TableRow key={p.id}>
								<TableCell>
									<div className='font-medium'>{p.product_name}</div>
									<div className='hidden text-sm text-muted-foreground md:inline'>
										{p.category}
									</div>
								</TableCell>
								<TableCell className='hidden sm:block'>${p.price}</TableCell>

								<TableCell
									className={cn('text-right font-medium', {
										'text-red-500': p.stock >= 0 && p.stock <= 5,
										'text-orange-400': p.stock > 5 && p.stock <= 15,
										'text-green-500': p.stock > 15,
									})}
								>
									{p.stock}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
const products = [
	{
		id: 1,
		product_name: 'T-shirt',
		price: 19.99,
		stock: 12,
		category: "Men's Clothing",
	},

	{
		id: 3,
		product_name: 'Sneakers',
		price: 49.99,
		stock: 3,
		category: "Men's Shoes",
	},
	{
		id: 2,
		product_name: 'Jeans',
		price: 39.99,
		stock: 7,
		category: "Women's Clothing",
	},
	{
		id: 4,
		product_name: 'Dress',
		price: 59.99,
		stock: 0,
		category: "Women's Clothing",
	},
	{
		id: 5,
		product_name: 'Sandals',
		price: 29.99,
		stock: 20,
		category: "Women's Shoes",
	},
];
