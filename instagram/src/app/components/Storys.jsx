import Image from "next/image";
import { StorysStory } from "./Storys-story";
import { UserContext } from "../contexts/user-context";
import { useContext } from "react";

export const Storys = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="py-2 px-3 border-b border-[#363636]">
      <section className="flex">
        <div className="w-20 flex flex-col items-center justify-center gap-2">
          <div className="h-14">
            <Image
              src={user.profileUrl}
              alt=""
              width={56}
              height={56}
              className="rounded-full mb-2 h-full object-cover"
            />
          </div>
          <div className="text-xs font-semibold">Your story</div>
        </div>
      </section>
    </div>
  );
};
