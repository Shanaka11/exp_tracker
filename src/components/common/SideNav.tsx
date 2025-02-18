import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import {
	ArrowLeftRight,
	ChartColumn,
	Goal,
	LayoutDashboard,
} from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';

const SideNav = () => {
	return (
		<nav className='hidden md:flex flex-col gap-2 items-center py-2 bg-primary'>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							className={buttonVariants({
								variant: 'default',
								className:
									'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
							})}
							href={'/dashboard'}
						>
							<LayoutDashboard />
						</Link>
					</TooltipTrigger>
					<TooltipContent>
						<p>Dashboard</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							title='Transactions'
							className={buttonVariants({
								variant: 'default',
								className:
									'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
							})}
							href={'/transactions'}
						>
							<ArrowLeftRight />
						</Link>
					</TooltipTrigger>
					<TooltipContent>Transactions</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							title='Cost Bucket'
							className={buttonVariants({
								variant: 'default',
								className:
									'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
							})}
							href={'/costbuckets'}
						>
							<ChartColumn />
						</Link>
					</TooltipTrigger>
					<TooltipContent>
						<p>Cost Buckets</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							title='Goals'
							className={buttonVariants({
								variant: 'default',
								className:
									'w-full rounded-none hover:translate-x-1 hover:rounded-sm',
							})}
							href={'/goals'}
						>
							<Goal />
						</Link>
					</TooltipTrigger>
					<TooltipContent>
						<p>Goals</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</nav>
	);
};

export default SideNav;
