import React from 'react'
import { Link, Route } from 'react-router-dom'

export default props => (
  <Route
    path={props.to}
    exact={props.exact}
    children={routeProps => (
      <li style={styles.navigationItem(routeProps.match)}>
        <Link style={styles.navigationLink} to={props.to}>
          {props.label}
        </Link>
      </li>
    )}
  />
)

export const styles = {
  navigationItem: active => ({
    backgroundColor: active ? 'lightGreen' : 'darkGrey',
    display: 'inline-block'
  }),
  navigationLink: {
    display: 'inline-block',
    color: 'black',
    textDecoration: 'none',
    padding: 20
  }
}
