export async function fetchPeople() {
    return await fetch('https://swapi.dev/api/people')
    .then(res => res.json())
    .then(res => res)
}