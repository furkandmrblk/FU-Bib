export type LibraryProps = {
  id: string;
  section: string;
  name: string;
  adress: string;
  email: string;
  floor?: string[];
  website?: string;
  table?: {
    id: string;
    identifier: string;
    order: number;
    libraryName: string;
    floor: string;
    booked: boolean;
    userId: string;
    time: number;
  }[];
};

export type TableProps = {
  id: string;
  identifier: string;
  order: number;
  floor: string;
  booked: boolean;
  time: number;
  library?: {
    name: string;
    adress: string;
    email: string;
    website: string;
  };
};
