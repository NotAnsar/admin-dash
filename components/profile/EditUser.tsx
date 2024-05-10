'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { User } from '@/types/user';
import EditUserForm from './EditUserForm';
import { useCallback, useState } from 'react';
import { toast } from '../ui/use-toast';

export function EditUserTrigger({
	children,
	user,
	...props
}: {
	children: React.ReactNode;
	user: User;
}) {
	const [open, setopen] = useState(false);

	const closeModal = useCallback(() => {
		setopen(false);
		toast({ description: 'User data updated successfully.' });
	}, [setopen]);

	return (
		<Dialog open={open} onOpenChange={setopen}>
			<DialogTrigger asChild {...props}>
				{children}
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						{"Make changes to your profile here. Click save when you're done."}
					</DialogDescription>
				</DialogHeader>
				<EditUserForm user={user} closeOnSuccess={closeModal} />
			</DialogContent>
		</Dialog>
	);
}
