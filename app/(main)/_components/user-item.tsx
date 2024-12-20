"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";
import { ChevronsLeftRight } from "lucide-react";
import { useRouter } from "next/navigation";

const UserItem = () => {
	const { user } = useUser();
	const { signOut } = useClerk();
	const router = useRouter();

	const isSignOutButton = async () => {
		router.push("/");
		await signOut();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
					<div className="gap-x-2 flex items-center max-w-[150px] ">
						<Avatar className="size-5">
							<AvatarImage src={user?.imageUrl} />
						</Avatar>
						<span className="text-start font-medium line-clamp-1">
							{user?.fullName}&apos;s Jotion
						</span>
					</div>
					<ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground size-4" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
				<div className="flex flex-col space-y-4 p-2">
					<p className="text-xs font-medium leading-none text-muted-foreground">
						{user?.emailAddresses[0]?.emailAddress}
					</p>
					<div className="flex items-center gap-x-2">
						<div className="rounded-md bg-secondary p-1">
							<Avatar className="size-8">
								<AvatarImage src={user?.imageUrl} alt={user?.fullName + " profile image"} />
							</Avatar>
						</div>
						<div className="space-y-1">
							<p className="text-sm line-clamp-1">{user?.fullName}&apos;s Jotion</p>
						</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
					<Button variant={"outline"} onClick={isSignOutButton}>
						Log out
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserItem;
