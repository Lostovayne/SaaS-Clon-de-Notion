'use client';

import type { Doc } from '@/convex/_generated/dataModel';
import { FC, ReactElement } from 'react';

interface ToolbarProps {
	// Prop types here
	initialData: Doc<'documents'>;
	preview?: boolean;
}

const Toolbar: FC<ToolbarProps> = ({}): ReactElement => {
	return <div>content</div>;
};

export default Toolbar;
