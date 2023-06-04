function toggleVideo() {
  var video = document.getElementById("backgroundVideo");
  var displayValue = video.style.display === "none" ? "" : "none";

  if (displayValue === "none") {
    video.pause(); // Pause the video
  } else {
    video.play(); // Resume playing the video
  }

  video.style.display = displayValue;
}

function toggleMute() {
  var video = document.getElementById("backgroundVideo");
  var muteButton = document.getElementById("muteButton");

  video.muted = !video.muted;
  muteButton.textContent = video.muted ? "Unmute" : "Mute";
}
