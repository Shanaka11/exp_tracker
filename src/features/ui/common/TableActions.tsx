'use client';
import { Button } from '@/components/ui/button';
import { Filter, FilterX, Pencil, Plus, Trash2 } from 'lucide-react';
import React, { Dispatch } from 'react';

type TableActionsProps = {
	selectedItemLength: number;
	setShowFilter: Dispatch<React.SetStateAction<boolean>>;
	showFilter: boolean;
	handleNewOnClick: () => void;
};

const TableActions = ({
	selectedItemLength,
	setShowFilter,
	showFilter,
	handleNewOnClick,
}: TableActionsProps) => {
	return (
		<div className='flex gap-2 mb-2'>
			<Button size='icon' onClick={handleNewOnClick}>
				<Plus />
			</Button>
			<Button size='icon' disabled={selectedItemLength !== 1}>
				<Pencil />
			</Button>
			<Button size='icon' disabled={selectedItemLength === 0}>
				<Trash2 />
			</Button>
			<Button
				size='icon'
				onClick={() => setShowFilter((prevState) => !prevState)}
				disabled={selectedItemLength > 0}
			>
				{showFilter ? <FilterX /> : <Filter />}
			</Button>
		</div>
	);
};

export default TableActions;
