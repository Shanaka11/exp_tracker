'use client';
import { Button } from '@/components/ui/button';
import { Filter, FilterX, Pencil, Plus, Trash2 } from 'lucide-react';
import React, { Dispatch } from 'react';

type TableActionsProps = {
	selectedItemLength: number;
	setShowFilter: Dispatch<React.SetStateAction<boolean>>;
	showFilter: boolean;
	handleNewOnClick: () => void;
	handleEditOnClick: () => void;
	handleDeleteOnClick: () => void;
};

const TableActions = ({
	selectedItemLength,
	setShowFilter,
	showFilter,
	handleNewOnClick,
	handleEditOnClick,
	handleDeleteOnClick,
}: TableActionsProps) => {
	return (
		<div className='flex gap-2 mb-2'>
			<Button size='icon' onClick={handleNewOnClick}>
				<Plus />
			</Button>
			<Button
				size='icon'
				disabled={selectedItemLength !== 1}
				onClick={handleEditOnClick}
			>
				<Pencil />
			</Button>
			<Button
				size='icon'
				disabled={selectedItemLength === 0}
				onClick={handleDeleteOnClick}
			>
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
