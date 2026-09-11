import "../styles/CommentsList.css";

export default function CommentsList({ blog, onBack }) {
  if (!blog) {
    return (
      <div className="comments">
        <p>No entry selected. Go to Blog List and choose a comment count to view.</p>
        <button className="comments-back" onClick={onBack}>← Back to Blog List</button>
      </div>
    );
  }

  return (
    <div className="comments">
      <button className="comments-back" onClick={onBack}>← Back to Blog List</button>

      <p className="comments-kicker">Comments on</p>
      <h1>{blog.title}</h1>
      <p className="comments-count">{blog.comments.length} comment(s)</p>

      <div className="comments-items">
        {blog.comments.length > 0 ? (
          blog.comments.map((comment) => (
            <div className="comment-item" key={comment.id}>
              <div className="comment-avatar">{comment.name.charAt(0)}</div>
              <div className="comment-body">
                <div className="comment-head">
                  <strong>{comment.name}</strong>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p>{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="comments-empty">No comments yet on this entry.</p>
        )}
      </div>
    </div>
  );
}
