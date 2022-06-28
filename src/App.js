import { useEffect, useState } from "react"

const App = () => {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch('https://api.disneyapi.dev/characters')
      .then(response => response.json())
      .then(dataObj => setCharacters(dataObj.data))
  }, [])

  const renderCharactersList = () => {
    if (characters.length === 0) return null

    return (
      <div>
        {characters.map((item) => {
          return (
            <div key={item._id}>
              {item.imageUrl}
              {item.name}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Disney API characters</h1> 
      {renderCharactersList()}
    </div>
  )
}

export default App
