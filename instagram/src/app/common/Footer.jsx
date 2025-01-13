"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CgHome, CgLogOut, CgSearch } from "react-icons/cg";
import { UserContext } from "../contexts/user-context";

export const Footer = () => {
  const { user, setAccessToken } = useContext(UserContext);
  const handleExit = () => {
    if (confirm("Are you sure?")) {
      setAccessToken("");
    }
  };
  return (
    <footer className="flex justify-between items-center border-t p-4 border-[#363636] fixed bottom-0 left-0 right-0 bg-black">
      <div className="flex justify-between items-center max-w-[430px] mx-auto w-full">
        <button onClick={handleExit}>
          <CgLogOut size={20} />
        </button>
        <Link href={"/"}>
          <CgHome size={20} />
        </Link>
        <Link href={"/search"}>
          <CgSearch size={20} />
        </Link>
        <Link href={`/${user?.username}`}>
          <Image
            src={user?.profileUrl || "/images.png"}
            alt=""
            width={100}
            height={100}
            className="w-5 h-5 rounded-full"
          />
        </Link>
      </div>
    </footer>
  );
};
