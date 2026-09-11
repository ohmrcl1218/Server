import { useState, useEffect } from "react";
import "../styles/BlogList.css";
import BlogCard from "../card/BlogCard";
import { getArticles } from "../../services/articleServices";

export default function BlogList({
  onViewBlog,
  onLike,
  onEditBlog,
  onDeleteBlog,
  onViewComments,
  onCreateBlog,
}) {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getArticles()
      .then((result) => {
        setBlogs(result);
      })
      .catch((error) => {
        console.log("Failed to fetch articles");
        console.error(error);
      });
  }, []);

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bloglist">
      <div className="bloglist-head">
        <div>
          <p className="bloglist-kicker">Manage</p>
          <h1>Blog List</h1>
        </div>

        <button
          className="bloglist-create"
          onClick={onCreateBlog}
        >
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
              commentCount={blog.comments?.length || 0}
              onViewBlog={() => onViewBlog(blog)}
              onLike={() => onLike(blog.id)}
              onEdit={() => onEditBlog(blog)}
              onDelete={() => onDeleteBlog(blog)}
              onViewComments={() => onViewComments(blog)}
            />
          ))
        ) : (
          <p className="bloglist-empty">
            No entries match your search.
          </p>
        )}
      </div>
    </div>
  );
}
