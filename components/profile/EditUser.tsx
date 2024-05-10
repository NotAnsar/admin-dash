'use client';

import { State, updateUser } from '@/actions/user-action';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useFormState } from 'react-dom';

export function EditUserTrigger({
	children,
	...props
}: {
	children: React.ReactNode;
}) {
	const initialState: State = { message: null, errors: {} };
	const [state, action] = useFormState(updateUser, initialState);

	return (
		<Dialog>
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
				<form className='grid gap-4 py-4' id='update' action={action}>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label
							htmlFor='fname'
							className={cn(
								'text-right',
								state?.errors?.fname ? 'text-destructive' : ''
							)}
						>
							First Name
						</Label>
						<Input
							id='fname'
							defaultValue='John'
							name='fname'
							className={cn(
								'bg-transparent col-span-3',
								state?.errors?.fname
									? 'border-destructive focus-visible:ring-destructive '
									: ''
							)}
						/>
						{state?.errors?.fname &&
							state.errors.fname.map((error: string) => (
								<p
									className='text-sm font-medium text-destructive col-span-full'
									key={error}
								>
									{error}
								</p>
							))}
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label
							htmlFor='lname'
							className={cn(
								'text-right',
								state?.errors?.lname ? 'text-destructive' : ''
							)}
						>
							Last Name
						</Label>
						<Input
							name='lname'
							id='lname'
							defaultValue='Doe'
							className={cn(
								'bg-transparent col-span-3',
								state?.errors?.lname
									? 'border-destructive focus-visible:ring-destructive '
									: ''
							)}
						/>

						{state?.errors?.lname &&
							state.errors.lname.map((error: string) => (
								<p
									className='text-sm font-medium text-destructive col-span-full'
									key={error}
								>
									{error}
								</p>
							))}
					</div>

					<DialogFooter>
						{(state?.message || state?.errors) && (
							<p className='text-sm font-medium text-destructive'>
								{state.message}
							</p>
						)}
						<PendingButton />
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

function PendingButton() {
	const { pending } = useFormStatus();

	return (
		<Button type='submit' aria-disabled={pending} disabled={pending}>
			{pending && <Loader className='mr-2 h-4 w-4 animate-spin' />}
			Save changes
		</Button>
	);
}
