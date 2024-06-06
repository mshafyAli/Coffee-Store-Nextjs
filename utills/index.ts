
export const getDomain = () => {
  return new URL(process.env.NODE_ENV === 'production' ? "https://discover-coffee-store.vercel.com":"http://localhost:3000")
}
