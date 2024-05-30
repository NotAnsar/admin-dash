'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';

export default function FeaturedProduct({
	initialValue = false,
}: {
	initialValue?: boolean;
}) {
	const [featured, setFeatured] = useState(initialValue);

	return (
		<Card x-chunk='dashboard-07-chunk-5'>
			<CardHeader>
				<CardTitle>Featured Product</CardTitle>
				<CardDescription>
					This Product Will Appear on the Home Page
				</CardDescription>
			</CardHeader>
			<CardContent>
				<input
					name='featured'
					value={featured ? 'on' : 'off'}
					className='hidden'
					readOnly
				/>
				<Button
					size='sm'
					variant='secondary'
					onClick={() => setFeatured((a) => !a)}
					type='button'
				>
					{featured ? 'Unfeatured Product' : 'Featured Product'}
				</Button>
			</CardContent>
		</Card>
	);
}
