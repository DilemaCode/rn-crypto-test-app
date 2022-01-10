
import React from 'react';
import { Text } from "react-native";

function HeaderTitle(props) {
    return (
     <Text style={{fontSize:18, fontWeight:'700', color:'#000'}}>{props.title}</Text>
    );
  }
export default HeaderTitle;
