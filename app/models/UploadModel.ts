export type TUploadResponse = {
  status: number
  images: {
    filename: string
    thumbnail: string
  }
}