import { Form } from 'react-router-dom';
// %% the Form component is a new component provided by v6.4 that helps with form and form submission

import classes from './NewPostForm.module.css';

function NewPostForm({ onCancel, submitting }) {
  return (
    <Form className={classes.form} method="post" action="/blog/new">
        {/* action defines the path to which the request will be sent -- but 
        this is still clinet-side code, no request will be sent anywhere.
        react router will generate a request object that contains all the form data, but it will not send the request to any backend.
        instead, it will send the request to an action function defined by us, in which you then forward it to the backend or do something else
        */}
      <fieldset>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required minLength={5} />
      </fieldset>
      <fieldset>
        <label htmlFor="text">Post Text</label>
        <textarea
          id="text"
          name="post-text"
          required
          minLength={10}
          rows={5}
        ></textarea>
      </fieldset>
      <button type="button" onClick={onCancel} disabled={submitting}>
        Cancel
      </button>
      <button disabled={submitting}>
        {submitting ? 'Submitting...' : 'Create Post'}
      </button>
    </Form>
  );
}

export default NewPostForm;
