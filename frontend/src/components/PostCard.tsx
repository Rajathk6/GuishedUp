import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
} from "react-native";

type Props = {

    post: any;

    onReaction?: (id: number) => void;

    onReply?: (id: number) => void;

};

export default function PostCard({

    post,

    onReaction,

    onReply,

}: Props) {

    return (

        <View style={styles.card}>

            <Text style={styles.content}>

                {post.content}

            </Text>

            {post.image_url && (

                <Image

                    source={{
                        uri: post.image_url,
                    }}

                    style={styles.image}

                    resizeMode="cover"

                />

            )}

            <View style={styles.actions}>

                <Pressable
                    onPress={() =>
                        onReaction?.(post.id)
                    }
                >

                    <Text>

                        ❤️ React

                    </Text>

                </Pressable>

                <Pressable
                    onPress={() =>
                        onReply?.(post.id)
                    }
                >

                    <Text>

                        💬 Reply

                    </Text>

                </Pressable>

            </View>

        </View>

    );

}

const styles = StyleSheet.create({

    card: {

        backgroundColor: "white",

        marginVertical: 8,

        marginHorizontal: 16,

        borderRadius: 10,

        padding: 16,

        elevation: 2,

    },

    content: {

        fontSize: 16,

        marginBottom: 12,

    },

    image: {

        width: "100%",

        height: 220,

        borderRadius: 8,

        marginBottom: 12,

    },

    actions: {

        flexDirection: "row",

        justifyContent: "space-between",

    },

});