import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './admin.css';
import Home from './home';
import BlogPost from './components/BlogPost';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import PostEditor from './components/admin/PostEditor';
import { isAuthenticated } from './utils/blogStore';
import reportWebVitals from './reportWebVitals';

const AdminRoute = ({ children }) => {
  const [authed, setAuthed] = useState(isAuthenticated());

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return children;
};

// Compute clean basename for both localhost and GitHub Pages
const getBasename = () => {
  const publicUrl = process.env.PUBLIC_URL || '';
  // If publicUrl has full domain (like https://yuvan11.github.io/personal_website), extract path
  if (publicUrl.startsWith('http')) {
    try {
      const url = new URL(publicUrl);
      return url.pathname;
    } catch {
      return '/personal_website';
    }
  }
  return publicUrl;
};

const basename = getBasename();

const App = () => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/new"
          element={
            <AdminRoute>
              <PostEditor />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <AdminRoute>
              <PostEditor />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
