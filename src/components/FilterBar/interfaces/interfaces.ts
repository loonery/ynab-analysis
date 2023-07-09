import { ButtonProps } from 'libs/reuse/components/interfaces/interfaces';
import { DropdownKey } from 'store/interfaces/FilterBarState';

export interface FilterBarDropdownProps {
  id: string;
  headerText: string;
  dropdownLinkText: string;
  dropdownKey: DropdownKey;
  headerButtons: ButtonProps[];
  footerButtons: ButtonProps[];
}
