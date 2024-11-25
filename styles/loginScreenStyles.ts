import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inner: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  imgCon: {
    width: 390,
    height: 180,
  },

  innerContainer: {
    alignItems: 'center',
    width: 390,
    height: 280,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  conText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontSize: 16,
    marginLeft: 20,
    margin: 5,
    fontWeight: 'bold',
  },

  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#f7ffff',
    color: 'black',
  },

  forgetPW: {
    fontSize: 13,
    color: 'red',
    textAlign: 'right',
    fontWeight: 'bold',
  },

  loginCon: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
  },

  forgetPWContainer: {
    flex: 0.9,
  },

  pressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
  },

  login: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 5,
  },

  otherLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  line: {
    flex: 1,
    height: 1.2,
    backgroundColor: '#000',
    marginHorizontal: 8,
    margin: 20,
  },

  signinwith: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },

  otherAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: '#0d3d6e',
    width: 300,
    height: 50,
    borderRadius: 8,
  },

  loginText: {
    fontWeight: '700',
    fontSize: 16,
    padding: 5,
    color: 'white',
  },

  logoImg: {
    width: 48,
    height: 48,
    padding: 12,
  },

  registerBox: {
    flexDirection: 'row',
    padding: 10,
  },

  register: {
    paddingLeft: 5,
    fontWeight: 'bold',
  },
});

export default styles;
