// react
import { useEffect } from "react";

// konva
import { Stage, Layer, Rect } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
import type { Vector2d } from "konva/lib/types";

// types
import { DEFAULT_SHAPES } from "../constants/defaultElements.ts";
import type { ElementsData } from "../types.ts";

// zustand
import { useAppStore } from "../store/index.ts";
import { socket } from "../socket.ts";

const Canvas = () => {
  const elements = useAppStore((store) => store.elements);
  const selectedTool = useAppStore((store) => store.selectedTool);
  const addLocalElement = useAppStore((store) => store.addLocalElement);

  // loads existing elements when joining the whiteboard
  useEffect(() => {
    const onInitialElements = (data: string) => {
      let parsedData: unknown;
      try {
        parsedData = JSON.parse(data);
      } catch (error) {
        console.error("Invalid whiteboard-elements payload", error);
        return;
      }

      if (!Array.isArray(parsedData)) {
        console.error("Expected whiteboard-elements payload to be an array");
        return;
      }

      useAppStore.getState().updateElements(parsedData);
    };

    // listen for elements and update the store
    const onRecieveElements = (newElement: ElementsData) => {
      useAppStore.getState().addRemoteElement(newElement);
    };

    socket.on("whiteboard-elements", onInitialElements);
    socket.on("drawing-data", onRecieveElements);

    return () => {
      socket.off("whiteboard-elements", onInitialElements);
      socket.off("drawing-data", onRecieveElements);
    };
  }, []);

  function toolClickedHandler(evt: KonvaEventObject<MouseEvent>): void {
    // give me x and y co-ordonates,
    // so that later I can place my shape(s) at that right exact poition(x, y) on the canvas(Stage)
    const stage = evt.target.getStage();
    if (!stage) return;

    const point: Vector2d | null = stage.getPointerPosition();
    if (!point) return;

    switch (selectedTool) {
      case "rect": {
        const newShape: ElementsData = {
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

        addLocalElement(newShape);
        break;
      }

      case "arrow": {
        const newShape: ElementsData = {
          type: selectedTool,
          id: crypto.randomUUID(),
          start: point,
          end: {
            x: point.x + 100,
            y: point.y + 100,
          },
          stroke: DEFAULT_SHAPES.arrow.stroke,
          strokeWidth: DEFAULT_SHAPES.arrow.strokeWidth,
          pointerLength: DEFAULT_SHAPES.arrow.pointerLength,
          pointerWidth: DEFAULT_SHAPES.arrow.pointerWidth,
          draggable: DEFAULT_SHAPES.arrow.draggable,
        };

        addLocalElement(newShape);
        break;
      }

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
                  draggable={element.draggable}
                  fill={element.fill}
                  stroke={element.stroke}
                  strokeWidth={element.strokeWidth}
                  rotation={element.rotation}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default Canvas;
