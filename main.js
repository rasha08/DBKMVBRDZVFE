const { menubar } = require('menubar');
const { globalShortcut, ipcMain } = require('electron')
const { startWork, stopWork } = require('./services/work')
const { config } = require('./services/config')

const mb = menubar({
  preloadWindow: true,
});

const emitDataThrowChannel = (channel) => (data) => (event) => event.sender.send(channel, data);

const emitConfigChange = emitDataThrowChannel('config-change')(config.value)

mb.on('ready', () => {
  globalShortcut.register('alt+s', startWork)
  globalShortcut.register('alt+x', stopWork)
  ipcMain.on('exit-app', mb.app.exit)
  ipcMain.on('config-change', emitConfigChange)
});
