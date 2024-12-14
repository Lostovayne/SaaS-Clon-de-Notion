import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, ReactElement } from 'react';
import { toast } from 'sonner';

interface MenuProps {
	documentId: Id<'documents'>;
}

const Menu = ({ documentId }: MenuProps): ReactElement => {
	const router = useRouter();
	const { user } = useUser();
	const archive = useMutation(api.documents.archive);

	const onArchive = () => {
		const promise = archive({ id: documentId });

		toast.promise(promise, {
			loading: 'Moving document to trash...',
			success: 'Note moved to trash',
			error: ' An error occurred while moving the note to trash'
		});

		router.push('/documents');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={'sm'} variant={'ghost'}>
					<MoreHorizontal className={'size-4'} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className={'w-60'} align={'end'} alignOffset={8} forceMount>
				<DropdownMenuItem onClick={onArchive}>
					<Trash className={'size-4 mr-2'} />
					Delete
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<div className={'text-xs text-muted-foreground p-2'}>Last edited by: {user?.fullName}</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

Menu.Skeleton = function MenuSkeleton() {
	return <Skeleton className={'h-8 w-10'} />;
};

export default Menu;
