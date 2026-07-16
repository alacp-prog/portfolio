export default function useT(lang) {
  return (fr, en) => (lang === 'en' ? en : fr)
}
