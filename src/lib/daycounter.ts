import { formatDistanceStrict } from 'date-fns';

export const dayCounter = (firstDate: Date, secondDate: Date) => {
	return formatDistanceStrict(firstDate, secondDate, { addSuffix: true });
};
