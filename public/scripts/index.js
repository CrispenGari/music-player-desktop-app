const electron = require("electron");
const $ = require("jquery");
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const fs = require("fs");

const music_lis = [];
fs.readdir("./music", (error, data) => {
  if (error) {
    throw new Error(error);
  } else {
    $("#music__name").html(data[1]);

    data.map((name, i) => {
      music_lis.push(i);
      const music_element = `
<div class="music__list">
<img
  src="https://cdn.icon-icons.com/icons2/41/PNG/128/music_audio_7173.png"
/>
<p>${name}</p> 
<small>(${i + 1})</small>
</div>
`;
      $(".playlist").append(music_element);
    });
  }
});
const aud_ref = document.getElementById("audio-tag");
// handling play pause
$("#play").click(() => {
  if (aud_ref.paused) {
    aud_ref.play();
    $("#play").attr("class", "fas fa-play-circle blue");
    $("#play").attr("title", "pause");
    aud_ref.volume = 0.5;
    setInterval(() => {
      const duration = (aud_ref.currentTime / aud_ref.duration) * 100;
      $("#status").css("width", `${duration}%`);
      if (aud_ref.endend) {
        $(".container__left").attr("class", "container__left");
      }
    }, 1000);
  } else {
    aud_ref.pause();
    $("#play").attr("class", "fas fa-pause");
    $("#play").attr("title", "play");
  }
  if (aud_ref.paused) {
    $(".container__left").attr("class", "container__left");
  } else {
    $(".container__left").attr("class", "container__left rotate");
  }
});
//  hndling repeate
$("#loop").click(() => {
  if (aud_ref.loop) {
    aud_ref.loop = false;
    $("#loop").attr("class", "fas fa-redo-alt");
  } else {
    aud_ref.loop = !false;
    $("#loop").attr("class", "fas fa-redo-alt blue");
  }
});
// handling muting
$("#mute").click(() => {
  if (aud_ref.muted) {
    aud_ref.muted = false;
    $("#mute").attr("class", "fas fa-volume-mute");
  } else {
    aud_ref.muted = !false;
    $("#mute").attr("class", "fas fa-volume-mute blue");
  }
});
// handling volumes

$("#volume_up").click(() => {
  if (aud_ref.volume === 1) {
    aud_ref.volume += 0;
  } else {
    aud_ref.volume += 0.1;
  }
});

// handling the disk spining
$("#volume_down").click(() => {
  if (aud_ref.volume === 0) {
    aud_ref.volume -= 0;
  } else {
    aud_ref.volume -= 0.1;
  }
});

const audio_src = document.getElementById("audio-src");
$("#previous").click(() => {
  audio_src.setAttribute("src", ``);
  audio_src.setAttribute("src", `../music/${music_lis[3]}`);
});
$("#next").click(() => {
  audio_src.setAttribute("src", `../music/${music_lis[3]}`);
});
$("#close").click(() => {
  ipc.send("close-app");
  ipc.on("response", (event, args) => {
    if (args.response === 0) {
      electron.remote.app.quit();
    } else {
      electron.remote.app.focus();
    }
  });
});
