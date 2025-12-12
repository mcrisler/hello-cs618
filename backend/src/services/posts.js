// backend/src/services/posts.js
import { Post } from "../db/models/post.js";
import { User } from "../db/models/user.js";
import mongoose from "mongoose";
import { getSocketIO } from "../socket.js";
export async function createPost(
  userId,
  { title, contents, tags, image, ingredients },
) {
  const post = new Post({
    title,
    author: userId,
    contents,
    tags,
    image,
    ingredients,
  });
  const newPost = await post.save();
  const io = getSocketIO();
  io.emit("newPostNotification", {
    title: newPost.title,
    author: userId,
    id: newPost._id,
  });
  console.log(
    `Socket.IO emitted: newPostNotification for post "${newPost.title}"`,
  );
  return newPost;
}
async function listPosts(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {},
) {
  let sortField = sortBy;
  const sortValue = sortOrder === "descending" ? -1 : 1;

  let sortCriteria = {};

  if (sortField === "likedBy.length") {
    sortField = "likeCount";

    sortCriteria = {
      [sortField]: sortValue,
      createdAt: -1,
    };
  } else {
    sortCriteria = {
      [sortField]: sortValue,
    };
  }
  return await Post.find(query).sort(sortCriteria);
}
export async function listAllPosts(options) {
  return await listPosts({}, options);
}

export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername });
  if (!user) return [];
  return await listPosts({ author: user._id }, options);
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options);
}

export async function getPostById(postId) {
  return await Post.findById(postId);
}

export async function updatePost(userId, postId, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  );
}

export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId });
}
export const likePost = async (postId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new Error("Invalid Post ID");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { likedBy: userId },
      $inc: { likeCount: 1 },
    },
    { new: true },
  );
  if (!updatedPost) {
    throw new Error("Post not found");
  }
  return updatedPost;
};
