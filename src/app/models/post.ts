export interface Post {
  title: string,
  permalink: string,
  category: {
    id: string,
    category: string
  },
  postImgPath: string,
  excerpt: string,
  content: string,
  isFeatured: boolean,
  views: number,
  status: string,
  createdAt: Date
}
