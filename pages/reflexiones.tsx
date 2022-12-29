import Head from "next/head"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import { useReflectionsQuery } from "../graphql/generated"
import LoadingSpinner from "../components/LoadingSpinner"
import ReflectionCard from "../components/ReflectionCard"

const Home = () => {
  const { data, loading, error } = useReflectionsQuery()

  if (loading) {
    return (
      <div className="grid h-screen place-items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <h2>Algo salió mal</h2>
  }

  return (
    <>
      <Head>
        <title>Reflexiones - Liderazgo, Juegos y Recreación</title>
        <meta
          name="description"
          content="Reflexiones de los autores sobre el curso Liderazgo, Juegos y Recreación, del 
          semestre 2022-2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className="flex flex-col justify-center items-center p-4 lg:px-20 sm:p-5 my-5">
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.reflections.map((reflection) => {
              return <ReflectionCard key={reflection.id} reflection={reflection} />
            })}
          </div>
        )}

        <Footer />
      </main>
    </>
  )
}

export default Home
