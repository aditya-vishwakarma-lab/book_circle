import React from 'react';
import { Search } from 'lucide-react';
import { BookCard } from '../../components/common/BookCard';

export const BrowseBooks = () => {
  const mockBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      condition: "Good",
      owner: "Alice Johnson",
      area: "Bandra West",
      image: "📖"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      condition: "Excellent",
      owner: "Bob Wilson",
      area: "Andheri East",
      image: "📗"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      condition: "Fair",
      owner: "Carol Smith",
      area: "Powai",
      image: "📘"
    }
  ];

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
        {mockBooks.map((book) => (
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