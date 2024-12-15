'use client';

import { IconPicker } from '@/components/icon-picker';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import type { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { ImageIcon, Smile, X } from 'lucide-react';
import { FC, ReactElement, useRef, useState, type ElementRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface ToolbarProps {
	initialData: Doc<'documents'>;
	preview?: boolean;
}

const Toolbar: FC<ToolbarProps> = ({ initialData, preview }): ReactElement => {
	const inputRef = useRef<ElementRef<'textarea'>>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [value, setValue] = useState<string>(initialData.title);

	const update = useMutation(api.documents.update);

	const enableInput = () => {
		if (preview) return;
		setIsEditing(true);
		setTimeout(() => {
			setValue(initialData.title);
			inputRef.current?.focus();
		}, 0);
	};

	const disableInput = () => setIsEditing(false);

	const onInput = (value: string) => {
		setValue(value);
		update({ id: initialData._id, title: value || 'Untitled' });
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			disableInput();
		}
	};

	return (
		<div className={'pl-[54px] group relative'}>
			{!!initialData.icon && !preview && (
				<div className={'flex items-center gap-x-2 group/icon pt-6'}>
					<IconPicker onChange={() => {}}>
						<p className={'text-6xl hover:opacity-75 transition'}>{initialData.icon}</p>
					</IconPicker>
					<Button
						onClick={() => {}}
						className={'rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs'}
						variant={'outline'}
						size={'icon'}>
						<X className={'size-4'} />
					</Button>
				</div>
			)}
			{!!initialData.icon && preview && <p className={'text-6xl pt-6'}>{initialData.icon}</p>}

			<div className={'opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4'}>
				{!initialData.icon && !preview && (
					<IconPicker asChild onChange={() => {}}>
						<Button className={'text-muted-foreground text-xs'} variant={'outline'} size={'sm'}>
							<span className="flex items-center">
								<Smile className={'size-4 mr-2'} />
								Add icon
							</span>
						</Button>
					</IconPicker>
				)}
				{!initialData.coverImage && !preview && (
					<Button onClick={() => {}} className={'text-muted-foreground text-xs'} variant={'outline'} size={'sm'}>
						<ImageIcon className={'size-4 mr-2'} />
						Add cover
					</Button>
				)}
			</div>
			{isEditing && !preview ?
				<TextareaAutosize
					ref={inputRef}
					onBlur={disableInput}
					onKeyDown={onKeyDown}
					value={value}
					onChange={(e) => onInput(e.target.value)}
					className={
						'text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none'
					}
				/>
			:	<div
					className={'pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]'}
					onClick={enableInput}>
					{initialData.title}
				</div>
			}
		</div>
	);
};

export default Toolbar;
