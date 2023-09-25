"use client";
import Button from "@/components/Button";
import DesignIcon from "@/components/Design_Icon";
import Scene from "@/components/Scene";
import { selectTShirtColor } from "@/lib/slices/targetSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const container = {
  hidden: {},
  show: {
    transition: {
      delay: 0.3,
      delayChildren: 0.6,
      staggerChildren: 0.3,
    },
  },
};
const container2 = {
  hidden: {},
  show: {
    transition: {
      delay: 0.3,
      staggerChildren: 0.3,
    },
  },
};
const colorContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      type: "spring",
      damping: 35,
      stiffness: 160,
    },
  },
};
const colorContainer2 = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
      type: "spring",
      damping: 35,
      stiffness: 160,
    },
  },
};
const designsContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      type: "spring",
      damping: 35,
      stiffness: 160,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
const slidingItem = {
  hidden: {
    opacity: 0,
    x: "-25%",
    transition: {
      type: "spring",
      damping: 35,
      stiffness: 160,
    },
  },
  show: {
    opacity: 1,
    x: "0%",
    transition: {
      type: "spring",
      damping: 35,
      stiffness: 160,
    },
  },
};
const slidingItem2 = {
  hidden: {
    opacity: 0,
    x: "25%",
    transition: {
      type: "spring",
      damping: 35,
      stiffness: 160,
    },
  },
  show: {
    opacity: 1,
    x: "0%",
    transition: {
      type: "spring",
      damping: 35,
      stiffness: 160,
    },
  },
};
const ColorItem = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 160,
    },
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 160,
    },
  },
};
const DesignItem = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 160,
    },
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 160,
    },
  },
};

export default function Home() {
  const color = useAppSelector(selectTShirtColor);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setDisabled(true);
    }, 2500);
  }, []);

  return (
    <div className="flex h-full mx-auto items-center justify-center w-full py-24 max-w-5xl">
      {/* Left - TSHIRT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-5/12 h-full flex flex-col items-center justify-center gap-y-14"
      >
        <motion.div
          variants={container2}
          initial="hidden"
          animate="show"
          className="flex gap-y-5 items-center text-center flex-col justify-center"
        >
          <motion.h2
            variants={slidingItem}
            className="text-3xl font-bold text-slate-400/75 uppercase"
          >
            T-Shirt builder
          </motion.h2>
          <motion.h1
            variants={slidingItem2}
            className="text-8xl font-black leading-[84px] text-slate-900"
          >
            Custom
            <br />
            T-Shirt
          </motion.h1>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center gap-x-6 gap-y-4"
        >
          <Colors />
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center gap-x-6 gap-y-4"
        >
          <Designs />
        </motion.div>
      </motion.div>
      {/* Right - TSHIRT */}
      <div className="relative flex items-center h-full w-full overflow-visible">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 100,
            restDelta: 0.001,
          }}
          style={{ backgroundColor: color, opacity: 0.7, translateY: "-50%" }}
          className={`absolute max-h-[900px] top-1/2 right-0 w-8/12 h-full rounded-xl`}
        />
        {disabled && <Scene className={"max-h-[900px]"} />}
      </div>
    </div>
  );
}

const Colors = () => {
  return (
    <>
      <motion.div variants={colorContainer} className="flex gap-x-6">
        <Button variants={ColorItem} id={"orange"} ColorHex={"#f97316"} />
        <Button
          variants={ColorItem}
          ColorHex={"#f43f5e"}
          id={"rose"}
          className={""}
          checked={false}
          Color={"bg-rose-500 ring-rose-500"}
        />
        <Button
          variants={ColorItem}
          ColorHex={"#000"}
          id={"black"}
          className={""}
          checked={true}
          Color={"bg-black ring-black"}
        />
      </motion.div>
      <motion.div variants={colorContainer2} className="flex gap-x-6">
        <Button
          variants={ColorItem}
          ColorHex={"#64748b"}
          id={"slate"}
          className={""}
          checked={false}
          Color={"bg-slate-500 ring-slate-500"}
        />
        <Button
          variants={ColorItem}
          ColorHex={"#78716c"}
          id={"stone"}
          className={""}
          checked={false}
          Color={"bg-stone-500 ring-stone-500"}
        />
        <Button
          variants={ColorItem}
          ColorHex={"#14b8a6"}
          id={"teal"}
          className={""}
          checked={false}
          Color={"bg-teal-500 ring-teal-500"}
        />
      </motion.div>
    </>
  );
};
const Designs = () => {
  return (
    <motion.div variants={designsContainer} className="flex gap-x-6">
      <DesignIcon
        variants={DesignItem}
        id={"1"}
        Icon={"/textures/1.png"}
        design={1}
        checked={true}
      />
      <DesignIcon
        variants={DesignItem}
        id={"2"}
        Icon={"/textures/2.png"}
        design={2}
        checked={false}
      />
      <DesignIcon
        variants={DesignItem}
        id={"3"}
        Icon={"/textures/3.png"}
        design={3}
        checked={false}
      />
      <DesignIcon
        variants={DesignItem}
        id={"4"}
        Icon={"/textures/4.png"}
        design={4}
        checked={false}
      />
    </motion.div>
  );
};
