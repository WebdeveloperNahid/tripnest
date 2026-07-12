export type TTour = {
  _id: string;
  title: string;
  category: string;
  destination: string;
  price: number;
  rating: number;
  gallery: string[];
  included: string[];
  excluded: string[];
  startDate: string;
  duration: string;
  groupSize: string;
  image: string;
  shortDescription: string;
  description: string;
};

// নতুন tour create করার জন্য আলাদা type (_id ছাড়া)
export type TCreateTour = Omit<TTour, "_id">;


// post delete update er jonnno kaje lagbe short korar jonno 

// types/tour.ts
export type TMutationResponse = {
  insertedId?: string;
  acknowledged?: boolean;
  modifiedCount?: number;
  deletedCount?: number;
};


