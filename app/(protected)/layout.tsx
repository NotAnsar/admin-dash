import { signOut } from '@/actions/signin-action';
import Logo from '@/components/Logo';
import SideBarNav from '@/components/dashbord/SideBarNav';
import TopNav from '@/components/dashbord/TopNav';
import { createClientSSR } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Admin Dash',
	description: 'Generated by create next app',
};

export default async function AuthenticatedLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = createClientSSR();

	const {
		data: { user: userAuth },
		error,
	} = await supabase.auth.getUser();
	if (!userAuth || error) redirect('/signin');

	const { data: user } = await supabase.from('user').select('*').single();
	if (user.role === 'user') await signOut();

	return (
		<>
			<SideBarNav />
			<aside className='md:ml-56'>
				<TopNav />

				<main className='p-6'>{children}</main>
			</aside>
		</>
	);
}
