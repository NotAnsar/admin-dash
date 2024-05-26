import { cn } from '@/lib/utils';
import React from 'react';

export default function Badge({
	children,
	variant = 'success',
	className,
}: React.HTMLAttributes<HTMLDivElement> & {
	variant?: 'success' | 'error' | 'archive';
}) {
	return (
		<div
			className={cn(
				'inline-flex gap-1 items-center rounded-md border py-[2px] px-1 text-xs',
				{
					'bg-secondary/90 text-muted-foreground border-muted-foreground/70':
						variant === 'archive',
					'border-green-600 text-green-600 bg-green-400/40 dark:bg-green-600/40':
						variant === 'success',
					'border-red-600 text-red-600 bg-red-400/40 dark:bg-red-600/40':
						variant === 'error',
				},
				className
			)}
		>
			{children}
		</div>
	);
}
