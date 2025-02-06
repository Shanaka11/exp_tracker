import React from 'react';

const SummaryCard = () => {
	return (
		<div className='col-span-1 md:col-span-3 grid grid-cols-3 gap-2'>
			<div className='bg-slate-50 rounded-sm p-4'>
				<h4 className='font-bold text-lg'>Available Balance</h4>
				<p className='text-xl text-center p-4'>
					{(5700.0).toLocaleString('en-us', {
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					})}
				</p>
			</div>
			<div className='bg-slate-50 rounded-sm p-4'>
				<h4 className='font-bold text-lg'>Allocated To Goals</h4>
				<p className='text-xl text-center p-4'>
					{(1200.0).toLocaleString('en-us', {
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					})}
				</p>
			</div>
			<div className='bg-slate-50 rounded-sm p-4'>
				<h4 className='font-bold text-lg'>Expenses</h4>
				<p className='text-xl text-center p-4'>
					{(3700.0).toLocaleString('en-us', {
						maximumFractionDigits: 2,
						minimumFractionDigits: 2,
					})}
				</p>
			</div>
		</div>
	);
};

export default SummaryCard;
