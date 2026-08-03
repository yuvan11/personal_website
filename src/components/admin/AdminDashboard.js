import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllPosts, deletePost, togglePublished, logout, exportPostsJSON } from '../../utils/blogStore';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      deletePost(id);
      setPosts(getAllPosts());
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleTogglePublish = (id) => {
    togglePublished(id);
    setPosts(getAllPosts());
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
    window.location.reload();
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-left">
          <Link to="/" className="admin-brand-logo">YR</Link>
          <div>
            <h1>Dashboard</h1>
            <p>Manage your writings</p>
          </div>
        </div>
        <div className="admin-header-right">
          <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/new')}>
            <i className="fa-solid fa-plus"></i> New Post
          </button>
          <button className="admin-btn admin-btn-secondary" onClick={exportPostsJSON} title="Download posts.json to commit to git">
            <i className="fa-solid fa-download"></i> Export posts.json
          </button>
          <button className="admin-btn admin-btn-ghost" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {posts.length === 0 ? (
          <div className="admin-empty">
            <i className="fa-solid fa-feather-pointed"></i>
            <h3>No writings yet</h3>
            <p>Start creating your first post — a poem, a thought, or a technical article.</p>
            <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/new')}>
              <i className="fa-solid fa-plus"></i> Create First Post
            </button>
          </div>
        ) : (
          <div className="admin-posts-grid">
            {posts.map((post) => (
              <div className="admin-post-card" key={post.id}>
                {post.coverImage && (
                  <div className="admin-post-cover">
                    <img src={post.coverImage} alt={post.title} />
                  </div>
                )}
                <div className="admin-post-body">
                  <div className="admin-post-meta">
                    <span className={`admin-badge ${post.published ? 'published' : 'draft'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <span className={`admin-badge category-${post.category}`}>
                      {post.category}
                    </span>
                    <span className="admin-post-date">{formatDate(post.date)}</span>
                  </div>
                  <h3 className="admin-post-title">{post.title}</h3>
                  {post.excerpt && <p className="admin-post-excerpt">{post.excerpt}</p>}
                  <div className="admin-post-actions">
                    <button
                      className="admin-btn admin-btn-sm"
                      onClick={() => navigate(`/admin/edit/${post.id}`)}
                    >
                      <i className="fa-solid fa-pen"></i> Edit
                    </button>
                    <button
                      className="admin-btn admin-btn-sm"
                      onClick={() => handleTogglePublish(post.id)}
                    >
                      <i className={`fa-solid ${post.published ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      {post.published ? ' Unpublish' : ' Publish'}
                    </button>
                    {post.published && (
                      <button
                        className="admin-btn admin-btn-sm"
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i> View
                      </button>
                    )}
                    <button
                      className={`admin-btn admin-btn-sm admin-btn-danger ${deleteConfirm === post.id ? 'confirm' : ''}`}
                      onClick={() => handleDelete(post.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                      {deleteConfirm === post.id ? ' Confirm?' : ' Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
