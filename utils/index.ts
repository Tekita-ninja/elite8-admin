export const convertFormat = (data: string) => {
  const cleanData = data.replace(/^0+/, '');

  return `62${cleanData}`;
}