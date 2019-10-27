const { ipcRenderer } = require('electron')
const { keys, map } = require('lodash')

document.getElementById('quit-app-button').addEventListener('click', () => {
  ipcRenderer.send('exit-app')
})

const setHtmlElementValue = (elementId, value) => document.getElementById(elementId).innerHTML = value

ipcRenderer.send('config-change', 'ping')
ipcRenderer.on('config-change', (event, config) => {
  map(keys(config), key => setHtmlElementValue(key, config[key]))
})