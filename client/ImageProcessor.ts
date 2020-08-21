import * as FileSystem from 'expo-file-system'
import {Alert} from "react-native";

const serverAddress = 'http://192.168.100.167:3000';
const filepath = FileSystem.documentDirectory + 'image.jpg'

export const ImageProcessor = {
    retrieveImage: async () => {
        try {
            await FileSystem.downloadAsync(serverAddress, filepath)

            console.log('Image saved')
        } catch (e) {
            console.error(JSON.stringify(e, undefined, 2))
            return Alert.alert('Error', 'An error ocurred processing image')
        }

    },
    sendImage: async (uri: String = filepath) => {
        try {
            const body = new FormData();
            body.append('data', {
                uri,
                type: 'image/jpeg',
                name: 'image.jpg'
            } as any)
            const result = await fetch(serverAddress, {
                method: 'POST',
                body,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(JSON.stringify(result, undefined, 2))
        } catch (e) {
            console.error(JSON.stringify(e, undefined, 2))
        }
    }
}
