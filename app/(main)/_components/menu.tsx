import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { FC, ReactElement } from 'react';
import { toast } from 'sonner';

interface MenuProps {
	documentId: Id<'documents'>;
}

const Menu: FC<MenuProps> = ({ documentId }): ReactElement => {
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

	return <div>Menu</div>;
};

export default Menu;
