import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import Lottie from 'lottie-react-native';npm u
import AuthContext from '../store/AuthContext';
import axios from 'axios'

const EditProfileView = () => {
    const { user } = useContext(AuthContext)
    const [contactInfo, setContactInfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
    });
    const baseUrl = 'http://172.21.21.73/api/v1';

    const handleSubmit = async () => {
        console.log(contactInfo)
        const config = {
            headers: {
                'Authorization': `Bearer ${user}`,
                'content-type': 'application/json'
            }
        };
        try {
            const res = await axios.post(`${baseUrl}/profile`,
                contactInfo,
                config
            )
            console.log(res.data.success)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                {/* <Lottie
                    source={require('../../assets/avatar.json')}
                    style={{ width: '40%' }}
                /> */}
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>FirstName</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    value={contactInfo.firstname}
                    onChangeText={(firstname) => setContactInfo({ ...contactInfo, firstname: firstname })}
                />
                <Text style={styles.label}>LastName</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter LastName"
                    value={contactInfo.lastname}
                    onChangeText={(lastname) => setContactInfo({ ...contactInfo, lastname: lastname })}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    value={contactInfo.email}
                    onChangeText={(email) => setContactInfo({ ...contactInfo, email: email })}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: '80%',
    },
    label: {
        marginTop: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 35
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default EditProfileView;