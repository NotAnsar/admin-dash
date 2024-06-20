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
import ProductSize from './ProductSize';
import { Color, ProductALL, Size } from '@/types/db';
import { ProductState } from '@/actions/product-action';
import { cn } from '@/lib/utils';
import { ProductForm } from '../ProductFormClient';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export default function ProductStock({
	colors,
	sizes,
	state,
	product,
}: {
	product?: ProductALL;
	colors: Color[];
	sizes: Size[];
	state: ProductState;
}) {
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
						<Label
							htmlFor='stock'
							className={cn(
								'text-muted-foreground',
								state?.errors?.stock ? 'text-destructive' : ''
							)}
						>
							Stock
						</Label>
						<div>
							<Input
								id='stock'
								type='number'
								name='stock'
								min={0}
								required
								className={cn(
									state?.errors?.stock
										? 'border-destructive focus-visible:ring-destructive '
										: ''
								)}
								defaultValue={
									product?.stock === undefined ? '' : product?.stock
								}
							/>
							{state?.errors?.stock &&
								state.errors.stock.map((error: string) => (
									<p
										className='text-sm font-medium text-destructive mt-1'
										key={error}
									>
										{error}
									</p>
								))}
						</div>
					</div>
					<div className='grid gap-3'>
						<Label
							className={cn(
								'text-muted-foreground',
								state?.errors?.price ? 'text-destructive' : ''
							)}
							htmlFor='price'
						>
							Price
						</Label>
						<div>
							<Input
								id='price'
								type='number'
								name='price'
								min={0.01}
								required
								step='any'
								className={cn(
									state?.errors?.price
										? 'border-destructive focus-visible:ring-destructive '
										: ''
								)}
								defaultValue={product?.price || ''}
							/>
							{state?.errors?.price &&
								state.errors.price.map((error: string) => (
									<p
										className='text-sm font-medium text-destructive mt-1'
										key={error}
									>
										{error}
									</p>
								))}
						</div>
					</div>

					<div className='grid gap-3 lg:w-[180px]'>
						<Label
							htmlFor='color'
							className={cn(
								'text-muted-foreground',
								state?.errors?.color_id ? 'text-destructive' : ''
							)}
						>
							Color
						</Label>
						<div>
							<Select
								required
								name='color'
								defaultValue={product?.color_id || ''}
							>
								<SelectTrigger
									id='color'
									aria-label='Select Color'
									aria-required
									className={cn(
										state?.errors?.color_id
											? 'border-destructive focus-visible:ring-destructive '
											: ''
									)}
								>
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
							{state?.errors?.color_id &&
								state.errors.color_id.map((error: string) => (
									<p
										className='text-sm font-medium text-destructive mt-1'
										key={error}
									>
										{error}
									</p>
								))}
						</div>
					</div>
					<ProductSize
						sizes={sizes}
						state={state}
						defaultValue={product?.size_id}
					/>
				</div>
			</CardContent>
		</Card>
	);
}

export function ProductStockClient({
	colors,
	sizes,
	form,
	isLoading,
}: {
	isLoading: boolean;
	form: ProductForm;
	colors: Color[];
	sizes: Size[];
}) {
	return (
		<Card x-chunk='dashboard-07-chunk-1'>
			<CardHeader>
				<CardTitle>Stock</CardTitle>
				<CardDescription>
					Lipsum dolor sit amet, consectetur adipiscing elit
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:flex gap-6 justify-between'>
					<FormField
						control={form.control}
						name='stock'
						render={({ field }) => (
							<FormItem className='grid gap-1'>
								<FormLabel>Stock</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='number'
										className='bg-transparent'
										disabled={isLoading}
										min={0}
										required
										value={field.value ?? ''}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='price'
						render={({ field }) => (
							<FormItem className='grid gap-1'>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='number'
										className='bg-transparent'
										disabled={isLoading}
										min={0.01}
										required
										step='any'
										value={field.value ?? ''}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='color_id'
						render={({ field }) => (
							<FormItem className='grid gap-1 lg:w-[180px]'>
								<FormLabel>Color</FormLabel>
								<FormControl>
									<Select
										required
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={isLoading}
									>
										<SelectTrigger
											id='color'
											aria-label='Select Color'
											aria-required
										>
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
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='size_id'
						render={({ field }) => (
							<FormItem className='grid gap-1 mr-auto'>
								<FormLabel>Size</FormLabel>

								<ToggleGroup
									type='single'
									variant='outline'
									className='w-full'
									onValueChange={field.onChange}
									defaultValue={field.value}
									disabled={isLoading}
								>
									{sizes.map((size) => (
										<ToggleGroupItem key={size.id} value={size.id}>
											{size.name}
										</ToggleGroupItem>
									))}
								</ToggleGroup>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
