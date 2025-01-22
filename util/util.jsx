export const roll = (array, filters, options) => {
  // filters is an arr of objects; currently supports a single exact match per key
  // const exampleFilters = [{ gender: 1 }];
  let filteredArray = array;

  if (filters) {
    filters.forEach((filter) => {
      const filterKey = Object.keys(filter)[0];
      const filterValue = filter[filterKey];
      filteredArray = filteredArray.filter((item) => {
        if (item[filterKey] === filterValue) {
          return item;
        }
      });
    });
  }

  const index = Math.floor(Math.random() * filteredArray.length);
  let result = filteredArray[index];

  if (result.word) {
    result.word = capitalize(result.word);
  }
  return result;
};

const capitalize = (str) => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
};

export const getCardLevel = (stats) => {
  const cardLevel = Math.floor((stats.attack + stats.defence) / 500);
  return cardLevel;
};
