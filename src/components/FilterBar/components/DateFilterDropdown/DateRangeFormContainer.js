import { FlexContainer } from 'libs/reuse/containers/FlexContainer';
import DateFilterForm from './DateFilterForm';

const DateRangeFormContainer = () => {

    return (
        <FlexContainer className={'justify-content-around'}>
            <DateFilterForm />
        </FlexContainer>
    )
}
export default DateRangeFormContainer