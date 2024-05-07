'use client';

import { cn } from '@/lib/utils';
import Logo from '../Logo';
import { usePathname } from 'next/navigation';
import { dashConfig } from '@/config/dashboard';
import NavGroup from './NavGroup';
import SignOut from './SignOut';
import { SheetContent } from '../ui/sheet';

export default function SideBarNavMobile({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const path = usePathname();
	const { management, overview, tools } = dashConfig;
	return (
		<SheetContent
			side='left'
			className={cn('flex flex-col p-5 gap-0 w-4/6', className)}
			{...props}
		>
			<div className='flex gap-[6px] items-center pl-4'>
				<Logo className='text-foreground w-[26px] h-auto -rotate-45' />
				<h4 className='text-[28px] font-serif font-medium tracking-wide'>
					Orava
				</h4>
			</div>

			<NavGroup
				label='Overview'
				menuGrp={overview}
				path={path}
				className='mt-8'
				sheet={true}
			/>
			<NavGroup sheet={true} label='Tools' menuGrp={tools} path={path} />
			<NavGroup
				sheet={true}
				label='Management'
				menuGrp={management}
				path={path}
			/>

			<SignOut className='w-full mb-3 mt-auto' />
		</SheetContent>
	);
}
