import { useRef } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const emailEl = useRef();
  const fetcher = useFetcher(); // this hook can be used to manually trigger form submission or build a form using fetcher.Form (ideal for pages where you want to send requests without switching the page)

  function signupForNewsletterHandler(event) {
    event.preventDefault();
    const enteredEmail = emailEl.current.value;
    // could validate input here
    fetcher.submit(
      // better: use fetcher.Form instead
      { email: enteredEmail },
      { method: 'post', action: '/newsletter' }
    );
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up for our weekly newsletter</h2>
      <form onSubmit={signupForNewsletterHandler}>
        <input
          ref={emailEl}
          id="email"
          type="email"
          placeholder="Your email"
          aria-label="Your email address."
        />
        <button>Sign Up</button>
      </form>
    </section>
  );
}

export default NewsletterSignup;
