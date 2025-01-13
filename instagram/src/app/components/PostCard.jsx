import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TbHeart, TbMessage } from "react-icons/tb";
import { UserContext } from "../contexts/user-context";
import { FcLike } from "react-icons/fc";
import { FiMessageCircle } from "react-icons/fi";
import axios from "axios";
import Image from "next/image";

export const PostCard = ({ post }) => {
  const { user, accessToken } = useContext(UserContext);

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    if (user) {
      const myLike = likes.find((like) => like.user.username === user.username);
      setLiked(Boolean(myLike));
    }
  }, [user, post]);

  const handleLike = () => {
    if (!liked) {
      axios
        .post(`http://localhost:3001/api/posts/${post._id}/likes`, null, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          setLikes([...likes, res.data]);
          setLiked(true);
        });
    } else {
      axios
        .delete(`http://localhost:3001/api/posts/${post._id}/likes`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then(() => {
          setLikes(
            likes.filter((like) => like.user.username === user.username)
          );
          setLiked(false);
        });
    }
    setLiked(!liked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;

    axios
      .post(
        `http://localhost:3001/api/posts/${post._id}/comments`,
        { comment },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setComments([...comments, res.data]);
      });
  };

  return (
    <li className="flex flex-col gap-2 pt-2">
      <div className="flex justify-between items-center">
        <Link className="flex gap-2" href={`/${post.user.username}`}>
          <div>
            <Image
              src={post.user.profileUrl || "/images.png"}
              alt=""
              width={100}
              height={100}
              className="w-6 h-6 rounded-full"
            />
          </div>
          <div className="font-semibold">{post.user.username}</div>
        </Link>
        <button className="py-1 px-[6px] bg-[#363636] rounded-md">
          Follow
        </button>
      </div>
      <Image
        width={400}
        height={400}
        objectFit="contain"
        src={post.mediaUrl}
        alt=""
        className="w-full"
      />
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          {likes.length}{" "}
          <button onClick={handleLike}>
            {liked ? <FcLike /> : <TbHeart />}
          </button>
        </div>
        <div className="flex items-center gap-1">
          {comments.length} <FiMessageCircle />
          <form onSubmit={handleComment}>
            <input type="text" name="comment" className="text-black" />
          </form>
        </div>
      </div>
      <div className="flex gap-1">
        <p className="font-semibold">{post.user.username}</p>
        {post.description}
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <b>{comment.user.username}:</b> {comment.comment}
          </li>
        ))}
      </ul>
    </li>
  );
};
