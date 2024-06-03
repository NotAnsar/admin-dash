'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Button } from '../../ui/button';
import { Archive, ArrowUpDown, Shield, ShieldCheck } from 'lucide-react';
import Badge from '../../Badge';
import ActionCell from './ActionCell';
import { User } from '@/types/user';
import { cn, formatTimestamp } from '@/lib/utils';

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='px-0'
				>
					Email
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'f_name',
		header: 'First Name',
	},
	{
		accessorKey: 'l_name',
		header: 'Last Name',
	},
	{
		accessorKey: 'role',
		header: 'Status',
		cell: ({ row }) => {
			const role = row.getValue('role');

			return (
				<Badge variant={role === 'user' ? 'archive' : 'admin'}>
					{role === 'user' ? (
						<>
							<Shield className='w-3 h-auto' /> User
						</>
					) : (
						<>
							<ShieldCheck className='w-3 h-auto' /> Admin
						</>
					)}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'created_at',
		header: 'Date Joined',
		cell: ({ row }) => {
			return (
				<div className='text-sm'>
					{formatTimestamp(row.getValue('created_at'))}
				</div>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <ActionCell user={row.original} />,
	},
];
