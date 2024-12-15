'use client';

import { IconPicker } from '@/components/icon-picker';
import { Button } from '@/components/ui/button';
import type { Doc } from '@/convex/_generated/dataModel';
import { Smile, X } from 'lucide-react';
import { FC, ReactElement } from 'react';

interface ToolbarProps {
	initialData: Doc<'documents'>;
	preview?: boolean;
}

const Toolbar: FC<ToolbarProps> = ({ initialData, preview }): ReactElement => {
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
					<IconPicker onChange={() => {}} asChild>
						<Button className={'text-muted-foreground text-xs'} variant={'outline'} size={'sm'}>
							<Smile className={'size-4 mr-2'} />
							Add Icon
						</Button>
					</IconPicker>
				)}
			</div>
		</div>
	);
};

export default Toolbar;
