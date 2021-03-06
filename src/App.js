import { useEffect, useState } from "react"
import classnames from "classnames";

const App = () => {
  // State for all characters
  const [characters, setCharacters] = useState([])

  // State for filtered characters
  const [searchText, setSearchText] = useState('')
  const [filteredCharacters, setFilteredCharacters] = useState([])

  // State for all/favourites characters mode
  const [favouritesMode, setFavouritesMode] = useState(false)

  // Initial fetch of all characters and adding field favourite
  useEffect(() => {
    fetch('https://api.disneyapi.dev/characters')
      .then(response => response.json())
      .then(dataObj => setCharacters(dataObj.data.map((item) => { 
        return {...item, 'favourite': false} 
      })))
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

  // Favourites adding/deleting caused by icon onClick
  const handleChangeFavourite = (id) => {
    const newCharacters = characters.map((item) => {
      if (item._id === id) {
        item.favourite = !item.favourite
      }
      return item
    })

    setCharacters(newCharacters)
  }

  // Show all/favourites caused by checkbox onChange
  const handleToggleFavs = (e) => {
    setFavouritesMode(e.target.checked)
  }

  // Render characters (all, searched, favourites)
  const renderCharactersList = () => {
    if (characters.length === 0) return null

    let charactersForRender = (searchText !== '') ? filteredCharacters : characters

    if (favouritesMode === true) {
      charactersForRender = charactersForRender.filter((item) => {
        return item.favourite === true
      })
    }

    return (
      <div className="characters__list">
        {charactersForRender.map((item) => {
          const favClasses = {
            "characters__item-fav": true,
            "added": item.favourite
          }

          return (
            <div className="characters__item" key={item._id}>
              <div 
                className={classnames(favClasses)}
                onClick={() => {handleChangeFavourite(item._id)}}
                ></div>
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
        <input type="checkbox" id="favourites-mode"
          checked={favouritesMode}
          onChange={handleToggleFavs} /><label htmlFor="favourites-mode">Show only favourites</label>
      </form>
      {renderCharactersList()}
    </div>
  )
}

export default App
