import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify }) => justify || 'initial'};
  align-items: ${({ align }) => align || 'initial'};
  flex-wrap: ${({ wrap }) => wrap || 'initial'};
  gap: ${({ gap }) => gap || '0'};

  & > * {
    margin-right: ${({ gap }) => gap || '0'};
    margin-bottom: ${({ gap }) => gap || '0'};
  }

  & > *:last-child {
    margin-right: 0;
  }

  ${({ className }) => (className ? `& ${className}` : '')}
`;
