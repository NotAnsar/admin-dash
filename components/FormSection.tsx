import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function FormSection() {
	return (
		<>
			<form className='grid gap-2'>
				<div className='space-y-2'>
					<Label>Email</Label>
					<Input
						type='email'
						placeholder='name@example.com'
						className='bg-transparent'
					/>
				</div>
				<div className='space-y-2'>
					<Label>Password</Label>
					<Input
						type='password'
						placeholder='********'
						className='bg-transparent'
					/>
				</div>
				<Button className='w-full mt-4'>Sign In</Button>
			</form>
			<div className='grid gap-2 text-[13px] text-muted-foreground/80 '>
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
