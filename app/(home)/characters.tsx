import { useQuery } from '@apollo/client';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';

import { GET_CHARACTERS } from '../../apollo';
import { useAppSelector } from '../../redux/store';

type Person = {
  id: string,
  name: string,
}

export default function TabTwoScreen() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  const { liked } = useAppSelector((state) => state.reducer);

  const likedCharacters: Person[]  = React.useMemo(() => data ? data.allPeople.people.filter((person: Person) => liked[`character_${person.id}`]) : [], [ data, liked ]);

  return loading ?
      <ActivityIndicator /> 
    : data && !error && (
    <ScrollView>
      <View className='flex flex-row flex-wrap w-full'>
        { likedCharacters.map((person) => (
          <Pressable className='w-1/2 h-[25vh]' key={person.id} onPress={() => router.replace({ pathname: `/character/${person.id}` })}>
            <View className='w-full h-full flex flex-col flex justify-center items-center'>
              <View className='max-h-[20vh] relative flex overflow-hidden'>
                <Image resizeMode='contain' className='h-full' source={ require("../../assets/images/default.png") } />
              </View>
              <Text className='text-white font-jedi'>{person.name}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
