'use strict'

const { range, map, reduce } = require('lodash');

const executeWithDelay = (fn) => (incrementBy) => setTimeout(fn, 100 * incrementBy)
const createRange = (rangeLength) => range(0, rangeLength)
const executeCallbackTimesWithDelay = (rangeLength) => (fn) => map(createRange(rangeLength), executeWithDelay(fn))

const chainExecution = (...fns) => () => fns.forEach(fn => fn())
const composeExecution = (...fns) => reduce(fns, (prevFn, currFn) => (dataSet) => prevFn(currFn(dataSet)))

const reverse = (arr) => [...arr].reverse();

module.exports = {
  executeCallbackTimesWithDelay,
  chainExecution,
  reverse,
  composeExecution
}
