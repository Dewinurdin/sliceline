import React from 'react';
import styled from 'styled-components';
import { pizzaRed } from '../Styles/colors';
import { Title } from '../Styles/title';

const NavbarStyled = styled.div`
  background-color: ${pizzaRed};
  padding: 10px;
  position: fixed;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
`
const Logo = styled(Title)`
  font-size: 20px;
  color: white;
  text-shadow: 1px 1px 4px black;
`

const UserStatus = styled.div`
  color: white;
  font-size: 12px;
  margin-right: 30px;
`;

const LoginButton = styled.span`
  cursor: pointer;
`;

export function Navbar({login, loggedIn, logout}){
  return (
    <NavbarStyled>
      <Logo>
        SliceLine
        <span role="img" aria-label="pizza slice">
          🍕
        </span>
      </Logo>
      <UserStatus>
        {/* if is loading display loading... */}
        { loggedIn === 'loading' ? 'loading...' : 
            <>
            {/* if it's logged in, display Welcome name else display empty string */}
            👤 { loggedIn ? ` ${loggedIn.displayName}` : ""}
              {loggedIn ? (
                <LoginButton onClick={logout}>Log out</LoginButton>
              ) : (
                <LoginButton onClick={login}>Login / Sign up</LoginButton>
              )}
            </>
        }
      </UserStatus>
    </NavbarStyled>
  );
}
