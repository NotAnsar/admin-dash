'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const frameworks = [
	{ value: 'next.js', label: 'Next.js' },
	{ value: 'sveltekit', label: 'SvelteKit' },
	{ value: 'nuxt.js', label: 'Nuxt.js' },
	{ value: 'remix', label: 'Remix' },
	{ value: 'astro', label: 'Astro' },
];

export default function ProductCategory() {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	return (
		<Card x-chunk='dashboard-07-chunk-2'>
			<CardHeader>
				<CardTitle>Product Category</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4'>
					<Label htmlFor='category'>Category</Label>
					<input className='hidden' defaultValue={value} name='category' />
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								role='combobox'
								aria-expanded={open}
								className='w-full justify-between'
							>
								{value
									? frameworks.find((framework) => framework.value === value)
											?.label
									: 'Select framework...'}
								<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='popover-content-width-same-as-its-trigger p-0'>
							<Command>
								<CommandInput placeholder='Search framework...' />
								<CommandEmpty>No framework found.</CommandEmpty>

								<CommandGroup>
									<CommandList>
										{frameworks.map((framework) => (
											<CommandItem
												key={framework.value}
												value={framework.value}
												onSelect={(currentValue) => {
													setValue(currentValue === value ? '' : currentValue);
													setOpen(false);
												}}
											>
												<Check
													className={cn(
														'mr-2 h-4 w-4',
														value === framework.value
															? 'opacity-100'
															: 'opacity-0'
													)}
												/>
												{framework.label}
											</CommandItem>
										))}
									</CommandList>
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			</CardContent>
		</Card>
	);
}
