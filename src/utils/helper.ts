export const createTimeoutPromise = (
  callback: () => void,
  milliseconds: number
) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
      callback();
    }, milliseconds);
  });
};

export const getSumOfSticks = (piles: number[]) => {
  let count = 0;
  piles.forEach((amount) => {
    count += amount;
  });
  return count;
};

export const movePileToLastPile = (piles: number[], index: number) => {
  for (let i = index + 1; i < piles.length; i++) {
    swap(piles, i - 1, i);
  }
};

const swap = (array: any[], indexOne: number, indexTwo: number) => {
  const temp = array[indexOne];
  array[indexOne] = array[indexTwo];
  array[indexTwo] = temp;
};
