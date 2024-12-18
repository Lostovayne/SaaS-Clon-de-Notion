"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { SingleImageDropzone } from "../single-image-dropzone";

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
		try {
			if (file) {
				setIsSubmitting(true);
				setFile(file);

				/**
				 * @param {File} file - El archivo que se va a subir.
				 * @param {Object} options - Opciones para la subida del archivo.
				 * @param {string} options.replaceTargetUrl - Si ya existe un archivo con la misma URL, se remplaza.
				 */
				const res = await edgestore.publicFiles.upload({
					file,
					options: {
						replaceTargetUrl: coverImage.url
					}
				});
				await update({ id: params.documentId as Id<"documents">, coverImage: res.url });
				onClose();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
			<DialogContent aria-describedby={"modal-cover-image"}>
				<DialogHeader>
					<DialogTitle className={"text-center text-lg font-semibold"}>Cover Image</DialogTitle>
				</DialogHeader>
				<SingleImageDropzone
					onChange={onChange}
					disabled={isSubmitting}
					className={"w-full outline-none"}
					value={file}
				/>
			</DialogContent>
		</Dialog>
	);
};
