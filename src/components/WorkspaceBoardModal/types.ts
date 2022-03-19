export interface IWorkspaceBoardModalProps {
  onHide: () => void;
  show: boolean;
  children?: React.ReactNode;
}

export interface IUnsplash {
  total: number;
  total_pages: number;
  results: Result[];
}

export interface Result {
  id: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  alt_description: string;
  urls: Urls;
  links: ResultLinks;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: ResultTopicSubmissions;
  user: User;
  tags: Tag[];
}

export interface ResultLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Tag {
  type: Type;
  title: string;
  source?: Source;
}

export interface Source {
  ancestry: Ancestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: CoverPhoto;
}

export interface Ancestry {
  type: Category;
  category?: Category;
  subcategory?: Category;
}

export interface Category {
  slug: Slug;
  pretty_slug: PrettySlug;
}

export enum PrettySlug {
  Black = 'Black',
  Car = 'Car',
  Color = 'Color',
  HDWallpapers = 'HD Wallpapers',
  Images = 'Images',
  Mexico = 'Mexico',
  Things = 'Things',
  Travel = 'Travel',
}

export enum Slug {
  Black = 'black',
  Car = 'car',
  Colors = 'colors',
  Images = 'images',
  Mexico = 'mexico',
  Things = 'things',
  Travel = 'travel',
  Wallpapers = 'wallpapers',
}

export interface CoverPhoto {
  id: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  alt_description: AltDescription | null;
  urls: Urls;
  links: ResultLinks;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: CoverPhotoTopicSubmissions;
  user: User;
}

export enum AltDescription {
  AerialPhotoOfPersonUsingPaddleboard = 'aerial photo of person using paddleboard',
  WhiteCar = 'white car',
}

export interface CoverPhotoTopicSubmissions {
  'textures-patterns'?: Wallpapers;
  wallpapers?: Wallpapers;
  nature?: Wallpapers;
  travel?: Wallpapers;
}

export interface Wallpapers {
  status: string;
  approved_on?: Date;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface User {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: null | string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: null | string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: null | string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: null | string;
  portfolio_url: null | string;
  twitter_username: null | string;
  paypal_email: null;
}

export enum Type {
  LandingPage = 'landing_page',
  Search = 'search',
}

export interface ResultTopicSubmissions {
  wallpapers?: Wallpapers;
}
