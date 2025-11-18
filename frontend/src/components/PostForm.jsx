import React, { useState } from "react";
import { useCreatePostMutation } from "../features/api/apiSlice";

export default function PostForm() {
  const [content, setContent] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await createPost({ content }).unwrap();
      setContent("");
    } catch (err) {
      console.error("Failed to create post", err);
      alert("Could not create post — check console.");
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-md border">
      <textarea
        className="w-full resize-none border rounded p-3 focus:outline-none"
        placeholder="What's on your mind?"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
