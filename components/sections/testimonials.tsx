"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MotionDiv = motion.div;

const testimonials = [
  {
    quote: "UM Inc has transformed our business operations, delivering exceptional results.",
    author: "Sarah Johnson",
    role: "CEO, TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    quote: "Their expertise in digital transformation is unmatched in the industry.",
    author: "Michael Chen",
    role: "CTO, InnovateCo",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
  {
    quote: "Outstanding service and support throughout our partnership.",
    author: "Emily Rodriguez",
    role: "Director, GlobalTech",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Trusted by Industry Leaders
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <MotionDiv
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-800"
            >
              <p className="text-lg text-gray-600 dark:text-gray-400">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 flex items-center">
                <Image
                  className="h-12 w-12 rounded-full object-cover"
                  src={`${testimonial.image}?w=48&h=48&fit=crop`}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}