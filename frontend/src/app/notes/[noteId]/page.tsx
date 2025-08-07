import NotePage from '@/components/core/NotePage'
import axios from 'axios';

const Page = async ({ params }: { params: Promise<{ noteId: string }> }) => {
  const { noteId } = await params;
  const response = await axios.get(`http://localhost:4000/api/v1/get-note/${noteId}`)
  const note = response.data?.note

  return <NotePage noteId={noteId} note={note}/>;
};

export default Page;