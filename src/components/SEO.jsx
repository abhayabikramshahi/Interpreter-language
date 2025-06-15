import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ title = 'Abhaya Language', description = 'Abhaya Language: The revolutionary Nepali programming language. Learn, code, and run in Nepali. Modern, intuitive, and open-source.', keywords = 'Abhaya, Nepali Programming, Code Runner, Abhaya Language, Learn Nepali Coding', url = 'https://abhayalang.com', image = '/public/vite.svg', children }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />
      {children}
    </Helmet>
  );
}

export default SEO;
