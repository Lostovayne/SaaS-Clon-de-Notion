"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, CheckIcon, CopyIcon, GlobeIcon } from "lucide-react";
import { FC, ReactElement, useState } from "react";
import { toast } from "sonner";

interface PublishProps {
	initialData: Doc<"documents">;
}

const Publish: FC<PublishProps> = ({ initialData }): ReactElement => {
	const origin = useOrigin();
	const update = useMutation(api.documents.update);

	const [copied, setCopied] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const url = `${origin}/preview/${initialData._id}`;

	const onPublish = async () => {
		setIsSubmitting(true);
		const promise = update({
			id: initialData._id,
			isPublished: true
		}).finally(() => setIsSubmitting(false));

		toast.promise(promise, {
			loading: "Publishing...",
			success: "Note published",
			error: "Could not publish note"
		});
	};

	const onUnPublish = async () => {
		setIsSubmitting(true);
		const promise = update({
			id: initialData._id,
			isPublished: false
		}).finally(() => setIsSubmitting(false));

		toast.promise(promise, {
			loading: "Unpublishing...",
			success: "Note unpublished",
			error: "Could not unpublish note"
		});
	};

	const onCopy = () => {
		navigator.clipboard.writeText(url);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size={"sm"} variant={"ghost"}>
					Publish
					{initialData.isPublished && <GlobeIcon className=" text-sky-500 ml-2 h-4 w-4" />}
				</Button>
			</PopoverTrigger>
			<PopoverContent className={"w-72"} align={"end"} alignOffset={8} forceMount>
				{initialData.isPublished ?
					<div className={"space-y-2"}>
						<div className={"flex items-center gap-x-2"}>
							<GlobeIcon className={"text-sky-500 h-4 w-4"} />
							<p>This note is live on the internet</p>
						</div>
						<div className={"flex items-center"}>
							<Input
								value={url}
								readOnly
								className={
									"flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted-foreground  truncate"
								}
								disabled
							/>
							<Button onClick={onCopy} disabled={copied} className={"h-8 rounded-l-none"}>
								{copied ?
									<CheckIcon className={" h-4 w-4"} />
								:	<CopyIcon className={" h-4 w-4"} />}
							</Button>
						</div>
						<Button
							onClick={onUnPublish}
							size={"sm"}
							className={"w-full text-xs"}
							disabled={isSubmitting}>
							Unpublish
						</Button>
					</div>
				:	<div className={"flex flex-col items-center justify-center gap-y-3"}>
						<GlobeIcon className={"size-8 text-muted-foreground"} />
						<p className={"text-xs font-medium mb-2"}>Publish this note</p>
						<span className={"text-sm pb-1"}>Share your work with the world</span>
						<Button
							disabled={isSubmitting}
							onClick={onPublish}
							className={"w-full text-xs"}
							size={"sm"}>
							Publish
						</Button>
					</div>
				}
			</PopoverContent>
		</Popover>
	);
};

export default Publish;
