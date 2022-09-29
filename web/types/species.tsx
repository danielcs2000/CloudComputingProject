
export type SpeciesBody = {
    id: string;
    name: string;
    names: string[];
    morphology: string;
    habitad: string;
    iucnCode: string;
    iucnUrl: string;
    citiesCode: string;
    citiesUrl: string;
    nationalNormative: string;
    observation: string;
    photoUrls: string[];
    departaments: string[];
    genreId: string;
}

export type InputSpeciesBodyPatch = {
    name: string;
    names: string[];
    morphology: string;
    habitad: string;
    iucnCode: string;
    iucnUrl: string;
    citiesCode: string;
    citiesUrl: string;
    nationalNormative: string;
    observation: string;
    departments: string[];
    photoUrls: string[];
}

export type InputSpeciesBodyPost = {
    name: string;
    names: string[];
    morphology: string;
    habitad: string;
    iucnCode: string;
    iucnUrl: string;
    citiesCode: string;
    citiesUrl: string;
    nationalNormative: string;
    observation: string;
    ddepartments: string[];
    photoUrls: string[];
    genreId: string;
}


export type InputSpeciesBodyPut = {
    id: string;
    name: string;
    names: string[];
    morphology: string;
    habitad: string;
    iucnCode: string;
    iucnUrl: string;
    citiesCode: string;
    citiesUrl: string;
    nationalNormative: string;
    observation: string;
    ddepartments: string[];
    photoUrls: string[];
    genreId: string;
}

export type OutputGetSingleSpecies = {
    id: string;
    name: string;
    names: string[];
    morphology: string;
    habitad: string;
    iucnCode: string;
    iucnUrl: string;
    citiesCode: string;
    citiesUrl: string;
    nationalNormative: string;
    observation: string;
    photoUrls: string[];
    genre_name: string;
    tribe_name: string;
    subfamily_name: string;
    departaments: string[];
    family_name: string;
    number_obs: number;
    dataObs: { position: [number, number], text: string }[];
    distributionFrequency: number[];
}