import React from 'react';
import {StyleSheet, LayoutAnimation, View, Image, Touchable} from 'react-native';

export default class App extends React.Component {
    imgDimensions = {
        width: 367,
        height: 536
    };

    _onPress = (x, y) => {
        // Animate the update
        LayoutAnimation.spring();

        // this make the center move directly
        this.x.setValue(x);
        this.y.setValue(y);
    };

    render() {
        return (
            <View style={styles.container}>
                <Touchable onPress={this._onPress(this.x, this.y)}>
                    <Image
                        source={require('./assets/cards-back-red.png')}
                        style={{
                            width: this.imgDimensions.width,
                            height: this.imgDimensions.height
                        }}
                    />
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
