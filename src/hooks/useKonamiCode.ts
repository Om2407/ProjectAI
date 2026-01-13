import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export const useKonamiCode = () => {
  const [success, setSuccess] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key];
        
        // Keep only last 10 keys
        if (newKeys.length > 10) {
          newKeys.shift();
        }
        
        // Check if the sequence matches
        if (newKeys.join(',') === KONAMI_CODE.join(',')) {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 5000); // Reset after 5 seconds
          return [];
        }
        
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return success;
};