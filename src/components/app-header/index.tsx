import * as React from 'react';
import { IState, IProps } from './AppHeader.PropsState';
import './AppHeader.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
class AppHeader extends React.Component<IProps, IState>{

  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
  }

  public render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="javascript:void(0);">PEXRAYTECH</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="">
            VO HONG SON | Assignment
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default AppHeader;