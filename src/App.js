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
      <div className="characters__list">
        {characters.map((item) => {
          return (
            <div className="characters__item" key={item._id}>
            <img className="characters__item-img" src={item.imageUrl} alt={item.name} />
              <div className="characters__item-name">{item.name}</div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="characters__title">Disney API characters</h1> 
      {renderCharactersList()}
    </div>
  )
}

export default App
