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
      <View style={{ flex: 1 }}>
        <Header></Header>
        <View style={styles.mainContainer}>
          {this.state.data.length > 0 && !this.state.WebView ?
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(data) =>
                <View style={styles.listContainer}>
                  <View style={{ flexDirection: 'row', marginTop: "10%", marginBottom: "3%" }}>
                    <Image source={{ uri: data.imagem }} style={styles.photo} />
                    <View style={{ marginLeft: "5%" }}>
                      <View style={styles.textWrapContainer}>
                        <Text style={styles.title}>
                          {data.titulo}
                        </Text>
                      </View>
                      <Text style={styles.text}>
                        Do Diretor {data.diretor}
                      </Text>
                      {<View style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-start'
                      }}>
                        <Text style={styles.cast} >
                          Com {data.elenco.map((nome, i) => {
                            return i !== data.elenco.length - 1 ? nome + ", " : nome + "."
                          })}
                        </Text>
                      </View>}
                    </View>
                  </View>
                  <Text style={styles.launchDate}>
                    Estreou em {data.lancamento}
                  </Text>
                  <View style={{ backgroundColor: "#536DFE", alignContent: "center", borderRadius: 5, padding: 5, width: "30%" }}>
                    <Text style={styles.grade}>
                      Nota {data.nota} de 5.
                  </Text>
                  </View>
                  {<View style={styles.sinopseWrapContainer}>
                    <Text style={styles.text}>
                      {data.sinopse}
                    </Text>
                  </View>}
                  <Text style={styles.genre}>
                    {data.genero.map((nome, i) => {
                      return i !== data.genero.length - 1 ? nome + ", " : nome + "."
                    })}
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: "5%", marginBottom: "2%", justifyContent: 'space-between' }}>
                    <View style={{ backgroundColor: "#F44336", alignContent: "center", borderRadius: 10, padding: 10, }}>
                      <Button
                        onPress={() => this.setState({ WebView: true, url: data.trailer })}
                        title="Trailer"
                        color="white"
                        accessibilityLabel="Trailer"
                      />
                    </View>
                    <View style={{ backgroundColor: "#F44336", alignContent: "center", borderRadius: 10, padding: 10, }}>
                      <Button
                        onPress={() => this.setState({ WebView: true, url: data.programacao })}
                        title="Programação"
                        color="white"
                        accessibilityLabel="Programação"
                      />
                    </View>
                  </View>
                </View>}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            />
            : !this.state.WebView ? <View style={styles.loadingView}><Text style={styles.loading}>Carregando...</Text></View> : <View></View>}
          {this.state.WebView ?
            <View style={{ flex: 1 }}>
              <View style={{ backgroundColor: "#BDBDBD", alignContent: "center", borderRadius: 10, padding: 10 }}>
                <Button
                  onPress={() => this.setState({ WebView: false, url: "" })}
                  title="Fechar navegação"
                  color="white"
                  accessibilityLabel="Fechar navegação"
                />
              </View>
              <WebView
                source={{ uri: this.state.url }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                style={{ marginTop: 20 }}
              />
            </View>
            :
            <View></View>}
        </View>
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

const Header = () => (
  <View style={{ backgroundColor: "#D32F2F", justifyContent: "center", alignItems: "center", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: 10 }}>
    <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>Em cartaz</Text>
  </View>
);

const styles = StyleSheet.create({
  container: props => {
    return {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  mainContainer: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#FFFFFF"
  },
  text: {
    fontSize: 16,
    marginBottom: "2%",
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  grade: {
    fontSize: 16,
    marginBottom: "2%",
    flexDirection: 'row',
    flexWrap: "wrap",
    color: "white"
  },
  loadingView: {
    flex: 1,
    flexDirection: 'row'
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
    alignSelf: 'flex-start',
    fontSize: 16,
    flex: 1
  },
  textWrapContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  sinopseWrapContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginTop: "5%"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: 'stretch',
    flex: 1
  },
  photo: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
