export type MenuItem = {
	name: string;
	path: string;
};

const menu: MenuItem[] = [
	{ name: 'Home', path: '/' },
	{ name: 'List Example', path: '/list' }
];

export default menu;
