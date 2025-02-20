import React from 'react';
import { auth } from '../auth';
import UserAvatar from './UserAvatar';
import SignIn from './SignIn';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SignOut from './SignOut';

const Auth = async () => {
	const session = await auth();

	if (!session?.user) {
		return <SignIn />;
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<SignOut />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Auth;
