import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  gap: 24px;
  padding: 16px 24px;
  background-color: #1a1a1a;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;

    &:hover {
      color: #93c5fd;
    }
  }
`;
