// redux item types
export type Item = {
  id: string;
  type: "movie" | "tv";
};
export type ItemState = {
  items: Item[];
  changed: boolean;
  isAdded: null | boolean;
};

// user type
export type User = {
  _id?: string; // site에서 sign-up 하는 유저들
  id?: string; // google, kakao 계정으로 sign-up 하는 유저들
  name: string;
  email: string;
  registerDate?: string;
  image?: string;
  age?: null | number;
  comment?: string[]; // comment id array
};

// data type
export type ContentData = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string; // Series
  release_date: string; // movie
  genre_ids: number[];
  id: number;
  media_type: string;
  title?: string; // media_type이 movie
  name?: string; // media_type이 tv
  original_name: string;
  overview: string;
  poster_path: string;
  genres?: {
    id: number;
    name: string;
  }[];
  status?: string;
  created_by?: {
    name: string;
  }[];
  vote_average: number;
  runtime?: number;
  key?: string;
  videoData?: any;
};

// Comment types
export type CommentData = {
  rating: number;
  text: string;
};
export type Content = {
  content: "tv" | "movie";
  contentId: string;
};
export type Comment = {
  comment: CommentData;
  content: Content;
  date: string;
  timeDiff: string;
  user: User;
  _id: string;
  edited?: boolean;
};
export type CommentList = Comment[];
