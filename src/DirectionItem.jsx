import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import loopDirections from './loopDirections'

const directionFactory = (direction) => {
  return direction
}

const DirectionItem = ({ gid, mapper, position, visibleCount }) => {

  const directionRef = useRef()
  const getStep = () => 100 / visibleCount
  const [step, setStep] = useState(getStep())
  const [localPosition, setLocalPosition] = useState(getStep())
  const [localIndex, setLocalIndex] = useState(0)
  const [isActive, setIsActive] = useState(0)

  const isRefInitialized = () => (directionRef && directionRef.current)
  const getSizePercent = size => `${size}%`

  useEffect(() => {
    if (isRefInitialized) calculatePosition(directionRef.current)
  }, [position, step])

  useEffect(() => {
    setStep(getStep)
    if (isRefInitialized) {
      directionRef.current.style.width = getSizePercent(step)
    }
  }, [visibleCount])

  const calculatePosition = (element) => {
    const halfStep = step / 2
    const nextPos = loopDirections(step, position /* global scrolled */ + gid * step /* direction default position */ + 50, gid)
    setLocalPosition(nextPos)
    const newIndex = Math.floor((position - nextPos) / step)
    // console.log(newIndex, pos);
    if (gid === 0) {
      // console.log(newIndex);
    }
    if (newIndex !== localIndex) {
      setLocalIndex(newIndex)
      // console.log(`test: gid: ${gid}`, newIndex, nextPos);
    }
    element.style.left = getSizePercent(nextPos - Math.round(step/2))
  }

  return (
    <div className='se-compass-navigator__direction' ref={directionRef}>
      {mapper(localIndex, isActive)}
    </div>
  )
}

DirectionItem.propTypes = {
  position: PropTypes.number.isRequired,
  mapper: PropTypes.func.isRequired,
  gid: PropTypes.number.isRequired,
  visibleCount: PropTypes.number.isRequired,
}

export default DirectionItem
