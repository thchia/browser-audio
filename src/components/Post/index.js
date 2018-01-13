import React from 'react'

export default props => (
  <div style={styles.container}>
    <div style={styles.title}>Title: {props.title}</div>
    <div style={styles.userId}>User: {props.userId}</div>
    <div style={styles.body}>{props.body}</div>
  </div>
)

export const styles = {
  container: {
    padding: 10
  },
  title: {
    padding: '10px 0',
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  userId: {
    color: 'darkGrey'
  },
  body: {
    padding: '10px 0'
  }
}
