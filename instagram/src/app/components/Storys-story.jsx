import Image from "next/image";

export const StorysStory = () => {
  return (
    <div className="w-20 flex flex-col items-center justify-center gap-2">
      <div className="h-14">
        <Image
          src={"/pro.jpg"}
          alt=""
          width={56}
          height={56}
          className="rounded-full mb-2 h-full object-cover"
        />
      </div>
      <div className="text-xs">Your story</div>
    </div>
  );
};
