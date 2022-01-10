import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  Animated,
  TextInput,
  Button,
} from 'react-native';
import styles from './chart.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoItem from '../../components/crypto_item';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import NetInfo from "@react-native-community/netinfo";
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { parse } from '@babel/core';


class ChartScreen extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      // data3: [5.21, 13, 11.21, 12.32, 15, 12.23, 9.23],
      data: [parseFloat(this.props.route.params.coin.price_usd)],
      // data: [7],
      isLoading: true,
      count: -30,
      initCount: -30,
      callCount: 0,
      maxPrice: 0,
      minPrice: 0,
      maxRange: 0,
      minRange: 0,
      hours: [''],
    };

    this.props.navigation.setOptions({ title: this.props.route.params.coin.name })

  }

  componentDidMount() {
    this.getPriceRange();
    // this.addTime();
    this.getData()
  }

  runner() {
    const interval = setInterval(() => {
      if (this.state.count == 0) {

        clearInterval(interval)
        this.setState({
          count: this.state.initCount,
        });
        this.getData();
      } else {
        this.setState({
          count: this.state.count + 1,
        });
      }
    }, 1000);

  }

  addItemToData = (v) => {
    let _data = Array.from(this.state.data);
    _data.push(v)
    this.setState({
      data: _data
    })
  }

  addTime = () => {
    let _hours = Array.from(this.state.hours);
    var now = new Date();
    let time = `${now.getHours()}:${now.getMinutes()}`;

    _hours.push(`${time}`);
    console.log(time);
    this.setState({
      hours: _hours
    })
  }

  getSavedChart = async ({ index, value }) => {
    try {
      let _data = await AsyncStorage.getItem('chart')
      if (_data == '' || _data == null) throw 'No data';
      _data = JSON.parse(_data);
      this.setState({
        data: _data
      })
    } catch (error) {
      console.error(error);
    }
  }


  getData = async () => {
    if (this.state.callCount == 5) return;

    // this.setState({
    //   isLoading: false,
    //   callCount: this.state.callCount + 1,
    // })
    // this.addItemToData(this.state.data3[this.state.callCount])
    // this.getPriceRange();
    // this.addTime();
    // this.runner();


    try {
      if (!this.props.route.params.isConnected) throw 'no internet';
      const response = await fetch('https://api.coinlore.net/api/ticker/?id=' + this.props.route.params.coin.id);
      if (response.status == 200) {
        const json = await response.json();
        console.log('RESPONSE ' + json[0].price_usd);
        this.addTime();
        this.addItemToData(parseFloat(json[0].price_usd))
        this.setState({
          callCount: this.state.callCount + 1
        })
        this.getPriceRange();
        this.runner();
        console.log('RESPONSE ' + json[0].price_usd);

        AsyncStorage.setItem('chart_' + json[0].name + json[0].id, JSON.stringify(this.state.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }



  getPriceRange = () => {
    var data = Array.from(this.state.data);
    data = data.sort()
    console.log(data);
    // var medium = data.length == 0 ? parseFloat(this.props.route.params.coin.price_usd) :
    //   Array.from(data).reduce((partial_sum, a) => partial_sum + a, 0) / data.length;
    var min = data[0];
    var max = data[data.length - 1];
    var minRange = min * (min / max);
    var maxRange = max * (max / min);

    this.setState({
      minRange: minRange,
      maxRange: maxRange,
      minPrice: min,
      maxPrice: max,
    })
    console.log('minRange ' + minRange);
    console.log('maxRange ' + maxRange);
    console.log('minRange ' + this.state.minRange);
    console.log('maxRange ' + this.state.maxRange);
    console.log('minPrice ' + this.state.minPrice);
    console.log('maxPrice ' + this.state.maxPrice);
  }


  render = () => (
    <SafeAreaView style={styles.body}>
      <Animated.View style={{ ...styles.noInternet, height: this.props?.route?.params?.anim ?? 0, }}>
        <Text style={styles.noInternetLabel}>No internet connection</Text>
      </Animated.View>

      {this.state.isLoading &&
        <View style={{ height: 250, justifyContent: 'center' }}>
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        </View>
      }

      {!this.state.isLoading &&
        <ScrollView style={styles.body}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>Price</Text>
          <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 20 }}>{this.state.data[this.state.data.length - 1]}</Text>
          <View>
            <Text style={{ fontSize: 12, color: 'grey', marginBottom: 10 }}>${parseFloat(this.state.maxRange).toFixed(2)}</Text>
            <View style={{ flex: 1, marginBottom: 10, flexDirection: 'row' }}>
              <YAxis
                data={[this.state.minPrice, this.state.maxPrice]}
                contentInset={{ top: 10, bottom: 10 }}
                svg={{
                  fontSize: 14,
                  fill: 'grey',
                  fontFamily: 'Roboto'
                  //   textAlign: 'left'
                }}
                style={{ backgroundColor: 'transparent', fontSize: 14, color: 'grey' }}
                numberOfTicks={5}
                formatLabel={(value) => `$${parseFloat(value).toFixed(2)}`}
              />
              <View style={{ flex: 1, flexDirection: 'column', width: '80%' }}>
                <LineChart

                  style={{
                    height: 250,
                    // backgroundColor:'#ccc',
                    marginBottom: 0,
                    padding: 0
                  }}
                  data={this.state.data}
                  numberOfTicks={5}
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                  contentInset={{ top: 10, bottom: 10, }}
                >
                  <Grid />
                </LineChart>

              </View>
            </View>
            <Text style={{ fontSize: 12, color: 'grey', marginTop: 0 }}>${parseFloat(this.state.minRange).toFixed(2)}</Text>
          </View>

          <XAxis
            style={{ marginHorizontal: 20 }}
            data={this.state.hours}
            formatLabel={(value, index) => this.state.hours[index]}
            contentInset={{ left: 60, right: 30 }}
            style={{ marginTop: 10 }}
            svg={{ fontSize: 12, fill: 'black' }}
          />
          <Text>{this.state.data.length}</Text>
          {this.state.callCount < 5 &&
            <View>
              <Text style={{ fontSize: 50, textAlign: 'center' }}>{Math.abs(this.state.count)}</Text>
              <Text style={{ fontSize: 14, textAlign: 'center' }}>Time remaining to update</Text>
            </View>
          }
        </ScrollView>
      }

      {/* <Text style={{ color: 'red', fontSize: 30, textAlign: 'center' }}>{this.state.callCount}</Text> */}
    </SafeAreaView>
  );
}

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest function.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

export default ChartScreen;