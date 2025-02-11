import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import CreateNewGoalDialog from './CreateNewGoalDialog';

const CreateNewGoalButton = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className='h-full w-full grid items-center'>
			<Button size='lg' onClick={() => setOpen(true)}>
				<Plus /> Define Cost Buckets
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<CreateNewGoalDialog />
			</Dialog>
		</div>
	);
};

export default CreateNewGoalButton;
