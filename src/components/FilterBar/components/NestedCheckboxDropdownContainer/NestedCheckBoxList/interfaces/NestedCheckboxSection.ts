export interface NestedCheckBoxSection {
  parentId: string;
  parentName: string;
  checked: boolean;
  childObjects: ChildCheckboxObject[];
}

export interface ChildCheckboxObject {
  childId: string;
  childName: string;
  checked: boolean;
}

export interface NestedCheckBoxSectionProps {
  checkBoxSection: NestedCheckBoxSection;
  parentOnClick: () => void;
  childOnClick: () => void;
}
