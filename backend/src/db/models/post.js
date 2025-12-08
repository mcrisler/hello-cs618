// backend/src/db/models/post.js
import mongoose, { Schema } from "mongoose";
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    contents: String,
    tags: [String],
    image: String,
    ingredients: String,
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // array of user IDs to make sure users can only like a post once
    likeCount: { type: Number, default: 0 }, // total like count for each post used for the sorting function
  },
  { timestamps: true },
);
export const Post = mongoose.model("Post", postSchema, "posts");
