import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { generateAvatarFallback, recentSales } from '@/config/dashboard';
import Link from 'next/link';

export default function RecentSales({ className }: { className?: string }) {
	return (
		<Card x-chunk='dashboard-01-chunk-5' className={className}>
			<CardHeader>
				<CardTitle className='flex justify-between items-end '>
					<span>Recent Orders</span>

					<Link
						href='/orders'
						className='text-sm text-muted-foreground font-normal tracking-wide hover:text-foreground duration-200 transition ease-out  rounded-sm'
					>
						see all
					</Link>
				</CardTitle>
			</CardHeader>
			<CardContent className=' px-0'>
				{recentSales.map((sale) => (
					<div
						className='flex items-center py-4 px-6 gap-4 hover:bg-foreground/5 cursor-pointer border-y border-transparent hover:border-border'
						key={sale.email}
					>
						<Avatar className='hidden h-9 w-9 sm:flex'>
							<AvatarFallback>
								{generateAvatarFallback(sale.f_name, sale.l_name)}
							</AvatarFallback>
						</Avatar>
						<div className='grid gap-1'>
							<p className='text-sm font-medium leading-none'>
								{sale.f_name} {sale.l_name}
							</p>
							<p className='text-sm text-muted-foreground'>{sale.email}</p>
						</div>
						<div className='ml-auto font-medium'>{sale.amount}</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
