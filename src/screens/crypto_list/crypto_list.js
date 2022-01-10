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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './crypto_list.style';
import CryptoItem from '../../components/crypto_item';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import NetInfo from "@react-native-community/netinfo";

const CryptoListScreen = ({ navigation }) => {
    const [isLoading, setLoading] = React.useState(true);
    const [username, setUsername] = React.useState("");
    const [query, setQuery] = React.useState("");
    const [coins, setCoins] = React.useState([]);
    const [allCoins, setAllCoins] = React.useState([]);

    const [conectionStatus, setConectionStatus] = React.useState(null);
    const [isConnected, setIsConnected] = React.useState(true);
    const anim = React.useRef(new Animated.Value(0)).current  // Initial value for opacity: 0



    NetInfo.addEventListener(state => {
        if (conectionStatus != state) {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setConectionStatus(state);
            setIsConnected(state.isConnected ?? false);
            if (state.isConnected)
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }).start();
            else
                setTimeout(() => {
                    Animated.timing(anim, {
                        toValue: 50,
                        duration: 1000,
                        useNativeDriver: false,
                    }).start();
                }, 2000);
        } else {
            return;
        }
    });

    const getCoins = async () => {
        try {
            if (!isConnected) throw 'no internet';
            const response = await fetch('https://api.coinlore.net/api/tickers/?limit=50',);
            if (response.status == 200) {
                const json = await response.json();
                setAllCoins(json.data);
                setCoins(json.data);
                AsyncStorage.setItem('coins', JSON.stringify(json.data));
            }
        } catch (error) {
            console.error(error);
            getSavedCoins();
        } finally {
            setLoading(false);
        }
    }

    const getSavedCoins = async () => {
        try {
            let _coins = await AsyncStorage.getItem('coins')
            if (_coins == '' || _coins == null) throw 'No data';
            _coins = JSON.parse(_coins);
            setCoins(_coins);
            setAllCoins(_coins);
        } catch (error) {
            console.error(error);
        }
    }

    AsyncStorage.getItem('username').then((v) => {
        setUsername(v);
    })

    const signOut = () => {
        AsyncStorage.clear();
        navigation.replace('Login')
    };

    const filter = () => {
        if (query == '' || query == null) {
            setCoins(allCoins);
            return;
        }

        const filteredCoins = allCoins.filter((c) => {
            if (parseFloat(c.percent_change_24h) >= parseFloat(query)) {
                console.log(parseFloat(c.percent_change_24h) >= parseFloat(query));
                return c;
            }
        })
        // console.log(filteredCoins);
        setCoins(filteredCoins)

    }


    React.useEffect(() => {
        getCoins();
    }, []);

    return (
        <SafeAreaView style={styles.body}>
            <Animated.View style={{ ...styles.noInternet, height: anim, }}>
                <Text style={styles.noInternetLabel}>No internet connection</Text>
            </Animated.View>
            <ScrollView style={styles.body}>
                <View style={styles.header}>
                    <View >
                        <Text style={styles.welcomeText}>Welcome</Text>
                        <Text style={styles.usernameText}>{username}</Text>
                    </View>
                    <TouchableHighlight underlayColor={null} onPress={() => { }} >
                        <FontAwesomeIcon icon={faSignOutAlt} size={25} color={'#333'} />
                    </TouchableHighlight>
                </View>
                <View>
                    <View style={styles.filterContainer}>
                        <TextInput
                            style={styles.filterInput}
                            placeholder="Minimum 24-hr % Change"
                            value={query}
                            onChangeText={setQuery}
                            keyboardType='decimal-pad'
                        ></TextInput>
                        <TouchableHighlight
                            onPress={allCoins.length == 0 ? null : filter}
                            underlayColor={null}
                            style={styles.filterButton}>
                            <FontAwesomeIcon icon={faSignOutAlt} size={20} color={'#333'} />
                        </TouchableHighlight>
                    </View>
                    {isLoading && <ActivityIndicator size="large" />}
                    {!isLoading && coins.map((coin) => (
                        <TouchableHighlight
                            key={coin.id}
                            underlayColor={'#ccc'}
                            onPress={!isConnected ? null : () => navigation.navigate('Chart', { coin: coin, anim:anim,isConnected: isConnected })} >
                            <CryptoItem data={coin}></CryptoItem>
                        </TouchableHighlight>
                    )
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default CryptoListScreen;