import FormSection from '@/components/FormSection';
import Logo from '@/components/Logo';
import { ModeToggle } from '@/components/ModeToggle';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Admin Dash | Sign in page',
	description: 'Sign in to have Access.',
};

export default async function page() {
	return (
		<div
			className='container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'
			style={{
				background: 'url("download.svg") center center / cover no-repeat',
			}}
		>
			<div className='lg:p-8 '>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] lg:w-[450px]'>
					<div className='flex flex-col space-y-2 '>
						<div className='flex gap-[6px] items-center'>
							<Logo className='text-foreground w-[26px] h-auto -rotate-45' />
							<h4 className='text-[28px] font-serif font-medium tracking-wide'>
								Orava
							</h4>
						</div>

						<h1 className='text-4xl font-medium tracking-tight '>
							Welcome Back
						</h1>

						<p className='text-sm text-muted-foreground'>
							Sign In To Your Account Below
						</p>
					</div>

					<FormSection />
				</div>
			</div>
			<div
				className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'
				style={{
					background: 'url("login.webp") center center / cover no-repeat',
				}}
			/>
			<div className='absolute right-4 bottom-4 md:right-8 md:bottom-8 flex items-center gap-2'>
				<ModeToggle className='bg-transparent backdrop-blur-md' />
			</div>
			<Link
				href={'https://cadency-sage.vercel.app/'}
				target='_blank'
				className='absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-1 text-[13px] bg-foreground rounded-full text-background px-6 py-1 cursor-pointer hover:gap-2 transition-all duration-300 group'
			>
				<span>cadency.vercel.app</span>

				<ArrowRight
					className='w-[18px] h-[18px] group-hover:-rotate-45 transition-all duration-300'
					strokeWidth='1.5'
				/>
			</Link>
		</div>
	);
}
