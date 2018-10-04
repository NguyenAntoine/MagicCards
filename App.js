import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    PanResponder,
    StyleSheet,
    View,
} from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDraggable: true,
            dropZoneValues: null,
            pan: new Animated.ValueXY()
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: this.state.pan.x,
                dy: this.state.pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                if (this.isDropZone(gesture)) {
                    this.setState({
                        showDraggable: false
                    });
                } else {
                    Animated.spring(
                        this.state.pan,
                        {toValue: {x: 0, y: 0}}
                    ).start();
                }
            }
        });
    }

    isDropZone(gesture) {
        let dz = this.state.dropZoneValues;
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    setDropZoneValues(event) {
        this.setState({
            dropZoneValues: event.nativeEvent.layout
        });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View
                    onLayout={this.setDropZoneValues.bind(this)}
                    style={styles.dropZone}>
                </View>

                {this.renderImage()}
            </View>
        );
    }


    renderImage() {
        if (this.state.showDraggable) {
            return (
                <View style={styles.container}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout()]}>
                        <Image
                            source={require('./assets/cards-back-red.png')}
                            style={{
                                width: imgDimensions.width,
                                height: imgDimensions.height
                            }}
                        />
                    </Animated.View>
                </View>
            );
        }
    }
}

const imgDimensions = {
    width: 367,
    height: 536
};
let Window = Dimensions.get('window');
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    dropZone: {
        height: 80
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: Window.height / 2 - imgDimensions.height / 2,
        left: Window.width / 2 - imgDimensions.width / 2,
    },
});
