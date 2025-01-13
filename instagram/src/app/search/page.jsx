"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { MainLayout } from "../common/MainLayout";

const Page = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <MainLayout>
      <div className="w-[374px] relative mb-1">
        <input
          type="text"
          className="bg-[#363636] m-2 w-[374px] rounded-lg pl-8 py-1"
          placeholder="Search"
        />
        <CgSearch className="absolute top-4 left-4" />
      </div>
      <ul className="grid grid-cols-3">
        {posts.map((post, index) => (
          <li key={index} className="border border-black">
            <Image
              src={post.mediaUrl}
              alt=""
              width={300}
              height={300}
              className="aspect-square object-cover"
            />
          </li>
        ))}
      </ul>
    </MainLayout>
  );
};

export default Page;
