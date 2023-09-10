import { useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";

const BoundingBox = function ({
  isSelected,
  onClick = () => {},
  id,
  onChange = () => {},
  shapeProps = {},
  ...props
}) {
  const shapeRef = useRef();
  const transRef = useRef();

  useEffect(() => {
    if (isSelected) {
      transRef.current.nodes([shapeRef.current]);
      transRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleClick = function () {
    onClick(id);
  };

  return (
    <>
      <Rect
        ref={shapeRef}
        onClick={handleClick}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
        {...props}
      />

      {isSelected && (
        <Transformer
          ref={transRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default BoundingBox;
