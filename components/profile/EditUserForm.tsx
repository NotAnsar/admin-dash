'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { State, updateUser } from '@/actions/user-action';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { useFormState } from 'react-dom';
import { DialogFooter } from '../ui/dialog';
import { User } from '@/types/user';
import { useEffect } from 'react';

export default function EditUserForm({
	user,
	closeOnSuccess,
}: {
	user: User;
	closeOnSuccess: () => void;
}) {
	const initialState: State = { message: null, errors: {} };
	const [state, action] = useFormState(updateUser, initialState);

	useEffect(() => {
		if (state === undefined) closeOnSuccess();
	}, [state, closeOnSuccess]);

	return (
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
					defaultValue={user.f_name}
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
					defaultValue={user.l_name}
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
