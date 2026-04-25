import { RouterProvider } from 'react-router-dom'
import { router } from '../routes'
import { Background } from '@/shared/ul/Background/ui/Background'
import { AnimatePresence } from 'framer-motion'
import { GlobalLoaderComponent } from '@/shared/ul/GlobalLoader'

function App() {
  return (
    <main>
      <Background />
      <GlobalLoaderComponent />
      <section className='container'>
          <AnimatePresence mode="wait"> 
            <RouterProvider router={router} />
          </AnimatePresence>
      </section>
    </main>
  )
}

export default App
