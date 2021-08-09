import { getDiff } from './loopIndex'
import { POSITION_CENTER } from './consts'

const widthBase = 100

const loopDirections = (step, position) => {
  const positionCentered = POSITION_CENTER + position
  const width = widthBase + step
  const halfStep = step / 2
  const allowMax = width - halfStep
  let nextPosition = positionCentered

  if (position > width) {
    nextPosition = positionCentered % width
  }
  else if (position <= 0 - halfStep) {
    nextPosition = positionCentered + getDiff(positionCentered, width)
  }

  if (nextPosition > allowMax) {
    return nextPosition - width
  }

  return nextPosition
}

export default loopDirections
