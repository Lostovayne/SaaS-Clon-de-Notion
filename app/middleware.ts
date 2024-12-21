import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/preview/[documentId]"]);

export default clerkMiddleware(async (auth, request) => {
	if (!isPublicRoute(request)) {
		await auth.protect();
	}
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
