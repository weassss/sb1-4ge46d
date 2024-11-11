"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditableContent } from "@/components/edit-mode/editable-content";

const MotionDiv = motion.div;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            <EditableContent
              content="Transform Your Enterprise with"
              path="content/hero"
              field="title"
            />
            <span className="text-blue-600 dark:text-blue-400">
              <EditableContent
                content=" UM Inc"
                path="content/hero"
                field="company"
              />
            </span>
          </h1>
          <EditableContent
            content="Empowering businesses with innovative solutions for digital transformation and sustainable growth in the modern era."
            path="content/hero"
            field="description"
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
          />
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}