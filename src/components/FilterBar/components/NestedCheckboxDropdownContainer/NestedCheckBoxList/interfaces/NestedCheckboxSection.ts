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
  parentOnClick: (parentId: string) => void;
  childOnClick: (parentId: string, childId: string) => void;
}

export interface NestedCheckboxListProps {
  checkboxSections: NestedCheckBoxSection[];
  parentOnClick: (parentId: string) => void;
  childOnClick: (parentId: string, childId: string) => void;
}
