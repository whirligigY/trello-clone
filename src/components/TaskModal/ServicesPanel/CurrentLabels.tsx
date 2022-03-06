import React, { FC } from 'react';
import { CurrentLabel } from './CurrentLabel';
import '../TaskModalWindow.css'
import { CurrentLabelsProps } from './types';

const CurrentLabels: FC<CurrentLabelsProps> = ({ activeLabels, changeActiveLabels, labels, changeLabels, remove }) => {
  
  return (
    <div>
      <p className="service-title">Labels</p>
      <div className="current-labels">
        { activeLabels.map((item, i) => {
          if (item.status) {
            return <CurrentLabel 
            item={item} key={i} 
            activeLabels={activeLabels} 
            changeActiveLabels={changeActiveLabels} 
            labels={labels} 
            changeLabels={changeLabels} 
            remove={remove}/>
          }
          return '';
        }
        )}
      </div>
    </div>
  )
}

export { CurrentLabels };