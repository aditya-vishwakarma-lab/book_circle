import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { BookCard } from '../../components/common/BookCard';
import { useAuth0 } from '@auth0/auth0-react';

export const BrowseBooks = () => {
  const [books, setBooks] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const AUDIENCE = import.meta.env.VITE_AUTH0_API_AUDIENCE;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchBooks = async () => {
    try {
      const url = `${API_BASE_URL}/api/books/`;
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

  const handleBookRequest = (book) => {
    console.log('Requesting book:', book);
    // Handle book request logic
  };

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Search Bar */}
      <div className="bg-gray-100 rounded-lg p-3">
        <div className="flex items-center space-x-2 text-gray-500">
          <Search className="w-4 h-4" />
          <span className="text-sm">Search books, authors...</span>
        </div>
      </div>

      {/* Book List */}
      <div className="space-y-3">
        {books.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            onRequest={handleBookRequest}
          />
        ))}
      </div>
    </div>
  );
};