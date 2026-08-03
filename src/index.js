import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './admin.css';
import Home from './home';
import AboutPage from './components/AboutPage';
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
  if (publicUrl.startsWith('http')) {
    try {
      const url = new URL(publicUrl);
      const pathname = url.pathname.replace(/\/$/, '');
      return pathname || '/personal_website';
    } catch {
      return '/personal_website';
    }
  }
  if (!publicUrl || publicUrl === '.') {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/personal_website')) {
      return '/personal_website';
    }
    return '';
  }
  return publicUrl.replace(/\/$/, '');
};

const basename = getBasename();

const App = () => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/aboutme" element={<AboutPage />} />
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
