import { CSSProperties } from 'react';

import styled from 'styled-components';
export interface FlexContainerProps {
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  wrap?: CSSProperties['flexWrap'];
  gap?: CSSProperties['gap'];
  padding?: CSSProperties['padding'];
  width?: CSSProperties['width'];
  className?: string | undefined;
}
export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify }): string => justify || 'initial'};
  align-items: ${({ align }): string => align || 'initial'};
  flex-wrap: ${({ wrap }): string => wrap || 'initial'};
  gap: ${({ gap }): string => String(gap) || '0'};
  padding: ${({ padding }): string => String(padding) || '0px'};

  & > * {
    margin-right: ${({ gap }): string => String(gap) || '0'};
    margin-bottom: ${({ gap }): string => String(gap) || '0'};
  }

  & > *:last-child {
    margin-right: 0;
  }

  ${({ className }): string => (className ? `& ${className}` : '')}
  ${({ width }): string => (width ? `${width}` : '')}
`;
