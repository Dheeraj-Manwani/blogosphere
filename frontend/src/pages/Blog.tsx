import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Skeletons } from "../components/Skeletons";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) return <Skeletons type="full-blog" />;

  return (
    <div>
      {/*@ts-ignore*/}
      <FullBlog blog={blog} />
    </div>
  );
};
