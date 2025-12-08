// backend/src/graphql/post.js
import { getUserInfoById } from "../services/users.js";
export const postSchema = `#graphql
 type Post {
 id: ID!
 title: String!
 author: User
 contents: String
 tags: [String!]
 createdAt: Float
 updatedAt: Float
 likedBy: [ID!] 
 likeCount: Int! 
 }
`;
export const postResolver = {
  Post: {
    author: async (post) => {
      return await getUserInfoById(post.author);
    },
  },
};
