import { useLoaderData } from 'react-router-dom';

import BlogPost from '../components/BlogPost';
import { getPost } from '../util/api';

function PostDetailPage() {
  const postData = useLoaderData();

  return (
    <>
      <BlogPost title={postData.title} text={postData.body} />
    </>
  );
}

export default PostDetailPage;

export function loader({ params }) {
    // NB "loader" the name is just a convention, you can use whatever name you want
  const postId = params.id; //NB "id" because the path parameter when you call the PostDetailPage component in the Route in the App component has ":id" as parameter
  return getPost(postId);
}
