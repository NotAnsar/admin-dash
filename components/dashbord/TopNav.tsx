// import UserNav from '@/components/user-nav';

import { Menu, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ModeToggle } from '../ModeToggle';
import Logo from '../Logo';
import UserNav from '../UserNav';

export default async function TopNav() {
	return (
		<header className='sticky top-0 w-full border-b bg-background px-4 border-border h-14 grid items-center'>
			<nav className='flex justify-between items-center gap-4'>
				<div className='hidden md:block relative w-[350px]'>
					<Search className='absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					<Input
						type='search'
						className='pl-8'
						placeholder='Search in Dashboard...'
					/>
				</div>
				<div className='md:hidden relative flex gap-[6px] items-center justify-center'>
					<Logo className='text-foreground w-[26px] h-auto -rotate-45' />
					<h4 className='text-[28px] font-serif font-medium tracking-wide'>
						Orava
					</h4>
				</div>
				<div className='flex items-center gap-2 '>
					<Menu className='md:hidden' />

					<span className='hidden md:block'>
						<ModeToggle />
					</span>
					<UserNav />
				</div>
			</nav>
		</header>
	);
}
