'use client';

import { deleteAccount } from '@/actions/user-action';
import { AlertDialogAction } from '../ui/alert-dialog';
import { toast } from '../ui/use-toast';

export default function DeleteUserForm() {
	return (
		<form
			action={async () => {
				const res = await deleteAccount();

				console.log(res);

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
	);
}
