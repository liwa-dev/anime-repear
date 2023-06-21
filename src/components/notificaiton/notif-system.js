import file from "./notif.wav";

let timeoutId;
let clear;
const audio = new Audio(file);
function openNotification(timer, content) {
  const duration = content.length * 180;
  console.log(duration);
  audio.play();
  const notificationElements = document.querySelectorAll(".notification");
  notificationElements.forEach(function (element) {
    element.classList.add("notification-hidden");
  });

  // Clear the previous timeout before opening a new notification
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    closeNotification();
  }, duration);

  const thisNotification = document.querySelector(".notification");
  thisNotification.classList.remove("notification-hidden");
  const text = document.querySelector(".textNotification");
  const messageContainer = document.querySelector(".message-container");
  const message = document.querySelector(".message");

  const isTextOverflowing = () => {
    return message.scrollWidth > messageContainer.offsetWidth;
  };

  const startMarqueeAnimation = () => {
    text.classList.add("marquee");
  };

  const stopMarqueeAnimation = () => {
    text.classList.remove("marquee");
  };

  const checkForOverflow = () => {
    if (isTextOverflowing() && text.textContent.length > 20) {
      startMarqueeAnimation();
    } else {
      stopMarqueeAnimation();
    }
  };

  if (clear) {
    clearTimeout(clear);
    text.classList.remove("marquee");
  }

  clear = setTimeout(checkForOverflow, 3000);

  text.textContent = content;
  setTimeout(function () {
    thisNotification.classList.add("open");
    const openElements = document.querySelectorAll(".notification.open");
    const circle = document.querySelector(".circle");
    setTimeout(() => {
      circle.style.width = "20%";
    }, 550);
    openElements.forEach(function (element) {
      element.classList.add("show", "open--rot");
      setTimeout(function () {
        element.classList.add("open--width");
      }, 750);
    });
  }, 50);

  return timeoutId;
}

function closeNotification() {
  try {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (clear) {
      clearTimeout(clear);
    }
    const type = document.querySelector(".notification");
    const circle = document.querySelector(".circle");
    if (circle && type) {
      const open = document.querySelector(".notification.open");
      if (open) {
        circle.style.width = "100%";
        open.classList.remove("open--width");
        setTimeout(function () {
          open.classList.add("scaleout");
        }, 700);
        setTimeout(function () {
          open.classList.remove("open--rot");
          open.classList.remove("scaleout");
        }, 850);
        setTimeout(function () {
          open.classList.add("notification-hidden");
          open.classList.remove("open");
          open.classList.remove("show");
        }, 890);
      }
    } else {
      console.log("Could not find .notification.open element");
    }
  } catch (error) {
    console.error(error);
  }
}

let toasttime;
let toasttime2;
function ToastRandom(content,contentSrc) {
  const toast = document.querySelector(".toast");
  const textToast = document.querySelector(".textToast");
  const containertoast = document.querySelector(".containertoast");
  textToast.textContent = "You're watching " + content;

  containertoast.addEventListener("click", function() {
    navigator.clipboard.writeText(content);
  });

  // Get the thumbnail div element
  const thumbnailDiv = document.querySelector(".thumbnail");

  // Get the img element inside the thumbnail div
  const imageElement = thumbnailDiv.querySelector("img");

  // Set the new src attribute
  imageElement.setAttribute("src",contentSrc);


  toast.style.display = "block";
  setTimeout(() => {
    toast.style.right = "10px";
  }, 1000);

  //Close
  if (toasttime) {
    clearTimeout(toasttime);
  } 
  if (toasttime2) {
    clearTimeout(toasttime2);
  }
  toasttime = setTimeout(() => {
    toast.style.right = "-500px";
    toasttime2 = setTimeout(() => {
      toast.style.display = "none";
    }, 800);
  }, 10000);
}

function closeToast() {
  const toast = document.querySelector(".toast");
  setTimeout(() => {
    toast.style.right = "-500px";
    setTimeout(() => {
      toast.style.display = "none";
    }, 800);
  });
}

export { openNotification, closeNotification, ToastRandom, closeToast };
