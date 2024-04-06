import Header from "../../components/header/Header"
import BottomBar from "../../components/bottombar/BottomBar"
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"
import ThreadChat from "../../components/chat/ThreadChat"
import ThreadChatType from "../../components/chat/ThreadChatType"

export default function SingleThread({ route }) {
    const { threadId } = route.params;

    console.log(threadId)

    return (
        <>
            <StatusBar backgroundColor={"#F08E0F"} />
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, paddingTop: 5, paddingBottom: 15 }}>
                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            <ThreadChat threadId={threadId} />
                        </View>
                        <ThreadChatType />
                    </ScrollView>
                </View>
                <BottomBar />
            </View>
        </>
    )
}
