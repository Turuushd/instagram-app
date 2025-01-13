import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbHeart, TbMessageCircle, TbSend } from "react-icons/tb";
import { PostCard } from "./PostCard";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="px-3">
      <ul className="flex flex-col gap-6">
        {posts
          .filter((post) => Boolean(post.mediaUrl))
          .map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
      </ul>
    </div>
  );
};
