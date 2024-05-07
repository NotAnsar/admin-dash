import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { signOut } from '@/actions/signin-action';
import { Avatar, AvatarFallback } from './ui/avatar';
import { UserIcon } from 'lucide-react';
import { createClientSSR } from '@/lib/supabase/server';

export default async function UserNav() {
	const supabase = createClientSSR();
	const { data: user } = await supabase.from('user').select('*').single();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='flex items-center justify-center'>
					<AvatarFallback className='h-9 w-auto aspect-square'>
						<span className='sr-only'>{user?.name}</span>
						<UserIcon className='h-[17px] w-auto' />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='bg-background/80 backdrop-blur-md'
			>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{/* {user.name && <p className='font-medium'>{user.name}</p>} */}
						<p className='font-medium text-[15px]'>Hi Ansar</p>

						{/* <p className='w-[200px] truncate text-sm text-muted-foreground'>
							{user.email}
						</p> */}
						<p className='w-[200px] truncate text-[13px] text-muted-foreground pb-1'>
							karrouach.ansar@gmail.com
						</p>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<p>Edit name</p>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<p>Delete Account</p>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer p-0'>
					<form action={signOut} className='w-full '>
						<button type='submit' className='px-2 py-1.5 w-full text-left'>
							Sign out
						</button>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
