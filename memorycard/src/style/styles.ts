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
    padding: 3
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
  textBottom: {
    fontWeight: 'bold',
  },
  lngPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Color.teal,
  },
  lngText: {
    fontWeight: '600',
  },
  restartPressable: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Color.blue,
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
    backgroundColor: Color.teal,
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
  button: {
    backgroundColor: Color.teal,
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
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.red,
    borderRadius: 50,
    marginTop: 50,
  },
})

export { app, board, cardView, languages, winOverlayButton, winOverlayTouch }
