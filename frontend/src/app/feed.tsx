import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Text,
    View,
    StyleSheet
} from "react-native";

import { getFeed } from "../api/feed";
import PostCard from "@/components/PostCard";
import { createInteraction } from "@/api/interactions";

import { router } from "expo-router";

import { Pressable } from "react-native";

export default function FeedScreen() {

    const [posts, setPosts] = useState<any[]>([]);

    const viewedPosts = useRef(

    new Set<number>()

);

    const onViewableItemsChanged =

    ({ viewableItems }: any) => {

        viewableItems.forEach(

            async ({ item }: any) => {

                if (

                    viewedPosts.current.has(

                        item.id

                    )

                ) return;

                viewedPosts.current.add(

                    item.id

                );

                await createInteraction(

                    item.id,

                    "view"

                );

            }

        );

    };

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

        ListHeaderComponent={
            <View
    style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 16,
    }}
>

    <Pressable
        onPress={() => router.push("/search")}
    >

        <Text>

            Search

        </Text>

    </Pressable>

    <Pressable
        onPress={() => router.push("/create-post")}
    >

        <Text>

            Create Post

        </Text>

    </Pressable>

</View>
        }

    data={posts}

    keyExtractor={(item) =>
        item.id.toString()
    }

    renderItem={({ item }) => (

    <PostCard

        post={item}

        onReaction={async (id) => {
            await createInteraction(
                id,
                "reaction"
            );
        }}

        onReply={async (id) => {
            await createInteraction(
                id,
                "reply"
            );
        }}

    />

)}

    onViewableItemsChanged={onViewableItemsChanged}

 />

    );

}
