export interface NestedCheckBoxSection {
  parentName: string;
  checked: boolean;
  childObjects: ChildCheckboxObject[];
}

export interface ChildCheckboxObject {
  childName: string;
  checked: boolean;
}

export interface NestedCheckBoxSectionProps {
  checkBoxSection: NestedCheckBoxSection;
  parentOnClick: () => void;
  childOnClick: () => void;
}
