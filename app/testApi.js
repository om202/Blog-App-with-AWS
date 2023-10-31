"use client";

import "../configureAmplify";
import { API } from "aws-amplify";
import { listPosts } from "../src/graphql/queries";
import { useState, useEffect } from "react";

export default function TestApi() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const postData = await API.graphql({ query: listPosts });
    setPosts(postData.data.listPosts.items);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h1 className="text-center m-4 text-2xl">My Posts Data</h1>
      <span>
        {posts.map((post, index) => {
          return (
            <div
              className="rounded shadow-lg bg-white mx-auto mx-10 my-4 px-4 py-4 text-black"
              key={index}
            >
              <pre>{JSON.stringify(post, null, 2)}</pre>
            </div>
          );
        })}
      </span>
    </>
  );
}
