import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { BookCard } from '../../components/common/BookCard';
import { useAuth0 } from '@auth0/auth0-react';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const BrowseBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conditionChoices, setConditionChoices] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const AUDIENCE = import.meta.env.VITE_AUTH0_API_AUDIENCE;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchConditionChoices = async () => {
    try {
      const url = `${API_BASE_URL}/api/books/`;
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { audience: AUDIENCE }
      });

      // OPTIONS method to get metadata including choices
      const response = await fetch(url, {
        method: 'OPTIONS',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();

      // Extract choices for the 'condition' field
      if (data.actions && data.actions.POST && data.actions.POST.condition) {
        setConditionChoices(data.actions.POST.condition.choices);
      }
    } catch (error) {
      console.error('Error fetching condition choices:', error);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
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
    fetchBooks()
    fetchConditionChoices();
  }, [API_BASE_URL, AUDIENCE, getAccessTokenSilently]);

  const handleBookRequest = (book) => {
    console.log('Requesting book:', book);
    // Handle book request logic
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 pb-20 space-y-4">
      {/* Search Bar */}
      <div className=" rounded-lg p-3">
        <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-full bg-gray-50 text-sm outline-none focus:border-blue-600 focus:bg-white transition-all mb-4" placeholder="Search books, authors, genres..."></input>
        <div class="flex gap-2 overflow-x-auto pb-1">
          <span class="px-3 py-1.5 bg-blue-600 text-white border border-blue-600 rounded-full text-xs whitespace-nowrap cursor-pointer">All</span>
          <span class="px-3 py-1.5 bg-gray-100 text-gray-600 border border-gray-300 rounded-full text-xs whitespace-nowrap cursor-pointer hover:bg-gray-200">Fiction</span>
          <span class="px-3 py-1.5 bg-gray-100 text-gray-600 border border-gray-300 rounded-full text-xs whitespace-nowrap cursor-pointer hover:bg-gray-200">Non-Fiction</span>
          <span class="px-3 py-1.5 bg-gray-100 text-gray-600 border border-gray-300 rounded-full text-xs whitespace-nowrap cursor-pointer hover:bg-gray-200">Nearby</span>
        </div>
      </div>

      {/* Book List */}
      <div className="space-y-3">
        {books.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            conditionChoices={conditionChoices} 
            onRequest={handleBookRequest}
          />
        ))}
      </div>
    </div>
  );
};