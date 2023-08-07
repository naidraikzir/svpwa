export type MenuItem = {
	name: string;
	path: string;
};

const menu: MenuItem[] = [
	{ name: 'Home', path: '/' },
	{ name: 'List', path: '/list' },
	{ name: 'Grid', path: '/grid' },
	{ name: 'Products', path: '/products' }
];

export default menu;
