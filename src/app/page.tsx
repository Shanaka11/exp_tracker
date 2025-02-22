import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import DashboardButton from '@/features/auth/components/DashboardButton';

export default function Home() {
	const date = new Date();

	return (
		<div className='col-span-2 flex flex-col'>
			<section className='relative col-span-2 h-full place-items-center grid'>
				<Image
					src='https://five12daysgeneral.s3.ap-southeast-1.amazonaws.com/Expense/35cc357a76a5471b977d99e93dcdad97.jpg'
					alt='hero'
					fill
					className='absolute'
					style={{
						objectFit: 'cover',
					}}
				/>
				<div className='z-10 px-10 md:px-8'>
					<h1
						className='text-6xl font-semibold text-white'
						style={{ textShadow: '-7px 4px 5px black' }}
					>
						Take Control of Your Finances
					</h1>
					<div className='mt-3 flex gap-1 md:justify-center'>
						{/* If logged in go to the dashboard else log in screen */}
						<DashboardButton />
						{/* Link to Demo */}
						<Link href='/demo/dashboard'>
							<Button
								variant='ghost'
								className='bg-transparent p-4  text-sm font-semibold uppercase text-white'
							>
								Try For Free
							</Button>
						</Link>
					</div>
				</div>
			</section>
			<footer className='bg-primary py-5'>
				<p className='text-center text-white'>
					<span>&copy;</span> {date.getFullYear()} Shanaka Abeysinghe. All
					rights reserved.
				</p>
			</footer>
		</div>
	);
}
