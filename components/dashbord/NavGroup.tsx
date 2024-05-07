import { DashItem } from '@/config/dashboard';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { SheetClose } from '../ui/sheet';

export default function NavGroup({
	label,
	menuGrp,
	path,
	className,
	sheet = false,
	...props
}: {
	label: string;
	menuGrp: DashItem[];
	path: string;
	className?: string;
	sheet?: boolean;
}) {
	return (
		<div className={cn('mt-5', className)}>
			<h2 className='mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
				{label}
			</h2>
			<nav className='flex flex-col gap-1 font-normal'>
				{menuGrp.map((item, i) => {
					if (sheet) {
						return (
							<SheetClose asChild key={i}>
								<Nav menuItem={item} currPath={path} {...props} />
							</SheetClose>
						);
					}
					return <Nav menuItem={item} currPath={path} key={i} />;
				})}
			</nav>
		</div>
	);
}

function Nav({
	menuItem,
	currPath,
	...props
}: {
	menuItem: DashItem;
	currPath: string;
}) {
	const { Icon, path, title } = menuItem;
	return (
		<Link
			{...props}
			className={cn(
				buttonVariants({
					variant: path === currPath ? 'secondary' : 'ghost',
				}),
				'justify-start font-normal flex gap-4 items-center transition duration-200 rounded-sm '
			)}
			href={path}
		>
			<Icon className='h-[18px] w-auto' strokeWidth='1.6' />
			<p className='text-sm'>{title}</p>
		</Link>
	);
}
