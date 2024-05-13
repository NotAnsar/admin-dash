'use client';

import { useFormState } from 'react-dom';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { updatePassword, UpdatePassState } from '@/actions/reset-password';
import { cn } from '@/lib/utils';
import PendingButton from './PendingButton';
import { redirect, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '../ui/skeleton';

export default function UpdatePasswordFormSuspense() {
	return (
		<Suspense fallback={<FormSkeleton />}>
			<UpdatePasswordForm />
		</Suspense>
	);
}

function UpdatePasswordForm() {
	const params = useSearchParams();
	const code = params.get('code') || '';

	const initialState: UpdatePassState = { message: null, errors: {} };
	const updateUserWithCode = updatePassword.bind(null, code);

	const [state, action] = useFormState(updateUserWithCode, initialState);

	return (
		<form className='grid gap-2' action={action}>
			<div className='space-y-2'>
				<Label
					className={cn(state?.errors?.password ? 'text-destructive' : '')}
				>
					Your New Password
				</Label>
				<Input
					required
					type='password'
					name='password'
					placeholder='********'
					autoComplete='on'
					className={cn(
						'bg-transparent',
						state?.errors?.password
							? 'border-destructive focus-visible:ring-destructive '
							: ''
					)}
				/>
				{state?.errors?.password &&
					state.errors.password.map((error: string) => (
						<p className='text-sm font-medium text-destructive' key={error}>
							{error}
						</p>
					))}
			</div>
			<div className='space-y-2'>
				<Label
					className={cn(
						state?.errors?.confirmPassword ? 'text-destructive' : ''
					)}
				>
					Confirm Your New Password
				</Label>
				<Input
					required
					type='password'
					name='confirmPassword'
					placeholder='********'
					autoComplete='on'
					className={cn(
						'bg-transparent',
						state?.errors?.password
							? 'border-destructive focus-visible:ring-destructive '
							: ''
					)}
				/>
				{state?.errors?.confirmPassword &&
					state.errors.confirmPassword.map((error: string) => (
						<p className='text-sm font-medium text-destructive' key={error}>
							{error}
						</p>
					))}
			</div>

			{(state?.message || state?.errors) && (
				<p className='text-sm font-medium text-destructive'>{state.message}</p>
			)}
			<PendingButton>Update Password</PendingButton>
		</form>
	);
}

function FormSkeleton() {
	return (
		<form className='grid gap-2 mt-6'>
			<div>
				<Skeleton className='w-9 h-4 mt-2' />
				<Skeleton className='h-10 w-full mt-2' />
			</div>
			<div>
				<Skeleton className='w-9 h-4 mt-2' />
				<Skeleton className='h-10 w-full mt-2' />
			</div>
			<Skeleton className='h-10 w-full mt-2' />
		</form>
	);
}
