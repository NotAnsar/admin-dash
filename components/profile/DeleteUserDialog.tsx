'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogPortal,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Dispatch, SetStateAction } from 'react';
import { deleteAccount } from '@/actions/profile-action';
import { toast } from '../ui/use-toast';

export function DeleteUserDialog({
	open,
	setOpen,
}: {
	open?: boolean;
	setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogPortal>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<form
							action={async () => {
								const res = await deleteAccount();

								if (res) {
									toast({
										title: res.title,
										description: res.message,
										variant: 'destructive',
									});
								}
							}}
						>
							<AlertDialogAction
								className='bg-destructive text-white hover:bg-destructive/90 w-full'
								type='submit'
							>
								Delete
							</AlertDialogAction>
						</form>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogPortal>
		</AlertDialog>
	);
}
