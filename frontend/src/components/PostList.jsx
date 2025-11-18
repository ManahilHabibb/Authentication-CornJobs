import React from "react";
import { useGetPostsQuery } from "../features/api/apiSlice";

export default function PostList() {
  const { data = [], isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <div className="p-4">Loading posts...</div>;
  if (isError) return <div className="p-4">Error loading posts.</div>;

  return (
    <div className="space-y-4">
      {data.length === 0 && <div className="p-4 text-gray-500">No posts yet — be first!</div>}
      {data.map((p) => (
        <article key={p._id} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</div>
          <p className="mt-2 text-gray-800">{p.content}</p>
        </article>
      ))}
    </div>
  );
}
