import { useState } from "react";
import "../styles/BlogList.css";
import BlogCard from "../card/BlogCard";

export default function BlogList({
  blogs,
  onViewBlog,
  onLike,
  onEditBlog,
  onDeleteBlog,
  onViewComments,
  onCreateBlog,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bloglist">
      <div className="bloglist-head">
        <div>
          <p className="bloglist-kicker">Manage</p>
          <h1>Blog List</h1>
        </div>
        <button className="bloglist-create" onClick={onCreateBlog}>
          + New entry
        </button>
      </div>

      <div className="bloglist-controls">
        <input
          type="text"
          className="bloglist-search"
          placeholder="Search entries by title…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="bloglist-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="bloglist-count">
        {filteredBlogs.length} of {blogs.length} entries
      </p>

      <div className="bloglist-items">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              {...blog}
              commentCount={blog.comments.length}
              onViewBlog={() => onViewBlog(blog)}
              onLike={() => onLike(blog.id)}
              onEdit={() => onEditBlog(blog)}
              onDelete={() => onDeleteBlog(blog)}
              onViewComments={() => onViewComments(blog)}
            />
          ))
        ) : (
          <p className="bloglist-empty">No entries match your search.</p>
        )}
      </div>
    </div>
  );
}
