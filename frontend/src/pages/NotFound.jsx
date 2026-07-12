import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Page introuvable.
      </p>
      <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
        Retour a l'accueil
      </Link>
    </section>
  )
}

export default NotFound
