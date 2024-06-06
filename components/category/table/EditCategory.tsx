// 'use client';
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// } from '@/components/ui/dialog';
// import { User } from '@/types/user';

// import { Dispatch, SetStateAction, useEffect } from 'react';

// import { Loader } from 'lucide-react';
// import { useFormStatus } from 'react-dom';

// import { cn } from '@/lib/utils';

// import { ProfileState, updateUser } from '@/actions/profile-action';
// import { useFormState } from 'react-dom';
// import { toast } from '@/components/ui/use-toast';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Category } from '@/types/db';

// export function EditCategory({
// 	category,
// 	open,
// 	setopen,
// }: {
// 	category: Category;
// 	open: boolean;
// 	setopen: Dispatch<SetStateAction<boolean>>;
// }) {
// 	const initialState: ProfileState = { message: null, errors: {} };
// 	const [state, action] = useFormState(updateUser, initialState);

// 	useEffect(() => {
// 		if (state === undefined) {
// 			setopen(false);
// 			toast({ description: 'User data updated successfully.' });
// 		}
// 	}, [state, setopen]);

// 	return (
// 		<Dialog open={open} onOpenChange={setopen}>
// 			<DialogContent className='sm:max-w-[425px]'>
// 				<DialogHeader>
// 					<DialogTitle>Edit profile</DialogTitle>
// 					<DialogDescription>
// 						{"Make changes to your profile here. Click save when you're done."}
// 					</DialogDescription>
// 				</DialogHeader>

// 				<form className='grid gap-4 ' id='update' action={action}>
// 					<div>
// 						<div className='flex grid-cols-4 items-center gap-4'>
// 							<Label
// 								htmlFor='fname'
// 								className={cn(
// 									'text-nowrap',
// 									state?.errors?.fname ? 'text-destructive' : ''
// 								)}
// 							>
// 								First Name
// 							</Label>
// 							<Input
// 								id='fname'
// 								defaultValue={user.f_name}
// 								name='fname'
// 								className={cn(
// 									'bg-transparent col-span-3',
// 									state?.errors?.fname
// 										? 'border-destructive focus-visible:ring-destructive '
// 										: ''
// 								)}
// 							/>
// 						</div>
// 						{state?.errors?.fname &&
// 							state.errors.fname.map((error: string) => (
// 								<p
// 									className='text-sm font-medium text-destructive col-span-full mt-2'
// 									key={error}
// 								>
// 									{error}
// 								</p>
// 							))}
// 					</div>

// 					<div>
// 						<div className='flex grid-cols-4 items-center gap-4'>
// 							<Label
// 								htmlFor='lname'
// 								className={cn(
// 									'text-nowrap',
// 									state?.errors?.lname ? 'text-destructive' : ''
// 								)}
// 							>
// 								Last Name
// 							</Label>
// 							<Input
// 								name='lname'
// 								id='lname'
// 								defaultValue={user.l_name}
// 								className={cn(
// 									'bg-transparent col-span-3',
// 									state?.errors?.lname
// 										? 'border-destructive focus-visible:ring-destructive '
// 										: ''
// 								)}
// 							/>
// 						</div>

// 						{state?.errors?.lname &&
// 							state.errors.lname.map((error: string) => (
// 								<p
// 									className='text-sm font-medium text-destructive col-span-full mt-2'
// 									key={error}
// 								>
// 									{error}
// 								</p>
// 							))}
// 					</div>

// 					<DialogFooter>
// 						{(state?.message || state?.errors) && (
// 							<p className='text-sm font-medium text-destructive mr-auto'>
// 								{state.message}
// 							</p>
// 						)}
// 						<PendingButton />
// 					</DialogFooter>
// 				</form>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }

// function PendingButton() {
// 	const { pending } = useFormStatus();

// 	return (
// 		<Button type='submit' aria-disabled={pending} disabled={pending}>
// 			{pending && <Loader className='mr-2 h-4 w-4 animate-spin' />}
// 			Save changes
// 		</Button>
// 	);
// }
