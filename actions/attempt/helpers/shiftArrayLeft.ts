export const shiftArrayLeft = <T>(
  array: Array<T>,
  shiftBy: number
): Array<T> => {
  const length = array.length;
  const actualShift = shiftBy % length;
  return [...array.slice(actualShift), ...array.slice(0, actualShift)] as [
    T,
    ...T[],
  ];
};

export const shiftArrayLeftByUUID = <T>(
  array: Array<T>,
  uuid: string
): Array<T> => {
  const shiftBy = uuidToNumber(uuid);
  return shiftArrayLeft(array, shiftBy);
};

export const ensureNonEmptyArray = <T>(arr: T[]): arr is [T, ...T[]] => {
  return arr.length > 0;
};

export const safeArrayFunctions = {
  shift: <T>(arr: T[]): Array<T> | [] => {
    return ensureNonEmptyArray(arr) ? shiftArrayLeft(arr, 1) : [];
  },

  shiftByUUID: <T>(arr: T[], uuid: string): Array<T> | [] => {
    return ensureNonEmptyArray(arr) ? shiftArrayLeftByUUID(arr, uuid) : [];
  },
};

function uuidToNumber(uuid: string): number {
  const sanitizedUUID = uuid.replace(/-/g, '');

  return sanitizedUUID.split('').reduce((acc, char) => {
    const charCode = char.charCodeAt(0);
    return (acc * 31 + charCode) % Number.MAX_SAFE_INTEGER;
  }, 0);
}
