import {View , Text} from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>Student Profile</Text>

            <View style={{ marginTop: 20, marginLeft: 20, alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 15 }}>Name: Emmanuel Pedroza</Text>
                <Text style={{ fontSize: 15 }}>ID: 000961358</Text>
                <Text style={{ fontSize: 15 }}>Email: pedrozaemmanuel16@gmail.com</Text>
            </View>
        </View>


    );
}

export default ProfileScreen;
