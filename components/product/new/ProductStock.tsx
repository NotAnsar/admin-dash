import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { createClientSSR } from '@/lib/supabase/server';
import { Color } from '@/types/db';
import ProductSizeSSR from './ProductSizeSSR';
import { fetchColors } from '@/lib/db';

export default async function ProductStock() {
	const colors = await fetchColors();

	return (
		<Card x-chunk='dashboard-07-chunk-1'>
			<CardHeader>
				<CardTitle>Stock</CardTitle>
				<CardDescription>
					Lipsum dolor sit amet, consectetur adipiscing elit
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:flex gap-6 justify-between '>
					<div className='grid gap-3'>
						<Label className='text-muted-foreground' htmlFor='stock'>
							Stock
						</Label>
						<Input id='stock' type='number' name='stock' min={0} required />
					</div>
					<div className='grid gap-3'>
						<Label className='text-muted-foreground' htmlFor='price'>
							Price
						</Label>
						<Input
							id='price'
							type='number'
							name='price'
							min={0.01}
							required
							step='any'
						/>
					</div>

					<div className='grid gap-3 lg:w-[180px]'>
						<Label className='text-muted-foreground' htmlFor='color'>
							Color
						</Label>
						<Select required name='color'>
							<SelectTrigger id='color' aria-label='Select Color' aria-required>
								<SelectValue placeholder='Select Color' />
							</SelectTrigger>
							<SelectContent>
								{colors.map((color) => (
									<SelectItem key={color.id} value={color.id}>
										{color.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<ProductSizeSSR />
				</div>
			</CardContent>
		</Card>
	);
}
