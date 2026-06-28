import { useState } from "react";
import { router } from "expo-router";
import { login } from "../api/auth";
import { saveToken } from "../storage/auth";

import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";

export default function LoginScreen() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

    try {

        const response = await login(
            email,
            password
        );

        await saveToken(
            response.token
        );

        router.replace("/feed");

    } catch (error: any) {

        Alert.alert(
            "Login Failed",
            error?.response?.data?.message ??
            "Unknown Error"
        );

    }

};

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                GuisedUp
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Pressable
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>
                    Login
                </Text>
            </Pressable>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        justifyContent: "center",

        padding: 20,

        backgroundColor: "#fff"

    },

    title: {

        fontSize: 32,

        fontWeight: "bold",

        marginBottom: 40,

        textAlign: "center"

    },

    input: {

        borderWidth: 1,

        borderColor: "#ccc",

        borderRadius: 8,

        padding: 12,

        marginBottom: 16

    },

    button: {

        backgroundColor: "#007AFF",

        padding: 14,

        borderRadius: 8,

        alignItems: "center"

    },

    buttonText: {

        color: "white",

        fontSize: 16,

        fontWeight: "600"

    }

});