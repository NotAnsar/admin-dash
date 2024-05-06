import { signOut } from '@/actions/signin-action';
import { cn } from '@/lib/utils';
import Logo from '../Logo';

import { Home, LibraryBig, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';

export default function SideBarNav({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<aside
			className={cn(
				'hidden md:w-56 bg-background border-r border-border md:flex flex-col h-screen fixed p-5',
				className
			)}
			{...props}
		>
			<div className='flex gap-[6px] items-center justify-center'>
				<Logo className='text-foreground w-[26px] h-auto -rotate-45' />
				<h4 className='text-[28px] font-serif font-medium tracking-wide'>
					Orava
				</h4>
			</div>

			<nav className='flex flex-col gap-2 font-normal my-4'>
				{mainNav.map((item, i) => (
					<Nav
						Icon={item.icon}
						title={item.title}
						path={item.path}
						// currentPath={path}
						key={i}
					/>
				))}
			</nav>

			<form className='w-full mt-auto mb-3 '>
				<Button formAction={signOut} variant={'default'} className='w-full'>
					Sign Out
				</Button>
			</form>
		</aside>
	);
}

const mainNav = [
	{ title: 'Home', icon: Home, path: '/' },
	{ title: 'Library', icon: LibraryBig, path: '/player/library' },
];

function Nav({
	title,
	Icon,
	path,
}: // currentPath,
{
	title: string;
	Icon: LucideIcon;
	path: string;
	// currentPath: string;
}) {
	return (
		<Link
			className={cn(
				buttonVariants({
					// variant: path === currentPath ? 'secondary' : 'ghost',
					variant: 'ghost',
				}),
				'justify-start font-normal'
			)}
			href={path}
		>
			<Icon className='md:mr-2 h-5 w-auto' strokeWidth='1.75' />
			<p className='hidden md:block text-[15px]'>{title}</p>
		</Link>
	);
}
