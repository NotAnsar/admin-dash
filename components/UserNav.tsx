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
import {
	LogOut,
	LogOutIcon,
	UserIcon,
	UserRoundCog,
	UserRoundX,
} from 'lucide-react';
import { getUser } from '@/lib/db';
import { EditUserTrigger } from './profile/EditUser';
import { DeleteUserTrigger } from './profile/deleteUser';

export default async function UserNav() {
	const user = await getUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='flex items-center justify-center'>
					<AvatarFallback className='h-9 w-auto aspect-square'>
						<span className='sr-only'>{user?.email}</span>
						<UserIcon className='h-[17px] w-auto' />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{(user.f_name || user.l_name) && (
							<p className='font-medium'>
								{user.f_name && <span>{user.f_name}</span>}{' '}
								{user.l_name && <span>{user.l_name}</span>}
							</p>
						)}

						<p className='w-[200px] truncate text-[13px] text-muted-foreground'>
							{user.email}
						</p>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<EditUserTrigger>
						<button className='p-2 w-full text-left hover:bg-secondary text-sm rounded-sm relative flex items-center'>
							<UserRoundCog className='w-4 h-auto mr-2' />
							Edit Profile
							<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
								<span className='text-xs'>⌘</span>E
							</span>
						</button>
					</EditUserTrigger>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<DeleteUserTrigger>
						<button className='p-2 w-full text-left hover:bg-secondary text-sm rounded-sm relative flex items-center'>
							<UserRoundX className='w-4 h-auto mr-2' />
							Delete Account
							<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
								<span className='text-xs'>⌘</span>D
							</span>
						</button>
					</DeleteUserTrigger>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer p-0'>
					<form action={signOut} className='w-full relative'>
						<button type='submit' className='p-2 w-full text-left flex'>
							<LogOutIcon className='w-4 h-auto mr-2' />
							Sign out
						</button>
						<span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
							<span className='text-xs'>⌘</span>O
						</span>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
