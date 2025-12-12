// src/pages/Blog.jsx
import { PostList } from "../components/PostList.jsx";
import { CreatePost } from "../components/CreatePost.jsx";
import { PostFilter } from "../components/PostFilter.jsx";
import { PostSorting } from "../components/PostSorting.jsx";

import { Header } from "../components/Header.jsx";

import { useSocket } from "../contexts/SocketContext.jsx";
import { useApolloClient } from "@apollo/client/react/index.js";

import { useState, useEffect } from "react";

import { useQuery as useGraphQLQuery } from "@apollo/client/react/index.js";
import { GET_POSTS, GET_POSTS_BY_AUTHOR } from "../api/graphql/posts.js";

import { Helmet } from "react-helmet-async";
import { NotificationBanner } from "../components/Notification.jsx";

export function Blog() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");
  const [newPostNotification, setNewPostNotification] = useState(null);

  const socket = useSocket();
  const client = useApolloClient();

  useEffect(() => {
    if (!socket) return;

    const handleNewPost = (data) => {
      setNewPostNotification(data);

      client.cache.evict({ fieldName: "posts" });
      client.cache.evict({ fieldName: "postsByAuthor" });
      client.cache.gc();

      setTimeout(() => {
        setNewPostNotification(null);
      }, 10000);
    };

    socket.on("newPostNotification", handleNewPost);

    return () => {
      socket.off("newPostNotification", handleNewPost);
    };
  }, [socket, client]);

  const postsQuery = useGraphQLQuery(author ? GET_POSTS_BY_AUTHOR : GET_POSTS, {
    variables: { author, options: { sortBy, sortOrder } },
  });
  const posts = postsQuery.data?.postsByAuthor ?? postsQuery.data?.posts ?? [];

  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>Full-Stack React Blog</title>
        <meta
          name="description"
          content="A blog full of articles about full-stack React development."
        />
      </Helmet>
      <Header />
      <br />
      {newPostNotification && (
        <NotificationBanner
          title={newPostNotification.title}
          postId={newPostNotification.id}
        />
      )}
      <br />
      <hr />
      <br />
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter
        field="author"
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={["createdAt", "updatedAt", "likedBy.length"]}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  );
}
