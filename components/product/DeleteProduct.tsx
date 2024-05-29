import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '../ui/use-toast';
import { DeleteProductState, deleteProduct } from '@/actions/product-action';
import { forwardRef, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';

export const DeleteProduct = ({ id, ...props }: { id: string }) => {
	const [open, setopen] = useState(false);
	const initialState: DeleteProductState = { message: null };

	const [state, action] = useFormState(
		deleteProduct.bind(null, id),
		initialState
	);

	useEffect(() => {
		if (state.message) {
			setopen(false);
			toast({ description: state.message });
		}
	}, [state]);

	return (
		<AlertDialog open={open} onOpenChange={setopen}>
			<AlertDialogTrigger asChild {...props}>
				Delete Product
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						Product and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<form action={action}>
						<PendingButton />
						Delete
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

function PendingButton({ ...props }) {
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
