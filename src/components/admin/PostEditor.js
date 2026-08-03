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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const isEditing = Boolean(id);

  const uploadImageToCDN = async (file) => {
    const formData = new FormData();
    formData.append('key', '6d207e02198a847aa98d0a2a901485a5');
    formData.append('action', 'upload');
    formData.append('source', file);

    try {
      const res = await fetch('https://freeimage.host/api/1/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.image && data.image.url) {
          return data.image.url;
        }
      }
    } catch (err) {
      console.warn('CDN upload failed, fallback to base64', err);
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.readAsDataURL(file);
    });
  };

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

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be under 10MB.');
      return;
    }

    setUploadingImage(true);
    showSaved('Uploading image to CDN...');

    try {
      const imageUrl = await uploadImageToCDN(file);
      const img = `<img src="${imageUrl}" alt="uploaded image" style="max-width:100%;border-radius:12px;margin:1rem 0;" />`;
      execCommand('insertHTML', img);
      showSaved('Image uploaded to CDN!');
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
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

  const handleCoverFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Cover image size should be under 10MB.');
      return;
    }

    setUploadingImage(true);
    showSaved('Uploading cover image to CDN...');

    try {
      const imageUrl = await uploadImageToCDN(file);
      setCoverImage(imageUrl);
      setCoverPreview(imageUrl);
      showSaved('Cover image uploaded!');
    } catch (err) {
      alert('Failed to upload cover image');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
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

  const handleSave = async (publish) => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    setSaving(true);
    showSaved('Saving & Syncing to Cloud...');
    const content = editorRef.current?.innerHTML || '';

    if (isEditing) {
      await updatePost(id, {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        coverImage,
        category,
        published: publish,
      });
      showSaved(publish ? 'Published & Synced!' : 'Saved draft!');
    } else {
      await createPost({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        coverImage,
        category,
        published: publish,
      });
      showSaved(publish ? 'Published & Synced!' : 'Saved draft!');
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
            disabled={saving || uploadingImage}
          >
            Save Draft
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => handleSave(true)}
            disabled={saving || uploadingImage}
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
                <button className="admin-btn admin-btn-sm" onClick={handleCoverUpload} type="button" disabled={uploadingImage}>
                  <i className="fa-solid fa-upload"></i> {uploadingImage ? 'Uploading...' : 'Upload'}
                </button>
                <button className="admin-btn admin-btn-sm" onClick={handleCoverUrl} type="button" disabled={uploadingImage}>
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
