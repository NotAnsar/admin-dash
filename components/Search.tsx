'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';

export default function Search({
	placeholder = 'Search ...',
	className,
}: {
	placeholder?: string;
	className?: string;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		if (term) params.set('search', term);
		else params.delete('search');

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className={className}>
			<label htmlFor='search' className='sr-only'>
				Search
			</label>
			<Input
				type='search'
				placeholder={placeholder}
				onChange={(e) => handleSearch(e.target.value)}
				defaultValue={searchParams.get('search')?.toString()}
			/>
		</div>
	);
}
