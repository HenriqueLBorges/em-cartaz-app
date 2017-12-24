import React from 'react';
import { WebView, Button, Image, ListView, StyleSheet, Text, View } from 'react-native';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      WebView: false,
      url: ""
    }
  };
  render() {
    return (
      <View style={styles.container1}>
        {this.state.data.length > 0 && !this.state.WebView ?
          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(data) =>
              <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginTop: "10%", marginBottom: "2%" }}>
                  <Image source={{ uri: "http://2.bp.blogspot.com/-SWuCiz3Dr7g/VZslWnVcJJI/AAAAAAAAEts/TRlIkxxuiZk/s1600/image.gif" }} style={styles.photo} />
                  <View style={{ marginLeft: "5%" }}>
                    <Text style={styles.title}>
                      {data.titulo}
                    </Text>
                    <Text style={styles.text}>
                      Do Diretor {data.diretor}
                    </Text>
                    <Text style={styles.cast} >
                      Com {data.elenco.map((nome, i) => {
                        return i !== data.elenco.length - 1 ? nome + ", " : nome + "."
                      })}
                    </Text>
                  </View>
                </View>
                <Text style={styles.launchDate}>
                  Estreou em {data.lancamento}
                </Text>
                <Text style={styles.text}>
                  Nota {data.nota}
                </Text>
                <Text style={styles.text}>
                  {data.sinopse}
                </Text>
                <Text style={styles.genre}>
                  {data.genero.map((nome, i) => {
                    return i !== data.genero.length - 1 ? nome + ", " : nome + "."
                  })}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: "2%", marginBottom: "2%", textAlign: "center" }}>
                  <Button
                    onPress={() => this.setState({ WebView: true, url: data.trailer })}
                    title="Trailer"
                    color="black"
                    accessibilityLabel="Trailer"
                  />
                  <Button
                    onPress={() => this.setState({ WebView: true, url: data.programacao })}
                    title="Programação"
                    color="black"
                    accessibilityLabel="Programação"
                  />
                </View>
              </View>}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />
          : !this.state.WebView ? <View style={styles.loadingView}><Text style={styles.loading}>Carregando...</Text></View> : <View></View>}
        {this.state.WebView ?
          <View>
            <Button
              onPress={() => this.setState({ WebView: false, url: "" })}
              title="Fechar navegação"
              color="black"
              accessibilityLabel="Fechar navegação"
            />
            <WebView
              source={{ uri: this.state.url }}
              style={{ marginTop: 20 }}
            />
          </View>
          :
          <View></View>}
      </View>
    );
  }
  componentDidMount() {
    fetch("https://em-cartaz.herokuapp.com/api/filmes").then(results => {
      return results.json();
    }).then(data => {
      let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({ data: data, dataSource: ds.cloneWithRows(data) });
    });
  }
}

const Row = (props) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row', marginTop: "10%", marginBottom: "2%" }}>
      <Image source={{ uri: "http://2.bp.blogspot.com/-SWuCiz3Dr7g/VZslWnVcJJI/AAAAAAAAEts/TRlIkxxuiZk/s1600/image.gif" }} style={styles.photo} />
      <View style={{ marginLeft: "5%" }}>
        <Text style={styles.title}>
          {props.titulo}
        </Text>
        <Text style={styles.text}>
          Do Diretor {props.diretor}
        </Text>
        <Text style={styles.cast} >
          Com {props.elenco.map((nome, i) => {
            return i !== props.elenco.length - 1 ? nome + ", " : nome + "."
          })}
        </Text>
      </View>
    </View>
    <Text style={styles.launchDate}>
      Estreou em {props.lancamento}
    </Text>
    <Text style={styles.text}>
      Nota {props.nota}
    </Text>
    <Text style={styles.text}>
      {props.sinopse}
    </Text>
    <Text style={styles.genre}>
      {props.genero.map((nome, i) => {
        return i !== props.genero.length - 1 ? nome + ", " : nome + "."
      })}
    </Text>
    <View style={{ flexDirection: 'row', marginTop: "2%", marginBottom: "2%", textAlign: "center" }}>
      <Button
        onPress={() => this.setState({ WebView: true, url: props.trailer })}
        title="Trailer"
        color="black"
        accessibilityLabel="Trailer"
      />
      <Button
        onPress={() => this.setState({ WebView: true, url: props.programacao })}
        title="Programação"
        color="black"
        accessibilityLabel="Programação"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: props => {
    return {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    }
  },
  container1: {
    flex: 1,
    padding: 12,
    //flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: "2%"
  },
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    textAlign: "center"
  },
  loading: {
    fontSize: 16,
    marginLeft: "40%",
  },
  launchDate: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: "2%"
  },
  genre: {
    marginTop: "2%",
    fontSize: 16,
    fontWeight: "700"
  },
  cast: {
    flexWrap: "wrap",
    fontSize: 16,
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "700"
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
