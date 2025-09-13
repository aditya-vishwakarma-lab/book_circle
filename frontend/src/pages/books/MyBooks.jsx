import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { BookForm } from './BookForm';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const AUDIENCE = import.meta.env.VITE_AUTH0_API_AUDIENCE;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchBooks = async () => {
      try {
        const url = `${API_BASE_URL}/api/books/?owner=current_user`;
        const accessToken = await getAccessTokenSilently({
          authorizationParams: { audience: AUDIENCE }
        });

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchBooks();
  }, [API_BASE_URL, AUDIENCE, getAccessTokenSilently]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (showForm){
    return(
      <BookForm
        onClose={() => setShowForm(false)}
        onBookAdded={() => {
          setShowForm(false);
          fetchBooks();
        }}
      />
    )
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">My Books ({books.length})</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {
        <div className="space-y-3">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex space-x-3">
                <div className="text-3xl">📘</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      {0} Request
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      { 'Available' }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};
