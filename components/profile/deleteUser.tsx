import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import DeleteUserForm from './DeleteUserForm';

export function DeleteUserTrigger({
	children,
	...props
}: {
	children: React.ReactNode;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild {...props}>
				{children}
			</AlertDialogTrigger>
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
					<DeleteUserForm />
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
