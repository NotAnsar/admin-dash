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

export default function ProductDetails() {
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
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							type='text'
							name='name'
							className='w-full'
							placeholder='Product Name'
							required
						/>
					</div>
					<div className='grid gap-3'>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							name='description'
							className='min-h-32'
							placeholder='Product Description'
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
