import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

type NumberFilterProps = {
	label?: string;
	value: string;
	onValueChange: (value: string) => void;
};

const NumberFilter = ({ label, value, onValueChange }: NumberFilterProps) => {
	const [error, setError] = useState<boolean>(false);
	const handleOnValueChange = (value: string) => {
		if (value === '') {
			setError(false);
			onValueChange(value);
			return;
		}

		const regex = /^(?:(?:<=|<|=|><|>|>=)?\d+(?:;(?:<=|<|=|><|>|>=)\d+)*;?)$/;
		if (regex.test(value)) {
			setError(false);
			onValueChange(value);
			return;
		}
		setError(true);
	};
	return (
		<div className='flex flex-col w-[180px]'>
			<Input
				placeholder={label ?? '0'}
				className={cn('bg-white', { 'border-red-500 outline-red-700': error })}
				defaultValue={value}
				onBlur={(e) => handleOnValueChange(e.target.value)}
			/>
			{error && <span className='text-xs text-red-500'>Invalid format</span>}
		</div>
	);
};

export default NumberFilter;
