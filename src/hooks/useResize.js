import { useEffect, useState } from 'react';

const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', () => {
      setTimeout(handleResize, 100);
    });

    return document.removeEventListener('resize', handleResize);
  }, []);
  return width;
};

export default useResize;
