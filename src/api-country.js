const COUNTRY_URL = 'https://restcountries.com/v3.1/name';

function fetchCountry(name) {  
    return fetch(
      `${COUNTRY_URL}/${name}?fields=name,capital,population,languages,flags`,
    ).then(response => {
        if (!response.ok) {
            throw new Error("Oops, there is no country with that name");
          }
          return response.json();
        });
}  
export { fetchCountry };