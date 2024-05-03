import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div>
				<p className='text-xl'>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum sit
					iure blanditiis cumque laboriosam rerum nesciunt aut possimus pariatur
					eius. Possimus, reiciendis quas. Veritatis placeat et ipsum
					exercitationem in fuga.
				</p>
				<ModeToggle />
				<Link href={'/signin'} className='block hover:underline'>
					Sign in
				</Link>
			</div>
		</main>
	);
}
