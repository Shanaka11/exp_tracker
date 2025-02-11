import { Button } from '@/components/ui/button';
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import React, { HTMLAttributes, useState } from 'react';
import DynamicIcon, { Icons, IconType } from './DynamicIcon';

type IconSelectorProps = {
	onIconSelect: (icon: IconType) => void;
	selectedIcon: IconType;
	disabled?: boolean;
};
// This is a component that shows a list of selectable icons
const IconSelector = ({
	className,
	disabled,
	selectedIcon,
	onIconSelect,
}: IconSelectorProps & HTMLAttributes<HTMLButtonElement>) => {
	const [open, setOpen] = useState(false);
	// const [selectedIcon, setSelectedIcon] = useState<IconType>('house');

	const handleSelect = (icon: IconType) => {
		setOpen(false);
		onIconSelect(icon);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={cn(``, className)}
					disabled={disabled}
					// size='icon'
				>
					<DynamicIcon iconName={selectedIcon} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[100px] p-0 pointer-events-auto'>
				<Command>
					<CommandList>
						<CommandGroup>
							{Icons?.map((icon) => (
								<CommandItem
									key={icon}
									value={icon}
									className='justify-center'
									onSelect={() => {
										handleSelect(icon);
									}}
								>
									<DynamicIcon iconName={icon} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default IconSelector;
