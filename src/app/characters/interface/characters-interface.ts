export interface CharactersResponse {
    items: Character[];
    meta:  {
        totalItems: number;
        itemsPerPage: number;
    };
    links: Links;
}

export interface Character {
    id:          number;
    name:        string;
    ki:          string;
    maxKi:       string;
    race:        string;
    gender:      Gender;
    description: string;
    image:       string;
    affiliation: Affiliation;
    deletedAt:   null;
}

export enum Affiliation {
    ArmyOfFrieza = "Army of Frieza",
    Freelancer = "Freelancer",
    ZFighter = "Z Fighter",
}

export enum Gender {
    Female = "Female",
    Male = "Male",
}

export interface Links {
    first:    string;
    previous: string;
    next:     string;
    last:     string;
}

export interface Meta {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}

interface RequestParams {
  page: number;
}