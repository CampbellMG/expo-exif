import React, {FunctionComponent} from 'react';
import {Button, ScrollView, StyleSheet, View, Image} from 'react-native';
import {ImageProcessor} from "./ImageProcessor";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

type Routes = {
    Home: undefined,
    Bug: undefined
}

const captureImage = () => ImageProcessor.retrieveImage()
const sendImage = () => ImageProcessor.sendImage()

const {Navigator, Screen} = createStackNavigator()

const BugScreen = () => (
    <ScrollView>
        <View style={styles.container}>
            <Button title='Retrieve image' onPress={captureImage}/>
            <Button title='Send image' onPress={sendImage}/>
        </View>
    </ScrollView>
);

const Home: FunctionComponent<StackScreenProps<Routes, 'Home'>> = ({navigation}) => (
    <View style={styles.container}>
        <Button title='Retrieve image' onPress={captureImage}/>
        <Button title='Send image' onPress={sendImage}/>
        <Button title='Navigate' onPress={() => navigation.navigate('Bug')}/>
    </View>
)

export default function App() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name={'Home'} component={Home}/>
                <Screen name={'Bug'} component={BugScreen}/>
            </Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16
    },
});
