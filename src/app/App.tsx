import { RouterProvider } from 'react-router-dom';

import browserRouter from '@src/app//browserRouter';
import '@src/app/App.css';

function App() {
  return (
    <main>
      <RouterProvider router={browserRouter} />
    </main>
  );
}

export default App;
