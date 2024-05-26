'use client';

import { RotateCcw } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types/db';
import { Skeleton } from '../ui/skeleton';

export default function SelectProduct({
	categories,
}: {
	categories: Category[];
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const defaultValue = searchParams.get('select') || '';

	const handleSelect = (term: string) => {
		const params = new URLSearchParams(searchParams);
		params.set('select', term);
		replace(`${pathname}?${params.toString()}`);
	};

	const resetSelect = () => {
		const params = new URLSearchParams(searchParams);
		params.delete('select');
		replace(`${pathname}?${params.toString()}`);
	};

	const isValidValue = categories.some((c) => c.id === defaultValue);

	return (
		<>
			{searchParams.get('select') && (
				<span
					className='h-10 w-auto aspect-square flex items-center justify-center rounded-md border border-border cursor-pointer'
					onClick={resetSelect}
				>
					<RotateCcw width={16} height={16} />
				</span>
			)}
			<Select
				onValueChange={handleSelect}
				defaultValue={isValidValue ? defaultValue : ''}
			>
				<SelectTrigger>
					<SelectValue placeholder='Filter by categories' />
				</SelectTrigger>
				<SelectContent>
					{categories.map(({ id, name }) => (
						<SelectItem key={id} value={id}>
							{name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
}

export function SelectProductSkeleton() {
	return <Skeleton className='w-full h-10' />;
}
