const Persons = (props) => {

    return (
        <form id="add" onSubmit={props.handleSubmit}>
            <div>
                <label>name: </label>
                <input 
                    type="text" 
                    value={props.newName}
                    onChange={props.handleName}
                />
            </div>
            <div>
                <label>number: </label>
                <input
                    type="text"
                    onChange={props.handleNumber}
                />
            </div>
            <button type="submit">Add</button>
        </form>
    )
}

export default Persons