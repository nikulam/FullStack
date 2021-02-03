const FilterNames = (props) => {
    return (
        props.arr.filter(n => n.name.toLowerCase().includes(props.str.toLowerCase()))
            .map(n => <div>{n.name} {n.number} <button onClick={(e) => props.handleDelete(e, n)}>Del</button></div>)
        
    )
}

export default FilterNames