"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoTextMask } from "@/components/landing/video-text-mask";
import { LandingHeader } from "@/components/landing/landing-header";
import { SlidingCarousel } from "@/components/landing/carousel/sliding-carousel";
import { CARDS_11 } from "@/components/landing/carousel/cards.config";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const carouselSectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !textMaskRef.current || !headerRef.current) {
      // If reduced motion is preferred, show header immediately
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 1, y: 0 });
      }
      return;
    }

    const textElement = textMaskRef.current;
    const headerElement = headerRef.current;

    // Create GSAP timeline for the scroll animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onEnter: () => {
          // Animate text and header on first scroll
          const tl = gsap.timeline();

          // Scale and fade out text (0.3s)
          tl.to(textElement, {
            scale: 1.1,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          // Simultaneously bring down header (0.35s)
          tl.to(
            headerElement,
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
            },
            "<" // Start at the same time as text animation
          );
        },
      },
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (
      prefersReducedMotion ||
      !carouselSectionRef.current ||
      !headerRef.current
    ) {
      return;
    }

    // Carousel entrance animation
    gsap.fromTo(
      carouselSectionRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: carouselSectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [prefersReducedMotion]);

  // Create carousel slides from cards config
  const carouselSlides = CARDS_11.map((card) => ({
    id: card.key,
    content: (
      <Link
        href={card.href}
        className="block h-full"
        aria-label={`انتقل إلى ${card.title}`}
      >
        <div className="flex items-center justify-center h-[300px] sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
          <div className="text-center px-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {card.title}
            </h3>
            <p className="mt-4 text-sm sm:text-base text-gray-600">
              اضغط للدخول
            </p>
          </div>
        </div>
      </Link>
    ),
    title: card.title,
  }));

  return (
    <div className="bg-white min-h-screen">
      {/* Header - starts hidden and comes down on scroll */}
      <LandingHeader ref={headerRef} />

      {/* Hero Section - Video Text Mask */}
      <section
        ref={heroRef}
        className="relative w-full h-screen bg-white overflow-hidden"
      >
        <VideoTextMask
          ref={textMaskRef}
          videoSrc="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4"
          text="النسخة"
          className="w-full h-full"
        />
      </section>

      {/* Carousel Section */}
      <section
        ref={carouselSectionRef}
        className="relative w-full py-16 sm:py-24 lg:py-32 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              استكشف أدواتنا
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              اختر الأداة المناسبة لمشروعك الإبداعي
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SlidingCarousel
              slides={carouselSlides}
              autoPlay={!prefersReducedMotion}
              autoPlayInterval={5000}
              showControls={true}
              showIndicators={true}
              dragEnabled={true}
              className="rounded-2xl overflow-hidden"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} النسخة - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
}
