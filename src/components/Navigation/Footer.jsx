// src/components/Navigation/Footer.jsx
import React from 'react';
import { Footer } from 'flowbite-react';

const PageFooter = () => {
  return (
    <Footer className="rounded-none">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Footer.Copyright href="#" by="DIGISCHOLAR™" year={2025} />
      </div>
    </Footer>
  );
};

export default PageFooter;