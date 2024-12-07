"use client";
import React, { useEffect, useState, useRef } from "react";
import UserTemplate2 from "@/app/(templates)/(User)/UserTemplate2";
import dynamic from "next/dynamic";

const componentsFaq = [
  {
    id: "red-faq",
    component: dynamic(() => import("@/app/components/(User)/(Faq)/RedFaq")),
  },
  {
    id: "faq-all",
    component: dynamic(() => import("@/app/components/(User)/(Faq)/FaqAll")),
  },
];

const FaqPage = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.current.observe(el));

    return () => observer.current.disconnect();
  }, []);

  return (
    <UserTemplate2>
      <div className="faq-container py-12 px-10 md:px-20 lg:px-32 mt-24 text-gray-800">
        {componentsFaq.map(({ id, component: Component }) => (
          <div
            key={id}
            id={id}
            className={`fade-in ${
              visibleSections[id] ? "fade-in-visible" : ""
            }`}
            aria-label={`Section ${id}`}
          >
            <Component />
          </div>
        ))}
      </div>
    </UserTemplate2>
  );
};

export default FaqPage;
