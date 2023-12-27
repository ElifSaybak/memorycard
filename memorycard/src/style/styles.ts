import { StyleSheet } from 'react-native'
import { GAP_SIZE } from '../style/sizes'
import { Color } from './Color'

const app = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  spaceTop: {
    flex: 1,
  },
  spaceBottom: {
    flex: 2,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: GAP_SIZE,
    position: 'absolute',
    bottom: GAP_SIZE,
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: GAP_SIZE,
    backgroundColor: Color.white,
    padding: 3,
  },
  titleView: {
    width: '100%',
    height: 60,
    padding: 10,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  timerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBottom: {
    fontWeight: 'bold',
    marginRight: 7,
  },
  lngPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Color.ash_gray,
  },
  lngText: {
    fontWeight: '600',
    color: Color.white,
  },
  restartText: {
    fontWeight: '600',
    color: Color.white,
  },
  restartPressable: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Color.ash_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const board = StyleSheet.create({
  containerPortrait: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: GAP_SIZE / 2,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
})

const cardView = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    maxWidth: '80%',
    color: Color.white,
    marginTop: 3,
  },
})

const languages = StyleSheet.create({
  languagesList: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'gray',
  },
  languageButton: {
    padding: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  langName: {
    fontSize: 18,
    color: 'white',
  },
})

const winOverlayButton = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 10,
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Color.black,
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  text: {
    color: Color.gray,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Color.ash_gray,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
})

const winOverlayTouch = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 10,
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Color.black,
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  text: {
    color: Color.gray,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  text2: {
    color: Color.hookers_green,
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    fontStyle: 'italic',
  },

  moveText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 12,
    maxWidth: '80%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Color.ash_gray,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  moveUp: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.hookers_green,
    borderRadius: 50,
    marginTop: 80,
  },
})

const giftBox = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeGift: {
    marginTop: 40,
    width: 80,
    height: 80,
  },
  openGift: {
    marginTop: 25,
    width: 110,
    height: 110,
    marginRight: 25,
  },
})

const presentMessage = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openModalText: {
    fontSize: 18,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    alignItems: 'center',
    height: 200,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeModal: {
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
  modalTitleView: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: Color.hookers_green,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    color: Color.coyote,
  },
  moreText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Color.rust,
  },
  readMoreText: {
    color: Color.hookers_green,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  closeModalText: {
    color: Color.hookers_green,
    fontSize: 14,
    marginTop: 20,
    fontWeight: 'bold',
  },
})

export {
  app,
  board,
  cardView,
  languages,
  winOverlayButton,
  winOverlayTouch,
  giftBox,
  presentMessage,
}
