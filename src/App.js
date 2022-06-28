import { useEffect, useState } from "react"

const App = () => {
  // State for all characters
  const [characters, setCharacters] = useState([])

  // State for filtered characters
  const [searchText, setSearchText] = useState('')
  const [filteredCharacters, setFilteredCharacters] = useState([])

  // Initial fetch of all characters
  useEffect(() => {
    fetch('https://api.disneyapi.dev/characters')
      .then(response => response.json())
      .then(dataObj => setCharacters(dataObj.data))
  }, [])

  // Filtering of characters caused by onChange
  const handleChangeSearchText = (e) => {
    const input = e.target.value
    setSearchText(input)

    if (input === '') {
      setFilteredCharacters([])
    } else {
      setFilteredCharacters(characters.filter((item) => {
        return item.name.toLowerCase().indexOf(input.toLowerCase()) !== -1
      }))
    }
  }

  // Render characters (all or filtered)
  const renderCharactersList = () => {
    if (characters.length === 0) return null

    const charactersForRender = (searchText !== '') ? filteredCharacters : characters

    return (
      <div className="characters__list">
        {charactersForRender.map((item) => {
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

  // Render the app
  return (
    <div className="container">
      <h1 className="characters__title">Disney API characters</h1> 
      <form className="characters__form">
        <input 
          className="characters__form-input" 
          type="text" 
          placeholder="Search character"
          value={searchText}
          onChange={handleChangeSearchText} />
      </form>
      {renderCharactersList()}
    </div>
  )
}

export default App
