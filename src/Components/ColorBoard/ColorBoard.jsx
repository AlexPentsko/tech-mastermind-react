import '../../App.scss';

export const ColorBoard = ({colors, handleColor}) => {
  return (
    <div className="colorBoard">
      {colors.map((colorId) => {
        return (
          <button key={colorId.id} className="color" id={colorId.id} onClick={handleColor}></button>
        );
      })}
    </div>
  );
};
