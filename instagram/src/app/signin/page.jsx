"use client";

import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/user-context";
import { redirect } from "next/navigation";

export default function SigninPage() {
  const { user, setAccessToken } = useContext(UserContext);

  if (user) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen flex-col">
      <div className="py-[10px] border border-[#545454] rounded-[1px]">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const credential = e.target.credential.value;
              const password = e.target.password.value;

              axios
                .post(`${process.env.NEXT_PUBLIC_API}/signin`, {
                  credential,
                  password,
                })
                .then((res) => {
                  toast.success(res.data.message);
                  setAccessToken(res.data.accessToken);
                })
                .catch((err) => {
                  toast.error(err.response.data.message);
                });
            }}
            className="flex flex-col mt-6"
          >
            <label className="mx-10 mb-2 border border-[#545454] rounded-[2px]">
              <input
                name="credential"
                type="text"
                className="text-[#a8a8a8] text-xs w-full bg-black py-2 pl-2"
                placeholder="Phone number, username, or email"
              />
            </label>

            <label className="mx-10 mb-2 border border-[#545454] rounded-[2px]">
              <input
                name="password"
                type="password"
                className="text-[#a8a8a8] text-xs w-full bg-black py-2 pl-2"
                placeholder="Password"
              />
            </label>

            <div className="mx-10 my-2">
              <button className="bg-[#0095f6] text-white rounded-lg w-full py-2 text-sm font-semibold opacity-70">
                Log in
              </button>
            </div>
          </form>
        </div>
        <div className="mx-10 mt-3 mb-5">
          <div className="flex items-center">
            <div className="w-[109px] h-[1px] bg-[#262626]" />
            <div className="mx-4 text-[#a8a8a8] text-xs font-semibold">OR</div>
            <div className="w-[109px] h-[1px] bg-[#262626]" />
          </div>
        </div>
        <div className="mx-10 my-2">
          <button className="w-full">
            <div className="flex justify-center items-center gap-2">
              <div>
                <svg
                  aria-label="Log in with Facebook"
                  fill="#0095f6"
                  height="20"
                  role="img"
                  viewBox="0 0 16 16"
                  width="20"
                >
                  <g clipPath="url(#a)">
                    <path
                      d="M8 0C3.6 0 0 3.6 0 8c0 4 2.9 7.3 6.8 7.9v-5.6h-2V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V8h2.2l-.4 2.3H9.2v5.6C13.1 15.3 16 12 16 8c0-4.4-3.6-8-8-8Z"
                      fill="#0095f6"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="a">
                      <rect fill="currentColor" height="16" width="16"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="text-[#0095f6] font-semibold text-sm">
                Log in with Facebook
              </div>
            </div>
          </button>
        </div>
        <Link href={"#"} className="my-3 flex justify-center">
          Forgot password?
        </Link>
      </div>
      <div className="my-4">
        Don&rsquo;t have an account? <Link href={"/signup"}>Sign up</Link>
      </div>
    </div>
  );
}
