import { Archive, CreditCard, DollarSign, Users } from 'lucide-react';

export const cardData = [
	{
		id: 'dashboard-01-chunk-0',
		title: 'Total Revenue',
		icon: DollarSign,
		value: '$45,231.89',
		description: '+20.1% from last month',
	},
	{
		id: 'dashboard-01-chunk-1',
		title: 'Total Clients',
		icon: Users,
		value: '+23',
		description: 'Number Of all your clients',
	},
	{
		id: 'dashboard-01-chunk-2',
		title: 'Total Sales',
		icon: CreditCard,
		value: '+12,234',
		description: '+19% from last month',
	},
	{
		id: 'dashboard-01-chunk-3',
		title: 'Total Products',
		icon: Archive,
		value: '+573',
		description: 'Number of all your products',
	},
];

export const recentSales = [
	{
		f_name: 'Olivia',
		l_name: 'Martin',
		email: 'olivia.martin@email.com',
		amount: '+$1,999.00',
	},
	{
		f_name: 'Jackson',
		l_name: 'Lee',
		email: 'jackson.lee@email.com',
		amount: '+$39.00',
	},
	{
		f_name: 'Isabella',
		l_name: 'Nguyen',
		email: 'isabella.nguyen@email.com',
		amount: '+$299.00',
	},
	{
		f_name: 'William',
		l_name: 'Kim',
		email: 'will@email.com',
		amount: '+$99.00',
	},
	{
		f_name: 'Sofia',
		l_name: 'Davis',
		email: 'sofia.davis@email.com',
		amount: '+$39.00',
	},
];

export const generateAvatarFallback = (f: string, l: string) => {
	return (f.charAt(0) + l.charAt(0)).toUpperCase();
};
