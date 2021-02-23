import { getDiff } from './loopIndex'

const widthBase = 100
const center = 50

const loopDirections = (step, position, gid) => {
  const width = widthBase + step
  const halfStep = step / 2
  const allowMax = width - halfStep
  let nextPosition = position

  if (position > width) {
    nextPosition = position % width
  }
  else if (position <= 0 - halfStep) {
    nextPosition = position + getDiff(position, width)
  }

  if (nextPosition > allowMax) {
    return nextPosition - width
  }

  return nextPosition
  // if (index < 0) return index + getDiff(index, target)
  // else if (index >= target) {
  //   console.log(getDiff(index, target), 'test');
  //   return getDiff(index, target)
  // }
	// return index
}

export default loopDirections
