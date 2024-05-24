import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function ProductStatus() {
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
						<Select required name='status' defaultValue='active'>
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
