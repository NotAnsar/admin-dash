'use client';

import { Category, ProductALL } from '@/types/db';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '../ui/button';
import {
	Archive,
	ArrowUpDown,
	MoreHorizontal,
	ShieldCheck,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Badge from '../Badge';

export const columns: ColumnDef<ProductALL>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},

	{
		accessorKey: 'stock',
		header: 'In Stock',
		cell: ({ row }) => {
			const stock = parseInt(row.getValue('stock'));

			if (stock <= 0) {
				return (
					<Badge variant={'error'} className='px-2 text-nowrap'>
						Out of Stock
					</Badge>
				);
			}
			return <div className='font-medium'>{stock}</div>;
		},
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell: ({ row }) => {
			const category: Category = row.getValue('category');
			return <div>{category.name}</div>;
		},
	},
	{
		accessorKey: 'archived',
		header: 'Status',
		cell: ({ row }) => {
			const archived = row.getValue('archived');

			return (
				<Badge variant={archived ? 'archive' : 'success'}>
					{archived ? (
						<>
							<Archive className='w-3 h-auto' /> Archived
						</>
					) : (
						<>
							<ShieldCheck className='w-3 h-auto' /> Active
						</>
					)}
				</Badge>
				// <div
				// 	className={cn(
				// 		'inline-flex gap-1 items-center rounded-md border py-[2px] px-1 text-xs',
				// 		archived
				// 			? // ? 'bg-gray-100/80 text-gray-400  dark:bg-gray-700/80 dark:border-gray-200/30 border-gray-200/90'
				// 			  'bg-secondary/90 text-muted-foreground border-muted-foreground/70'
				// 			: // : 'bg-green-100/80 text-green-400 border dark:bg-[#00800052] dark:border-green-200/30 border-green-400'
				// 			  // 'border-red-600 text-red-600 bg-red-400/40 dark:bg-red-600/40'
				// 			  'border-green-600 text-green-600 bg-green-400/40 dark:bg-green-600/40'
				// 	)}
				// >
				// 	{archived ? (
				// 		<Archive className='w-3 h-auto' />'Archived'
				// 	) : (
				// 		<ShieldCheck className='w-3 h-auto' />'Active'
				// 	)}
				// 	{archived ? 'Archived' : 'Active'}
				// </div>
			);
		},
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Price
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'));
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(price);

			return <div className='font-medium pl-4'>{formatted}</div>;
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const product = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(product.id)}
						>
							Copy product ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View Product</DropdownMenuItem>
						<DropdownMenuItem>Edit Product</DropdownMenuItem>
						<DropdownMenuItem>Delete Product</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
