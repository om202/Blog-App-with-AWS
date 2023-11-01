"use client";

import { Navbar } from "./components/navbar";
import Profile from "./profile";

export default function Layout({ children}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Profile />
    </>
  );
}
