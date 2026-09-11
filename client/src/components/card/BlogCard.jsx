import "../styles/BlogCard.css";

export default function BlogCard({
  title,
  author,
  date,
  category,
  description,
  views,
  likes,
  commentCount,
  featured,
  onViewBlog,
  onLike,
  onEdit,
  onDelete,
  onViewComments,
}) {
  return (
    <article className={`blog-card ${featured ? "blog-card-featured" : ""}`}>
      {category && <span className="blog-card-category">{category}</span>}

      <h2 className="blog-card-title" onClick={onViewBlog}>
        {title}
      </h2>

      <p className="blog-card-meta">
        {author} · {date}
      </p>

      <p className="blog-card-desc">{description}</p>

      <div className="blog-card-footer">
        <div className="blog-card-stats">
          <span>{views} views</span>
          <span className="dot">·</span>
          <span>{likes} likes</span>
          {commentCount !== undefined && (
            <>
              <span className="dot">·</span>
              <button className="blog-card-stat-link" onClick={onViewComments}>
                {commentCount} comments
              </button>
            </>
          )}
        </div>

        <div className="blog-card-actions">
          <button className="blog-card-link" onClick={onViewBlog}>
            Read entry →
          </button>
          {onLike && (
            <button className="blog-card-iconbtn" onClick={onLike} aria-label="Like this post">
              ♡ Like
            </button>
          )}
          {onEdit && (
            <button className="blog-card-iconbtn" onClick={onEdit}>
              Edit
            </button>
          )}
          {onDelete && (
            <button className="blog-card-iconbtn blog-card-iconbtn-danger" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
