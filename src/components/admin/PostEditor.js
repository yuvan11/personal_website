import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, getPostById, updatePost } from '../../utils/blogStore';

const CATEGORIES = [
  { value: 'poem', label: '✍️ Poem' },
  { value: 'technical', label: '💻 Technical' },
  { value: 'thoughts', label: '💭 Thoughts' },
];

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('thoughts');
  const [coverImage, setCoverImage] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      const post = getPostById(id);
      if (post) {
        setTitle(post.title);
        setExcerpt(post.excerpt || '');
        setCategory(post.category || 'thoughts');
        setCoverImage(post.coverImage || '');
        setCoverPreview(post.coverImage || '');
        // Set editor content after mount
        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.innerHTML = post.content || '';
          }
        }, 100);
      } else {
        navigate('/admin');
      }
    }
  }, [id, navigate]);

  const execCommand = useCallback((command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  }, []);

  const handleFormat = (command, value) => {
    execCommand(command, value);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be under 2MB. Consider using an image URL instead.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = `<img src="${event.target.result}" alt="uploaded image" style="max-width:100%;border-radius:12px;margin:1rem 0;" />`;
      execCommand('insertHTML', img);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      const img = `<img src="${url}" alt="image" style="max-width:100%;border-radius:12px;margin:1rem 0;" />`;
      execCommand('insertHTML', img);
    }
  };

  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const handleCoverUpload = () => {
    coverInputRef.current?.click();
  };

  const handleCoverFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      alert('Cover image should be under 1MB for optimal performance.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCoverImage(event.target.result);
      setCoverPreview(event.target.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCoverUrl = () => {
    const url = prompt('Enter cover image URL:');
    if (url) {
      setCoverImage(url);
      setCoverPreview(url);
    }
  };

  const removeCover = () => {
    setCoverImage('');
    setCoverPreview('');
  };

  const showSaved = (msg) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(''), 2500);
  };

  const handleSave = (publish) => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    setSaving(true);
    const content = editorRef.current?.innerHTML || '';

    if (isEditing) {
      updatePost(id, {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        coverImage,
        category,
        published: publish,
      });
      showSaved(publish ? 'Published!' : 'Saved as draft!');
    } else {
      createPost({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        coverImage,
        category,
        published: publish,
      });
      showSaved(publish ? 'Published!' : 'Saved as draft!');
      setTimeout(() => navigate('/admin'), 1200);
    }

    setSaving(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-left">
          <button className="admin-btn admin-btn-ghost" onClick={() => navigate('/admin')}>
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <h1>{isEditing ? 'Edit Post' : 'New Post'}</h1>
        </div>
        <div className="admin-header-right">
          {savedMessage && <span className="admin-saved-msg">{savedMessage}</span>}
          <button
            className="admin-btn admin-btn-ghost"
            onClick={() => setIsPreview(!isPreview)}
          >
            <i className={`fa-solid ${isPreview ? 'fa-pen' : 'fa-eye'}`}></i>
            {isPreview ? ' Edit' : ' Preview'}
          </button>
          <button
            className="admin-btn admin-btn-secondary"
            onClick={() => handleSave(false)}
            disabled={saving}
          >
            Save Draft
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => handleSave(true)}
            disabled={saving}
          >
            <i className="fa-solid fa-paper-plane"></i> Publish
          </button>
        </div>
      </div>

      <div className="editor-layout">
        {/* Sidebar */}
        <div className="editor-sidebar">
          <div className="editor-sidebar-group">
            <label>Category</label>
            <div className="editor-category-options">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  className={`editor-category-btn ${category === cat.value ? 'active' : ''}`}
                  onClick={() => setCategory(cat.value)}
                  type="button"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="editor-sidebar-group">
            <label>Cover Image</label>
            {coverPreview ? (
              <div className="editor-cover-preview">
                <img src={coverPreview} alt="cover preview" />
                <button className="editor-cover-remove" onClick={removeCover} type="button">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ) : (
              <div className="editor-cover-actions">
                <button className="admin-btn admin-btn-sm" onClick={handleCoverUpload} type="button">
                  <i className="fa-solid fa-upload"></i> Upload
                </button>
                <button className="admin-btn admin-btn-sm" onClick={handleCoverUrl} type="button">
                  <i className="fa-solid fa-link"></i> URL
                </button>
              </div>
            )}
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleCoverFileSelect}
            />
          </div>

          <div className="editor-sidebar-group">
            <label htmlFor="editor-excerpt">Excerpt</label>
            <textarea
              id="editor-excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary shown on the blog card..."
              rows={4}
            />
          </div>
        </div>

        {/* Main editor */}
        <div className="editor-main">
          <input
            className="editor-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your title here..."
          />

          {isPreview ? (
            <div className="editor-preview">
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || '' }}
              />
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div className="editor-toolbar">
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('bold'); }} title="Bold">
                  <i className="fa-solid fa-bold"></i>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('italic'); }} title="Italic">
                  <i className="fa-solid fa-italic"></i>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('underline'); }} title="Underline">
                  <i className="fa-solid fa-underline"></i>
                </button>
                <div className="toolbar-divider" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('formatBlock', '<h2>'); }} title="Heading 2">
                  H2
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('formatBlock', '<h3>'); }} title="Heading 3">
                  H3
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('formatBlock', '<p>'); }} title="Paragraph">
                  ¶
                </button>
                <div className="toolbar-divider" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('formatBlock', '<blockquote>'); }} title="Blockquote">
                  <i className="fa-solid fa-quote-left"></i>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('insertUnorderedList'); }} title="Bullet List">
                  <i className="fa-solid fa-list-ul"></i>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('insertOrderedList'); }} title="Numbered List">
                  <i className="fa-solid fa-list-ol"></i>
                </button>
                <div className="toolbar-divider" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleLink(); }} title="Insert Link">
                  <i className="fa-solid fa-link"></i>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleImageUpload(); }} title="Upload Image">
                  <i className="fa-solid fa-image"></i>
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleImageUrl(); }} title="Image from URL">
                  <i className="fa-solid fa-globe"></i>
                </button>
                <div className="toolbar-divider" />
                <button type="button" onMouseDown={(e) => { e.preventDefault(); handleFormat('removeFormat'); }} title="Clear Formatting">
                  <i className="fa-solid fa-eraser"></i>
                </button>
              </div>

              {/* Editable area */}
              <div
                ref={editorRef}
                className="editor-content"
                contentEditable
                suppressContentEditableWarning
                data-placeholder="Start writing your poem, thoughts, or article..."
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
