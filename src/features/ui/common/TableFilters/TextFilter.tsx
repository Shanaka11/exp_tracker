import { Input } from '@/components/ui/input';
import React from 'react';

type TextFilterProps = {
	value?: string;
	onValueChange: (value: string) => void;
	label: string;
};

const TextFilter = ({ value, onValueChange, label }: TextFilterProps) => {
	return (
		<Input
			id={label}
			placeholder={label}
			onBlur={(e) => onValueChange(e.target.value)}
			defaultValue={value}
			className='w-[180px] bg-white'
		/>
	);
};

export default TextFilter;
