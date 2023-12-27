import { redirect } from '@sveltejs/kit';

export const prerender = true;
export const ssr = false;

export const load = ({ route }) => {
	if (route.id?.startsWith('/(protected)') && !localStorage.token) {
		redirect(302, '/login');
	} else if (route.id?.startsWith('/login') && !!localStorage.token) {
		redirect(302, '/');
	}

	return {};
};
