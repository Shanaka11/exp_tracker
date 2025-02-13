import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import React from 'react';

type BooleanFilterProps = {
	label?: string;
	value?: 'true' | 'false';
	onValueChange: (value: 'true' | 'false') => void;
};

const BooleanFilter = ({ label, value, onValueChange }: BooleanFilterProps) => {
	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger className='w-[180px] bg-white'>
				<SelectValue placeholder={label ?? 'Select'} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{label ?? 'Select'}</SelectLabel>
					<SelectItem value='true'>Yes</SelectItem>
					<SelectItem value='false'>No</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default BooleanFilter;
