export const formatDate = (date) => {
  let heading = String(date);
  return `${heading.substring(0, 2)}.${heading.substring(
    2,
    4
  )}.${heading.substring(4)}`;
};
