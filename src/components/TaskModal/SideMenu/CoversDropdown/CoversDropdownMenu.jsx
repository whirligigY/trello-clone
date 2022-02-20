import React, { useState } from 'react';
import { Dropdown, Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../../TaskModalWindow.css";
import './coversDropdown.css'
import { useEffect } from 'react';

const CoversDropdownMenu = ({
  colorCover,
  pictureCover,
  addColorCover,
  addPictureCover,
  removeCover
}) => {
  const [unsplashCovers, setUnsplashCovers] = useState([]);
  const [inputTag, setInputTag]=useState('');
  useEffect (() => {
    downloadUnsplash();
  }, [inputTag, pictureCover])

  async function downloadUnsplash() {
    let tag = 'mountain';
    if (inputTag)
      tag = inputTag;
    const url = `https://api.unsplash.com/search/photos?query=${tag}&per_page=31&orientation=landscape&client_id=fNbe10hInNaKsDNkqXVOAUxSkOxj1Qt_qcPHwcaFlmk`;
    const res = await fetch(url);
    const data = await res.json();
    const urlsArr = [];
    if (pictureCover) {
      urlsArr.push(pictureCover)
    }
    data.results.map((item, i) => {
      if (urlsArr.length < 30) {
        if (item.urls.small !== pictureCover) {
          urlsArr.push(item.urls.small)
        }
      }
    })
    setUnsplashCovers(urlsArr);
  };

  const changeSearchValue = (e) => {
    setInputTag(e.target.value);
  }
  return (
    <Dropdown.Menu>
      <p className='deadline-text'>Cover</p>
      {(pictureCover || colorCover) && 
      <div className='used_cover'>
        <div className='cover_example' style={colorCover ? {backgroundColor: colorCover} : pictureCover ? {backgroundImage: `url(${pictureCover})`} : ''}></div>
        <Button className='delete_cover' variant='outline-secondary' onClick={removeCover}>Remove cover</Button>
      </div>}
      <Dropdown.Divider />
      <p className='deadline-text'>Colors</p>
      {<ToggleButtonGroup className='labels-colors' type="radio" name="options" value={colorCover || ''}onChange={addColorCover}>
        <ToggleButton className='rectangle blue' id="tbg-radio-1" value={'blue'} />
        <ToggleButton className='rectangle yellow' id="tbg-radio-2" value={'yellow'} />
        <ToggleButton className='rectangle red' id="tbg-radio-3" value={'red'} />
        <ToggleButton className='rectangle green' id="tbg-radio-4" value={'green'} />
        <ToggleButton className='rectangle darkorchid' id="tbg-radio-5" value={'darkorchid'} />
        <ToggleButton className='rectangle orange' id="tbg-radio-6" value={'orange'} />
        <ToggleButton className='rectangle deepskyblue' id="tbg-radio-7" value={'deepskyblue'} />
        <ToggleButton className='rectangle sandybrown' id="tbg-radio-8" value={'sandybrown'} />
        <ToggleButton className='rectangle plum' id="tbg-radio-9" value={'plum'} />
        <ToggleButton className='rectangle khaki' id="tbg-radio-10" value={'khaki'} />
      </ToggleButtonGroup>}
      <Dropdown.Divider />
      <p className='deadline-text'>Unsplash</p>
      <input className="search-input" type="text" placeholder="Search covers on Unsplash" onChange={changeSearchValue}/>
      <div className='covers'>
        { unsplashCovers.map((item, i) => {
          if (i === 0 && pictureCover) {
            return (<Button key={i} className='cover_btn' onClick={()=>addPictureCover(pictureCover)}>
            <img src={pictureCover} alt=''/>
          </Button> )
          }
         return (
         <Button key={i} className='cover_btn' onClick={()=>addPictureCover(item)}>
           <img src={item} alt=''/>
         </Button> )
        }) }
      </div>
      <p className='deadline-text'>Photos from <a href='unsplash.com'>Unsplash.com</a></p>
    </Dropdown.Menu>
  );
}

export { CoversDropdownMenu };
