'use client';

import { State } from '@/actions/product-action';
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
import { Category } from '@/types/db';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

export default function ProductCategory({
	categories,
	state,
}: {
	categories: Category[];
	state: State;
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	return (
		<Card x-chunk='dashboard-07-chunk-2'>
			<CardHeader>
				<CardTitle>Product Category</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4'>
					<Label
						htmlFor='category'
						className={cn(
							'text-muted-foreground',
							state?.errors?.category_id ? 'text-destructive' : ''
						)}
					>
						Category
					</Label>
					<div>
						<input className='hidden' defaultValue={value} name='category' />
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									role='combobox'
									aria-expanded={open}
									className={cn(
										'w-full justify-between',
										state?.errors?.category_id
											? 'border-destructive focus-visible:ring-destructive'
											: ''
									)}
								>
									{value
										? categories.find((categorie) => categorie.id === value)
												?.name
										: 'Select category...'}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</PopoverTrigger>
							<PopoverContent className='popover-content-width-same-as-its-trigger p-0'>
								<Command
									filter={(value: string, search: string) => {
										const category = categories.find((c) => c.id === value);

										return category &&
											category.name.toLowerCase().includes(search)
											? 1
											: 0;
									}}
								>
									<CommandInput placeholder='Search category...' />
									<CommandEmpty>No category found.</CommandEmpty>

									<CommandGroup>
										<CommandList>
											{categories.map((categorie) => (
												<CommandItem
													key={categorie.id}
													value={categorie.id}
													onSelect={(currentValue) => {
														setValue(
															currentValue === value ? '' : currentValue
														);
														setOpen(false);
													}}
												>
													<Check
														className={cn(
															'mr-2 h-4 w-4',
															value === categorie.name
																? 'opacity-100'
																: 'opacity-0'
														)}
													/>
													{categorie.name}
												</CommandItem>
											))}
										</CommandList>
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
						{state?.errors?.category_id &&
							state.errors.category_id.map((error: string) => (
								<p
									className='text-sm font-medium text-destructive mt-1'
									key={error}
								>
									{error}
								</p>
							))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
