import { format } from 'date-fns/format';
import { AnyTable } from 'drizzle-orm';
import { DateRange } from 'react-day-picker';

type filterNode = {
	functionName: string;
	args: string[];
};

export const generateNumberFilterString = (field: string, amount: string) => {
	if (amount === '') return '';
	if (amount[0] <= '9' && amount[0] >= '0') {
		amount = `=${amount}`;
	}
	const operations = amount.split(';');
	const filterArray = operations.map((operation) => {
		if (operation[0] === '=') {
			return `eq(${field},${operation.substring(1)})`;
		}
		if (operation[0] === '>') {
			if (operation[1] === '=') {
				return `gte(${field},${operation.substring(2)})`;
			}
			if (operation[1] === '<') {
				return `neq(${field},${operation.substring(2)})`;
			}
			return `gt(${field},${operation.substring(1)})`;
		}
		if (operation[0] === '<') {
			if (operation[1] === '=') {
				return `lte(${field},${operation.substring(2)})`;
			}
			return `lt(${field},${operation.substring(1)})`;
		}
		return '';
	});

	if (operations.length === 1) {
		return filterArray[0];
	}
	return `and(${filterArray.join(',')})`;
};

export const generateDateFilterString = (
	field: string,
	date: DateRange | undefined
) => {
	if (date === undefined) return '';
	if (date.from !== undefined && date.to !== undefined) {
		return `between(${field},${date.from.toISOString()},${date.to.toISOString()})`;
	} else if (date.from !== undefined) {
		return `eq(${field},${date.from.toISOString()})`;
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

export const decodeFilterString = (
	table: AnyTable<never>,
	filterText: string
) => {
	const filter = filterText.trim();

	const stack: filterNode[] = [];
	const decodedStrings: DecodedStrings[] = [];

	const executefunction = (functionName: string, args: string[]) => {
		if (functionName === 'eq') {
			// For date
			//@ts-expect-error types not defined
			if (table[args[0]].dataType === 'date') {
				return `${args[0]} = ${format(new Date(args[1]), 'PPP')}`;
			}
			return `${args[0]} = ${args[1]}`;
		}
		if (functionName === 'neq') {
			//@ts-expect-error types not defined
			if (table[args[0]].dataType === 'date') {
				return `${args[0]} >< ${format(new Date(args[1]), 'PPP')}`;
			}
			return `${args[0]} >< ${args[1]}`;
		}
		if (functionName === 'gt') {
			// For date
			//@ts-expect-error types not defined
			if (table[args[0]].dataType === 'date') {
				return `${args[0]} > ${format(new Date(args[1]), 'PPP')}`;
			}
			return `${args[0]} > ${args[1]}`;
		}
		if (functionName === 'lt') {
			// For date
			//@ts-expect-error types not defined
			if (table[args[0]].dataType === 'date') {
				return `${args[0]} < ${format(new Date(args[1]), 'PPP')}`;
			}
			return `${args[0]} < ${args[1]}`;
		}
		if (functionName === 'gte') {
			// For date
			//@ts-expect-error types not defined
			if (table[args[0]].dataType === 'date') {
				return `${args[0]} >= ${format(new Date(args[1]), 'PPP')}`;
			}
			return `${args[0]} >= ${args[1]}`;
		}
		if (functionName === 'lte') {
			// For date
			//@ts-expect-error types not defined
			if (table[args[0]].dataType === 'date') {
				return `${args[0]} <= ${format(new Date(args[1]), 'PPP')}`;
			}

			return `${args[0]} <= ${args[1]}`;
		}
		if (functionName === 'like') {
			return `${args[0]} = ${args[1]}`;
		}
		if (functionName === 'ilike') {
			return `${args[0]} = ${args[1]}`;
		}
		if (functionName === 'nlike') {
			return `${args[0]} >< ${args[1]}`;
		}

		if (functionName === 'between') {
			// For date
			//@ts-expect-error types not defined
			if (table[args[0]].dataType === 'date') {
				return `${format(new Date(args[1]), 'PPP')} <= ${args[0]} <= ${format(
					new Date(args[2]),
					'PPP'
				)}`;
			}

			return `${args[1]} <= ${args[0]} <= ${args[2]}`;
		}
		return null;
	};

	const parse = () => {
		let text = '';
		for (let i = 0; i < filter.length; i++) {
			if (filter[i] === '(') {
				stack.push({
					args: [],
					functionName: text,
				});
				text = '';
			}
			if (filter[i] === ',') {
				if (text !== '') {
					stack[stack.length - 1].args.push(text);
					text = '';
				}
			}

			if (filter[i] === ')') {
				if (text !== '') {
					stack[stack.length - 1].args.push(text);
					text = '';
					// Since ( means an end of a method execute that method and append it to the parent args
					if (stack.length > 1) {
						const node = stack.pop();
						if (node !== undefined) {
							const ret = executefunction(node.functionName, node.args);
							if (ret !== null) {
								decodedStrings.push({
									field: node.args[0],
									value:
										node.functionName === 'between'
											? `${node.args[1]},${node.args[2]}`
											: node.args[1],
									operator: node.functionName,
									label: ret,
								});
							}
						}
					}
				}
			}
			if (
				filter[i] !== undefined &&
				filter[i] !== '(' &&
				filter[i] !== ',' &&
				filter[i] !== ')'
			) {
				text += filter[i];
			}
		}
		const node = stack.pop();
		//console.log(args);
		if (node !== undefined) {
			const ret = executefunction(node.functionName, node.args);
			if (ret !== null) {
				decodedStrings.push({
					field: node.args[0],
					value:
						node.functionName === 'between'
							? `${node.args[1]},${node.args[2]}`
							: node.args[1],
					operator: node.functionName,
					label: ret,
				});
			}
		}
	};
	parse();
	return decodedStrings;
};

export type DecodedStrings = {
	field: string;
	value: string;
	operator: string;
	label: string;
};
