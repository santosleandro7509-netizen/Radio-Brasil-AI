
export interface Station {
  id: string;
  name: string;
  genre: string;
  url: string;
  logo: string;
  location: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum Genre {
  MPB = 'MPB',
  Samba = 'Samba',
  Sertanejo = 'Sertanejo',
  News = 'Notícias',
  Rock = 'Rock',
  Pop = 'Pop',
  Jazz = 'Jazz/Bossa Nova'
}
