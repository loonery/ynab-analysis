const CategoryCheckBoxChild = ({childName, parentChecked}) => {

    const [checked, setChecked] = useState(parentChecked);

    return (
        <li>{childName}</li>
    )
}
export default CategoryCheckBoxChild;