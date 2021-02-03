const Search = (props) => {

    return (
        <form>
          <div>
            <label>find countries</label>
            <input 
              type="text" 
              onChange={props.handleSearch}
            />
          </div>
        </form>
    )
}

export default Search