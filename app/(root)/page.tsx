import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import Header from '@/components/Header'
import Notifications from '@/components/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Home = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/sign-in');

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);
  const documents = roomDocuments?.data ?? [];

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="header-actions">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      <section className="dashboard-shell">
        <div className="dashboard-heading">
          <div>
            <p className="eyebrow">Workspace</p>
            <h1>All documents</h1>
            <p className="dashboard-subtitle">Create, organize, and collaborate in one place.</p>
          </div>
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>

        {roomDocuments?.data ? (
          documents.length > 0 ? (
            <div className="document-list-wrap">
              <div className="document-list-label">
                <span>Document</span>
                <span>Last updated</span>
                <span aria-hidden="true" />
              </div>
              <ul className="document-ul">
                {documents.map(({ id, metadata, createdAt }: any) => (
                  <li key={id} className="document-list-item">
                    <Link href={`/documents/${id}`} className="document-link">
                      <div className="document-icon">
                        <Image src="/assets/icons/doc.svg" alt="" width={22} height={22} />
                      </div>
                      <div className="document-copy">
                        <p className="document-name">{metadata.title}</p>
                        <p className="document-meta">Created {dateConverter(createdAt)}</p>
                      </div>
                    </Link>
                    <p className="document-updated">{dateConverter(createdAt)}</p>
                    <DeleteModal roomId={id} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="document-list-empty">
              <div className="empty-icon">
                <Image src="/assets/icons/doc.svg" alt="" width={34} height={34} />
              </div>
              <h2>Create your first document</h2>
              <p>Start with a blank page and invite others when you are ready.</p>
              <AddDocumentBtn
                userId={clerkUser.id}
                email={clerkUser.emailAddresses[0].emailAddress}
              />
            </div>
          )
        ) : (
          <div className="document-list-empty error-state">
            <h2>Documents could not be loaded</h2>
            <p>Check your connection and refresh to try again.</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default Home