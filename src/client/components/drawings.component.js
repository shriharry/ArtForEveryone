import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveDrawing } from "../stores/sagas/actions/drawing.action";
import { isDrawingSavedSelector } from "../stores/selectors/drawing.selector";
import { useNavigate } from "react-router-dom";
import { userIdSelector } from "../stores/selectors/auth.selector";
import {
  PRIVATE,
  PUBLIC,
  RECORDING_PENDING,
  RECORDING_PLAYING,
  RECORDING_STARTED,
  RECORDING_STOPPED,
} from "../utils/constants";
import {
  calculateTimeTaken,
  draw,
  prepareToaster,
  setMousePositionOnCanvas,
  slowdown,
} from "../utils/helper";

export default function Drawings() {
  const canvas = useRef(null);
  const recordings = useRef([]);
  const startTime = useRef(new Date().getTime());

  const [canvasContext, setCanvasContext] = useState(null);
  const [mode, setMode] = useState("pen");
  const [color, setColor] = useState("#0000FF");
  const [stroke, setStroke] = useState("12");

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const [isMouseDown, SetMouseDown] = useState(false);

  const [isReadForSave, setReadyForSave] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState(RECORDING_PENDING);

  const userId = useSelector(userIdSelector);

  const isDrawingSaved = useSelector(isDrawingSavedSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDrawingSaved) {
      toast.success("Drawing is saved successfully.", prepareToaster);
      navigate("/list", { replace: true });
    } else if (isDrawingSaved === false) {
      toast.error(
        "Something went wrong while saving..; please try again",
        prepareToaster
      );
    }
  }, [isDrawingSaved]);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");

    // Set resolution
    canvas.current.width = 1024;
    canvas.current.height = 768;
    // Set display size
    canvas.current.style.width = "100%";
    canvas.current.style.height = "100%";

    setCanvasContext(ctx);
  }, []);

  const setMousePositions = (eventInfo) => {
    const { currentMouseX, currentMouseY } = setMousePositionOnCanvas(
      eventInfo,
      canvas.current,
      window.scrollX,
      window.scrollY
    );
    setMouseX(currentMouseX);
    setMouseY(currentMouseY);
  };

  const handleMouseDown = (eventInfo) => {
    setMousePositions(eventInfo);
    setLastX(mouseX);
    setLastY(mouseY);
    SetMouseDown(true);
  };

  const handleMouseUpAndOutAndCancel = (eventInfo) => {
    setMousePositions(eventInfo);
    SetMouseDown(false);
  };

  const handleMouseMove = (eventInfo) => {
    setMousePositions(eventInfo);

    if (isMouseDown) {
      const ctx = canvasContext;
      ctx.beginPath();
      if (mode === "pen") {
        const strokeInfo = {
          moveTo: { lastX, lastY },
          lineTo: { mouseX, mouseY },
          color,
          stroke,
        };
        draw(ctx, strokeInfo);
        setReadyForSave(true);

        if (recordingStatus === RECORDING_STARTED) {
          recordings.current.push(strokeInfo);
        }
      } else {
        ctx.globalCompositeOperation = "destination-out";
        ctx.rect(lastX, lastY, 30, 30);
        ctx.fill();
      }
      setLastX(mouseX);
      setLastY(mouseY);
    }
  };

  const saveAsImage = (status) => {
    if (!isReadForSave) {
      return;
    }
    const endTime = new Date().getTime();
    const time = endTime - startTime.current;
    const timeTaken = calculateTimeTaken(time);
    const drawingData = canvas.current.toDataURL("image/webp", 0.5);
    dispatch(saveDrawing({ drawingData, timeTaken, status, userId }));
  };

  const clearAll = () => {
    canvasContext.clearRect(0, 0, canvas.current.width, canvas.current.height);
    setReadyForSave(false);
  };

  const playRecording = async () => {
    setRecordingStatus(RECORDING_PLAYING);
    canvasContext.clearRect(0, 0, canvas.current.width, canvas.current.height);
    const ctx = canvasContext;

    for (let i = 0; i < recordings.current.length; i++) {
      await slowdown(75);
      ctx.beginPath();
      draw(ctx, recordings.current[i]);
      if (i === recordings.current.length - 1) {
        setRecordingStatus(RECORDING_STOPPED);
      }
    }
  };

  const resetRecording = () => {
    recordings.current = [];
    setRecordingStatus(RECORDING_PENDING);
  };

  // For tool buttons
  const disableColorAndSizePicker = mode === "eraser" ? true : false;
  const getClassNameForPen = mode === "pen" ? `active` : ``;
  const getClassNameForEraser = mode === "eraser" ? `active` : ``;
  const getDisableClassName = !isReadForSave ? "disable-button" : "";
  const getDisableClassNameForSavePublic = !isReadForSave
    ? "disable-button"
    : "text-success";
  const getDisableClassNameForSavePrivate = !isReadForSave
    ? "disable-button"
    : "text-danger";
  const getDisableClassNameForColorAndSize =
    mode === "eraser" ? "disable-button" : "";

  // For recording buttons
  const getClassNameForRecord =
    recordingStatus === RECORDING_PENDING ? "text-danger" : "disable-icon";
  const getClassNameForStop = [
    RECORDING_PENDING,
    RECORDING_STOPPED,
    RECORDING_PLAYING,
  ].includes(recordingStatus)
    ? "disable-icon"
    : "text-danger";
  const getClassNameForPlay = [
    RECORDING_PENDING,
    RECORDING_STARTED,
    RECORDING_PLAYING,
  ].includes(recordingStatus)
    ? "disable-icon"
    : "text-danger";
  const getClassNameForReset = [RECORDING_PENDING, RECORDING_STARTED].includes(
    recordingStatus
  )
    ? "disable-icon"
    : "text-danger";

  return (
    <>
      <div className="sidebar font-size">
        <a onClick={() => setMode("pen")} className={getClassNameForPen}>
          <span>
            Brush <i className="bi bi-brush-fill"></i>
          </span>
        </a>
        <a onClick={() => setMode("eraser")} className={getClassNameForEraser}>
          <span>
            Eraser <i className="bi bi-eraser-fill"></i>
          </span>
        </a>
        <a className={getDisableClassNameForColorAndSize}>
          <span>
            Color{" "}
            <input
              disabled={disableColorAndSizePicker}
              type="color"
              onChange={(e) => setColor(e.target.value)}
              style={{ verticalAlign: "bottom", cursor: "pointer" }}
              id="exampleColorInput"
              value={color}
              title="Choose your color"
            ></input>
          </span>
        </a>
        <a className={getDisableClassNameForColorAndSize}>
          <span>
            <input
              disabled={disableColorAndSizePicker}
              type="range"
              className="form-range"
              value={stroke}
              min="2"
              max="25"
              step="1"
              onChange={(e) => setStroke(e.target.value)}
              id="customRange3"
            ></input>{" "}
            Size: {stroke}
          </span>
        </a>
        <a
          className={getDisableClassNameForSavePublic}
          onClick={() => saveAsImage(PUBLIC)}
        >
          <span>
            Save as <span className="">Public</span>{" "}
            <i className="bi bi-eye-slash-fill"></i>
          </span>
        </a>
        <a
          className={getDisableClassNameForSavePrivate}
          onClick={() => saveAsImage(PRIVATE)}
        >
          <span>
            Save as <span>Private</span> <i className="bi bi-eye-fill"></i>
          </span>
        </a>
        <a className={getDisableClassName} onClick={() => clearAll()}>
          <span>
            Reset <i className="bi bi-bootstrap-reboot"></i>
          </span>
        </a>
        <a className={`size-25 ` + getDisableClassName}>
          <span>
            <i
              title="Start Recording"
              className={`bi bi-record-btn ` + getClassNameForRecord}
              onClick={() => setRecordingStatus(RECORDING_STARTED)}
            ></i>{" "}
            <i
              title="Stop Recording"
              className={`bi bi-stop-btn ` + getClassNameForStop}
              onClick={() => setRecordingStatus(RECORDING_STOPPED)}
            ></i>{" "}
            <i
              title="Play Recording"
              className={`bi bi-play-btn ` + getClassNameForPlay}
              onClick={() => playRecording()}
            ></i>{" "}
            <i
              title="Reset Recording"
              className={`bi bi-bootstrap-reboot ` + getClassNameForReset}
              onClick={() => resetRecording()}
            ></i>
          </span>
        </a>
      </div>
      <div className="content">
        <div className="container">
          <canvas
            ref={canvas}
            className="canvas-paper"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpAndOutAndCancel}
            onMouseOut={handleMouseUpAndOutAndCancel}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUpAndOutAndCancel}
            onTouchCancel={handleMouseUpAndOutAndCancel}
          ></canvas>
        </div>
      </div>
    </>
  );
}
