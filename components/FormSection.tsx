'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { State, signinAction } from '@/actions/signin-action';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FormSection() {
	const initialState: State = { message: null, errors: {} };
	const [state, action] = useFormState(signinAction, initialState);

	return (
		<>
			<form className='grid gap-2' action={action}>
				<div className='space-y-2'>
					<Label className={cn(state?.errors?.email ? 'text-destructive' : '')}>
						Email
					</Label>
					<Input
						required
						type='email'
						name='email'
						placeholder='name@example.com'
						className={cn(
							'bg-transparent',
							state?.errors?.email
								? 'border-destructive focus-visible:ring-destructive '
								: ''
						)}
					/>
					{state?.errors?.email &&
						state.errors.email.map((error: string) => (
							<p className='text-sm font-medium text-destructive' key={error}>
								{error}
							</p>
						))}
				</div>
				<div className='space-y-2'>
					<Label
						className={cn(state?.errors?.password ? 'text-destructive' : '')}
					>
						Password
					</Label>
					<Input
						required
						type='password'
						name='password'
						placeholder='********'
						autoComplete='on'
						className='bg-transparent'
					/>
					{state?.errors?.password &&
						state.errors.password.map((error: string) => (
							<p className='text-sm font-medium text-destructive' key={error}>
								{error}
							</p>
						))}
				</div>
				{state?.errors && (
					<p className='text-sm font-medium text-destructive'>
						{state.message}
					</p>
				)}
				<PendingButton />
			</form>
			<div className='grid gap-1 text-[13px] text-muted-foreground/80 '>
				<p>
					Forgot your password?{' '}
					<button className='text-foreground font-medium hover:underline'>
						Click here
					</button>
				</p>
				<p>
					Or Just Join as{' '}
					<button className='text-foreground font-medium hover:underline'>
						Guest User
					</button>
				</p>
			</div>
		</>
	);
}

function PendingButton() {
	const { pending } = useFormStatus();

	return (
		<div className='flex justify-end'>
			<Button
				className='w-full mt-4'
				type='submit'
				aria-disabled={pending}
				disabled={pending}
			>
				{pending && <Loader className='mr-2 h-4 w-4 animate-spin' />}
				Sign In
			</Button>
		</div>
	);
}
