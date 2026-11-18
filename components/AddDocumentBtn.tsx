'use client';

import { createDocument } from '@/lib/actions/room.actions';
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });

      if(room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button type="button" onClick={addDocumentHandler} className="create-document-button">
      <Image src="/assets/icons/add.svg" alt="" width={18} height={18} />
      <span>Create new document</span>
    </Button>
  )
}

export default AddDocumentBtn