'use strict'

const { Subject, BehaviorSubject, interval } = require('rxjs');
const { filter, distinct } = require('rxjs/operators')
const { chainExecution } = require('./utils')
const { pressTabChangeButtons, tapKey, interact, releaseTabChangeButtons, moveMouseRandomly } = require('./interact')

const work = new BehaviorSubject(false);
const moveMouse = new Subject();
const type = new Subject();
const tabChange = new Subject();

const shouldWork = () => !!work.value

const mouseMove = () => interact(() => moveMouse.next())
const typeSomething = () => interact(() => type.next('control'))
const changeTab = () => tabChange.next()

const tabChangeAction = chainExecution(pressTabChangeButtons, releaseTabChangeButtons)
const doWork = chainExecution(mouseMove, typeSomething, changeTab)

work.pipe(distinct()).subscribe(doWork)
interval(15000).pipe(filter(shouldWork)).subscribe(doWork)

moveMouse.pipe(filter(shouldWork)).subscribe(moveMouseRandomly)
type.pipe(filter(shouldWork)).subscribe(tapKey)
tabChange.pipe(filter(shouldWork)).subscribe(tabChangeAction)

module.exports = { startWork: () => work.next(true), stopWork: () => work.next(false) }
