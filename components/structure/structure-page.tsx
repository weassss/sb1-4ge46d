"use client";

import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';

const StructureFlow = dynamic(
  () => import('@/components/structure/structure-flow').then(mod => mod.StructureFlow),
  { 
    ssr: false,
    loading: () => (
      <Card className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-lg">Loading visualization...</p>
      </Card>
    )
  }
);

export default function StructurePage() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Website Structure</h1>
      <div className="w-full h-[calc(100vh-8rem)] bg-background rounded-lg border">
        <StructureFlow />
      </div>
    </div>
  );
}