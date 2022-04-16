import * as React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import Characters from './components/Characters'
import { RecoilRoot } from 'recoil'
import './App.css'

const queryClient = new QueryClient()

export default () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <div className="container">
            <h1>Rick and Morty</h1>
            <Characters />
          </div>
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  )
}
