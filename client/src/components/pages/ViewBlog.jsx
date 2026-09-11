import "../styles/ViewBlog.css";

export default function ViewBlog({ blog, onBack, onLike, onViewComments }) {
  if (!blog) {
    return (
      <div className="viewblog">
        <div className="viewblog-content">
          <h2>No entry selected</h2>
          <p>Go back to the journal and pick something to read.</p>
          <button className="viewblog-back" onClick={onBack}>← Back to Journal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="viewblog">
      <div className="viewblog-content">
        <button className="viewblog-back" onClick={onBack}>← Back to Journal</button>

        <p className="viewblog-category">{blog.category}</p>
        <h1>{blog.title}</h1>

        <div className="viewblog-meta">
          <span>{blog.author}</span>
          <span className="dot">·</span>
          <span>{blog.date}</span>
        </div>

        <div className="viewblog-stats">
          <span>{blog.views} views</span>
          <span className="dot">·</span>
          <span>{blog.likes} likes</span>
          <span className="dot">·</span>
          <button className="viewblog-stat-link" onClick={() => onViewComments?.(blog)}>
            {blog.comments.length} comments
          </button>
        </div>

        <hr />

        <p className="viewblog-desc">{blog.description}</p>

        <div className="viewblog-body">
          <p>
            This entry is part of an ongoing series on {blog.category.toLowerCase()}.
            The goal isn't to be exhaustive — it's to write down the one or two things
            that would have saved time if known earlier.
          </p>
          <p>
            If something here doesn't hold up, or you'd add a caveat, the comments
            section is open below.
          </p>
        </div>

        {onLike && (
          <button className="viewblog-like" onClick={() => onLike(blog.id)}>
            ♡ Like this entry
          </button>
        )}
      </div>
    </div>
  );
}
