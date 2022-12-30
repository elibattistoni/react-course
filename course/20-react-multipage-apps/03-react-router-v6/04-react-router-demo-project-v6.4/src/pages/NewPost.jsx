import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

import NewPostForm from '../components/NewPostForm';
import { savePost } from '../util/api';

function NewPostPage() {
  const data = useActionData(); // get data returned by the action
  const navigate = useNavigate();
  const navigation = useNavigation(); // this hook returns an object that provides navigation information, i.e. some info about whether our action or our loader functions are currently doing some work

  function cancelHandler() {
    navigate('/blog');
  }

  return (
    <>
      {data && data.status && <p>{data.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        submitting={navigation.state === 'submitting'}
      />
    </>
  );
}

export default NewPostPage;

export async function action({ request }) {

  // this is not a loader function because it is about performing an action after a form was submitted
  const formData = await request.formData();
  const post = {
    title: formData.get('title'),
    body: formData.get('post-text'),
  };
  try {
    await savePost(post);
  } catch (err) {
    if (err.status === 422) {
      return err; // with "return" instead of "throw" you will stay on the page (you don't redirect away and you don't load the error page)
    }
    throw err;
  }
  return redirect('/blog');
}
