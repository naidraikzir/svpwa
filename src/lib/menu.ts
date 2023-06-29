export type MenuItem = {
	name: string;
	path: string;
};

const menu: MenuItem[] = [
	{ name: 'Home', path: '/' },
	{ name: 'Settings', path: '/settings' }
];

export default menu;
