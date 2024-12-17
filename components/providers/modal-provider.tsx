'use client';

import { SettingsModal } from '@/components/modals/settings-modal';
import { useEffect, useState } from 'react';
import { CoverImageModal } from '../modals/cover-image-modal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<SettingsModal />
			<CoverImageModal />
		</>
	);
};
