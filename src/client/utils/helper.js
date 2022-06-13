
  export const calculateTimeTaken = (milliseconds) => {
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

  export const draw = (ctx, recording) => {
    const {moveTo: {lastX, lastY}, lineTo: {mouseX, mouseY}, color, stroke} = recording;
    ctx.globalCompositeOperation = "source-over";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(mouseX, mouseY);
    ctx.strokeStyle = color;
    ctx.lineWidth = stroke;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  export const slowdown = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  export const prepareToaster = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  }

  export const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };