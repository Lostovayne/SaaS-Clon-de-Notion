"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { Logo } from "./logo";

const Navbar = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();

	const scrolled = useScrollTop();

	return (
		<div
			className={cn(
				"z-50 bg-background dark:bg-[#1f1f1f]  fixed top-0 flex items-center w-full p-6",
				scrolled && "border-b shadow-sm"
			)}>
			<Logo />
			<div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
				{isLoading && <Spinner />}
				{!isAuthenticated && !isLoading && (
					<>
						<SignInButton mode={"modal"}>
							<Button variant="ghost" size="sm">
								Log in
							</Button>
						</SignInButton>
						<SignUpButton mode={"modal"}>
							<Button size="sm">Create account</Button>
						</SignUpButton>
					</>
				)}

				{isAuthenticated && !isLoading && (
					<>
						<Button variant="ghost" size="sm" asChild>
							<Link href="/documents">Enter Jotion</Link>
						</Button>
						<UserButton />
					</>
				)}

				<ModeToggle />
			</div>
		</div>
	);
};
export default Navbar;
