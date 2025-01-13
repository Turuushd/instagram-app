"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ImageUploader } from "./ImageUploader";
import { UserContext } from "../contexts/user-context";

const CreatePage = () => {
  const { accessToken } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/posts",
        {
          description,
          mediaUrl,
        },
        { headers: { Authorization: "Bearer " + accessToken } }
      );
      toast.success("Amjilttai post hiilee");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Nemehed aldaa garlaa!");
    }
  };

  return (
    <>
      <header className="flex justify-between items-center py-2 px-4 border-b border-[#363636]">
        <button onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </button>

        <p className="font-semibold">New post</p>

        <button onClick={handleSubmit} className="font-semibold text-[#0095f6]">
          Share
        </button>
      </header>

      <main className="p-4">
        <ImageUploader setMediaUrl={setMediaUrl} />
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-full border rounded resize-none bg-black text-white"
        />
      </main>
    </>
  );
};

export default CreatePage;
