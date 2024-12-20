"use client";

import { FC, ReactElement } from "react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
	onChange: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
}

const Editor: FC<EditorProps> = ({ onChange, initialContent, editable }): ReactElement => {
	const { resolvedTheme } = useTheme();
	const { edgestore } = useEdgeStore();

	const handleUpload = async (file: File) => {
		// TODO: Cambiar de Bucket si el problema persiste
		const response = await edgestore.publicFiles.upload({
			file
		});
		return response.url;
	};

	const editor: BlockNoteEditor = useCreateBlockNote({
		initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
		uploadFile: handleUpload
	});

	return (
		<BlockNoteView
			editor={editor}
			editable={editable}
			onChange={() => {
				onChange(JSON.stringify(editor.document, null, 2));
			}}
			theme={resolvedTheme as "light" | "dark"}
			// formattingToolbar={false}
			sideMenu={true}
		/>
	);
};

export default Editor;
