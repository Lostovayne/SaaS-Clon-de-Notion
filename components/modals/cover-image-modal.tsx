'use client';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import React from 'react';
import { SingleImageDropzone } from '../single-image-dropzone';

export const CoverImageModal = () => {
	const update = useMutation(api.documents.update);
	const params = useParams();
	const [file, setFile] = React.useState<File>();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const { edgestore } = useEdgeStore();
	const coverImage = useCoverImage();

	const onClose = () => {
		setFile(undefined);
		setIsSubmitting(false);
		coverImage.onClose();
	};

	const onChange = async (file?: File) => {
		if (file) {
			setIsSubmitting(true);
			setFile(file);
			const res = await edgestore.publicFiles.upload({ file });
			await update({ id: params.documentId as Id<'documents'>, coverImage: res.url });
		}
	};

	return (
		<Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
			<DialogHeader>
				<h2 className={'text-center text-lg font-semibold'}>Cover Image</h2>
			</DialogHeader>
			<DialogContent>
				<SingleImageDropzone
					onChange={onChange}
					disabled={isSubmitting}
					className={'w-full outline-none'}
					value={file}
				/>
			</DialogContent>
		</Dialog>
	);
};
