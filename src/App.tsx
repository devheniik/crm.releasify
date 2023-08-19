import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import {ChakraProvider} from '@chakra-ui/react'

// Pages
import Login from './pages/Login'
import GithubRedirect from './pages/GithubRedirect'

// Store
import store from './store'
import {Provider} from 'react-redux'
import Dashboard from './pages/Dashboard.tsx'

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Registration from "./pages/Registration.tsx";
import Guard from "./services/Guard.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import Sidebar from "./layouts/Sidebar.tsx";

function App() {
    return (
        <>
            <Provider store={store}>
                <QueryClientProvider client={new QueryClient()}>
                    <ChakraProvider>
                        <Router>
                            <Routes>
                                <Route path="/" element={
                                    <Guard route={'/'}>
                                        <Sidebar>
                                            <Dashboard/>
                                        </Sidebar>
                                    </Guard>
                                }/>
                                <Route path="/profile" element={
                                    <Guard route={'/profile'}>
                                        <Sidebar>
                                            <ProfilePage/>
                                        </Sidebar>
                                    </Guard>
                                }/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/registration" element={<Registration/>}/>
                                <Route path="/github/auth" element={<GithubRedirect/>}/>
                            </Routes>
                        </Router>
                    </ChakraProvider>
                </QueryClientProvider>
            </Provider>
        </>
    )
}

export default App
