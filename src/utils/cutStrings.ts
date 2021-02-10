export const cutStrings = (string: string, length = 21, end = '...') => {
  if (string.length > length) {
    return string.substring(0, length - end.length) + end;
  } else {
    return string;
  }
};
