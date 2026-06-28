import { useState } from "react";
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
                onPress={() => {
                    Alert.alert(
                        "Login",
                        "Button Clicked"
                    );
                }}
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