
export const getDomain = () => {
  return new URL(process.env.NODE_ENV === 'production' ? "https://coffee-store-nextjs-ktg9.vercel.app/":"http://localhost:3000")
}
