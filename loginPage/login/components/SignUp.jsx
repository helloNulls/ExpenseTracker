import React, { useState } from "react";
import { ScrollView, TextInput, KeyboardAvoidingView, Text, View, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/SignUp";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async () => {
        if(email !== confirmEmail){
            Alert.alert('email is not correct');
         }
         if(password!==confirmPassword){
            Alert.alert('password is not correct');
         }
        try {

            const response = await fetch('http://localhost:5002/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password  }),
            });
    
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Sign-up successful.', data.message);
                console.log("perfect")
            } else {
                Alert.alert('Sign-up failed.', data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Cannot conect to Server');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.contain}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>Create Account</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>Full Name: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="full Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <Text style={styles.text}>Email: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.text}>Confirm Email: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Email"
                        value={confirmEmail}
                        onChangeText={setConfirmEmail}
                    />
                    <Text style={styles.text}>Password: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                    <Text style={styles.text}>Confirm Password: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                    />
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.createButton} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}



export default SignUp;
