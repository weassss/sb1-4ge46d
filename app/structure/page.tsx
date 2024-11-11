"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useViewMode } from '@/hooks/use-view-mode';

export default function StructurePage() {
  const router = useRouter();
  const { toggleStructureView } = useViewMode();

  useEffect(() => {
    toggleStructureView();
    router.push('/');

    return () => toggleStructureView();
  }, [router, toggleStructureView]);

  return null;
}