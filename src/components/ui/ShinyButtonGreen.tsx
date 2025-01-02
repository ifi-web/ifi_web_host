"use client";

import React from "react";
import {
  motion,
  type AnimationProps,
  type HTMLMotionProps
} from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 300,
      damping: 5,
      mass: 0.5
    }
  }
} as AnimationProps;

interface ShinyButtonGreenProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

const ShinyButtonGreen = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonGreenProps
>(({ children, className, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      {...animationProps}
      {...props}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow",
        "bg-[radial-gradient(circle_at_50%_0%,hsl(var(--highlight)/20%)_0%,transparent_60%)]",
        "hover:shadow-[0_0_40px_hsl(var(--highlight)/100%)] dark:hover:shadow-[0_0_20px_hsl(var(--highlight)/20%)]",
        className
      )}
    >
      <span
        className="relative block size-full text-sm tracking-wide text-[rgb(39,206,145)] dark:font-light dark:text-[rgb(39,206,145,90%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--highlight)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--highlight)) calc(var(--x) + 100%))"
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude"
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--highlight)/10%)_calc(var(--x)+10%),hsl(var(--highlight)/50%)_calc(var(--x)+50%),hsl(var(--highlight)/10%)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
});

ShinyButtonGreen.displayName = "ShinyButtonGreen";

export default ShinyButtonGreen;
