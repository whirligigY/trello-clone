import React, { FC } from 'react';
import { Dropdown } from 'react-bootstrap';
import { CoversDropdownMenu } from './CoversDropdownMenu'
import { CoversDropdownProps } from './types'

const CoversDropdown: FC<CoversDropdownProps> = ({
  colorCover,
  pictureCover,
  addColorCover,
  addPictureCover,
  removeCover
}) => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="aside-buttons"
      variant="outline-secondary"
      >
        Covers
      </Dropdown.Toggle>
      <CoversDropdownMenu
        colorCover={colorCover}
        pictureCover={pictureCover}
        addColorCover={addColorCover}
        addPictureCover={addPictureCover}
        removeCover={removeCover}
      />
    </Dropdown>
  )
}

export { CoversDropdown };