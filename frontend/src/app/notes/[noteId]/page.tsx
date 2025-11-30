import NotePage from "@/components/core/NotePage";
import { auth } from "@clerk/nextjs/server";
import { noteService } from "@/services/noteService";

const Page = async ({ params }: { params: Promise<{ noteId: string }> }) => {
  const { noteId } = await params;
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    return <div>Unauthorized</div>;
  }

  const data = await noteService.getNote(noteId, token);
  const note = data?.note;

  return <NotePage noteId={noteId} note={note} />;
};

export default Page;
