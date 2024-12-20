"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
	const { user } = useUser();
	const create = useMutation(api.documents.create);
	const onCreate = async () => {
		const promise = create({ title: "Untitled" });

		toast.promise(promise, {
			loading: "Creating a new note...",
			success: "Note created successfully!",
			error: "Error creating the note."
		});
	};

	return (
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			{/* Squeleton de carga mientras se carga la imagen */}

			<Image
				src="/empty.png"
				height={230}
				width={300}
				alt="empty"
				className="dark:hidden object-cover"
				priority
				layout="fixed"
			/>
			<Image
				src="/empty-dark.png"
				height={230}
				width={300}
				layout="fixed"
				alt="empty"
				className="hidden dark:block object-cover"
				priority
				loading="eager"
			/>

			<h2 className="text-lg font-medium">Welcome to {user?.firstName}&apos;s Jotion</h2>
			<Button onClick={onCreate}>
				<PlusCircle className="size-5 mr-2 " />
				Create a note
			</Button>
		</div>
	);
};
export default DocumentsPage;
