export interface CoversDropdownProps {
  colorCover: string;
  pictureCover: string;
  addColorCover: () => void;
  addPictureCover: (pictureCover: string) => void;
  removeCover: () => void;
}