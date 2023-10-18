export const dateTransform = (date: string) => {
  // date 형식: yyyy-mm-dd
  const transformedDate = new Date(date);

  return transformedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};