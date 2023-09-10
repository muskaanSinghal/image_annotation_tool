import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import BoundingBox from "./BoundingBox";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../exports";
import CustomImage from "./CustomImage";
import React from "react";
import { PrimaryBtn } from "./util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
// Function for getting mouse co-ordinates
const getMouseCoords = function (e) {
  const stage = e.target.getStage();
  return stage?.getPointerPosition();
};

const Canvas = function ({
  source,
  imageId,
  onSave = () => {},
  savedList = [],
}) {
  const [current, setCurrent] = useState({
    x: 0,
    y: 0,
    h: 100,
    w: 100,
    active: false,
  });
  // Shape id to be tranformed or deleted
  const [selectedShape, setSelectedShape] = useState();
  const [list, setList] = useState([]);

  const mouseDown = useRef();

  const handleMouseDown = function (e) {
    if (
      e.target === e.target.getStage() ||
      e.target?.getClassName() === "Image"
    ) {
      setSelectedShape(null);
      const { x, y } = getMouseCoords(e);
      setCurrent({
        x,
        y,
        h: 0,
        w: 0,
        active: true,
      });
      mouseDown.current = true;
    }
  };

  const handleMouseMove = function (e) {
    // Code executed only if mouse is down pressed
    if (mouseDown.current) {
      const { x, y } = getMouseCoords(e);
      setCurrent((prev) => {
        const { x: sx, y: sy } = prev;
        const w = x - sx;
        const h = y - sy;
        return { ...prev, w, h };
      });
    }
  };

  const handleMouseUp = function (e) {
    const { x, y } = getMouseCoords(e);
    // If clicked on same position nothing should happen
    if (
      Math.round(Math.abs(x - current.x)) === 0 ||
      Math.round(Math.abs(y - current.y)) === 0
    ) {
      setCurrent({ x: 0, y: 0, h: 0, w: 0, active: false });
      mouseDown.current = false;
      return;
    }
    // If clicked on stage update rects list
    if (current.active) {
      setList((prev) => [
        ...prev,
        { id: `rect-${prev.length + 1}`, ...current },
      ]);
    }
    setCurrent({ x: 0, y: 0, h: 0, w: 0, active: false });
    mouseDown.current = false;
  };

  const handleTransform = function (e) {
    e.evt.stopPropagation();
  };

  const handleSelect = function (id) {
    setSelectedShape(id);
  };

  const deleteBoundingBox = function () {
    if (selectedShape) {
      setList((prev) => prev.filter((item) => item.id !== selectedShape));
      setSelectedShape(null);
    }
  };

  const handleSave = function () {
    onSave(imageId, list);
  };

  const handleReset = function () {
    setList([]);
  };

  useEffect(() => {
    setList(savedList);
  }, [imageId, savedList?.length]);

  return (
    <div>
      <div
        className="bg-primary fixed inset-x-0 top-0 flex justify-center items-center z-50 py-1 gap-x-5 shadow-2xl
       "
      >
        <PrimaryBtn
          onClick={deleteBoundingBox}
          styles="text-red-400 border-red-400"
          disabled={list?.length === 0 || !selectedShape}
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} />
        </PrimaryBtn>

        <PrimaryBtn onClick={handleSave} disabled={list === 0} title="Save">
          <FontAwesomeIcon icon={faSave} />
        </PrimaryBtn>
        <PrimaryBtn
          onClick={handleReset}
          disabled={list.length === 0}
          styles="text-blue-400 border-blue-400"
          title={"Reset List"}
        >
          <FontAwesomeIcon icon={faRotate} />
        </PrimaryBtn>
      </div>
      <Stage
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="bg-teal-700"
      >
        {/* Overlay Image */}
        <Layer width={700}>
          <CustomImage source={source} />
        </Layer>
        <Layer>
          {/* List of all bounding boxes */}
          {list?.map((item, idx) => {
            return (
              <React.Fragment key={`rect-${idx}`}>
                <BoundingBox
                  x={item?.x}
                  y={item?.y}
                  height={item?.h}
                  width={item?.w}
                  stroke={"#000"}
                  fill="rgba(255,255,255,0.5)"
                  onTransform={handleTransform}
                  onClick={handleSelect}
                  id={item.id}
                  isSelected={item.id === selectedShape}
                  shapeProps={item}
                  onChange={(newAttrs) => {
                    const { height: h, width: w, ...rest } = newAttrs;
                    const rects = list.slice();
                    rects[idx] = { ...rest, h, w };
                    setList(rects);
                  }}
                />
                <Transformer
                  //   ref={trRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (newBox.width < 5 || newBox.height < 5) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
              </React.Fragment>
            );
          })}
          {/* Current shape */}
          {current.active && (
            <Rect
              x={current.x}
              y={current.y}
              height={current.h}
              width={current.w}
              stroke={"#000"}
              fill="rgba(255,255,255,0.3)"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
