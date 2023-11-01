"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { createPost } from "@/src/graphql/mutations";
import dynamic from "next/dynamic";
const SimpleMdeReact = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false } // This will prevent the component from being rendered on the server.
);
import "easymde/dist/easymde.min.css";

function CreatePost() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [coverImage, setCoverImage] = useState("testimage");

  async function createNewPost() {
    if (!title || !post) return;
    if(!username) {
      console.error("Check Sign In");
      return;
    }
    const id = uuid();
    console.log("title content", {
      input: { title: title || "", content: post || "", id: id },
    });
    try {
      await API.graphql({
        query: createPost,
        variables: {
          input: {
            id: id,
            title: title,
            content: post,
            username: username,
            coverImage: coverImage,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (err) {
      console.log("Error in createPost ", err);
    }
  }

  useEffect(() => {
    const auth = Auth.currentAuthenticatedUser()
    auth.then((data) => {
      setUsername(data.username);
    });
  }, []);

  return (
    <div className="m-10">
      <h1 className="text-3xl font-semibold tracking-wide mt-6">
        Create New Post
      </h1>
      <input
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        placeholder="Title"
        value={title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <SimpleMdeReact value={post} onChange={(e) => setPost(e)} />
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={() => createNewPost()}
      >
        Create Post
      </button>
    </div>
  );
}

export default withAuthenticator(CreatePost);
