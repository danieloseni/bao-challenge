import './App.css';
import 'index.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Header from 'layout/Header';
import MainLayout from 'layout/Main';
import Home from 'pages/Main';
import Admin from 'pages/Admin';
import {Toaster} from 'react-hot-toast';
import {QueryClientProvider, QueryClient} from 'react-query';
import { store } from 'redux/store';
import { Provider } from 'react-redux'

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Toaster />
          <Header />
          <MainLayout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/admin' element={<Admin />} />                    
            </Routes>
          </MainLayout>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
