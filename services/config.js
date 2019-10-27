'use strict'

const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { toString } = require('lodash');
const { BehaviorSubject } = require('rxjs')

const { composeExecution } = require('./utils')

const configFilePath = Object.freeze(resolve(__dirname, '../', 'config.json'))

const writeNewConfigToFile = (config) => writeFileSync(configFilePath, config)
const readAndParseConfigFile = composeExecution(JSON.parse, toString, readFileSync)
const stringifyAndWriteFile = composeExecution(writeNewConfigToFile, JSON.stringify)

const getConfig = () => readAndParseConfigFile(configFilePath)
const storeConfig = (config) => stringifyAndWriteFile(config)

const config = new BehaviorSubject(getConfig())

module.exports = {
  config
}
