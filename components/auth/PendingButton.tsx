'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PendingButton({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const { pending } = useFormStatus();

	return (
		<div className={cn('flex justify-end', className)}>
			<Button
				className='w-full '
				type='submit'
				aria-disabled={pending}
				disabled={pending}
			>
				{pending && <Loader className='mr-2 h-4 w-4 animate-spin' />}
				{children}
			</Button>
		</div>
	);
}
