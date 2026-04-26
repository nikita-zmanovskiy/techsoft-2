import { RouterProvider } from 'react-router-dom'
import { router } from '../routes'
import { Background } from '@/shared/ul/Background/ui/Background'

import { GlobalLoaderComponent } from '@/shared/ul/GlobalLoader'
import type {JSX} from "react";


function App():JSX.Element {
   
  return (
    <main>
      <Background />
      <GlobalLoaderComponent />
          <section className='container'>       
              <RouterProvider router={router} />             
        </section>
    </main>
  )
}

export default App
