'use client';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import CreateNewGoalDialog from './CreateNewGoalDialog';
import { useRouter } from 'next/navigation';

const CreateNewGoalButton = () => {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleCreateNewGoalOnSuccess = () => {
		setOpen(false);
		router.refresh();
	};

	return (
		<div className='h-full w-full grid items-center'>
			<Button size='lg' onClick={() => setOpen(true)}>
				<Plus /> Add Goals
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<CreateNewGoalDialog handleSaveSuccess={handleCreateNewGoalOnSuccess} />
			</Dialog>
		</div>
	);
};

export default CreateNewGoalButton;
