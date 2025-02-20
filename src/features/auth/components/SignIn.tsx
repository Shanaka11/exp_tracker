import { signIn } from '@/features/auth/auth';
import React from 'react';
import { Button } from '../../../components/ui/button';

const SignIn = () => {
	return (
		<form
			action={async () => {
				'use server';
				await signIn();
			}}
		>
			<Button type='submit' variant='secondary' size='sm'>
				Sign In
			</Button>
		</form>
	);
};

export default SignIn;
