import Link from 'next/link';

export default function Home() {
	return (
		<>
			<Link href='/demo/dashboard'>Demo</Link>
			<Link href='/dashboard'>Core</Link>
		</>
	);
}
