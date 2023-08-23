import { gql } from "@apollo/client";

export const GET_FILMS = gql(`
    query GetFilms($first: Int) {
        allFilms {
            films {
                id
                title
                releaseDate
                characterConnection(first: $first) {
                  characters {
                    id
                    name
                  }
                }
            }
        }
    }
`);

export const GET_FILM = gql(`
    query GetFilm($filmId: ID) {
        film(id: $filmId) {
        title
        releaseDate
        speciesConnection {
            totalCount
        }
        planetConnection {
            totalCount
        }
        vehicleConnection {
            totalCount
        }
        characterConnection {
            characters {
            name
            id
            }
        }
        openingCrawl
        }
    }
`);

export const GET_CHARACTERS = gql(`
    query GetCharacters {
        allPeople {
        people {
            id
            name
        }
        }
    }
`);

export const GET_CHARACTER = gql(`
    query GetCharacter($personId: ID) {
        person(id: $personId) {
        birthYear
        name
        height
        mass
        homeworld {
            name
        }
        filmConnection {
            films {
            id
            title
            }
        }
        }
    }
`);
