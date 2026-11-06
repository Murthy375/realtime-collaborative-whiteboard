// konva
import { Stage, Layer, Rect } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
import type { Vector2d } from "konva/lib/types";

// types
import { DEFAULT_SHAPES } from "../constants/defaultShapes.ts";
import type { ShapeData } from "../types.ts";

// react
import { useState } from "react";

// zustand
import { useSlectedToolStore } from "../store/whiteboard.slice.ts";

const Canvas = () => {
  const [shapes, setShapes] = useState<ShapeData[]>([]);

  // witch tool has been selected
  const selectedTool = useSlectedToolStore((tool) => tool.selectedTool);

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

        setShapes((prev) => [...prev, newShape]);
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
          {shapes.map((shape) => {
            if (shape.type === "rect") {
              return (
                <Rect
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  fill={shape.fill}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  rotation={shape.rotation}
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
