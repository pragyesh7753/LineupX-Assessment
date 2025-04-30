import { PostList } from './components/PostList';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

function App() {
  const { posts, loading, error, loaderRef } = useInfiniteScroll();

  return (
    <div className="min-h-screen bg-gray-100">
      <PostList 
        posts={posts}
        loading={loading}
        error={error}
        loaderRef={loaderRef}
      />
    </div>
  );
}

export default App;
