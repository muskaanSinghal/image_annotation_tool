import { useEffect, useState } from "react";
import { Image } from "react-konva";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../exports";

const CustomImage = function ({ source }) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    const image = new window.Image();
    image.src = source;
    image.onload = () => {
      setImg(image);
    };
  }, [source]);
  return (
    img && <Image height={CANVAS_HEIGHT} width={CANVAS_WIDTH} image={img} />
  );
};

export default CustomImage;
