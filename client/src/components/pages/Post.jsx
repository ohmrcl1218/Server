import "../styles/Post.css";

export default function Post({ post, onBack }) {
  if (!post) {
    return (
      <div className="post">
        <p>No post selected.</p>
        <button className="post-back" onClick={onBack}>← Back</button>
      </div>
    );
  }

  return (
    <div className="post">
      <button className="post-back" onClick={onBack}>← Back</button>
      <p className="post-category">{post.category}</p>
      <h1>{post.title}</h1>
      <p className="post-meta">{post.author} · {post.date}</p>
      <p className="post-body">{post.description}</p>
    </div>
  );
}
