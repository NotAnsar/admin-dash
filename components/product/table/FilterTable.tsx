import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '../../ui/input';
import { RotateCcw, Settings2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Table } from '@tanstack/react-table';
import { DataTableBooleanFilter } from './DataTableBooleanFilter';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Category } from '@/types/db';

export default function FilterTable<TData>({
	table,
	categories,
}: {
	table: Table<TData>;
	categories: Category[];
}) {
	return (
		<div className='flex flex-col lg:flex-row items-center py-4 gap-2'>
			<div className='grid sm:grid-cols-3 lg:flex gap-2 w-full'>
				<Input
					placeholder='Filter by name'
					className='flex gap-1 w-full lg:w-[270px] '
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
				/>

				<DataTableBooleanFilter
					column={table.getColumn('featured')}
					title={'Featured'}
					options={[
						{ label: 'Featured', value: 'true' },
						{ label: 'Not Featured', value: 'false' },
					]}
					classname='hidden sm:flex'
				/>

				<DataTableBooleanFilter
					column={table.getColumn('archived')}
					title={'Status'}
					options={[
						{ label: 'Archived', value: 'true' },
						{ label: 'Active', value: 'false' },
					]}
					classname='hidden sm:flex'
				/>
			</div>

			{/* <DropdownMenu>
				<DropdownMenuTrigger asChild className='w-full lg:w-fit'>
					<Button variant='outline' className='ml-auto'>
						<Settings2 className='mr-2 h-4 w-4' />
						View
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{table
						.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => {
							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									className='capitalize'
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{column.id}
								</DropdownMenuCheckboxItem>
							);
						})}
				</DropdownMenuContent>
			</DropdownMenu> */}

			{/* SELECT FILTER BY REFERRAL SOURCE */}
			<div className='flex items-center gap-3  '>
				<Select
					onValueChange={(e) => table.getColumn('category')?.setFilterValue(e)}
				>
					<SelectTrigger className='w-full md:w-[250px] order-none md:order-1'>
						<SelectValue placeholder={'Filter by referral source'} />
					</SelectTrigger>
					<SelectContent className='w-full'>
						{categories.map((c) => (
							<SelectItem key={c.id} value={c.id}>
								{c.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{table.getColumn('category')?.getIsFiltered() && (
					<Button
						variant={'outline'}
						onClick={() => table.getColumn('category')?.setFilterValue('')}
						className=' flex items-center gap-2 '
					>
						<RotateCcw className={'h-[13px] w-[13px] mt-[2px] '} />
					</Button>
				)}
			</div>
		</div>
	);
}
