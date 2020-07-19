var particle = new Particle();
var myDevice = "0000"; // Photon device ID
var myToken = "0000"; // Photon access token

// functions that hide all screens & then show a specific screen
// these functions also update navigation menu to highlight active screen
function showScreen1() {
  $(".screen").hide();
  $("#screen1").show();
  document.getElementById("camera--view").style.display = "block";
  document.getElementById("camera--sensor").style.display = "none";
  $(".menu").removeClass("active");
  $(".menu").eq(0).addClass("active"); // eq(0) = 1st menu item
}

function showScreen2() {
  $(".screen").hide();
  $("#screen2").show();
  document.getElementById("camera--sensor").style.display = "block";
  $(".menu").removeClass("active");
  $(".menu").eq(1).addClass("active"); // eq(1) = 2nd menu item
}

function showScreen3() {
  $(".screen").hide();
  $("#screen3").show();
  $(".menu").removeClass("active");
  $(".menu").eq(2).addClass("active"); // eq(2) = 3rd menu item
}

function showScreen4() {
  $(".screen").hide();
  $("#screen4").show();
  $(".menu").removeClass("active");
  $(".menu").eq(3).addClass("active"); // eq(3) = 4th menu item
}

function showScreenStickers() {
  $(".text--input").hide();
  $(".stickers").show();
}

function showScreenText() {
  $(".stickers").hide();
  $(".text--input").show();
}

function showNotification() {
  // choose temporary or persistent notification
  // only use one - comment out unused option

  // temporary - closes automatically after delay (can also close manually)
  $("#notification").slideDown("fast").delay(5000).slideUp();

  // persistent - must close manually
  //$("#notification").slideDown("fast");
}

// Add other JS for your smart device web app


// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    document.getElementById("camera--view").style.display = "none";
    $(".screen").hide();
    $("#screen2").show();

  

   



};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);






    // target elements with the "draggable" class
    interact('.draggable')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            // enable autoScroll
            autoScroll: true,

            onstart: function (event) {
             //   console.log('onstart');

            },

            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function (event) {
             //   console.log('onend');
                var textEl = event.target.querySelector('p');

            //    textEl && (textEl.textContent =
            //        'moved a distance of '
            //        + (Math.sqrt(event.dx * event.dx +
            //            event.dy * event.dy)|0) + 'px');
            }
        });

    function dragMoveListener (event) {
      //  console.log('dragMoveListener');
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

        // update the position attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    