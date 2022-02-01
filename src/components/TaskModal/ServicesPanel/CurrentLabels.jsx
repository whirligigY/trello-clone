import React from 'react';
import { CurrentLabel } from './CurrentLabel';
import '../TaskModalWindow.css'

const CurrentLabels = ({ labels, changeLabels, remove  }) => {

  return (
    <div>
      <p className="service-title">Labels</p>
      <div className="current-labels">
        { labels.map((item, i) => {
          return <CurrentLabel item={item} key={i} labels={labels} changeLabels={changeLabels} remove={remove}/>}
        )}
      </div>
    </div>
  )
}

export { CurrentLabels };