import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TbHeart } from "react-icons/tb";
import { UserContext } from "../contexts/user-context";
import { FcLike } from "react-icons/fc";
import { FiMessageCircle } from "react-icons/fi";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const PostCard = ({ post }) => {
  
  const { user, accessToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState(post.comments);
  const [commentsShown, setCommentsShown] = useState(false);

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (user) {
      const myLike = likes.find((like) => like.user.username === user.username);
      setLiked(Boolean(myLike));
    }
  }, [user, post]);

  const handleLike = () => {
    setLoading(true);
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
          setLoading(false);
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
          setLoading(false);
        });
    }
    setLiked(!liked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!e.target.comment.value.trim()) return;
    setLoading(true);
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
        setLoading(false);
      });

    e.target.comment.value = "";
  };

  const handleFollow = () => {
    axios
      .post(
        "http://localhost:3001/api/users/follow",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        setIsFollowed(res.data.followed);
        toast.success(res.data.message);
      });
  };

  const exisitingUser = user.username === post.user.username;

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
        {!exisitingUser && (
          <button
            className="py-1 px-[6px] bg-[#363636] rounded-md"
            onClick={handleFollow}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </button>
        )}
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
          <button
            disabled={loading}
            onClick={handleLike}
            className="disabled:opacity-50"
          >
            {liked ? <FcLike /> : <TbHeart />}
          </button>
        </div>

        {!commentsShown && (
          <p
            onClick={() => {
              setCommentsShown(true);
            }}
            className="flex gap-2 items-center cursor-pointer"
          >
            <FiMessageCircle /> Show comments...
          </p>
        )}
      </div>
      <div className="flex gap-1">
        <p className="font-semibold">{post.user.username}</p>
        {post.description}
      </div>
      <p>{dayjs(post.createdAt).fromNow()}</p>
      {commentsShown && (
        <>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <b>{comment.user.username}:</b> {comment.comment}
              </li>
            ))}
          </ul>
          <form onSubmit={handleComment}>
            <input
              disabled={loading}
              type="text"
              name="comment"
              className="bg-black"
              placeholder="Write comment"
            />
          </form>
        </>
      )}
    </li>
  );
};
