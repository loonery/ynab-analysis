import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from 'react'
import { selectTransactionDateRange } from "../../store/selectors/transactionSliceSelectors";
import { Dropdown } from "../../libs/reuse/Dropdown";
import { Col, Row } from "react-bootstrap";
import CategoryCheckBoxesContainer from "./CategoryFilterDropdown/CategoryCheckBoxesContainer";
import styled from "styled-components";

const FilterBar = () => {

    const {earliest, latest} = useSelector(state => selectTransactionDateRange(state));
    const { appliedFilters } = useSelector(state => state.transactions);
    const [filters, setFilters] = useState(appliedFilters);

    return (
        <Row className="border rounded p-3">
            <Dropdown dropdownLink={"Categories"}>
                <CategoryCheckBoxesContainer />
            </Dropdown>
        </Row>
    )

}
export default FilterBar;