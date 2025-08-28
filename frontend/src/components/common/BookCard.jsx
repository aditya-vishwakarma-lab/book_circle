import React from 'react';

export const BookCard = ({ book, onRequest }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
    <div className="flex space-x-3">
      <div className="text-3xl">{book.image}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600">by {book.author}</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {book.genre}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">{book.condition}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {book.owner} • {book.area}
        </p>
        <button 
          onClick={() => onRequest(book)}
          className="mt-3 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Request to Borrow
        </button>
      </div>
    </div>
  </div>
);