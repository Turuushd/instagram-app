"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import axios from "axios";
import { useParams } from "next/navigation";
import { MainLayout } from "../common/MainLayout";

const Page = () => {
  const { username } = useParams();
  const { user: currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/users/" + username).then((res) => {
      setUser(res.data);
    });
  }, [username]);

  useEffect(() => {
    if (user !== null) {
      axios
        .get("http://localhost:3001/api/posts/user/" + user._id)
        .then((res) => {
          setPosts(res.data);
        })
        .catch(() => {
          setPosts([]);
        });
    }
  }, [user]);

  if (!user) return null;

  const isOwner = currentUser._id === user._id;

  return (
    <MainLayout>
      <main className="p-4">
        <div className="flex gap-4">
          <div>
            <Image
              src={user.profileUrl || "/images.png"}
              alt=""
              width={100}
              height={100}
              className="border w-[100px] h-[100px] rounded-full object-cover"
            />
            <div className="text-base font-semibold text-center mt-2">{user.fullname}</div>
          </div>
          <div>
            <h1 className="font-bold text-2xl">{user.username}</h1>
            {isOwner && (
              <div>
                <button>Edit profile</button>
              </div>
            )}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div>0</div>
                <div>posts</div>
              </div>
              <div className="flex flex-col items-center">
                <div>0</div>
                <div>followers</div>
              </div>
              <div className="flex flex-col items-center">
                <div>0</div>
                <div>following</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-4">
          {posts.map((post) => {
            return (
              <div key={post._id} className="border border-black">
                <Image
                  src={post.mediaUrl}
                  alt={post.description}
                  width={300}
                  height={300}
                  className="aspect-square object-cover"
                />
              </div>
            );
          })}
        </div>
      </main>
    </MainLayout>
  );
};

export default Page;
