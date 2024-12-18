'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useCoverImage } from '@/hooks/use-cover-image';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, ReactElement } from 'react';

interface CoverProps {
	url?: string;
	preview?: boolean;
}

const Cover: FC<CoverProps> = ({ url, preview }): ReactElement => {
	const coverImage = useCoverImage();
	const removeImage = useMutation(api.documents.removeImage);
	const params = useParams();

	const onRemove = () => {
		removeImage({ id: params.documentId as Id<'documents'> });
	};

	return (
		<div className={cn('relative w-full h-[35vh] group', !url && 'h-[12vh]', url && 'bg-muted')}>
			{!!url && <Image src={url} fill alt={'Cover'} className={'object-cover object-center'} />}
			{url && !preview && (
				<div
					className={
						'opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'
					}>
					<Button
						className={'text-muted-foreground text-xs '}
						variant={'outline'}
						size={'sm'}
						onClick={coverImage.onOpen}>
						<ImageIcon className={'size-4 mr-2'} />
						Change cover
					</Button>

					<Button
						className={'text-muted-foreground text-xs '}
						variant={'outline'}
						size={'sm'}
						onClick={onRemove}>
						<X className={'size-4 mr-2'} />
						Remove
					</Button>
				</div>
			)}
		</div>
	);
};

export default Cover;
