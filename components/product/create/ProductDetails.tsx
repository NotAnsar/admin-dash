import { State } from '@/actions/product-action';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function ProductDetails({ state }: { state: State }) {
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
