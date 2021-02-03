const Search = (props) => {
    return (
        <form>
          <div>
            <label>filter shown with</label>
            <input 
              type="text" 
              onChange={props.handleSearch}
            />
          </div>
        </form>
    )
}
export default Search