import { View, Text, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native'


export default function Buttons({ src }) {

    const DATA = [
        {
            id: '1',
            amount: 5000,
        },
        {
            id: '2',
            amount: 10000,
        },
        {
            id: '3',
            amount: 20000,
        },
    ];

    const Item = ({ title }) => (
        <View style={styles.btn}>
            <Image source={src} />
            <Text style={{ color: 'black', marginLeft: 15, fontSize: 14 }}>{title}</Text>
        </View >
    )


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.amount} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    btn: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }

})