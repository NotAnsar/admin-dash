import { UserState } from '@/actions/user-action';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { User } from '@/types/user';

export default function UserDetails({
	state,
	user,
}: {
	state: UserState;
	user?: User;
}) {
	return (
		<div className='grid gap-6 sm:grid-cols-2 mt-5'>
			<div className='grid gap-3'>
				<Label
					htmlFor='f_name'
					className={cn(state?.errors?.f_name ? 'text-destructive' : '')}
				>
					First Name
				</Label>
				<div>
					<Input
						id='f_name'
						type='text'
						name='f_name'
						className={cn(
							'w-full',
							state?.errors?.f_name
								? 'border-destructive focus-visible:ring-destructive '
								: ''
						)}
						placeholder='Your First Name'
						defaultValue={user?.f_name || ''}
						required
					/>
					{state?.errors?.f_name &&
						state.errors.f_name.map((error: string) => (
							<p
								className='text-sm font-medium text-destructive mt-1'
								key={error}
							>
								{error}
							</p>
						))}
				</div>
			</div>
			<div className='grid gap-3'>
				<Label
					htmlFor='l_name'
					className={cn(state?.errors?.l_name ? 'text-destructive' : '')}
				>
					Last Name
				</Label>
				<div>
					<Input
						id='l_name'
						type='text'
						name='l_name'
						className={cn(
							'w-full',
							state?.errors?.l_name
								? 'border-destructive focus-visible:ring-destructive '
								: ''
						)}
						placeholder='Your Last Name'
						defaultValue={user?.l_name || ''}
						required
					/>
					{state?.errors?.l_name &&
						state.errors.l_name.map((error: string) => (
							<p
								className='text-sm font-medium text-destructive mt-1'
								key={error}
							>
								{error}
							</p>
						))}
				</div>
			</div>
			<div className='grid gap-3 sm:col-span-2'>
				<Label
					htmlFor='email'
					className={cn(state?.errors?.email ? 'text-destructive' : '')}
				>
					Email
				</Label>
				<div>
					<Input
						id='email'
						type='text'
						name='email'
						className={cn(
							'w-full',
							state?.errors?.email
								? 'border-destructive focus-visible:ring-destructive '
								: ''
						)}
						placeholder='Your Email'
						defaultValue={user?.email || ''}
						required
					/>
					{state?.errors?.email &&
						state.errors.email.map((error: string) => (
							<p
								className='text-sm font-medium text-destructive mt-1'
								key={error}
							>
								{error}
							</p>
						))}
				</div>
			</div>
			<div className='grid gap-3 '>
				<Label
					htmlFor='password'
					className={cn(state?.errors?.password ? 'text-destructive' : '')}
				>
					Password
				</Label>
				<div>
					<Input
						id='password'
						type='password'
						name='password'
						className={cn(
							'w-full',
							state?.errors?.password
								? 'border-destructive focus-visible:ring-destructive '
								: ''
						)}
						placeholder='********'
						required
					/>
					{state?.errors?.password &&
						state.errors.password.map((error: string) => (
							<p
								className='text-sm font-medium text-destructive mt-1'
								key={error}
							>
								{error}
							</p>
						))}
				</div>
			</div>
			<div className='grid gap-3 '>
				<Label
					htmlFor='role'
					className={cn(state?.errors?.role ? 'text-destructive' : '')}
				>
					Role
				</Label>
				<Select required name='role'>
					<SelectTrigger id='role' aria-label='Select role' name='role'>
						<SelectValue placeholder='Select role' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='user'>User</SelectItem>
						<SelectItem value='admin'>Admin</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
