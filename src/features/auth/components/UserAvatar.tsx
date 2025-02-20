'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

const UserAvatar = () => {
	const { data: session } = useSession();

	if (session === undefined) {
		return null;
	}
	return (
		<Avatar>
			<AvatarImage
				src={session?.user?.image ?? ''}
				alt={session?.user?.name ?? ''}
			/>
			<AvatarFallback>
				{session?.user?.name
					?.charAt(0)
					.concat(
						session?.user?.name?.substr(
							session?.user?.name?.indexOf(' ') + 1,
							2
						)
					)}
			</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
