"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ReactElement, useRef, useState } from "react";

interface TitleProps {
  initialData: Doc<"documents">;
}

const Title = ({ initialData }: TitleProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialData.title);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current?.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({ id: initialData._id, title: e.target.value || "Untitled" });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") disableInput();
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ?
        <Input
          value={title}
          ref={inputRef}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      : <Button onClick={enableInput} size={"sm"} variant={"ghost"} className="font-normal h-auto p-1">
          <span className="truncate">{initialData?.title}</span>
        </Button>
      }
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-7 w-20 rounded-md" />;
};

export default Title;
