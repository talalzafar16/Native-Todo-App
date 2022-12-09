import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  ScrollView,
  RefreshControl,
  Button,
  Alert,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
const image = { uri: "https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000" };
const App=()=> {
  const[Todo,SetTodo] =useState("");
  const[list,SetList] =useState([]);
  const[Edit,SetEdit] =useState(false);
  const[Index,SetIndex] =useState("");
  const[refresh,Setrefresh]=useState(false)
  let edit=(ind)=>{
    SetTodo(list[ind].txt)
    SetEdit(true)
    SetIndex(ind)
  }
  let abc=()=>{
    Setrefresh(true)
    SetList([...list])
    setTimeout(()=>{
      Setrefresh(false)
    },900)
  }
  let Add=()=>{
    if(!Todo){
      Alert.alert("Field Empty","Please, enter some text")
    }
    else if(Edit){
      list[Index].txt=Todo
      SetEdit(false)
    }
    else{
    SetList([...list,{txt:Todo,time:JSON.stringify(new Date())}])
    SetTodo("")
    ToastAndroid.show("Task Aded",ToastAndroid.SHORT,ToastAndroid.CENTER);}
  }
  let Delete=(ind)=> {
    list.splice(ind,1)
    SetList([...list])
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.bgimage}>
        <Text style={styles.text}>ToDo App</Text>
        <View style={styles.box}>
          <TextInput style={styles.input} secureTextEntry={true} onChangeText={(e)=>{SetTodo(e)}} multiline={true} placeholder="Enter Todo">{Todo}</TextInput>
          <Button title="Add me"  onPress={Add} Scolor="royalblue"/>
        </View>
        <View style={{height:"70%",width:"80%",}}>
          <ScrollView refreshControl={<RefreshControl onRefresh={abc} refreshing={refresh}/>}>
          {
            list && list.map((e,i)=>{
              return <View key={i} style={{shadowColor: "#000",
              
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.55,
              shadowRadius: 14.78,
              elevation: 22,borderWidth:2,padding:10,marginBottom:10,height:130,width:280,backgroundColor:"lightblue",borderRadius:10}}>
                <ScrollView>
                <Text style={{fontFamily:"Times New Roman",fontSize:24,color:"black"}}>{e.txt}</Text>
                <Text style={{fontSize:13,color:"royalblue",marginTop:10}}>Time:{e.time}</Text>
                </ScrollView>
                <View style={{display:"flex",flexDirection: "row",justifyContent: "space-between"}}>
                <TouchableOpacity onPress={()=>{edit(i)}} style={{borderWidth:2,width:90,height:40 ,borderRadius:10,marginTop:10,textAlign:"center",backgroundColor:"white" }}><Text style={{textAlign:"center",padding:3,fontSize:22,fontWeight:"Bold",color:"red"}}>Edit</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{Delete(i)}} style={{borderWidth:2,width:90,height:40 ,borderRadius:10,marginTop:10,textAlign:"center",backgroundColor:"white" }}><Text style={{textAlign:"center",padding:3,fontSize:22,fontWeight:"Bold",color:"red"}}>Delete</Text></TouchableOpacity>
                </View>
              </View>
            })
          }
        </ScrollView>
        </View>
      </ImageBackground>
    </View>
    );
};
const styles=StyleSheet.create({
  container:{
    width:"100%",
    height:"100%",
  },
  bgimage:{
    height:"100%",
    width:"100%",
    alignItems: "center",
  },
  box:{
    margin:40,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
  },
  input:{
    borderColor:"white",
    borderWidth:2,
    width:"90%",
    fontSize:16,
    marginLeft:10,
    marginRight:20,
  },
  text:{
    marginTop:20,
    borderTopWidth:6,
    borderBottomWidth:6,
    borderColor:"red",
    maringTop:"20px",
    padding: 10,
    textAlign: "center",
    height:60,
    width:"100%",
    fontSize:33,
    color:"black",
    fontWeight:"bold",
    backgroundColor:"lightblue",
  },
})

export default App;
