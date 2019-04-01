import React, { Component } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { Container, Content, Header, Title, Body, View, Text } from 'native-base';
import { connect } from 'react-redux';
import { getWeatherData } from '../actions/dataActions';
import { toastr } from '../helpers/toastHelper';

class MainScreen extends Component {
    componentDidMount() {
        this.getPositionAndWeatherData();
    }

    getPositionAndWeatherData() {
        navigator.geolocation.getCurrentPosition(
            position => {
                //console.log(position);
                this.props.getWeatherData(position.coords.latitude, position.coords.longitude);
            },
            (e) => {
                toastr.showToast(`Error receiving GPS coordinates: ${JSON.stringify(e)}`);
            }
        );
    }

    render() {
        const { main } = this.props.weatherData;
        if (main === undefined) {
            return (
                <View style={styles.centerContainer}>
                    <Text>Weather data is not available yet</Text>
                </View>
            );
        }
        const { temp, humidity, timestamp } = main;
        return (
            <Container>
                <Content
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => this.getPositionAndWeatherData()}
                        />
                    }
                >
                    <Header>
                        <Body>
                            <Title>Weather at your location</Title>
                        </Body>
                    </Header>
                    {!!temp && !!humidity && !!timestamp ?
                    <View style={styles.resultsItemContainer}>
                        <Text>Last updated at: {timestamp.toLocaleString()}</Text>
                        <Text>Temperature: {temp} degrees</Text>
                        <Text>Humidity: {humidity} percents</Text>
                    </View>
                    :
                    <View style={styles.centerContainer}>
                        <Text>Data format error</Text>
                    </View>}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    resultsItemContainer: {
        padding: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        borderWidth: 1,
        marginHorizontal: 10
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    const { weatherData, loading } = state.Main;
    return { weatherData, loading };
};

export default connect(mapStateToProps, { getWeatherData })(MainScreen);
