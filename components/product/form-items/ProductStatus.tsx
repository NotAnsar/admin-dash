import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ProductALL } from '@/types/db';
import { ProductForm } from '../ProductFormClient';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export default function ProductStatus({ product }: { product?: ProductALL }) {
	return (
		<Card x-chunk='dashboard-07-chunk-3'>
			<CardHeader>
				<CardTitle>Product Status</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid gap-6'>
					<div className='grid gap-3'>
						<Label htmlFor='status' className='text-muted-foreground'>
							Status
						</Label>
						<Select
							required
							name='status'
							defaultValue={product?.archived ? 'archived' : 'active'}
						>
							<SelectTrigger
								id='status'
								aria-label='Select status'
								name='status'
							>
								<SelectValue placeholder='Select status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='active'>Active</SelectItem>
								<SelectItem value='archived'>Archived</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
export function ProductStatusClient({
	form,
	isLoading,
}: {
	form: ProductForm;
	isLoading: boolean;
}) {
	return (
		<Card x-chunk='dashboard-07-chunk-3'>
			<CardHeader>
				<CardTitle>Product Status</CardTitle>
			</CardHeader>
			<CardContent>
				<FormField
					control={form.control}
					name='archived'
					render={({ field }) => (
						<FormItem className='grid gap-1 '>
							<FormLabel>Status</FormLabel>
							<FormControl>
								<Select
									required
									onValueChange={(value) =>
										field.onChange(value === 'archived')
									}
									value={field.value ? 'archived' : 'active'}
									disabled={isLoading}
								>
									<SelectTrigger
										id='color'
										aria-label='Select Color'
										aria-required
									>
										<SelectValue placeholder='Select status' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='active'>Active</SelectItem>
										<SelectItem value='archived'>Archived</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
