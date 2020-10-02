const { ipcMain } = require("electron");
const electron = require("electron");
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
let window;
const createWindow = () => {
  window = new electron.BrowserWindow({
    width: 800,
    height: 300,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "src/index.html"),
    })
  );
  // window.webContents.openDevTools({ mode: "bottom" });
  window.on("closed", () => {
    window = null;
  });
};

electron.app.on("ready", createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipc.on("close-app", (event, args) => {
  electron.dialog
    .showMessageBox(window, {
      title: "Closing the music player",
      message: "Are you sure you want to close the music app?",
      buttons: ["Yes", "No", "Cancel"],
      cancelId: 2,
      defaultId: 0,
    })
    .then((res) => {
      event.sender.send("response", res);
    });
});
