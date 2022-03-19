export interface CoversDropdownProps {
  colorCover: string;
  pictureCover: string;
  addColorCover: (val: string) => void;
  addPictureCover: (pictureCover: string) => void;
  removeCover: () => void;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};