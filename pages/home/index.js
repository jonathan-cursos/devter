import AppLayout from 'components/AppLayout'

export default function HomePage() {
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section></section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          height: 49px;
          position: fixed;
          top: 0;
          border-bottom: 1px solid #ccc;
          width: 100%;
        }
        h2 {
          font-weight: 800;
          font-size: 21px;
        }
        nav {
          height: 49px;
          position: fixed;
          top: 0;
          width: 100%;
          border-bottom: 1px solid #ccc;
        }
        section {
          padding-top: 100px;
        }
      `}</style>
    </>
  )
}
