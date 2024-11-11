"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight, Layers } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

interface Section {
  id: string;
  title: string;
  type: string;
  components?: {
    id: string;
    name: string;
    description: string;
  }[];
}

interface PageDetailsProps {
  nodeId: string;
  isVisible: boolean;
}

const pageSections: Record<string, Section[]> = {
  home: [
    {
      id: "hero",
      title: "Hero Section",
      type: "main",
      components: [
        {
          id: "hero-title",
          name: "Title",
          description: "Main headline of the page"
        },
        {
          id: "hero-subtitle",
          name: "Subtitle",
          description: "Supporting text below the headline"
        },
        {
          id: "hero-cta",
          name: "CTA Buttons",
          description: "Call-to-action buttons"
        }
      ]
    },
    {
      id: "features",
      title: "Features Section",
      type: "content",
      components: [
        {
          id: "feature-1",
          name: "Enterprise Solutions",
          description: "Enterprise-level solution features"
        },
        {
          id: "feature-2",
          name: "Expert Team",
          description: "Team expertise highlights"
        },
        {
          id: "feature-3",
          name: "Global Reach",
          description: "Global presence information"
        }
      ]
    },
    {
      id: "testimonials",
      title: "Testimonials Section",
      type: "social-proof",
      components: [
        {
          id: "testimonial-1",
          name: "Client Testimonial 1",
          description: "Featured client feedback"
        },
        {
          id: "testimonial-2",
          name: "Client Testimonial 2",
          description: "Additional client feedback"
        }
      ]
    }
  ],
  about: [
    {
      id: "about-hero",
      title: "About Hero Section",
      type: "main",
      components: [
        {
          id: "about-title",
          name: "Title",
          description: "About page headline"
        },
        {
          id: "about-content",
          name: "Content",
          description: "Main about page content"
        }
      ]
    },
    {
      id: "team",
      title: "Team Section",
      type: "content",
      components: [
        {
          id: "team-grid",
          name: "Team Grid",
          description: "Team members showcase"
        }
      ]
    }
  ],
  contact: [
    {
      id: "contact-form",
      title: "Contact Form Section",
      type: "form",
      components: [
        {
          id: "form-fields",
          name: "Form Fields",
          description: "Contact form inputs"
        },
        {
          id: "form-submit",
          name: "Submit Button",
          description: "Form submission button"
        }
      ]
    },
    {
      id: "contact-info",
      title: "Contact Information",
      type: "content",
      components: [
        {
          id: "address",
          name: "Address",
          description: "Company address details"
        },
        {
          id: "contact-details",
          name: "Contact Details",
          description: "Phone and email information"
        }
      ]
    }
  ]
};

export function PageDetails({ nodeId, isVisible }: PageDetailsProps) {
  const [openSections, setOpenSections] = useState<string[]>([]);

  if (!isVisible) return null;

  const sections = pageSections[nodeId] || [];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="absolute left-full top-0 ml-4 w-80 rounded-lg border bg-white p-4 shadow-lg dark:bg-gray-800">
      <div className="mb-3 flex items-center space-x-2">
        <Layers className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Page Sections</h3>
      </div>
      <div className="space-y-2">
        {sections.map((section) => (
          <Collapsible
            key={section.id}
            open={openSections.includes(section.id)}
            onOpenChange={() => toggleSection(section.id)}
          >
            <div className="rounded-lg border bg-gray-50 p-2 dark:bg-gray-900">
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-2">
                  {openSections.includes(section.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                  <span className="font-medium">{section.title}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {section.type}
                </Badge>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                {section.components?.map((component) => (
                  <div
                    key={component.id}
                    className="ml-6 rounded border bg-white p-2 dark:bg-gray-800"
                  >
                    <div className="font-medium text-sm">{component.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {component.description}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}