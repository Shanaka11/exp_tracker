import { auth } from '../auth';

export const getCurrentUserServer = async (demo?: boolean) => {
	if (demo) return 'tempU';
	const session = await auth();
	if (
		session === undefined ||
		session === null ||
		session.user === undefined ||
		session.user.id === undefined
	) {
		throw new Error('No session found, please login');
	}
	return session.user.id;
};
