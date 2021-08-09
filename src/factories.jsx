import React from 'react'
import loopIndex from './loopIndex'

export const defaultDirectionFactory = (directions, currentItem) => (
  <div className='se-compass-navigator__default-item'>
    <p>{directions[loopIndex(directions.length, currentItem)]}</p>
  </div>
)
