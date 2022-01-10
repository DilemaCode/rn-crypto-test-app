import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal:20,
  },
  top: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  logoImage: {
    width: '20%',
    height: 20,
  },
  logoTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#000',
  },
  input: {
    height: 40,
    padding: 10,
    marginBottom: 40,
    borderBottomWidth: 1,
    borderRadius: 5,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginBottom: 50
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    justifyContent: 'center'
  },


});

export default styles;