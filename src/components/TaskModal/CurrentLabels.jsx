import React from 'react';
import CurrentLabel from './CurrentLabel';
import { useLabels } from './Hooks/useLabels';
import './Modal.css';

const CurrentLabels = ({ labels }) => {
  const label = useLabels();

  return (
    <div className="current-labels">
      { labels.map((item, i) => 
        <div className="current-label" key={i}>
          <CurrentLabel { ...label } />
          <div className="current-label-content" style={{backgroundColor:`${item}`}}></div>
        </div>
      )}
    </div>
  )
}

export { CurrentLabels };