'use client';

import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Size } from '@/types/db';
import { useState } from 'react';

export default function ProductSize({ sizes }: { sizes: Size[] }) {
	const [size, setsize] = useState(sizes.find((s) => s.name === 'M')?.id || '');

	return (
		<div className='grid gap-3 mr-auto'>
			<Label className='text-muted-foreground' htmlFor='size'>
				Size
			</Label>
			<input type='hidden' name='size' defaultValue={size} />
			<ToggleGroup
				type='single'
				defaultValue={size}
				variant='outline'
				className='w-full'
				onValueChange={(value) => setsize(value)}
			>
				{sizes.map((size) => (
					<ToggleGroupItem key={size.id} value={size.id}>
						{size.name}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
}
