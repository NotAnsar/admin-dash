import { ProductALL } from '@/types/db';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontalIcon } from 'lucide-react';
import { DeleteProduct } from './DeleteProduct';

export default function ActionCell({
	product,
	...props
}: {
	product: ProductALL;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontalIcon className='h-4 w-4' />
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
				<DropdownMenuItem asChild className='w-full cursor-pointer'>
					<DeleteProduct id={product.id} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
