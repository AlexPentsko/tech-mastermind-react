import { useEffect } from 'react';

const SecretColors = () => {
  const colors = ['red', 'blue', 'yellow', 'white', 'green', 'brown', 'purple', 'black'];

  useEffect(() => {
    const getRandomColors = () => {
      const finalColors = [...new Array(4)].map((color) => {
        const random = Math.floor(Math.random() * colors.length);
        return colors[random];
      });
      // 4 secret colors
      console.log(finalColors);
    };
    getRandomColors();
  }, []);
};

export default SecretColors;
