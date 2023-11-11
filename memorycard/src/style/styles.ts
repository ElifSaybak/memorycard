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
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: GAP_SIZE,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: GAP_SIZE,
  },
  title: {
    textAlignVertical: 'center',
  },
  textBottom: {
    fontWeight: 'bold',
  },
  infoPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: Color.teal,
  },
  infoText: {
    fontWeight: '600',
  },
  restartPressable: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Color.blue,
    justifyContent: 'center',
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
    borderRadius: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    maxWidth: "80%"
  },
})

const infoModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: Color.blue,
  },
  closePressable: {
    backgroundColor: Color.red,
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
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
    backgroundColor: Color.teal,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 5,
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
  button: {
    backgroundColor: Color.teal,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  moveUp: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.red,
    borderRadius: 50,
    marginTop: 50,
  },
})

export { app, board, cardView, infoModal, winOverlayButton, winOverlayTouch }
