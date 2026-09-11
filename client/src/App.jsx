import { useState } from "react";
import "./App.css";

import Header from "./components/navbar/Header";
import Footer from "./components/navbar/Footer";
import Sidebar from "./components/navbar/Sidebar";

import Home from "./components/pages/Home";
import Post from "./components/pages/Post";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import ViewBlog from "./components/pages/ViewBlog";
import Dashboard from "./components/pages/Dashboard";
import BlogList from "./components/pages/BlogList";
import CommentsList from "./components/pages/CommentsList";
import Profile from "./components/pages/Profile";

import ConfirmationPopUp from "./components/modal/ConfirmationPopUp";
import BlogFormModal from "./components/modal/BlogFormModal";

import { BLOGS, PROFILE } from "./components/config/Constants";

const SIDEBAR_PAGES = ["dashboard", "bloglist", "comments", "profile"];

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [blogs, setBlogs] = useState(BLOGS);

  const [confirmConfig, setConfirmConfig] = useState(null);
  const [editingBlog, setEditingBlog] = useState(undefined);

  function goToPage(next) {
    setSelectedPostId(null);
    setPage(next);
    window.scrollTo(0, 0);
  }

  function openPost(id) {
    setSelectedPostId(id);
    setPage("post");
  }

  function openBlog(blog) {
    setSelectedBlog(blog);
    setPage("view-blog");
    window.scrollTo(0, 0);
  }

  function openComments(blog) {
    setSelectedBlog(blog);
    setPage("comments");
  }

  function handleLoginSuccess(user) {
    setIsLoggedIn(true);
    setCurrentUser(user);
    goToPage("dashboard");
  }

  function requestLogout() {
    setConfirmConfig({
      title: "Log out?",
      message: "You'll need to sign in again to access the dashboard.",
      confirmLabel: "Log out",
      tone: "danger",
      onConfirm: () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setConfirmConfig(null);
        goToPage("home");
      },
    });
  }

  function handleLike(blogId) {
    setBlogs((prev) =>
      prev.map((b) => {
        if (b.id !== blogId) return b;
        const updated = { ...b, likes: b.likes + 1 };
        if (selectedBlog?.id === blogId) setSelectedBlog(updated);
        return updated;
      })
    );
  }

  function requestDeleteBlog(blog) {
    setConfirmConfig({
      title: "Delete this entry?",
      message: `"${blog.title}" will be permanently removed. This can't be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
      onConfirm: () => {
        setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
        setConfirmConfig(null);
      },
    });
  }

  function handleSaveBlog(blogData) {
    setBlogs((prev) => {
      const exists = prev.some((b) => b.id === blogData.id);
      return exists
        ? prev.map((b) => (b.id === blogData.id ? blogData : b))
        : [blogData, ...prev];
    });
    setEditingBlog(undefined);
  }

  const selectedPost = blogs.find((b) => b.id === selectedPostId);
  const categories = [...new Set(blogs.map((b) => b.category))];

  let content;

  if (page === "home") {
    content = <Home blogs={blogs} onViewBlog={openBlog} onLike={handleLike} />;
  } else if (page === "post") {
    content = <Post post={selectedPost} onBack={() => goToPage("home")} />;
  } else if (page === "view-blog") {
    content = (
      <ViewBlog
        blog={selectedBlog}
        onBack={() => goToPage("home")}
        onLike={handleLike}
        onViewComments={isLoggedIn ? openComments : undefined}
      />
    );
  } else if (page === "about") {
    content = <About />;
  } else if (page === "contact") {
    content = <Contact />;
  } else if (page === "login") {
    content = isLoggedIn ? (
      <div className="already-in">
        <h1>You're already signed in</h1>
        <p>Welcome back, {currentUser?.name}.</p>
        <button className="already-in-btn" onClick={() => goToPage("dashboard")}>
          Go to Dashboard
        </button>
      </div>
    ) : (
      <Login onLoginSuccess={handleLoginSuccess} />
    );
  } else if (page === "dashboard") {
    content = <Dashboard blogs={blogs} />;
  } else if (page === "bloglist") {
    content = (
      <BlogList
        blogs={blogs}
        onViewBlog={openBlog}
        onLike={handleLike}
        onEditBlog={(blog) => setEditingBlog(blog)}
        onDeleteBlog={requestDeleteBlog}
        onViewComments={openComments}
        onCreateBlog={() => setEditingBlog(null)}
      />
    );
  } else if (page === "comments") {
    content = <CommentsList blog={selectedBlog} onBack={() => goToPage("bloglist")} />;
  } else if (page === "profile") {
    content = <Profile profile={PROFILE} />;
  }

  const showSidebar = isLoggedIn && SIDEBAR_PAGES.includes(page);

  return (
    <div className="app-shell">
      {showSidebar ? (
        <div className="app-admin">
          <Sidebar
            page={page}
            setPage={goToPage}
            onLogoutClick={requestLogout}
            onExitAdmin={() => goToPage("home")}
            currentUser={currentUser}
          />
          <div className="app-admin-content">{content}</div>
        </div>
      ) : (
        <>
          <Header
            page={page}
            setPage={goToPage}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogout={requestLogout}
          />
          <main>{content}</main>
          <Footer />
        </>
      )}

      {confirmConfig && (
        <ConfirmationPopUp
          title={confirmConfig.title}
          message={confirmConfig.message}
          confirmLabel={confirmConfig.confirmLabel}
          tone={confirmConfig.tone}
          onConfirm={confirmConfig.onConfirm}
          onCancel={() => setConfirmConfig(null)}
        />
      )}

      {editingBlog !== undefined && (
        <BlogFormModal
          blog={editingBlog}
          categories={categories}
          onSave={handleSaveBlog}
          onClose={() => setEditingBlog(undefined)}
        />
      )}
    </div>
  );
}
