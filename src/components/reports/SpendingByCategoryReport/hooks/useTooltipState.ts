import { useSelector } from 'react-redux';

import { RootState } from 'store';
import {
  CategoryDimensions,
  TooltipData,
  tooltipType,
} from 'store/interfaces/SpendingAnalysis';
import {
  selectShowTooltip,
  selectTooltipData,
  selectTooltipType,
  selectCategoryDimension,
  selectSelectedCategoryGroupName,
} from 'store/selectors/componentSelectors/spendingAnalysisSelectors';

export const useTooltipState = (): {
  showTooltip: boolean;
  tooltipData: TooltipData;
  activeTooltipType: tooltipType | undefined;
  selectedCategoryDimension: CategoryDimensions;
  selectedCategoryGroupName: string;
} => {
  const showTooltip: boolean = useSelector((state: RootState): boolean =>
    selectShowTooltip(state),
  );
  const tooltipData: TooltipData = useSelector((state: RootState) =>
    selectTooltipData(state),
  );
  const activeTooltipType: tooltipType | undefined = useSelector((state: RootState) =>
    selectTooltipType(state),
  );
  const selectedCategoryDimension = useSelector((state: RootState) =>
    selectCategoryDimension(state),
  );
  // get and parse the name
  const selectedCategoryGroupName = useSelector((state: RootState) =>
    selectSelectedCategoryGroupName(state),
  );

  return {
    selectedCategoryDimension,
    selectedCategoryGroupName,
    showTooltip,
    tooltipData,
    activeTooltipType,
  };
};
