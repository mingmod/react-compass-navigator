import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import DirectionItem from './DirectionItem.jsx'
import Scroller from './Scroller.jsx'
import loopIndex from './loopIndex'

import './master.scss'
const ReactCompassNavigator = ({ directions, directionFactory }) => {
  const visibleCount = 3

  const genItems = size => Array.from(Array(size+1).keys())

  const [position, setPosition] = useState(0)
  const [items, setItems] = useState(genItems(visibleCount))

  const defaultDirectionFactory = (currentItem) => (
    <div className='se-compass-navigator__default-item'>
      <p>{directions[loopIndex(directions.length, currentItem)]}</p>
    </div>
  )

  const mapper = (currentItem) => {
    if (directionFactory) {
      return directionFactory(directions, currentItem)
    }
    return defaultDirectionFactory(currentItem)
  }

  return (
    <div className='se-compass-navigator'>
      <div className='se-compass-navigator__directions'>
        {items.map(item => (
          <DirectionItem
            key={item}
            gid={item}
            mapper={mapper}
            position={position}
            visibleCount={visibleCount}
          />
        ))}
      </div>
      <Scroller onChange={(posChange) => { setPosition(posChange + position) }} />
    </div>
  )
}

ReactCompassNavigator.propTypes = {
  directions: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
  directionFactory: PropTypes.func
}

export default ReactCompassNavigator
