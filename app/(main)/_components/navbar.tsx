import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { ReactElement } from "react";
import Title from "./title";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps): ReactElement => {
  const params = useParams();
  const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<"documents"> });

  if (document === undefined)
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center">
        <Title.Skeleton />
      </nav>
    );
  if (document === null) return <div>Document not found</div>;

  return (
    <>
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon role="button" className="text-muted-foreground size-6" onClick={onResetWidth} />
        )}

        <div className="flex items-center">
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
