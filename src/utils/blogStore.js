import defaultPosts from '../data/posts';

const STORAGE_KEY = 'yuva_blog_posts';
const API_URL = 'https://jsonblob.com/api/jsonBlob/019fc91d-26bd-7bdf-b5d7-fa68e11333ef';

const generateId = () => `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

const syncCloudStore = async (posts) => {
  try {
    await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(posts),
    });
  } catch (err) {
    console.warn('Cloud sync failed:', err);
  }
};

export const fetchCloudPosts = async () => {
  try {
    const res = await fetch(API_URL);
    if (res.ok) {
      const posts = await res.json();
      if (Array.isArray(posts) && posts.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        return posts;
      }
    }
  } catch (err) {
    console.warn('Cloud fetch failed:', err);
  }
  return getAllPosts();
};

export const getAllPosts = () => {
  let localPosts = [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    localPosts = data ? JSON.parse(data) : [];
  } catch {
    localPosts = [];
  }

  const localIds = new Set(localPosts.map((p) => p.id));
  const merged = [...localPosts];
  for (const post of defaultPosts) {
    if (!localIds.has(post.id)) {
      merged.push(post);
    }
  }
  return merged;
};

export const getPublishedPosts = () => {
  return getAllPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostBySlug = (slug) => {
  return getAllPosts().find((p) => p.slug === slug) || null;
};

export const getPostById = (id) => {
  return getAllPosts().find((p) => p.id === id) || null;
};

export const createPost = ({ title, excerpt, content, coverImage, category, published }) => {
  const posts = getAllPosts();
  let slug = slugify(title);

  // Ensure unique slug
  const existingSlugs = posts.map((p) => p.slug);
  let counter = 1;
  let uniqueSlug = slug;
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  const newPost = {
    id: generateId(),
    title,
    slug: uniqueSlug,
    excerpt: excerpt || '',
    content: content || '',
    coverImage: coverImage || '',
    category: category || 'thoughts',
    date: new Date().toISOString(),
    published: published || false,
  };

  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  syncCloudStore(posts);
  return newPost;
};

export const updatePost = (id, updates) => {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  // If title changed, update slug
  if (updates.title && updates.title !== posts[index].title) {
    let slug = slugify(updates.title);
    const existingSlugs = posts.filter((p) => p.id !== id).map((p) => p.slug);
    let counter = 1;
    let uniqueSlug = slug;
    while (existingSlugs.includes(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    updates.slug = uniqueSlug;
  }

  posts[index] = { ...posts[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  syncCloudStore(posts);
  return posts[index];
};

export const deletePost = (id) => {
  const posts = getAllPosts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  syncCloudStore(posts);
};

export const togglePublished = (id) => {
  const post = getPostById(id);
  if (!post) return null;
  return updatePost(id, { published: !post.published });
};

// Auth helpers
const ADMIN_PASS_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'; // sha256 of 'password'
const SESSION_KEY = 'yuva_admin_session';

const sha256 = async (message) => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

export const login = async (password) => {
  const hash = await sha256(password);
  // Accept both the hardcoded hash and 'yuva2024'
  const yuva2024Hash = await sha256('yuva2024');
  if (hash === ADMIN_PASS_HASH || hash === yuva2024Hash) {
    sessionStorage.setItem(SESSION_KEY, 'authenticated');
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
};

export const logout = () => {
  sessionStorage.removeItem(SESSION_KEY);
};
