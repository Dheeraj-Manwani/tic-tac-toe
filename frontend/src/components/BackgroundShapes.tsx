import { motion } from "motion/react";

export function BackgroundShapes() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.5,
          type: "spring" as const,
          duration: 1.5,
          bounce: 0,
        },
        opacity: { delay: i * 0.5, duration: 0.01 },
      },
    }),
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Cross - Top Left */}
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="absolute top-[10%] left-[5%] opacity-20 rotate-12"
        initial="hidden"
        animate="visible"
      >
        <motion.line
          x1="40"
          y1="40"
          x2="160"
          y2="160"
          stroke="hsl(260,100%,65%)"
          strokeWidth="10"
          strokeLinecap="round"
          variants={draw}
          custom={0}
        />
        <motion.line
          x1="160"
          y1="40"
          x2="40"
          y2="160"
          stroke="hsl(260,100%,65%)"
          strokeWidth="10"
          strokeLinecap="round"
          variants={draw}
          custom={0.5}
        />
      </motion.svg>

      {/* Circle - Bottom Left */}
      <motion.svg
        width="250"
        height="250"
        viewBox="0 0 250 250"
        className="absolute bottom-[15%] left-[10%] opacity-20"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="125"
          cy="125"
          r="100"
          stroke="hsl(180,100%,50%)"
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          variants={draw}
          custom={1.5}
        />
      </motion.svg>

      {/* Square - Top Right */}
      <motion.svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        className="absolute top-[20%] right-[10%] opacity-20 -rotate-12"
        initial="hidden"
        animate="visible"
      >
        <motion.rect
          x="20"
          y="20"
          width="140"
          height="140"
          rx="20"
          stroke="white"
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          variants={draw}
          custom={2.5}
        />
      </motion.svg>

      {/* Decorative Grid/Lines - Bottom Right */}
      <motion.svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="absolute bottom-[-5%] right-[-5%] opacity-10"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M50 250 L250 50"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="20 20"
          variants={draw}
          custom={3}
        />
        <motion.path
          d="M100 250 L250 100"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="20 20"
          variants={draw}
          custom={3.2}
        />
      </motion.svg>
    </div>
  );
}
