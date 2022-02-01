import React from 'react';
import { CurrentLabel } from './CurrentLabel';
import './TaskModalWindow.css'

const CurrentLabels = ({ labels }) => {

  return (
    <div>
      <p className="service-title">Labels</p>
      <div className="current-labels">
        { labels.map((item, i) => {
          return <CurrentLabel item={item} key={i}/>}
        )}
      </div>
    </div>
  )
}

export { CurrentLabels };