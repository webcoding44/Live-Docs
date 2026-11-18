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
import { Files, LayoutDashboard } from 'lucide-react';

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
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar" aria-label="Workspace navigation">
          <div className="workspace-switcher">
            <span className="workspace-mark"><Files size={18} /></span>
            <span>
              <strong>LiveDocs</strong>
              <small>Personal workspace</small>
            </span>
          </div>
          <p className="sidebar-label">Workspace</p>
          <Link href="/" className="sidebar-link active" aria-current="page">
            <LayoutDashboard size={17} />
            <span>All documents</span>
            <span className="sidebar-count">{documents.length}</span>
          </Link>
          <div className="sidebar-note">
            <span className="status-dot" />
            <span>Changes sync as you work</span>
          </div>
        </aside>

        <section className="dashboard-shell">
          <div className="dashboard-heading">
            <div>
              <p className="eyebrow">Your workspace</p>
              <h1>All documents</h1>
              <p className="dashboard-subtitle">Everything you’re working on, together in one place.</p>
            </div>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>

          <div className="documents-section-heading">
            <div>
              <h2>Documents</h2>
              <span>{documents.length} {documents.length === 1 ? 'file' : 'files'}</span>
            </div>
          </div>

          {roomDocuments?.data ? (
            documents.length > 0 ? (
              <ul className="document-ul">
                {documents.map(({ id, metadata, createdAt }: any) => (
                  <li key={id} className="document-list-item">
                    <Link href={`/documents/${id}`} className="document-link">
                      <div className="document-card-top">
                        <div className="document-icon">
                          <Image src="/assets/icons/doc.svg" alt="" width={24} height={24} />
                        </div>
                        <span className="document-open" aria-hidden="true">↗</span>
                      </div>
                      <div className="document-copy">
                        <p className="document-name">{metadata.title}</p>
                        <p className="document-meta">Created {dateConverter(createdAt)}</p>
                      </div>
                    </Link>
                    <div className="document-card-footer">
                      <span className="document-kind"><span className="status-dot" /> Collaborative document</span>
                      <DeleteModal roomId={id} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="document-list-empty">
                <div className="empty-icon">
                  <Image src="/assets/icons/doc.svg" alt="" width={34} height={34} />
                </div>
                <h2>Your workspace starts here</h2>
                <p>Create a document to capture ideas, plan projects, or work with your team.</p>
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
      </div>
    </main>
  )
}

export default Home