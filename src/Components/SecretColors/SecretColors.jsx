import { useEffect } from 'react';

const SecretColors = ({ setRandomColor, gameOver, colors }) => {
  useEffect(() => {
    const finalColors = [...new Array(4)].map((color) => {
      const random = Math.floor(Math.random() * colors.length);
      return colors[random];
    });
    setRandomColor(finalColors);
  }, [gameOver]);
};

export default SecretColors;
