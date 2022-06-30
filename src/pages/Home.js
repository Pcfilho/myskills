import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList,
    StatusBar
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

export default function Home(){
    const [newSkill, setNewSkill] = useState();
    const [mySkills, setMySkills] = useState([]);
    const [greeting, setGreeting] = useState('');

    function handleNewAddSkill() { 
        setMySkills(oldState => [...oldState, newSkill]);
    }

    useEffect(() => {
        const hour = new Date().getHours();

        if (hour < 12) {
            setGreeting('Good morning');
        } else if (hour > 12 && hour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good night');
        }

    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Welcome, Paulo</Text>
            <Text style={[styles.title, {fontSize: 12, marginTop: 5}]}>
                {greeting}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="New Skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />

            <Button onPress={handleNewAddSkill}/>
            
            <Text style={[styles.title, { marginTop: 50}]}>
                My Skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <SkillCard skill={item} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 70,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.IS === 'ios' ? 15 : 10,
        marginTop: 20,
        borderRadius: 8
    },
});