import SideNav from '@/components/common/SideNav';
import React from 'react';

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className='grid grid-rows-subgrid grid-cols-subgrid col-span-2'>
			<SideNav />
			<main className='py-4 px-4 bg-slate-200 h-full overflow-auto md:overflow-hidden col-span-2 md:col-span-1'>
				{children}
			</main>
		</div>
	);
};

export default layout;
