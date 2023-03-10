import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import './App.css'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Universe from './pages/Universe'
import Battle from './pages/Battle'
import Footer from './pages/Footer'
import LoginForm from './components/LoginForm/Login'
import SignupForm from './components/SignupForm'

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/universe" element={<Universe />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="*" element={<h1>Wrong page!</h1>} />
          </Routes>    
        </>
      </Router>
      <Footer />
    </ApolloProvider>
  )
}

export default App
