'use client';

import { useFormState } from 'react-dom';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { updatePassword, UpdatePassState } from '@/actions/reset-password';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import PendingButton from './PendingButton';
import { redirect, useSearchParams } from 'next/navigation';

export default function UpdatePasswordForm() {
	const params = useSearchParams();
	const code = params.get('code') || '';
	if (!code) redirect('/auth/password-recovery');

	const initialState: UpdatePassState = { message: null, errors: {} };
	const updateUserWithCode = updatePassword.bind(null, code);

	const [state, action] = useFormState(updateUserWithCode, initialState);

	return (
		<>
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
					<p className='text-sm font-medium text-destructive'>
						{state.message}
					</p>
				)}
				<PendingButton>Update Password</PendingButton>
			</form>
			<div className='grid gap-1 text-[13px] text-muted-foreground/80 '>
				<p>
					Need to sign in?{' '}
					<Link
						href={'/auth/signin'}
						className='text-foreground font-medium hover:underline'
					>
						Sign In
					</Link>
				</p>
				<p>
					Forgot your password?{' '}
					<Link
						href={'/auth/password-recovery'}
						className='text-foreground font-medium hover:underline'
					>
						Click here
					</Link>
				</p>
			</div>
		</>
	);
}
