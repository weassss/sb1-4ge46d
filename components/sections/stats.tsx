"use client";

import { motion } from "framer-motion";

const MotionDiv = motion.div;

const stats = [
  { id: 1, name: "Global Clients", value: "500+" },
  { id: 2, name: "Team Members", value: "100+" },
  { id: 3, name: "Success Rate", value: "98%" },
  { id: 4, name: "Years of Experience", value: "15+" },
];

export function StatsSection() {
  return (
    <section className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <MotionDiv
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <dt className="text-base font-semibold text-gray-600 dark:text-gray-400">
                {stat.name}
              </dt>
              <dd className="mt-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                {stat.value}
              </dd>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}