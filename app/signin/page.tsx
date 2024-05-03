import FormSection from '@/components/FormSection';
import { ModeToggle } from '@/components/ModeToggle';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admin Dash | Sign in page',
	description: 'Sign in to have Access.',
};

export default function page() {
	return (
		<div className='container relative  h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 '>
			<div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r ' />
			<FormSection />
			<div className='absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-2'>
				<ModeToggle />
			</div>
		</div>
	);
}
