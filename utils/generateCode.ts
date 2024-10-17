export const queueCode = (number: number,text: string) => {
  const dayjs = useDayjs()
  return `WL${dayjs(text).format('YYMMDM-mm-ss')}-${number}`
}