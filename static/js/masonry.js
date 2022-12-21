// Clicking on images creates a popup, clicking again enlarges them and clicking besides the img closes them
const masonry = document.querySelector(".masonry");
let popup = document.getElementById("popup");
let popupImg = document.querySelector("#popup img");
const selectedImage = document.getElementById("selectedImage");
var masonryImages = [...$(".grid-images:visible")];
const selectedIndex = null;

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
//   image.addEventListener("click", () => {
//     // console.log(image.children[0]);
//     imageImg = image.children[0];
//     // init popup

//     // image.style.scale = '1.5'
//     // image.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

//     popup.setAttribute("id", "popup");
//     popup.style.cssText = "visibility: visible;";
//     popup.style.opacity = "1";
//     // popup.style.transition = 'all 0.4s ease-in';
//     popup.style.transition = "all 0.4s ease-out";
//     popup.setAttribute("onclick", "closeImg()");
//     popup.setAttribute("onclick", "closeImgByClicking()");
//     window.addEventListener(
//       "keydown",
//       (e) => {
//         if (e.key === "Escape") {
//           closeImg();
//         } else if (e.key === "ArrowLeft") {
//           image.previousElementSibling.click();
//           console.log(image.previousElementSibling);
//         } else if (e.key === "ArrowRight") {
//           console.log(image.nextElementSibling);
//           image.nextElementSibling.click();
//         }
//       },
//       { once: true }
//     );

//     popupImg.setAttribute("src", imageImg.src);
//     popupImg.setAttribute("onclick", "enlargeImg()");
//   });
// });

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

// $(function () {
// $(".grid").masonry({ itemSelector: ".grid-item" });

$(".filtering").on("click", "button", function () {
  var a = $(".masonry").isotope({});
  var e = $(this).attr("data-filter");
  a.isotope({ filter: e });

  // Delay until filtering is done
  setTimeout(() => {
    masonryImages = [...$(".grid-images:visible")];
    prepareImgs();
    // Clone the masonry to remove all eventlisteners present
    var clone = document.querySelector(".masonry").cloneNode(true);
  }, 500);
});

$(".filtering").on("click", "button", function () {
  $(this).addClass("active").siblings().removeClass("active");
});
// });

// $("#myBtnContainer").children[0].click();
// console.log(document.querySelector("#myBtnContainer").children[0].click());
