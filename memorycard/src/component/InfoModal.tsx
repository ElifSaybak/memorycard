import { Modal, Pressable, Text, View } from 'react-native'
import { Color } from '../style/Color'
import React from 'react'
import { infoModal } from '../style/styles'

interface Props {
    onClose: () => void
}

export function InfoModal({ onClose }: Props) {
    return (
        <Modal animationType="slide">
            <View style={infoModal.modalContainer}>
                <Pressable
                    style={({ pressed }) => [
                        infoModal.closePressable,
                        {
                            backgroundColor: pressed ? Color.redLight : Color.red,
                        },
                    ]}
                    onPress={onClose}>
                    <Text style={infoModal.closeText} accessibilityHint="Close">
                        X
                    </Text>
                </Pressable>
                <Text>Hi!</Text>
                <Text>You can find the source code on GitHub:</Text>
            </View>
        </Modal>
    )
}
