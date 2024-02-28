import { ReactNode, useEffect, useState } from "react";
import get from "./utils/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPost, setFetchedPost] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsFetching(true);
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as RawDataPost[];

        const blogPosts: BlogPost[] = data.map((rawPosts) => {
          return {
            id: rawPosts.id,
            title: rawPosts.title,
            text: rawPosts.body,
          };
        });
        setFetchedPost(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    };

    fetchPosts();
  }, []);

  if (error) {
    return <ErrorMessage text={error} />;
  }

  let contentFetching: ReactNode;

  if (fetchedPost) {
    contentFetching = <BlogPosts posts={fetchedPost} />;
  }

  if (isFetching) {
    return <p id="loading-fallback ">Fetching posts.........</p>;
  }

  return (
    <main>
      <img src={fetchingImg} alt="Fetching process image" />
      {contentFetching}
    </main>
  );
}

export default App;
