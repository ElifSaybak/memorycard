import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { presentMessage } from '../style/styles'

interface Props {
  visible: boolean
  onPress: () => void
}
const PresentMessage = ({ visible, onPress }: Props) => {
  const { t } = useTranslation()

  const [showMore, setShowMore] = useState<boolean>(false)

  const toggleShowMore = () => {
    setShowMore(true)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onPress}>
      <View style={presentMessage.modalContainer}>
        <View style={presentMessage.modalContent}>
          <View style={presentMessage.modalTitleView}>
            <Text style={presentMessage.modalTitle}>{t('gift_box')}</Text>
          </View>

          <Text style={presentMessage.modalText}>{t('present_message')}</Text>

          {showMore && (
            <Text style={presentMessage.moreText}>
              {t('present_message_continue')}
            </Text>
          )}

          {!showMore && (
            <TouchableOpacity onPress={toggleShowMore}>
              <Text style={presentMessage.readMoreText}>Devamını Oku</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={presentMessage.closeModal} onPress={onPress}>
            <Text style={presentMessage.closeModalText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default PresentMessage
