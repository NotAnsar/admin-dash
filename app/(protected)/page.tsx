import CardComponent from '@/components/dashboard/CardComponent';

import { cardData } from '@/config/dashboard';


export default async function Home() {
	return (
		<>
			<div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
				{cardData.map((card) => (
					<CardComponent card={card} key={card.id} />
				))}
			</div>
		</>
	);
}


