import { useSelector } from "react-redux";
import { useState } from 'react'
import { selectTransactionDateRange } from "../../store/selectors/transactionSliceSelectors";
import { Row, Col} from "react-bootstrap";
import CategoryFilterDropdown from "./CategoryFilterDropdown/CategoryFilterDropdown";
import DateFilterDropdown from "./DateFilterDropdown/DateFilterDropdown";

const FilterBar = () => {

    return (
        <Row className="border rounded p-3">
            <Col>
                <CategoryFilterDropdown />
            </Col>
            <Col>
                <DateFilterDropdown />
            </Col>
        </Row>
    )

}
export default FilterBar;