import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams();
  const { quoteId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    // whenever a comment is added, the comments should be updated
    // and we can send a new request for this
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  //NB you must wrap this handler function with useCallback because we are passing it through props to the NewCommentForm component
  //NB which uses it as a dependency in useEffect: we must wrap it with useCallback in order to avoid an infinite loop
  //NB useCallback ensures that this function is not recreated every time that this component is re-evaluated

  let comments;

  if (status === "pending")
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = (
      <p className="centered">
        So far, no comments have been added to this quote.
      </p>
    );
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
