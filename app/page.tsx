"use client";

import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta";
import { StatsSection } from "@/components/sections/stats";
import dynamic from "next/dynamic";
import { useViewMode } from "@/hooks/use-view-mode";

const StructureFlow = dynamic(
  () => import("@/components/structure/structure-flow").then((mod) => mod.StructureFlow),
  { ssr: false }
);

export default function Home() {
  const { isStructureView } = useViewMode();

  if (isStructureView) {
    return <StructureFlow />;
  }

  return (
    <div className="pt-16">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}