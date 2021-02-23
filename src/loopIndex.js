export const getDiff = (i, length) => {
  return Math.ceil(Math.abs(i)/length) * length
}

const loopIndex = (target, index) => {
  if (index < 0) return index + getDiff(index, target)
  else if (index >= target) return getDiff(index, target) - index
	return index
}

export default loopIndex
