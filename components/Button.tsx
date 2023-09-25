"use client";
import { selectTShirtColor, setTShirtColor } from "@/lib/slices/targetSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { motion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface IButtonProps {
  className?: string;
  Color?: string;
  ColorHex: string;
  id: string;
  checked?: boolean;
  variants?: any;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  Color,
  id,
  className,
  checked,
  ColorHex,
  variants,
}) => {
  const dispatch = useAppDispatch();
  const [Checked, setChecked] = useState(checked);
  return (
    <motion.label
      variants={variants}
      htmlFor={id}
      className={twMerge(
        "relative col-span-2 col-start-1 aspect-square w-20 cursor-pointer",
        className
      )}
    >
      <input
        type="radio"
        name="Color"
        id={id}
        defaultChecked={checked}
        className="peer opacity-0 absolute w-0 h-0"
        onChange={(e) => {
          setChecked(e.currentTarget.checked);
          dispatch(setTShirtColor(ColorHex));
        }}
      />
      <div
        className={twMerge(
          `w-full h-full mx-auto rounded-full border-[7px] transition-all duration-200 border-white aspect-square bg-orange-500 ${
            Checked ? "peer-checked:ring-[6px]" : "ring-0"
          } ring-orange-500`,
          Color
        )}
      ></div>
    </motion.label>
  );
};

export default React.memo(Button);
