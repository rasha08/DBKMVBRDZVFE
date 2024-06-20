'use strict'

const { executeCallbackTimesWithDelay, reverse } = require('./utils')
const { random, map } = require('lodash')
const robot = require("@jitsi/robotjs");

robot.setMouseDelay(2);
robot.setKeyboardDelay(2)

const changeTabKeys = Object.freeze(['command', 'tab'])

const interact = executeCallbackTimesWithDelay(100)
const interactOnce = executeCallbackTimesWithDelay(1)

const releaseKey = (key) => robot.keyToggle(key, 'up')
const pressKey = (key) => robot.keyToggle(key, 'up')
const tapKey = (...keys) => robot.keyTap(...keys)
const moveMouseRandomly = () => robot.moveMouse(random(1000), random(1000))
const releaseTabChangeButtons = () => interactOnce(() => map(changeTabKeys, releaseKey) )
const pressTabChangeButtons = () => tapKey(...reverse(changeTabKeys))


module.exports = {
  releaseKey,
  pressKey,
  tapKey,
  interact,
  interactOnce,
  moveMouseRandomly,
  releaseTabChangeButtons,
  pressTabChangeButtons
}
