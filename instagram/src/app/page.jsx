"use client";

import { redirect } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "./contexts/user-context";
import { Storys } from "./components/Storys";
import { Posts } from "./components/Posts";
import { MainLayout } from "./common/MainLayout";

export default function Home() {
  const { user } = useContext(UserContext);

  if (!user) {
    return redirect("/signin");
  }

  return (
    <MainLayout>
      <div className="container">
        {/* <Storys /> */}
        <Posts />
      </div>
    </MainLayout>
  );
}
