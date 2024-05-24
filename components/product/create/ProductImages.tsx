import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Upload } from 'lucide-react';
import Image from 'next/image';

export default function ProductImages() {
	return (
		<Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
				<CardDescription>
					Upload and manage your product images here.
					<br />
					Minimum 1 image, maximum 4 images.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-2'>
					<div className='grid grid-cols-2 gap-2'>
						<Image 
							alt='Product image'
							className='aspect-square w-full h-auto rounded-md object-cover'
							height='300'
							src='/placeholder.svg'
							width='300'
						/>
						<Image
							alt='Product image'
							className='aspect-square w-full h-auto rounded-md object-cover'
							height='300'
							src='/placeholder.svg'
							width='300'
						/>
					</div>
					<div className='grid grid-cols-3 gap-2'>
						<Image
							alt='Product image'
							className='aspect-square w-full rounded-md object-cover'
							height='84'
							src='/placeholder.svg'
							width='84'
						/>

						<Image
							alt='Product image'
							className='aspect-square w-full rounded-md object-cover'
							height='84'
							src='/placeholder.svg'
							width='84'
						/>

						<button
							className='flex aspect-square w-full items-center justify-center rounded-md border border-dashed'
							type='button'
						>
							<Upload className='h-4 w-4 text-muted-foreground' />
							<span className='sr-only'>Upload</span>
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
