export type TUtility = {
  appName?: string
  logoSmall?: string
  logoFull?: string
  textColor?: string
  bgColor?: string
  mainEmail?: string
  mainWhatsApp?: string
}
type TSummaryItem = {
  label: string
  path?: string
  count: number
}
export type TSummary = {
  title: string
  data: TSummaryItem[]
}