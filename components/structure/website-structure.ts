import { TreeNode } from "./types";

export const websiteStructure: TreeNode[] = [
  {
    id: "home",
    label: "Home Page",
    type: "page",
    children: [
      {
        id: "hero",
        label: "Hero Section",
        type: "component",
        children: [
          { id: "hero-title", label: "Title", type: "element" },
          { id: "hero-description", label: "Description", type: "element" },
          {
            id: "hero-buttons",
            label: "Call to Action Buttons",
            type: "component",
            children: [
              { id: "get-started-btn", label: "Get Started Button", type: "element" },
              { id: "learn-more-btn", label: "Learn More Button", type: "element" }
            ]
          }
        ]
      },
      {
        id: "features",
        label: "Features Section",
        type: "component",
        children: [
          {
            id: "feature-cards",
            label: "Feature Cards",
            type: "component",
            children: [
              { id: "enterprise-card", label: "Enterprise Solutions Card", type: "element" },
              { id: "team-card", label: "Expert Team Card", type: "element" },
              { id: "global-card", label: "Global Reach Card", type: "element" }
            ]
          }
        ]
      },
      {
        id: "testimonials",
        label: "Testimonials Section",
        type: "component",
        children: [
          { id: "testimonials-title", label: "Section Title", type: "element" },
          {
            id: "testimonial-cards",
            label: "Testimonial Cards",
            type: "component",
            children: [
              { id: "testimonial-1", label: "Sarah Johnson Testimonial", type: "element" },
              { id: "testimonial-2", label: "Michael Chen Testimonial", type: "element" },
              { id: "testimonial-3", label: "Emily Rodriguez Testimonial", type: "element" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "about",
    label: "About Page",
    type: "page",
    children: [
      { id: "about-hero", label: "About Hero Section", type: "component" },
      { id: "company-info", label: "Company Information", type: "component" },
      { id: "team", label: "Team Section", type: "component" }
    ]
  },
  {
    id: "contact",
    label: "Contact Page",
    type: "page",
    children: [
      { id: "contact-form", label: "Contact Form", type: "component" },
      { id: "contact-info", label: "Contact Information", type: "component" },
      { id: "map", label: "Location Map", type: "component" }
    ]
  }
];