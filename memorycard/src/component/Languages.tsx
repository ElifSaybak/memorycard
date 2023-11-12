import { FlatList, Modal, Pressable, Text, View } from 'react-native'
import React from 'react'
import { languages } from '../style/styles'
import { languageResources } from '../services/i18next';
import languagesList from '../services/languagesList'


interface Props {
    onClose: () => void,
    changeLng: (lng: string) => void,
}

export function Languages({ onClose, changeLng }: Props) {
    return (
        <Modal animationType="slide" onRequestClose={onClose}>
            <View style={languages.languagesList}>
                <FlatList
                    data={Object.keys(languageResources)}
                    renderItem={({ item }) => (
                        <Pressable
                            style={languages.languageButton}
                            onPress={() => changeLng(item)}
                        >
                            <Text style={languages.langName}>{languagesList[item].nativeName}</Text>
                        </Pressable>
                    )}
                />
            </View>
        </Modal>

    )
}