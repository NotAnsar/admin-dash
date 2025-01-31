import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '../../ui/use-toast';
import { deleteOrder } from '@/actions/order-action';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../../ui/button';
import { Loader } from 'lucide-react';
import { DeleteOrderState } from '@/actions/order-action';

export const DeleteOrder = ({
	id,
	open,
	setOpen,
}: {
	id: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const initialState: DeleteOrderState = { message: null, type: null };
	const [state, action] = useFormState(
		deleteOrder.bind(null, id),
		initialState
	);

	useEffect(() => {
		if (state.message) {
			setOpen(false);
			toast({
				description: state.message,
				variant: state.type === 'error' ? 'destructive' : 'default',
			});
		}
	}, [state, setOpen]);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						order and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<form action={action}>
						<PendingButton />
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

function PendingButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			type='submit'
			aria-disabled={pending}
			disabled={pending}
			className='bg-destructive text-white hover:bg-destructive/90 w-full'
		>
			{pending && <Loader className='mr-2 h-4 w-4 animate-spin' />}
			Delete
		</Button>
	);
}
