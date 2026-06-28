import { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    View,
    StyleSheet
} from "react-native";

import { getFeed } from "../api/feed";

export default function FeedScreen() {

    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {

        async function loadFeed() {

            try {

                const response = await getFeed();

                setPosts(response.data);

            } catch (e) {

                console.log(e);

            }

        }

        loadFeed();

    }, []);

    return (

        <FlatList

            data={posts}

            keyExtractor={(item) =>
                item.id.toString()
            }

            renderItem={({ item }) => (

                <View style={styles.card}>

                    <Text style={styles.content}>

                        {item.content}

                    </Text>

                </View>

            )}

        />

    );

}

const styles = StyleSheet.create({

    card: {

        padding: 16,

        margin: 12,

        backgroundColor: "#fff",

        borderRadius: 8,

        elevation: 2

    },

    content: {

        fontSize: 16

    }

});