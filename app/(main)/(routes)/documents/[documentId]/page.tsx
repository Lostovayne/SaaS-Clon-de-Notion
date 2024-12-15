'use client';
import Toolbar from '@/components/toolbar';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { ReactElement } from 'react';

interface DocumentIdPageProps {
	params: { documentId: Id<'documents'> };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps): ReactElement => {
	const documentId = params.documentId;
	const document = useQuery(api.documents.getById, {
		documentId: documentId
	});
	if (document === null || document === undefined) return <div>Document not found</div>;

	return (
		<div className={'pb-40'}>
			<div className={'h-[35vh]'} />
			<div className={'md:max-w-3xl lg:max-w-4xl mx-auto'}>
				<Toolbar initialData={document} />
			</div>
		</div>
	);
};

export default DocumentIdPage;
