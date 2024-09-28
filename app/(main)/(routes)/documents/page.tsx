"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const DocumentsPage = () => {
  const { user } = useUser();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="/empty.png" height={300} width={300} alt="empty" className="dark:hidden" />
      <Image src="/empty.png" height={300} width={300} alt="empty" className="hidden dark:block" />
      <h2 className="text-lg font-medium">Welcome to {user?.firstName}&apos;s Jotion</h2>
      <Button>
        <PlusCircle className="size-5 mr-2 " />
        Create a note
      </Button>
    </div>
  );
};
export default DocumentsPage;
