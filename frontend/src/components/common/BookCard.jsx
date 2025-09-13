import React from 'react';

export const BookCard = ({ book, conditionChoices, onRequest }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex gap-4">
    <div className='w-16 h-24 rounded-md shadow-md flex-shrink-0'>
      <img
        src={book.cover_image}
        alt="Book Cover"
      />
    </div>
    <div className="flex-1 flex flex-col gap-1.5">
      <h3 className="font-semibold text-gray-900 text-base leading-tight">{book.title}</h3>
      <p className="text-sm text-gray-600">by {book.author}</p>
      <div className="flex items-center space-x-2 mt-1">
        <span className="text-xs text-gray-500">{book.genre}</span>
        <span className="text-xs text-gray-500">•</span>
        <span className="text-xs text-gray-500">{conditionChoices.find(c => c.value === book.condition)?.display_name || "Unknown"}</span>
      </div>
      <div class="flex flex-col gap-1 my-1">
        <span class="text-xs text-gray-500">by {book.owner.name}</span>
      </div>
      <button 
        onClick={() => onRequest(book)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium self-start mt-1 transition-colors"
      >
        Request to Borrow
      </button>
    </div>
  </div>
);