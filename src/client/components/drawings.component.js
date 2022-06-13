import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveDrawing } from "../stores/sagas/actions/drawing.action";
import { isDrawingSavedSelector } from "../stores/selectors/drawing.selector";
import { useNavigate } from "react-router-dom";
import { userIdSelector } from "../stores/selectors/auth.selector";
import { PRIVATE, PUBLIC, RECORDING_PENDING, RECORDING_PLAYING, RECORDING_STARTED, RECORDING_STOPPED } from "../utils/constants";
import { calculateTimeTaken, draw, prepareToaster, slowdown } from "../utils/helper";

export default function Drawings() {
  const canvas = useRef(null);
  const recordings = useRef([]);

  const [canvasContext, setCanvasContext] = useState(null);
  const [mode, setMode] = useState("pen");
  const [color, setColor] = useState("#0000FF");
  const [stroke, setStroke] = useState("12");

  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const [isReadForSave, setReadyForSave] = useState(false);
  const [recordingStatus, setRecordingStatus ] = useState(RECORDING_PENDING);

  const [] = useState();

  const userId = useSelector(userIdSelector);

  const startTime = useRef(new Date().getTime());

  const [isMouseDown, SetMouseDown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDrawingSaved = useSelector(isDrawingSavedSelector);
  useEffect(() => {
    if (isDrawingSaved) {
      toast.success("Drawing is saved successfully.", prepareToaster);
      navigate("/list", { replace: true });
    } else if (isDrawingSaved === false) {
      toast.error("Something went wrong while saving..; please try again", prepareToaster);
    }
  }, [isDrawingSaved]);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    setCanvasContext(ctx);
    setOffsetTop(canvas.current.offsetTop);
    setOffsetLeft(canvas.current.offsetLeft);
  }, []);

  const handleMouseDown = (e) => {
    if (e.type === "touchmove") {
      setMouseX(parseInt(e.touches[0].clientX - offsetLeft));
      setMouseY(parseInt(e.touches[0].clientY - offsetTop));
    } else {
      setMouseX(parseInt(e.clientX - offsetLeft));
      setMouseY(parseInt(e.clientY - offsetTop));
    }
    setLastX(mouseX);
    setLastY(mouseY);

    SetMouseDown(true);
  };

  const handleMouseUp = (e) => {
    if (e.type === "touchmove") {
      setMouseX(parseInt(e.touches[0].clientX - offsetLeft));
      setMouseY(parseInt(e.touches[0].clientY - offsetTop));
    } else {
      setMouseX(parseInt(e.clientX - offsetLeft));
      setMouseY(parseInt(e.clientY - offsetTop));
    }

    SetMouseDown(false);
  };

  const handleMouseOut = (e) => {
    if (e.type === "touchmove") {
      setMouseX(parseInt(e.touches[0].clientX - offsetLeft));
      setMouseY(parseInt(e.touches[0].clientY - offsetTop));
    } else {
      setMouseX(parseInt(e.clientX - offsetLeft));
      setMouseY(parseInt(e.clientY - offsetTop));
    }

    SetMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (e.type === "touchmove") {
      setMouseX(parseInt(e.touches[0].clientX - offsetLeft));
      setMouseY(parseInt(e.touches[0].clientY - offsetTop));
    } else {
      setMouseX(parseInt(e.clientX - offsetLeft));
      setMouseY(parseInt(e.clientY - offsetTop));
    }

    if (isMouseDown) {
      const ctx = canvasContext;
      ctx.beginPath();
      if (mode === "pen") {
        const strokeInfo = {moveTo: {lastX, lastY}, lineTo: {mouseX, mouseY}, color, stroke };
        draw(ctx, strokeInfo);
        setReadyForSave(true);

        if(recordingStatus === RECORDING_STARTED) {
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
  }

  const playRecording = async() => {
    setRecordingStatus(RECORDING_PLAYING)
    canvasContext.clearRect(0, 0, canvas.current.width, canvas.current.height);
    const ctx = canvasContext;

    for (let i = 0; i < recordings.current.length; i++) {
      await slowdown(75);
      ctx.beginPath(); 
      draw(ctx, recordings.current[i]);
      if(i === recordings.current.length-1) {
        setRecordingStatus(RECORDING_STOPPED)
      }
    };
  }

  const resetRecording = () => {
    recordings.current = [];
    setRecordingStatus(RECORDING_PENDING);
    clearAll();
  }

  // For tool buttons
  const disableColorAndSizePicker = mode === "eraser" ? true : false;
  const getClassNameForPen = mode === "pen" ? `active` : ``;
  const getClassNameForEraser = mode === "eraser" ? `active` : ``;
  const getDisableClassName = !isReadForSave ? "disable-button" : "";
  const getDisableClassNameForSavePublic = !isReadForSave ? "disable-button" : "text-success";
  const getDisableClassNameForSavePrivate = !isReadForSave ? "disable-button" : "text-danger";
  const getDisableClassNameForColorAndSize =
  mode === "eraser" ? "disable-button" : "";
 
  // For recording buttons
  const getClassNameForRecord = (recordingStatus=== RECORDING_PENDING) ? "text-danger" : "disable-icon";
  const getClassNameForStop = [RECORDING_PENDING, RECORDING_STOPPED, RECORDING_PLAYING].includes(recordingStatus) ? "disable-icon" : "text-danger";
  const getClassNameForPlay = [RECORDING_PENDING, RECORDING_STARTED, RECORDING_PLAYING].includes(recordingStatus) ? "disable-icon" : "text-danger";
  const getClassNameForReset = [RECORDING_PENDING, RECORDING_STARTED].includes(recordingStatus)? "disable-icon" : "text-danger";
  
  return (
    <>
      <div className="sidebar">
        <a onClick={() => setMode("pen")} className={`size-18 `+getClassNameForPen}>
          <span>
            Brush <i className="bi bi-brush-fill"></i>
          </span>
        </a>
        <a onClick={() => setMode("eraser")} className={`size-18 `+getClassNameForEraser}>
          <span>
            Eraser <i className="bi bi-eraser-fill"></i>
          </span>
        </a>
        <a className={`size-18 `+getDisableClassNameForColorAndSize}>
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
        <a className={`size-18 `+getDisableClassNameForColorAndSize}>
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
        <a className={`size-18 `+getDisableClassNameForSavePublic} onClick={() => saveAsImage(PUBLIC)}>
          <span>
            Save as <span className="">Public</span> <i className="bi bi-eye-slash-fill"></i>
          </span>
        </a>
        <a className={`size-18 ` +getDisableClassNameForSavePrivate} onClick={() => saveAsImage(PRIVATE)}>
          <span>
            Save as <span>Private</span> <i className="bi bi-eye-fill"></i>
          </span>
        </a>
        <a className={`size-18 `+getDisableClassName} onClick={() => clearAll()}>
          <span>
           Reset <i className="bi bi-bootstrap-reboot"></i>
          </span>
        </a>
        <a className={getDisableClassName}>
          <span >
           <i title="Start Recording"  className={`bi bi-record-btn size-25 `+ getClassNameForRecord} onClick={() => setRecordingStatus(RECORDING_STARTED)}></i>  <i title="Stop Recording" className={`bi bi-stop-btn size-25 `+ getClassNameForStop}  onClick={() => setRecordingStatus(RECORDING_STOPPED)}></i>  <i title="Play Recording" className={`bi bi-play-btn size-25 `+ getClassNameForPlay} onClick={() => playRecording()}></i>  <i title="Reset Recording"  className={`bi bi-bootstrap-reboot size-25 `+ getClassNameForReset} onClick={() => resetRecording()}></i>
           </span>
        </a>
      </div>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col">
              <canvas
                ref={canvas}
                id="canvas"
                width="850"
                height="650"
                className="canvas-paper"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
                onTouchCancel={handleMouseOut}
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
