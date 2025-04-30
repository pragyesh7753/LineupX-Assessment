import { PostCard } from './PostCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { Post } from '../types/Post';

interface PostListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  loaderRef: (node: HTMLDivElement | null) => void;
}

export function PostList({ posts, loading, error, loaderRef }: PostListProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Infinite Scrolling Posts</h1>
      
      {error && <ErrorMessage message={error} />}
      
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      <div ref={loaderRef} className="h-10 w-full">
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
}
