import { ProductState } from '@/actions/product-action';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ProductALL } from '@/types/db';
import { UseFormReturn } from 'react-hook-form';
import { ProductForm } from '../ProductFormClient';

export default function ProductDetails({
	state,
	product,
}: {
	state: ProductState;
	product?: ProductALL;
}) {
	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
				<CardDescription>
					Lipsum dolor sit amet, consectetur adipiscing elit
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-6'>
					<div className='grid gap-3'>
						<Label
							htmlFor='name'
							className={cn(state?.errors?.name ? 'text-destructive' : '')}
						>
							Name
						</Label>
						<div>
							<Input
								id='name'
								type='text'
								name='name'
								className={cn(
									'w-full',
									state?.errors?.name
										? 'border-destructive focus-visible:ring-destructive '
										: ''
								)}
								placeholder='Product Name'
								defaultValue={product?.name || ''}
								required
							/>
							{state?.errors?.name &&
								state.errors.name.map((error: string) => (
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
							htmlFor='description'
							className={cn(
								state?.errors?.description ? 'text-destructive' : ''
							)}
						>
							Description
						</Label>
						<div>
							<Textarea
								id='description'
								name='description'
								placeholder='Product Description'
								defaultValue={product?.description || ''}
								className={cn(
									'min-h-32',
									state?.errors?.description
										? 'border-destructive focus-visible:ring-destructive '
										: ''
								)}
							/>
							{state?.errors?.description &&
								state.errors.description.map((error: string) => (
									<p
										className='text-sm font-medium text-destructive mt-1'
										key={error}
									>
										{error}
									</p>
								))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
export function ProductDetailsClient({
	isLoading,
	form,
}: {
	product?: ProductALL;
	isLoading: boolean;
	form: ProductForm;
}) {
	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
				<CardDescription>
					Lipsum dolor sit amet, consectetur adipiscing elit
				</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-6'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='grid gap-1'>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='Product Name'
									className='bg-transparent'
									disabled={isLoading}
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem className='grid gap-1'>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									id='description'
									placeholder='Product Description'
									className='min-h-32'
									disabled={isLoading}
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
