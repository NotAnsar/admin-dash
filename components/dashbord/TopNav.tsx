// import UserNav from '@/components/user-nav';

import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ModeToggle } from '../ModeToggle';

export default async function TopNav() {
	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background px-4 border-border h-14 grid items-center'>
			<nav className='flex justify-between items-center gap-4'>
				<div className='relative w-[350px]'>
					<Search className='absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					<Input
						type='search'
						className='pl-8'
						placeholder='Search in Dashboard...'
					/>
				</div>
				{/* <UserNav user={user} /> */}
				<div>
					<ModeToggle />
				</div>
			</nav>
		</header>
	);
}
