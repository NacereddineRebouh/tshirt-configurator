"use client";
import { setDesign } from "@/lib/slices/targetSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface IDesignIconProps {
  design: number;
  checked: boolean;
  id: string;
  Icon: string;
  variants?: any;
}

const DesignIcon: React.FunctionComponent<IDesignIconProps> = ({
  design = 1,
  Icon = "/textures/1.png",
  checked = false,
  id,
  variants,
}) => {
  const dispatch = useAppDispatch();
  const [Checked, setChecked] = React.useState(checked);
  return (
    <>
      <motion.div variants={variants} className="flex gap-x-6">
        <label
          htmlFor={id}
          className={
            "relative col-span-2 col-start-1 aspect-square w-16 cursor-pointer"
          }
        >
          <input
            type="radio"
            name="Design"
            id={id}
            defaultChecked={checked}
            className="peer opacity-0 absolute w-0 h-0"
            onChange={(e) => {
              setChecked(e.currentTarget.checked);
              dispatch(setDesign(design));
            }}
          />
          <div
            className={`w-full relative hover:bg-slate-100 hover:scale-110 p-2 h-full mx-auto rounded-full active:scale-95 transition-all duration-200 aspect-square${
              Checked
                ? "peer-checked:scale-110 peer-checked:bg-slate-100"
                : "scale-100"
            }`}
          >
            <Image
              src={Icon}
              alt={"icon"}
              className="object-cover w-full h-full"
              height={100}
              width={100}
            />
          </div>
        </label>
      </motion.div>
    </>
  );
};

export default DesignIcon;
