'use client';

import { Color } from '@/types/db';
import { ColumnDef } from '@tanstack/react-table';
import { formatTimestamp } from '@/lib/utils';
import { Delete, Settings2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { DeleteColor } from './DeleteColor';
import { useState } from 'react';

export const columns: ColumnDef<Color>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => {
			return (
				<div className='text-sm text-nowrap gap-2 flex items-center'>
					<p>{row.original.name}</p>
					<div
						className='w-4 h-4 rounded-full'
						style={{ background: row.original.value }}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'value',
		header: 'Value',
	},
	{
		accessorKey: 'created_at',
		header: 'Created at',
		cell: ({ row }) => {
			return (
				<div className='text-sm text-nowrap'>
					{formatTimestamp(row.getValue('created_at'))}
				</div>
			);
		},
	},
	{
		id: 'edit',
		header: 'Edit',

		cell: ({ row }) => (
			<Link
				href={`/colors/edit/${row.original.id}`}
				className={buttonVariants({ variant: 'ghost' })}
			>
				<Settings2 className='w-4 h-auto' />
			</Link>
		),
	},
	{
		id: 'delete',
		header: 'Delete',
		cell: ({ row }) => <DeleteButton color={row.original} />,
	},
];

export default function DeleteButton({ color }: { color: Color }) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	return (
		<>
			<Button variant={'ghost'} onClick={() => setIsDeleteDialogOpen(true)}>
				<Trash2 className='w-4 h-auto' />
			</Button>
			<DeleteColor
				id={color.id}
				open={isDeleteDialogOpen}
				setOpen={setIsDeleteDialogOpen}
			/>
		</>
	);
}
