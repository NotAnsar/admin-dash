'use client';

import { cn } from '@/lib/utils';

import { DonutChart } from '@tremor/react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';

export default function PieChartCategories({
	className,
}: {
	className?: string;
}) {
	return (
		<Card className={cn('rounded-lg flex flex-col gap-2', className)}>
			<CardHeader>
				<CardTitle className='dark:text-foreground text-foreground text-2xl font-semibold leading-none tracking-tight flex justify-between items-end'>
					Category Sales Performance
				</CardTitle>
				<CardDescription className='dark:text-muted-foreground text-muted-foreground text-sm mt-2'>
					Analyze recent revenue sales trends for each category to make informed
					strategic decisions.
				</CardDescription>
			</CardHeader>

			<DonutChart
				data={datahero}
				className='h-80 lg:h-full p-6'
				variant='pie'
				valueFormatter={dataFormatter}
				// onValueChange={(v) => console.log(v)}
				showAnimation
			/>
		</Card>
	);
}

const dataFormatter = (number: number) =>
	`$ ${Intl.NumberFormat('us').format(number).toString()}`;

const datahero = [
	{
		name: 'Noche Holding AG',
		value: 7200,
	},
	{
		name: 'Rain Drop AG',
		value: 4567,
	},
	{
		name: 'Push Rail AG',
		value: 3908,
	},
	{
		name: 'Anton Resorts Holding',
		value: 1398,
	},
];

function valueFormatter(number: number) {
	const formatter = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 0,
		notation: 'compact',
		compactDisplay: 'short',
		style: 'currency',
		currency: 'USD',
	});

	return formatter.format(number);
}
