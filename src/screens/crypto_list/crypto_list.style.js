import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  body:{
    flex: 1,
  },
  header:{
    marginVertical:40,
    paddingHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center",
  },
  welcomeText:{
    fontSize:16,
    fontWeight:'500',
    color:'#000'
  },
  usernameText:{
    fontSize:25,
    fontWeight:'700',
    color:'#000'
  },
  noInternet:{
    backgroundColor:'#9b2226',
    justifyContent:'center',
    alignItems:"center",
  },
  noInternetLabel:{
    color: '#fff',
    fontSize: 14,
    fontWeight:'500'
  },
  filterContainer:{
    flexDirection:'row',
  },
  filterInput: {
    width:'82%',
    height: 40,
    padding: 10,
    paddingLeft:2,
    marginLeft:16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  filterButton:{
    // height:30,
    justifyContent:'center',
    alignItems:'center',
    marginRight:10,
    // padding:8,
    // marginTop: 8,
    width:60,
  }
});

export default styles;