"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Error = () => {
	return (
		<div className={"h-full flex flex-col items-center justify-center space-y-4"}>
			<Image
				src={"/error.png"}
				height={230}
				width={300}
				alt="error"
				className={"dark:hidden object-cover"}
				priority
				layout="fixed"
			/>
			<Image
				src={"/error-dark.png"}
				height={230}
				width={300}
				layout="fixed"
				alt="error"
				className={"hidden dark:block object-cover"}
				priority
				loading="eager"
			/>
			<h2 className={"text-lg font-medium"}>Oops! Something went wrong</h2>
			<p className={"text-sm text-muted-foreground"}>
				We&apos;re sorry, but something went wrong. Please try again later.
			</p>

			<Button asChild>
				<Link href={"/documents"}>Go back home</Link>
			</Button>
		</div>
	);
};

export default Error;
