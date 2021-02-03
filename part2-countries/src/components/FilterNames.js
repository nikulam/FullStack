const FilterNames = (props) => {
    return (
        props.arr.filter(n => n.name.toLowerCase().includes(props.str.toLowerCase())).map(n => <p>{n.name}</p>)  
    )
}

export default FilterNames