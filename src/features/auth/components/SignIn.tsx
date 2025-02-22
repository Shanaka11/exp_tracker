import { signIn } from '@/features/auth/auth';
import React from 'react';
import { Button } from '../../../components/ui/button';

type SignInProps = {
	children?: React.ReactNode;
};

const SignIn = ({ children }: SignInProps) => {
	return (
		<form
			action={async () => {
				'use server';
				await signIn();
			}}
		>
			{children ?? (
				<Button
					type='submit'
					variant='secondary'
					className='text-sm font-semibold uppercase'
					size='sm'
				>
					Sign In
				</Button>
			)}
		</form>
	);
};

export default SignIn;
