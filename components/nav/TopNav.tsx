import { Menu } from 'lucide-react';
import { ModeToggle } from '../ModeToggle';
import Logo from '../Logo';
import UserNav from '../UserNav';
import SideBarNavMobile from './SideBarNavMobile';
import { Sheet, SheetTrigger } from '../ui/sheet';
import SearchDashboard from './SearchDashboard';

export default async function TopNav() {
	return (
		<Sheet>
			<header className='sticky top-0 w-full border-b bg-background px-4 border-border h-14 grid items-center z-50'>
				<nav className='flex justify-between items-center gap-4'>
					<div className='md:hidden relative flex gap-[6px] items-center justify-center'>
						<Logo className='text-foreground w-[26px] h-auto -rotate-45' />
						<h4 className='text-[28px] font-serif font-medium tracking-wide'>
							Orava
						</h4>
					</div>
					<SearchDashboard />
					<div className='flex items-center gap-2 '>
						<SheetTrigger asChild>
							<Menu className='md:hidden cursor-pointer' />
						</SheetTrigger>

						<span className='hidden md:block'>
							<ModeToggle />
						</span>

						<UserNav />
					</div>
				</nav>
			</header>

			<SideBarNavMobile />
		</Sheet>
	);
}
