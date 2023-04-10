import { ScrollableContentContainer } from 'libs/reuse/styled/ScrollableListContainer';
import CategoryCheckBoxList from "./CategoryCheckBoxList";

const CategoryCheckBoxesContainer = () => {
    return (
        <ScrollableContentContainer>
            <CategoryCheckBoxList />
        </ScrollableContentContainer>
    );
}
export default CategoryCheckBoxesContainer;