import React from 'react';

const TransactionListItem = () => {
	return (
		<li className='bg-slate-50 flex gap-2 justify-between hover:bg-slate-100 p-1 transition-all w-full'>
			<div className='rounded-full bg-black text-white w-14 text-center'>T</div>
			<div>
				<p className='font-bold text-lg'>5421.33</p>
				<div>from colas</div>
			</div>
		</li>
	);
};

export default TransactionListItem;
