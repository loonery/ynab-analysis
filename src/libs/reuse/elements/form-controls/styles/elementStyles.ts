import styled from 'styled-components';

import { SelectElementProps } from '../interfaces/interfaces';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  margin-right: 10px;
  font-weight: 600px;
`;

export const StyledSelect = styled.select<SelectElementProps>`
  width: 100%;
  overflow-y: auto;
  ${({ flex }): string => (flex ? `${flex}` : '')}
`;

export const Option = styled.option`
  overflow-y: scroll;
`;

export const StyledInput = styled.input``;

export const StyledCheckboxContainer = styled.div``;
