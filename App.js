import './global';
import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font} from 'expo';
import {Ionicons} from '@expo/vector-icons';
import firebase from 'firebase';
import RootNavigation from './navigation/RootNavigation';
import Config from './config';

firebase.initializeApp(Config.firebase);

export default class App extends Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar barStyle="default"/>
                    <RootNavigation/>
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            // Asset.loadAsync([
            //     require('./assets/images/robot-dev.png'),
            //     require('./assets/images/robot-prod.png'),
            // ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                'clear-sans': require('./assets/fonts/ClearSans-Regular.ttf'),
                'clear-sans-bold': require('./assets/fonts/ClearSans-Bold.ttf')
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});