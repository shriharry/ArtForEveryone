import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveDrawing } from "../stores/sagas/actions/drawing.action";
import { isDrawingSavedSelector } from "../stores/selectors/drawing.selector";
import { useNavigate } from "react-router-dom";
import { userIdSelector } from "../stores/selectors/auth.selector";
import { PRIVATE, PUBLIC } from "../utils/constants";

export default function Drawings() {
  const canvas = useRef(null);

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

  const [] = useState();

  const userId = useSelector(userIdSelector);

  const startTime = useRef(new Date().getTime());

  const [isMouseDown, SetMouseDown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDrawingSaved = useSelector(isDrawingSavedSelector);
  useEffect(() => {
    if (isDrawingSaved) {
      toast.success("Drawing is saved successfully.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      navigate("/list", { replace: true });
    } else if (isDrawingSaved === false) {
      toast.error("Something went wrong while saving..; please try again", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
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

    // Put your mousedown stuff here
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

    // Put your mouseup stuff here
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

    // Put your mouseOut stuff here
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

    // Put your mousemove stuff here
    if (isMouseDown) {
      const ctx = canvasContext;
      ctx.beginPath();
      if (mode == "pen") {
        ctx.globalCompositeOperation = "source-over";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = color;
        ctx.lineWidth = stroke;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        setReadyForSave(true);
      } else {
        ctx.globalCompositeOperation = "destination-out";
        ctx.rect(lastX, lastY, 30, 30);
        ctx.fill();
      }
      setLastX(mouseX);
      setLastY(mouseY);
    }
  };

  function calculateTimeTaken(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    if (hours !== 0) {
      return hours + " hours " + minutes + " minutes " + seconds + " seconds";
    } else if (minutes !== 0) {
      return minutes + " minutes " + seconds + " seconds";
    } else if (seconds !== 0) {
      return seconds + " seconds";
    } else {
      return milliseconds + " milliseconds";
    }
  }

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

  const getClassNameForPen = mode === "pen" ? `active` : ``;
  const getClassNameForEraser = mode === "eraser" ? `active` : ``;
  const disableColorAndSizePicker = mode === "eraser" ? true : false;

  const getDisableClassName = !isReadForSave ? "disable-button" : "";
  
  const getDisableClassNameForSavePublic = !isReadForSave ? "disable-button" : "text-success";
  const getDisableClassNameForSavePrivate = !isReadForSave ? "disable-button" : "text-danger";

  const getDisableClassNameForColorAndSize =
    mode === "eraser" ? "disable-button" : "";
  return (
    <>
      <div className="sidebar">
        <a onClick={() => setMode("pen")} className={getClassNameForPen}>
          <span style={{ fontSize: 18 }}>
            Brush <i className="bi bi-brush-fill"></i>
          </span>
        </a>
        <a onClick={() => setMode("eraser")} className={getClassNameForEraser}>
          <span style={{ fontSize: 18 }}>
            Eraser <i className="bi bi-eraser-fill"></i>
          </span>
        </a>
        <a className={getDisableClassNameForColorAndSize}>
          <span style={{ fontSize: 18 }}>
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
          <span style={{ fontSize: 18 }}>
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
        <a className={getDisableClassNameForSavePublic} onClick={() => saveAsImage(PRIVATE)}>
          <span style={{ fontSize: 18 }}>
            Save as <span className="">Public</span> <i className="bi bi-eye-slash-fill"></i>
          </span>
        </a>
        <a className={getDisableClassNameForSavePrivate} onClick={() => saveAsImage(PUBLIC)}>
          <span style={{ fontSize: 18 }}>
            Save as <span>Private</span> <i className="bi bi-eye-fill"></i>
          </span>
        </a>
        <a className={getDisableClassName} onClick={() => clearAll()}>
          <span style={{ fontSize: 18 }}>
           Reset <i className="bi bi-bootstrap-reboot"></i>
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
