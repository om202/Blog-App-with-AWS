import Link from "next/link";
import React, { useState, useEffect } from "react";
import "../../configureAmplify";
import { Auth, Hub } from "aws-amplify";

export const Navbar = () => {
  const [signedUser, setSignedUser] = useState(false);

  async function authListener() {
    Hub.listen("auth", data => {
      switch (data.payload.event) {
        case "signIn":
          return setSignedUser(true);
        case "signOut":
          return setSignedUser(false);
      }
    });

    try {
      await Auth.currentAuthenticatedUser();
      setSignedUser(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    authListener();
  }, [signedUser]);

  return (
    <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500 border-gray-300">
      {[
        ["Home", "/"],
        ["Test", "/testApi"],
        ["Profile", "/profile"],
      ].map(([title, url], index) => {
        return (
          <Link href={url} key={index}>
            <span className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:text-slate-900">
              {title}
            </span>
          </Link>
        );
      })}
      {
        signedUser ? (
          <Link href="/profile">
            <span className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:text-slate-900">
              User In
            </span>
          </Link>
        ) : (
          <Link href="/login">
            <span className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:text-slate-900">
              Login
            </span>
          </Link>
        )
      }
    </nav>
  );
};
