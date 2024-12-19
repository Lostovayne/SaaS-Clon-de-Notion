"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/hooks/use-settings";

export const SettingsModal = () => {
	const settings = useSettings();

	return (
		<Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
			<DialogContent aria-describedby="modal-settings">
				<DialogHeader className="border-b pb-3 ">
					<DialogTitle className="text-lg font-medium">My Settings</DialogTitle>
				</DialogHeader>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-1">
						<Label>Appearance</Label>
						<span className="text-[0.8rem] text-muted-foreground">
							Customize how Jotion looks on your device
						</span>
					</div>
					<ModeToggle />
				</div>
			</DialogContent>
		</Dialog>
	);
};
