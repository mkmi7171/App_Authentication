import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, ImageBackground, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Amount from '../ui/amounts'
import Button from '../ui/Button'



const FirstRoute = () => (
    <View style={styles.tabItem}>
        <Amount src={require('../../assets/mci.png')} />
    </View>
);
const SecondRoute = () => (
    <View style={styles.tabItem} >
        <Amount src={require('../../assets/irancel.png')} />
    </View>
);

const ThirdRoute = () => (
    <View style={styles.tabItem} >
        <Amount src={require('../../assets/ritell.png')} />
    </View>
);

export default function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'همراه اول' },
        { key: 'second', title: 'ایرانسل' },
        { key: 'third', title: 'رایتل' },
    ]);



    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'gray'}
            inactiveColor={'black'}
            indicatorStyle={{
                backgroundColor: "#481DC2",
            }}
            style={styles.tabs}
        />
    );


    return (
        <View style={styles.container} >
            <View style={{ height: '30%' }}>
                <ImageBackground source={require('../../assets/back2.png')} resizeMode='cover' style={{ flex: 1, padding: 10, alignItems: 'flex-end' }}>
                    <Button text={"کیف پول"} colors={"white"} textColor={"#481DC2"} />
                </ImageBackground>
            </View>
            <TabView
                style={{ padding: 10, marginTop: -45, fontFamily: 'IRANSansX-Regular' }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Button text={"خرید شارژ"} colors={"#481DC2"} textColor={"white"} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#F9FAFC',
        paddingBottom: 25,
    },
    tabs: {
        backgroundColor: 'white',
        borderRadius: 5
    },
    tabItem: {
        flex: 1,
        padding: 20
    }
})