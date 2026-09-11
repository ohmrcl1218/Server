import { useState, useEffect } from "react";
import "../styles/BlogFormModal.css";

export default function BlogFormModal({ blog, categories, onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(categories?.[0] || "");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (blog) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(blog.title);
      setAuthor(blog.author);
      setCategory(blog.category);
      setDescription(blog.description);
    }
  }, [blog]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !description.trim()) {
      setError("Fill in every field before saving.");
      return;
    }

    const blogData = {
      id: blog ? blog.id : Date.now(),
      title: title.trim(),
      author: author.trim(),
      category,
      description: description.trim(),
      date:
        blog?.date ||
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      views: blog?.views ?? 0,
      likes: blog?.likes ?? 0,
      comments: blog?.comments ?? [],
    };

    onSave(blogData);
  }

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="blogform-box">
        <h2 className="popup-title">{blog ? "Edit entry" : "New journal entry"}</h2>

        <form className="blogform" onSubmit={handleSubmit}>
          <label htmlFor="bf-title">Title</label>
          <input
            id="bf-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Notes on Component Composition"
          />

          <div className="blogform-row">
            <div className="blogform-field">
              <label htmlFor="bf-author">Author</label>
              <input
                id="bf-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
              />
            </div>

            <div className="blogform-field">
              <label htmlFor="bf-category">Category</label>
              <select
                id="bf-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {(categories || []).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <label htmlFor="bf-description">Description</label>
          <textarea
            id="bf-description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this entry about?"
          />

          {error && <p className="blogform-error">{error}</p>}

          <div className="popup-actions">
            <button type="button" className="popup-btn popup-btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="popup-btn popup-btn-accent">
              {blog ? "Save changes" : "Publish entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
