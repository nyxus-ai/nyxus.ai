import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-20 py-8">
      <div className="container mx-auto text-center px-6">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} nyxus.ai. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
