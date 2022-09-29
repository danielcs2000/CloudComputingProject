export type DistributionBody = {
  id: string;
  department: string;
  province: string;
  location: string;
  elevation: number;
  longitude: number;
  latitude: number;
  colector: string;
  colectionNumber: string;
  colectedAt: Date;
  herbarium: string;
  photoUrl: string;
  aditionalNotes: string;
};

export type InputDistributionBodyPatch = {
  department: string;
  province: string;
  location: string;
  elevation: number;
  longitude: number;
  latitude: number;
  colector: string;
  colectionNumber: string;
  colectedAt: Date;
  herbarium: string;
  photoUrls: string[];
  aditionalNotes: string;
};

export type InputDistributionBodyPost = {
  department: string;
  province: string;
  location: string;
  elevation: number;
  longitude: number;
  latitude: number;
  colector: string;
  colectionNumber: string;
  colectedAt: Date;
  herbarium: string;
  photoUrl: string;
  speciesId: string;
  aditionalNotes: string;
};

export type OutputGetSingleDistribution = {
  id: string;
  department: string;
  province: string;
  location: string;
  elevation: number;
  longitude: number;
  latitude: number;
  colector: string;
  colectionNumber: string;
  colectedAt: Date;
  herbarium: string;
  photoUrls: string[];
  aditionalNotes: string;
};
