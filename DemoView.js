/**
 * Sample React Native App
 */

import { createElement as h, Component } from 'react'

import { Platform, StyleSheet, Text, View } from 'react-native'

import sqlitePlugin from 'react-native-sqlite-plugin-legacy-support'

/** @jsx h */

export default class DemoApp extends Component<{}> {
  state = {
    sqliteVersion: '??',
    upperText: '??',
  }

  componentDidMount() {
    db = sqlitePlugin.openDatabase({name:'demo.db', location: 'default'})

    db.executeSql('SELECT SQLITE_VERSION() AS sqliteVersion', [], (rs) => {
      this.setState({
        ...this.state,
        sqliteVersion: rs.rows.item(0).sqliteVersion
      })
    })

    db.transaction((tx) => {
      tx.executeSql('SELECT UPPER(?) as upperText', ['Some ASCII text'], (tx, rs) => {
        this.setState({
          ...this.state,
          upperText: rs.rows.item(0).upperText
        })
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>☆SQLite Plugin Legacy demo app☆</Text>
        <Text style={styles.welcome}>☆SQLITE VERSION☆</Text>
        <Text style={styles.instructions}>{this.state.sqliteVersion}</Text>
        <Text style={styles.welcome}>☆SELECT UPPER TEXT RESULT☆</Text>
        <Text style={styles.instructions}>{this.state.upperText}</Text>
      </View>
    )
  }
}

/**
 * Sample React Native styles
 *
 * https://github.com/facebook/react-native
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
