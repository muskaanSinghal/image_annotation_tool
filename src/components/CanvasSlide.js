import { useRef, useState } from "react";
import { images } from "../exports";
import Canvas from "./Canvas";
import { IconButton, PrimaryBtn } from "./util";
import {
  faAngleLeft,
  faAngleRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CanvasSlide = function () {
  const { image1, image2, image3, image4, image5 } = images;
  const imgArr = [image1, image2, image3, image4, image5];
  const [finalData, setFinalData] = useState({});
  const [current, setCurrent] = useState(0);
  const anchor = useRef();
  // handle navigation btns
  const navHandler = function () {
    if (this === "NEXT") {
      setCurrent((prev) => prev + 1);
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleSave = function (imageId, list) {
    setFinalData((prev) => ({ ...prev, [imageId]: list }));
    alert("List saved successfully");
  };

  // function to download json file
  const downloadJson = function () {
    const obj = {};
    for (let key in finalData) {
      const boxes = finalData[key];
      boxes.forEach((box) => {
        const { x, y, h, w } = box;
        const f = { x1: x, y1: y, x2: x + w, y2: y + h };
        obj[key] = f;
      });
    }
    const json = JSON.stringify(obj);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    anchor.current.href = href;
    anchor.current.click();
  };
  return (
    <div className="bg-offwhite  relative rounded-[10px] shadow-2xl  my-[60px]">
      <Canvas
        source={imgArr[current]}
        imageId={`image_${current}`}
        savedList={finalData[`image_${current}`]}
        onSave={handleSave}
      />
      <IconButton
        styles="absolute left-[-50px] top-[45%]"
        onClick={navHandler.bind("PREVIOUS")}
        icon={faAngleLeft}
        disabled={current === 0}
      />

      <IconButton
        styles="absolute right-[-50px] top-[45%]"
        onClick={navHandler.bind("NEXT")}
        icon={faAngleRight}
        disabled={current === imgArr.length - 1}
      />
      {/* Slide count */}
      <p className="text-center text-sm font-semibold text-primary">
        {current + 1} / {imgArr.length}
      </p>
      <p className="font-bold text-sm flex justify-center items-baseline text-blue-400 gap-x-2 my-4">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>
          Please save your changes before moving forward to next slide.
        </span>
      </p>

      <div className="fixed inset-x-0 py-2 bottom-0 flex justify-center items-center bg-primary shadow-inner">
        <PrimaryBtn
          onClick={downloadJson}
          disabled={Object.keys(finalData)?.length === 0}
        >
          SUBMIT
        </PrimaryBtn>
      </div>
      {/* anchor tag used just for downloading purpose will be hidden on screen */}
      <a download={true} ref={anchor} className="sr-only"></a>
    </div>
  );
};

export default CanvasSlide;
