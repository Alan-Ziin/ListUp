import React,{ useState } from "react"
import {Text, StyleSheet, SafeAreaView, Image} from "react-native"
import {Button} from "@/components/button"
import {Input} from "@/components/input"
import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { router } from 'expo-router'

const index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        if (user) router.replace('../screens/tabs');
      } catch (error: any) {
        console.log(error)
        alert('O E-mail ou a senha é invalido: ' + error.message);
      }
    }
  
    const signUp = async () => {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        if (user) router.replace('../screens/tabs');
      } catch (error: any) {
        console.log(error)
        alert('Coloque suas informações para criar a conta:\n ' + error.message);
      }
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.imagemInicio} source={require("@/assets/imgs/listup.png")} />
        <Input style={styles.textInput} placeholder="Email" value={email} onChangeText={setEmail} />
        <Input style={styles.textInput} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
        <Button title="Entrar na conta" onPress={signIn}/>
        <Text style={styles.textSign}>
            Não possui uma conta?
        </Text>
        <Button title="Criar conta" onPress={signUp}/>
      </SafeAreaView>
    )
  }

  export default index

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FAFAFA',
    
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      marginBottom: 40,
      color: '#000000'
    },
    textInput: {
      height: 50,
      width: '90%',
      backgroundColor: '#FFFFFF',
      borderColor: '#E8EAF6',
      borderWidth: 2,
      borderRadius: 15,
      marginVertical: 5,
      paddingHorizontal: 25,
      fontSize: 16,
      color: '#3C4858',
      shadowColor: '#9E9E9E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 14,
      elevation: 4,

    },
    text: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    imagemInicio: {
        width: "50%",
        height: 100,
        resizeMode: 'stretch'
    },
    textSign:{
        color: "#010d23",
        fontSize: 12,
        padding: 10,
        marginVertical: 1,
        fontWeight: "bold",
    }
  });