/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'

const UpdateStateCorrect = () => {
  let [count, setCount] = useState(0)

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          const newCount = count + 1
          setCount(newCount)
          console.log(newCount)
        }}
      >
        Incrementar
      </button>
    </>
  )
}

const UpdateStateWrong = () => {
  let [count] = useState(0)

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          count = count = count + 1
          console.log(count)
        }}
      >
        Incrementar
      </button>
    </>
  )
}

const Loop = () => {
  const [todos, setTodos] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/todos?_start=${page * 2}&_limit=2`
    )
      .then((response) => response.json())
      .then((response) => setTodos((state) => [...state, ...response]))
    // .then((response) => setTodos([...todos, ...response]))
  }, [
    page,
    // todos
  ])

  return (
    <div>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <p>Page: {page + 1}</p>
      <button onClick={() => setPage((state) => state + 1)}>Next page</button>
    </div>
  )
}

let render = 0

const Listener = () => {
  const [todos, setTodos] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    const abortController = new AbortController()
    fetch(
      `https://jsonplaceholder.typicode.com/todos?_start=${page * 2}&_limit=2`,
      {
        signal: abortController.signal,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setTodos((state) => [...state, ...response])
        render++
      })

    return () => {
      console.log('unmount')
      abortController.abort()
    }
  }, [page])

  return (
    <div>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
      <p>Page: {page + 1}</p>
      <button onClick={() => setPage((state) => state + 1)}>Next page</button>
      <strong>Renders: {render}</strong>
    </div>
  )
}

const fakeService = (value) => {
  console.log(value)
}

const AccessState = () => {
  let [count, setCount] = useState(0)

  useEffect(() => {
    fakeService(`effect: ${count}`)
  }, [count])

  console.log('body', count)

  return (
    <>
      <p>{count}</p>
      <button
        onClick={() => {
          const newValue = count + 1
          setCount(newValue)
          fakeService(newValue)
        }}
      >
        Incrementar
      </button>
    </>
  )
}

const ListKey = () => {
  const [fruits, setFruits] = useState([
    'orange',
    'apple',
    'watermelon',
    'banana',
    'melon',
    'pineapple',
  ])

  return (
    <div>
      {fruits.map((fruit) => (
        <div key={fruit}>
          <button onClick={() => setFruits(fruits.filter((f) => f !== fruit))}>
            Remove
          </button>
          <label htmlFor={fruit}>{fruit}</label>
          <input id={fruit} defaultValue={fruit} />
        </div>
      ))}
    </div>
  )
}

function App() {
  return (
    <>
      <ListKey />
    </>
  )
}

export default App
