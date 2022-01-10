import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CryptoItem = (props) => {
    const [username, onChangeUsername] = React.useState("");
    const coin = props.data;
    const isNegative = () => parseFloat(coin.percent_change_24h) < 0;
    return (
        <View style={styles.item}>
            <View style={styles.left}>
                <Text style={styles.label}>{coin.name}</Text>
                <Text style={styles.symbol}>{coin.symbol}</Text>
            </View>
            <View style={styles.right}>
                <Text style={{
                    ...styles.percent,
                    color: isNegative() ? '#c2181f' : '#2196f3'
                }}>{!isNegative() && '+'}{coin.percent_change_24h}</Text>
                <Text style={styles.price}>${coin.price_usd}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc'
    },

    left: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'

    },
    label: {
        fontSize: 16,
        fontWeight: '700',
    },
    right: {
        flexDirection: 'column',
        // justifyContent:'flex-end',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000'
    },
    percent: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'right'
    },
});

export default CryptoItem;