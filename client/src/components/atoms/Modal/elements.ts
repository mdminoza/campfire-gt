import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-style: none;
  border-radius: inherit;
  display: ${(props: { isVisible?: boolean }): string =>
    props.isVisible ? 'flex' : 'none'};
`;
