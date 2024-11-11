"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Users, Globe } from "lucide-react";

const MotionDiv = motion.div;

const features = [
  {
    icon: CheckCircle2,
    title: "Enterprise Solutions",
    description: "Comprehensive solutions tailored to meet your business needs",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Dedicated professionals with years of industry experience",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving clients worldwide with localized support",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <MotionDiv
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800"
            >
              <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}