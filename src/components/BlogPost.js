import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostBySlug, fetchCloudPosts } from '../utils/blogStore';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      let found = getPostBySlug(slug);
      if (!found) {
        await fetchCloudPosts();
        found = getPostBySlug(slug);
      }
      if (found && found.published) {
        setPost(found);
      } else {
        setNotFound(true);
      }
    };
    load();
  }, [slug]);

  useEffect(() => {
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (notFound) {
    return (
      <div className="blogpost-page">
        <div className="blogpost-container">
          <div className="blogpost-not-found">
            <h2>Post not found</h2>
            <p>The writing you're looking for doesn't exist or isn't published yet.</p>
            <button className="main-btn" onClick={() => navigate('/')}>
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blogpost-page">
        <div className="blogpost-container">
          <div className="blogpost-loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="blogpost-page">
      <nav className="blogpost-nav">
        <div className="container">
          <button className="blogpost-back" onClick={() => navigate('/')}>
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </button>
        </div>
      </nav>

      {post.coverImage && (
        <div className="blogpost-hero">
          <img src={post.coverImage} alt={post.title} />
          <div className="blogpost-hero-overlay" />
        </div>
      )}

      <article className="blogpost-container">
        <header className="blogpost-header">
          <div className="blogpost-meta">
            <span className={`blogpost-category category-${post.category}`}>
              {post.category === 'poem' && '✍️ '}
              {post.category === 'technical' && '💻 '}
              {post.category === 'thoughts' && '💭 '}
              {post.category}
            </span>
            <span className="blogpost-date">{formatDate(post.date)}</span>
          </div>
          <h1 className="blogpost-title">{post.title}</h1>
          {post.excerpt && <p className="blogpost-excerpt">{post.excerpt}</p>}
        </header>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <footer className="blogpost-footer">
        <div className="container">
          <button className="main-btn main-btn-2" onClick={() => navigate('/')}>
            <i className="fa-solid fa-arrow-left"></i> Back to All Writings
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
