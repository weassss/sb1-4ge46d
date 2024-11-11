"use client";

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { EditToolbar } from '@/components/edit-mode/edit-toolbar';
import { useViewMode } from '@/hooks/use-view-mode';

export function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isStructureView } = useViewMode();

  return (
    <>
      {!isStructureView && <Navigation />}
      <main className={isStructureView ? "h-screen" : "min-h-screen"}>
        {children}
      </main>
      {!isStructureView && <Footer />}
      <EditToolbar />
    </>
  );
}