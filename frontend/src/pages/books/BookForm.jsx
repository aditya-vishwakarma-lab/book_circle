  import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const BookForm = ({ onClose, onBookAdded }) => {
  const AUDIENCE = import.meta.env.VITE_AUTH0_API_AUDIENCE;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    description: '',
    cover_image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async () => {
    if (!formData.title || !formData.author || !formData.isbn || !formData.genre || !formData.description || !formData.cover_image) {
      alert('Please fill all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { audience: AUDIENCE },
      });

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('isbn', formData.isbn);
      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('cover_image', formData.cover_image);

      const response = await fetch(`${API_BASE_URL}/api/books/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          // Do NOT set 'Content-Type' here!
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not okay');
      } else {
        onBookAdded();
        onClose();
      }
    } catch (error) {
      console.error('Book creation error:', error);
      alert('Failed to create book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add a New Book</h2>
          <p className="text-gray-600">Please fill in the details below</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ISBN *</label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => setFormData({...formData, isbn: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg "
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={isSubmitting}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                console.log('Selected file:', file);
                setFormData({...formData, cover_image: file});
              }}
              className="w-full"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {isSubmitting ? 'Saving...' : 'Add Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}