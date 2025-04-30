import { useEffect, useState, useRef, useCallback } from 'react';
import { Post } from '../types/Post';
import { fetchPosts } from '../services/api';

interface UseInfiniteScrollReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loaderRef: (node: HTMLDivElement | null) => void;
}

export function useInfiniteScroll(initialLimit = 10): UseInfiniteScrollReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  const observer = useRef<IntersectionObserver | null>(null);
  
  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const newPosts = await fetchPosts(page, initialLimit);
      
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => {
          // Create a Set of existing post IDs to prevent duplicates
          const existingIds = new Set(prevPosts.map(post => post.id));
          // Filter out any duplicate posts
          const uniqueNewPosts = newPosts.filter(post => !existingIds.has(post.id));
          return [...prevPosts, ...uniqueNewPosts];
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, initialLimit]);

  // Load initial posts
  useEffect(() => {
    loadPosts();
  }, [page, loadPosts]);

  // Setup IntersectionObserver to detect when we should load more posts
  const loaderRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { rootMargin: '100px' });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  return { posts, loading, error, hasMore, loaderRef };
}
