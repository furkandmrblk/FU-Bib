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
