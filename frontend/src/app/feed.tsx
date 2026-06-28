import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { getFeed } from "../api/feed";
import PostCard from "@/components/PostCard";
import { createInteraction } from "@/api/interactions";

import { router } from "expo-router";

import { Pressable } from "react-native";

export default function FeedScreen() {
  const [posts, setPosts] = useState<any[]>([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [hasNext, setHasNext] = useState(true);

  const viewedPosts = useRef(new Set<number>());

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    viewableItems.forEach(async ({ item }: any) => {
      if (viewedPosts.current.has(item.id)) return;

      viewedPosts.current.add(item.id);

      await createInteraction(
        item.id,

        "view",
      );
    });
  };

  const loadFeed = async (pageNumber: number) => {
    if (loading || !hasNext) return;

    setLoading(true);

    try {
      const response = await getFeed(pageNumber);

      setPosts((previous) => [...previous, ...response.data]);

      setHasNext(response.pagination.has_next);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadFeed(1);
  }, []);

  const loadMore = () => {
    if (!loading && hasNext) {
      const nextPage = page + 1;

      setPage(nextPage);

      loadFeed(nextPage);
    }
  };

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
          <Pressable onPress={() => router.push("/search")}>
            <Text>Search</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/create-post")}>
            <Text>Create Post</Text>
          </Pressable>
        </View>
      }
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onReaction={async (id) => {
            await createInteraction(id, "reaction");
          }}
          onReply={async (id) => {
            await createInteraction(id, "reply");
          }}
        />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
    />
  );
}
