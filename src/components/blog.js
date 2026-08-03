import React from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts } from '../utils/blogStore';

// Existing hardcoded blog posts (from WordPress / external links)
const existingPosts = [
  {
    title: 'அரிவும் அறிவும்',
    image: 'assets/images/blog/b-7.png',
    link: 'https://tinyurl.com/ysrpk6bp',
    date: 'Feb 21, 2022',
    isExternal: true,
  },
  {
    title: 'Earn BAT coins 2',
    image: 'assets/images/blog/b-9.png',
    link: 'https://tinyurl.com/y5kh457p',
    date: 'Nov 12, 2021',
    isExternal: true,
  },
  {
    title: 'Earn BAT coins 1',
    image: 'assets/images/blog/b-8.png',
    link: 'https://tinyurl.com/uap97kdk',
    date: 'July 3, 2021',
    isExternal: true,
  },
  {
    title: 'பெண்ணொன்று கண்டேன், பெண்ணங்கில்லை!',
    image: 'assets/images/blog/b-1.png',
    link: 'https://tinyurl.com/w58t9sut',
    date: 'May 23, 2021',
    isExternal: true,
  },
  {
    title: 'வாழ்த்தின்-வர்ணனை.',
    image: 'assets/images/blog/b-2.png',
    link: 'https://tinyurl.com/t2hevs4f',
    date: 'Apr 20, 2021',
    isExternal: true,
  },
  {
    title: 'privacy-matters-🤔-switch-to-signal😁',
    image: 'assets/images/blog/b-3.png',
    link: 'https://tinyurl.com/tt5h5w3f',
    date: 'Jan 9, 2021',
    isExternal: true,
  },
  {
    title: 'மெய்யின் தேடல்',
    image: 'assets/images/blog/b-4.png',
    link: 'https://tinyurl.com/er4mp359',
    date: 'May 23, 2021',
    isExternal: true,
  },
  {
    title: 'இறை படைப்பின் ஆக்கமும் அழிவும்',
    image: 'assets/images/blog/b-5.jpg',
    link: 'https://tinyurl.com/yjfvrs6y',
    date: 'May 5, 2020',
    isExternal: true,
  },
];

const BlogCard = ({ post }) => {
  if (post.isExternal) {
    // Existing posts — link to external URL
    return (
      <div className="col-lg-3 col-md-4 col-sm-4">
        <div className="single-blog mt-30">
          <div className="blog-image">
            <img src={post.image} alt={post.title} />
          </div>
          <div className="blog-content">
            <h4 className="blog-title">
              <a href={post.link} target="_blank" rel="noreferrer">
                {post.title}
              </a>
            </h4>
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    );
  }

  // New CMS posts — link to internal reading page
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="col-lg-3 col-md-4 col-sm-4">
      <div className="single-blog mt-30">
        {post.coverImage ? (
          <div className="blog-image">
            <img src={post.coverImage} alt={post.title} />
          </div>
        ) : (
          <div className="blog-image blog-image-placeholder">
            <div className="blog-placeholder-icon">
              {post.category === 'poem' && '✍️'}
              {post.category === 'technical' && '💻'}
              {post.category === 'thoughts' && '💭'}
            </div>
          </div>
        )}
        <div className="blog-content">
          <h4 className="blog-title">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h4>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  // Get CMS posts and merge with existing
  const cmsPosts = getPublishedPosts();
  const allPosts = [...cmsPosts, ...existingPosts];

  return (
    <section id="blog" className="blog-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center">
              <h2 className="title">Blog Posts</h2>
              <p>Poems, thoughts, and technical explorations — a space for all my writings</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {allPosts.map((post, index) => (
            <BlogCard post={post} key={post.id || post.title || index} />
          ))}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="blog-more text-center mt-50">
              <a className="main-btn" href="https://tinyurl.com/339tp85b" target="_blank" rel="noreferrer">More Posts</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;