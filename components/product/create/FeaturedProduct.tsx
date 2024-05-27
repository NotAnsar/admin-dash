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

export default function FeaturedProduct() {
	const [featured, setFeatured] = useState(false);

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
					defaultValue={featured ? 'on' : 'off'}
					className='hidden'
				/>
				<Button
					size='sm'
					variant='secondary'
					onClick={() => setFeatured((a) => !a)}
					type='button'
					name='featured'
				>
					{featured ? 'Unfeatured Product' : 'Featured Product'}
				</Button>
			</CardContent>
		</Card>
	);
}