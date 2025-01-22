export const roll = (array, filters) => {
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
  return filteredArray[index];
};
