import { useState } from "react";

import {
    View,
    TextInput,
    Pressable,
    Text,
    StyleSheet,
    Alert,
} from "react-native";

import { createPost } from "../api/post";

import { router } from "expo-router";

export default function CreatePostScreen() {

    const [content, setContent] = useState("");

    const [imageUrl, setImageUrl] = useState("");

    async function handleCreate() {

        try {

            await createPost(
                content,
                imageUrl
            );

            Alert.alert(
                "Success",
                "Post Created"
            );

            router.replace("/feed");

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <View style={styles.container}>

            <TextInput

                style={styles.content}

                multiline

                placeholder="What's on your mind?"

                value={content}

                onChangeText={setContent}

            />

            <TextInput

                style={styles.input}

                placeholder="Image URL (optional)"

                value={imageUrl}

                onChangeText={setImageUrl}

            />

            <Pressable

                style={styles.button}

                onPress={handleCreate}

            >

                <Text style={styles.buttonText}>

                    Create Post

                </Text>

            </Pressable>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        padding: 20,

        backgroundColor: "#fff"

    },

    content: {

        borderWidth: 1,

        borderRadius: 8,

        minHeight: 140,

        padding: 12,

        marginBottom: 16,

        textAlignVertical: "top"

    },

    input: {

        borderWidth: 1,

        borderRadius: 8,

        padding: 12,

        marginBottom: 20

    },

    button: {

        backgroundColor: "#007AFF",

        padding: 14,

        borderRadius: 8,

        alignItems: "center"

    },

    buttonText: {

        color: "white",

        fontWeight: "bold"

    }

});