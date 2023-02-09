import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  StatusBar,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');
  const [hour, setHour] = useState<number>(0);

  function handleNewAddSkill() {
    if (newSkill.trim()) {
      const data = {
        id: String(new Date().getTime()),
        name: newSkill,
      };
      setMySkills(oldState => [...oldState, data]);
      setNewSkill(' ');
    }
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id));
  }

  function updateGreeting() {
    const date = new Date().getHours();
    setHour(date);
    if (date < 12) {
      setGreeting('Good morning');
    } else if (date >= 12 && date < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good night');
    }
  }

  useEffect(() => {
    const ONE_MINUTE = 60000;
    setInterval(() => {
      updateGreeting();
    }, ONE_MINUTE);
  }, [hour]);

  useEffect(() => {
    updateGreeting();
  }, []);

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
        onChangeText={setNewSkill}>
        {newSkill}
      </TextInput>

      <Button onPress={handleNewAddSkill} title="New" />

      <Text style={[styles.title, {marginTop: 50}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 50,
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
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 20,
    borderRadius: 8,
  },
});
