const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'Projeto Dungeon Idle Conquest',
    icon: path.join(__dirname, 'public', 'sprites', 'castle.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#0a0a0f',
    autoHideMenuBar: true,
    show: false,
  });

  // Load the built Vite index.html
  win.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // Show when ready to avoid white flash
  win.once('ready-to-show', () => {
    win.show();
  });

  // Remove default menu bar
  Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
