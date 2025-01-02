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

interface ShinyPlusButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

const ShinyPlusButton = React.forwardRef<
  HTMLButtonElement,
  ShinyPlusButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      {...animationProps}
      {...props}
      className={cn(
        "relative rounded-lg px-20 py-4 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow",
        "bg-[radial-gradient(circle_at_50%_0%,#704CC47C_0%_0%,transparent_70%)]",
        "hover:shadow-[0_0_40px_#704CC4] dark:hover:shadow-[0_0_20px_#704CC4]",
        className
      )}
    >
      <span
        className="relative block size-full text-sm tracking-wide text-[#000000] dark:font-light dark:text-[#ffffff]"
        style={{
          maskImage:
            "linear-gradient(-75deg,#704CC4 calc(var(--x) + 20%),transparent calc(var(--x) + 30%),#704CC4 calc(var(--x) + 100%))"
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude"
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,#704CC4_10%_calc(var(--x)+10%),#704CC4_50%_calc(var(--x)+50%),#704CC4_10%_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
});

ShinyPlusButton.displayName = "ShinyPlusButton";

export default ShinyPlusButton;
