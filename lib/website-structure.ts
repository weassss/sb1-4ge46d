export type StructureItem = {
  id: string;
  type: 'page' | 'component' | 'element';
  label: string;
  children?: StructureItem[];
};

export const websiteStructure: StructureItem[] = [
  {
    id: 'home',
    type: 'page',
    label: 'Home Page',
    children: [
      {
        id: 'hero',
        type: 'component',
        label: 'Hero Section',
        children: [
          { id: 'hero-title', type: 'element', label: 'Title' },
          { id: 'hero-subtitle', type: 'element', label: 'Subtitle' },
          { id: 'hero-cta', type: 'element', label: 'CTA Buttons' }
        ]
      },
      {
        id: 'features',
        type: 'component',
        label: 'Features Section',
        children: [
          { id: 'feature-1', type: 'element', label: 'Enterprise Solutions' },
          { id: 'feature-2', type: 'element', label: 'Expert Team' },
          { id: 'feature-3', type: 'element', label: 'Global Reach' }
        ]
      },
      {
        id: 'testimonials',
        type: 'component',
        label: 'Testimonials Section',
        children: [
          { id: 'testimonial-1', type: 'element', label: 'Testimonial Card 1' },
          { id: 'testimonial-2', type: 'element', label: 'Testimonial Card 2' },
          { id: 'testimonial-3', type: 'element', label: 'Testimonial Card 3' }
        ]
      }
    ]
  },
  {
    id: 'about',
    type: 'page',
    label: 'About Page',
    children: [
      {
        id: 'about-hero',
        type: 'component',
        label: 'About Hero',
        children: [
          { id: 'about-title', type: 'element', label: 'Title' },
          { id: 'about-content', type: 'element', label: 'Content' }
        ]
      }
    ]
  },
  {
    id: 'contact',
    type: 'page',
    label: 'Contact Page',
    children: [
      {
        id: 'contact-form',
        type: 'component',
        label: 'Contact Form',
        children: [
          { id: 'form-inputs', type: 'element', label: 'Form Fields' },
          { id: 'form-submit', type: 'element', label: 'Submit Button' }
        ]
      }
    ]
  }
];