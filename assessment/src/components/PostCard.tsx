import { Post } from '../types/Post';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2 text-blue-600">{post.title}</h2>
      <p className="text-gray-700">{post.body}</p>
      <div className="mt-2 text-sm text-gray-500">
        Post ID: {post.id} | User ID: {post.userId}
      </div>
    </div>
  );
}
