import { DateRange } from 'react-day-picker';

export const generateNumberFilterString = (amount: string) => {
	if (amount === '') return '';
	if (amount[0] <= '9' && amount[0] >= '0') {
		amount = `=${amount}`;
	}
	const operations = amount.split(';');
	const filterArray = operations.map((operation) => {
		if (operation[0] === '=') {
			return `eq(amount,${operation.substring(1)})`;
		}
		if (operation[0] === '>') {
			if (operation[1] === '=') {
				return `gte(amount,${operation.substring(2)})`;
			}
			if (operation[1] === '<') {
				return `neq(amount,${operation.substring(2)})`;
			}
			return `gt(amount,${operation.substring(1)})`;
		}
		if (operation[0] === '<') {
			if (operation[1] === '=') {
				return `lte(amount,${operation.substring(2)})`;
			}
			return `lt(amount,${operation.substring(1)})`;
		}
		return '';
	});

	if (operations.length === 1) {
		return filterArray[0];
	}
	return `and(${filterArray.join(',')})`;
};

export const generateDateFilterString = (date: DateRange | undefined) => {
	if (date === undefined) return '';
	if (date.from !== undefined && date.to !== undefined) {
		return `between(date,${date.from.toISOString()},${date.to.toISOString()})`;
	} else if (date.from !== undefined) {
		return `eq(date,${date.from.toISOString()})`;
	}
	return '';
};

export const generateBooleanFilterString = (isExpense?: 'true' | 'false') => {
	if (isExpense === undefined) return '';
	if (isExpense === 'true') {
		return 'eq(isExpense,true)';
	}
	if (isExpense === 'false') {
		return 'eq(isExpense,false)';
	}
	return '';
};
