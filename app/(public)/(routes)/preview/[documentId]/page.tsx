"use client";
import Cover from "@/components/cover";
import { Editor } from "@/components/dynamic-editor";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ReactElement } from "react";

interface DocumentIdPageProps {
	params: { documentId: Id<"documents"> };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps): ReactElement => {
	const documentId = params.documentId;
	const document = useQuery(api.documents.getById, {
		documentId: documentId
	});

	const update = useMutation(api.documents.update);

	const onChange = (content: string) => {
		update({ id: documentId, content });
	};

	if (document === undefined)
		return (
			<div>
				<Cover.Skeleton />
				<div className={"md:max-w-3xl  lg:max-w-4xl mx-auto mt-10"}>
					<div className={"space-y-4 pl-8 pt-4"}>
						<Skeleton className={"h-14 w-[50%] "} />
						<Skeleton className={"h-4 w-[80%] "} />
						<Skeleton className={"h-4 w-[40%] "} />
						<Skeleton className={"h-4 w-[60%] "} />
					</div>
				</div>
			</div>
		);
	if (document === null) return <div>Document not found</div>;

	return (
		<div className={"pb-40"}>
			<Cover preview url={document.coverImage} />
			<div className={"md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl  mx-auto"}>
				<Toolbar preview initialData={document} />
				<Editor onChange={onChange} initialContent={document.content} editable={false} />
			</div>
		</div>
	);
};

export default DocumentIdPage;
