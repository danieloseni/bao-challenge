import {useEffect, useState, useCallback} from 'react';

export default function useWindowHeight(){
  const [height, setHeight] = useState(window.innerHeight);

  const onResize = useCallback(() => {
    setHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
        window.removeEventListener('resize', onResize)
    }
  }, [onResize]);

  return {height}
}