export const splitArrayIntoGroups = <T>(array: T[], size: number): T[][] => {
  const newArray = [] as T[][];

  for (let i = 0; i < array.length; i += size) {
    newArray.push(array.slice(i, i + size));
  }

  return newArray;
};
