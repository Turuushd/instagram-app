import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between p-4 h-14 border-b border-[#363636] fixed top-0 left-0 right-0 bg-black">
      <div className="flex items-center justify-between max-w-[430px] mx-auto w-full">
        <Link href={"/"}>
          <Image src={"/ig-word.png"} alt="" width={103} height={29} />
        </Link>
        <button
          onClick={() => {
            router.push("/create");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path>
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};
