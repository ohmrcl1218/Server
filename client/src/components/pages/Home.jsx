import { useState } from "react";
import "../styles/Home.css";
import BlogCard from "../card/BlogCard";

export default function Home({ blogs, onViewBlog, onLike }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const [featured, ...rest] = filteredBlogs;

  return (
    <div className="home">
      <section className="home-hero">
        <p className="home-kicker">Volume 3 — an ongoing journal</p>
        <h1>Notes on building software, one entry at a time.</h1>
        <p className="home-intro">
          Short, practical write-ups on web development, machine learning, and the
          engineering habits that make a codebase easier to live in.
        </p>
      </section>

      <section className="home-controls">
        <input
          type="text"
          className="home-search"
          placeholder="Search entries by title…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="home-categories">
          {categories.map((c) => (
            <button
              key={c}
              className={`home-chip ${selectedCategory === c ? "is-active" : ""}`}
              onClick={() => setSelectedCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="home-list">
        {filteredBlogs.length === 0 && (
          <p className="home-empty">No entries match “{searchTerm}.”</p>
        )}

        {featured && (
          <BlogCard
            {...featured}
            featured
            commentCount={undefined}
            onViewBlog={() => onViewBlog(featured)}
            onLike={() => onLike(featured.id)}
          />
        )}

        {rest.map((blog) => (
          <BlogCard
            key={blog.id}
            {...blog}
            commentCount={undefined}
            onViewBlog={() => onViewBlog(blog)}
            onLike={() => onLike(blog.id)}
          />
        ))}
      </section>
    </div>
  );
}
