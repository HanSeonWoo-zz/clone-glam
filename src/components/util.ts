/**
 *
 * @param timeout milli Seconds
 * @returns
 */
export const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
