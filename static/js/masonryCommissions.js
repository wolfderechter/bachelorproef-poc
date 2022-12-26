// Clicking on images creates a popup, clicking again enlarges them and clicking besides the img closes them
var masonry = document.querySelector(".masonry");
let popup = document.getElementById("popup");
let popupImg = document.querySelector("#popup img");
var masonryImages = [...$(".grid-images:visible")];

function prepareImgs() {
  for (let index = 0; index < masonryImages.length; index++) {
    masonryImages[index].addEventListener("click", () => {
      imageImg = masonryImages[index].children[0];

      popup.setAttribute("id", "popup");
      popup.style.cssText = "visibility: visible;";
      popup.style.opacity = "1";
      popup.style.transition = "all 0.4s ease-out";
      popup.setAttribute("onclick", "closeImgByClicking()");

      function addWindowKeydownListener() {
        window.addEventListener(
          "keydown",
          (e) => {
            // Only do something when popup is visible
            if (popup.style.visibility === 'visible') {
              if (e.key === "Escape") {
                closeImg();
              } else if (e.key === "ArrowLeft") {
                masonryImages[
                  (index - (1 % masonryImages.length) + masonryImages.length) %
                  masonryImages.length
                ].click();
              } else if (e.key === "ArrowRight") {
                masonryImages[(index + 1) % masonryImages.length].click();
              } else {
                addWindowKeydownListener();
              }
            }
          },
          { once: true }
        );
      }

      addWindowKeydownListener();

      popupImg.setAttribute("src", imageImg.src);
      popupImg.setAttribute("onclick", "enlargeImg()");
    });
  }
}

function closeImg() {
  popupElem = document.querySelector("#popup");
  // popupElem.style.transform = 'translateY(-200%)';
  popupElem.style.opacity = "0";
  popupElem.style.visibility = "hidden";
  popupElem.style.transition = "all 0.4s ease-out";
  popupElem.firstChild.src = "";
}
function closeImgByClicking() {
  if (event.target.tagName.toLowerCase() === "div") {
    closeImg();
  }
}

function enlargeImg() {
  popupImg.classList.add("enlarged");
  popupImg.setAttribute("onclick", "shrinkImg()");
}

function shrinkImg() {
  popupImg.classList.remove("enlarged");
  popupImg.setAttribute("onclick", "enlargeImg()");
}

window.onload(() => {
  prepareImgs();
})