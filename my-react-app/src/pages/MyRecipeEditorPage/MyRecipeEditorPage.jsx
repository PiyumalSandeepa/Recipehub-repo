// src/pages/MyRecipeEditorPage/MyRecipeEditorPage.jsx
import React, { useEffect, useState } from 'react';
import './MyRecipeEditorPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import { API_BASE_URL } from '../../config/api';

const emptyForm = {
  title: '',
  description: '',
  tag: '',
  date: '',
  comments: 0,
  image_url: '',
  extra_images: [], // multiple image URLs
  prep_time: '',
  cook_time: '',
  difficulty: '',
  servings: '',
  calories: '',
};

const MyRecipeEditorPage = () => {
  const params = useParams();
  const id = params.id;
  const isNew = !id || id === 'new';  // treat undefined or "new" as create mode
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return; // don't fetch if we're creating a new recipe

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/recipes/${id}`);
        if (!res.ok) throw new Error('Failed to load recipe');
        const data = await res.json();

        if (data.user_id && data.user_id !== user.id) {
          throw new Error('You are not allowed to edit this recipe');
        }

        let extraImages = [];
        if (data.extra_images) {
          try {
            extraImages = Array.isArray(data.extra_images)
              ? data.extra_images
              : JSON.parse(data.extra_images);
          } catch {
            extraImages = [];
          }
        }

        setForm({
          title: data.title || '',
          description: data.description || '',
          tag: data.tag || '',
          date: data.date || '',
          comments: data.comments || 0,
          image_url: data.image_url || '',
          extra_images: extraImages,
          prep_time: data.prep_time || '',
          cook_time: data.cook_time || '',
          difficulty: data.difficulty || '',
          servings: data.servings || '',
          calories: data.calories || '',
        });
      } catch (err) {
        setError(err.message || 'Error loading recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, isNew, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExtraImageChange = (index, value) => {
    setForm((prev) => {
      const copy = [...prev.extra_images];
      copy[index] = value;
      return { ...prev, extra_images: copy };
    });
  };

  const addExtraImageField = () => {
    setForm((prev) => ({
      ...prev,
      extra_images: [...prev.extra_images, ''],
    }));
  };

  const removeExtraImageField = (index) => {
    setForm((prev) => {
      const copy = [...prev.extra_images];
      copy.splice(index, 1);
      return { ...prev, extra_images: copy };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...form,
      user_id: user.id,
      publisher: user.name || user.username || 'Unknown',
    };

    try {
      const url = isNew
        ? `${API_BASE_URL}/api/recipes`
        : `${API_BASE_URL}/api/recipes/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to save recipe');
      }

      navigate('/my-food-bank');
    } catch (err) {
      setError(err.message || 'Error saving recipe');
    }
  };

  const handleDelete = async () => {
    if (isNew) {
      navigate('/my-food-bank');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete recipe');
      }
      navigate('/my-food-bank');
    } catch (err) {
      setError(err.message || 'Error deleting recipe');
    }
  };

  if (loading) {
    return <p style={{ marginTop: '90px', textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <div className="my-recipe-editor-page">
      <h1>{isNew ? 'Add New Recipe' : 'Edit Recipe'}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form className="my-recipe-form" onSubmit={handleSave}>
        <div className="form-row">
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-row">
          <label>Main Image URL</label>
          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
          />
          <small>Paste the main image URL</small>
        </div>

        <div className="form-row">
          <label>Additional Image URLs</label>
          {form.extra_images.map((url, index) => (
            <div key={index} className="extra-image-row">
              <input
                value={url}
                onChange={(e) =>
                  handleExtraImageChange(index, e.target.value)
                }
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                className="remove-extra-image"
                onClick={() => removeExtraImageField(index)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-extra-image"
            onClick={addExtraImageField}
          >
            + Add another image
          </button>
        </div>

        <div className="form-grid">
          <div className="form-row">
            <label>Tag</label>
            <input name="tag" value={form.tag} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Date</label>
            <input name="date" value={form.date} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Prep Time</label>
            <input
              name="prep_time"
              value={form.prep_time}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Cook Time</label>
            <input
              name="cook_time"
              value={form.cook_time}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Difficulty</label>
            <input
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Servings</label>
            <input
              name="servings"
              type="number"
              value={form.servings}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>Calories</label>
            <input
              name="calories"
              value={form.calories}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            {isNew ? 'Create Recipe' : 'Save Changes'}
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            {isNew ? 'Cancel' : 'Delete Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyRecipeEditorPage;