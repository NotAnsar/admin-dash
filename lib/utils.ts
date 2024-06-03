import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: string): string {
	const dateObj = new Date(timestamp);

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const formattedDate = `
	${dateObj.getDate().toString().padStart(2, '0')} ${
		months[dateObj.getMonth()]
	} ${dateObj.getFullYear()}
	`;

	return formattedDate;
}
