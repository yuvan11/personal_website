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

// Dynamic basename: "" locally, "/personal_website" on GitHub Pages
const basename = process.env.PUBLIC_URL || '';

const App = () => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
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
