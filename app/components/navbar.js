import Link from "next/link";
import React, { useState, useEffect } from "react";
import "../../configureAmplify";

export const Navbar = () => {
  return (
    <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500 border-gray-300">
      {[
        ["Home", "/"],
        ["Create Post", "/create-post"],
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
    </nav>
  );
};
