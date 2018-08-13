import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';

class ModalComponent extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
      >
        <View style={{marginTop: 22}}>
          <View>
            <Text>{this.props.message}</Text>

            <TouchableHighlight onPress={this.props.confirmFn}>
              <Text>YES</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.props.closeModalFn}>
              <Text>NO</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ModalComponent
