'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns/format';
import { CalendarIcon } from 'lucide-react';
import React, { HTMLAttributes } from 'react';
import { DateRange } from 'react-day-picker';

type DateFilterProps = {
	handleDateSelect: (date: DateRange | undefined) => void;
	label?: string;
	disabled?: boolean;
};

const DateFilter = ({
	handleDateSelect,
	className,
	label,
	disabled,
}: DateFilterProps & HTMLAttributes<HTMLDivElement>) => {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	});

	const handleDateSelected = (date: DateRange | undefined) => {
		if (date?.from && date?.to) {
			date.from.setUTCHours(0, 0, 0, 0);
			date.to.setUTCHours(0, 0, 0, 0);
		}
		setDate(date);
		handleDateSelect(date);
	};
	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id='date'
						variant={'outline'}
						className={cn(
							'w-[300px] justify-start text-left font-normal',
							!date && 'text-muted-foreground'
						)}
						disabled={disabled}
					>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} -{' '}
									{format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<span className='text-muted-foreground'>
								{label ?? 'Pick a date'}
							</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						initialFocus
						mode='range'
						defaultMonth={date?.from}
						selected={date}
						onSelect={handleDateSelected}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DateFilter;
