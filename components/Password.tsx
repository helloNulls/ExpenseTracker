import React, { useState } from "react";
import {
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import styles from "../styles/SignUpScreenStyles";  // Assuming styles can be reused

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");

    const handleForgetPassword = async () => {
        if (!email) {
            Alert.alert("Please enter your email address.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5002/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Password Reset", data.message);
            } else {
                Alert.alert("Failed to send reset email", data.message);
            }
        } catch (error) {
            Alert.alert("Error", "Cannot connect to the server.");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.contain}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>Forget Password</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.text}>Email: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={handleForgetPassword}
                    >
                        <Text style={styles.buttonText}>Send Reset Link</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ForgetPassword;
