export type MenuItem = {
	name: string;
	path: string;
};

const menu: MenuItem[] = [
	{ name: 'Home', path: '/' },
	{ name: 'Profile', path: '/profile' },
	{ name: 'Settings', path: '/settings' }
];

export default menu;
