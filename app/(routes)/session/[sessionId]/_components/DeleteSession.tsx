import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteSession } from "@/lib/actions/sessions";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteSession = ({ sessionId }: { sessionId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteSession(sessionId);
      if (result.success) {
        toast.success(result.message);
      }
    } catch {
      toast.error("Internal error occured while deleting the session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <div className="flex items-center gap-2 p-2 py-1.5 w-full text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:rounded-sm">
          <TrashIcon className="h-4 w-4 mr-2" />
          Delete
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            session and remove related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 transition-all cursor-pointer"
            onClick={() => handleDelete()}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircleIcon className="size-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSession;
