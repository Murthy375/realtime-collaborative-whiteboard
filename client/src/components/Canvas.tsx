// konva
import { Stage, Layer, Rect } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
import type { Vector2d } from "konva/lib/types";

// types
import { DEFAULT_SHAPES } from "../constants/defaultShapes.ts";
import type { ShapeData } from "../types.ts";

// react
// import { useState } from "react";

// zustand
import { useAppStore } from "../store/index.ts";

const Canvas = () => {
  // const [shapes, setShapes] = useState<ShapeData[]>([]); // no need to use local state, zustand handles it
  const elements = useAppStore((store) => store.elements);

  console.log(elements);
  console.log(elements.length);

  // witch tool has been selected
  const selectedTool = useAppStore((store) => store.selectedTool);

  function toolClickedHandler(evt: KonvaEventObject<MouseEvent>): void {
    // give me x and y co-ordonates,
    // so that later I can place my shape(s) at that right exact poition(x, y) on the canvas(Stage)
    const stage = evt.target.getStage();
    if (!stage) return;

    const point: Vector2d | null = stage.getPointerPosition();
    if (!point) return;

    switch (selectedTool) {
      case "rect": {
        const newShape: ShapeData = {
          type: selectedTool,
          id: crypto.randomUUID(),
          x: point.x,
          y: point.y,
          width: DEFAULT_SHAPES.rect.width,
          height: DEFAULT_SHAPES.rect.height,
          draggable: DEFAULT_SHAPES.rect.draggable,
          fill: DEFAULT_SHAPES.rect.fill,
          stroke: DEFAULT_SHAPES.rect.stroke,
          strokeWidth: DEFAULT_SHAPES.rect.strokeWidth,
          rotation: DEFAULT_SHAPES.rect.rotation,
        };

        useAppStore.getState().updateElements([...elements, newShape]);
        break;
      }

      case "arrow":
        DEFAULT_SHAPES.arrow;
        break;

      default:
        break;
    }
  }

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={toolClickedHandler}
      >
        <Layer>
          {elements.map((element) => {
            if (element.type === "rect") {
              return (
                <Rect
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  width={element.width}
                  height={element.height}
                  fill={element.fill}
                  stroke={element.stroke}
                  strokeWidth={element.strokeWidth}
                  rotation={element.rotation}
                />
              );
            }
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default Canvas;
