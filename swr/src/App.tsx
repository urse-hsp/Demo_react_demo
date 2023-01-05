import React from 'react'
import logo from './logo.svg'
import './App.css'
import useSWR from 'swr'
import { fetcher, useUser } from './hooks'

function App() {
  // const { data, error, isLoading:loading } = useSWR(
  //   'https://defiprime.com/defiprime.tokenlist.json',
  //   fetcher
  // )
  const { data, error, loading } = useUser(
    'https://defiprime.com/defiprime.tokenlist.json'
  )
  console.log(data, 'data')

  if (error) return <div>failed to load</div>
  if (loading) return <div>loading...</div>
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
