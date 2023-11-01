"use client";

import { Navbar } from "./components/navbar";
import CreatePost from "./createPost";
import Profile from "./profile";
import TestApi from "./testApi";

export default function Layout({ children}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Profile /> */}
      {/* <CreatePost /> */}
      <TestApi />
    </>
  );
}
