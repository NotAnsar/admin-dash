import Image from 'next/image';
import { Card } from '../ui/card';

export default function ProductCard() {
	return (
		<Card className='rounded-lg overflow-hidden'>
			<div className='h-48 bg-foreground flex items-center justify-center'>
				<Image
					alt='Product'
					className='w-full h-full object-cover'
					src='/login.webp'
					width={600}
					height={400}
				/>
			</div>
			<div className='p-4'>
				<h3 className='text-lg font-medium'>Product Name</h3>
				<p className='text-muted-foreground mb-3 leading-snug text-[15px] truncate '>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
				<div className='flex items-center justify-between'>
					<span className='font-bold text-foreground'>$19.99</span>
					<div className='flex items-center space-x-2'>
						<button className='hover:text-muted-foreground text-muted-foreground/80 transition-colors'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
								/>
							</svg>
						</button>
						<button className='text-red-500 hover:text-red-700 transition-colors'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</Card>
	);
}
