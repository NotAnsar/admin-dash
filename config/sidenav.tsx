import {
	BarChart3,
	BookCheck,
	Box,
	Boxes,
	Calendar,
	FileText,
	LayoutDashboard,
	LucideIcon,
	Palette,
	Ruler,
	SquareKanbanIcon,
	Users,
} from 'lucide-react';

export type DashItem = {
	title: string;
	Icon: LucideIcon;
	path: string;
};

export const dashConfig = {
	overview: [
		{ title: 'Dashboard', Icon: LayoutDashboard, path: '/' },
		{ title: 'Analytics', Icon: BarChart3, path: '/analytics' },
		{ title: 'Reports', Icon: FileText, path: '/reports' },
	],
	management: [
		{ title: 'Products', Icon: Box, path: '/products' },
		{ title: 'Categories', Icon: Boxes, path: '/categories' },
		{ title: 'Color', Icon: Palette, path: '/colors' },
		{ title: 'Sizes', Icon: Ruler, path: '/sizes' },
		{ title: 'Users', Icon: Users, path: '/users' },
		{ title: 'Orders', Icon: BookCheck, path: '/orders' },
		// { title: 'Biling', Icon: ListOrdered, path: '/orders' },
	],
	tools: [
		{ title: 'Kanban', Icon: SquareKanbanIcon, path: '/kanban' },
		{ title: 'Calendar', Icon: Calendar, path: '/calendar' },
	],
};
