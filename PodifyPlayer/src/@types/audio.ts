import {categoriesTypes} from 'src/utilis/categories';

export interface AudioData {
  id: string;
  title: string;
  about: string;
  category: categoriesTypes;
  file: string; // URL or path to the audio file
  poster?: string; // URL or path to the image poster
  owner: {
    name: string;
    id: string;
  };
}
