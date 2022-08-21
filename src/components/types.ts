export interface Card {
  id: number;
  age: number;
  company: string;
  distance: number;
  height: number;
  introduction: string | null;
  job: string;
  location: string;
  name: string;
  pictures: string[];
}
export interface Profile {
  id: number;
  birthday: string;
  body_type: string;
  company: string;
  education: string;
  gender: string;
  height: number;
  introduction: string;
  job: string;
  location: string;
  name: string;
  pictures: string[];
  school: string;
}
export interface Meta {
  body_types: KeyName[];
  educations: KeyName[];
  genders: KeyName[];
  height_range: { max: number; min: number };
}
export interface KeyName {
  key: string | number;
  name: string;
}
