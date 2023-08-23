import { useQuery } from '@apollo/client';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';

import { GET_FILMS } from '../../apollo';
import { STAR_WARS_IMAGES } from '../../constants/images';
import { useAppSelector } from '../../redux/store';

export default function TabOneScreen() {
  const { loading, error, data } = useQuery(GET_FILMS, { variables: { first: 50 } });
  const { sortFilms } = useAppSelector((state) => state.reducer);

  return (
    <ScrollView className='h-full' nestedScrollEnabled>
      <View className='flex items-center w-full h-full'>
        { loading ?
            <ActivityIndicator /> 
          : data?.allFilms?.films && !error && (
          [ ...data.allFilms.films ].sort((a: any, b: any) => (new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()) * sortFilms || 1).map((film: any, index: number) => (
            <View className='tw-h-[40vh] w-full overflow-hidden relative' key = { film.id }>
              <Image blurRadius={3} resizeMode='cover' className='h-full absolute' source={ STAR_WARS_IMAGES[sortFilms === 1 ? 5 - index % 6 : index % 6] } />
              <Pressable onPress={() => router.replace({ pathname: `/movie/${film.id}` })}>
                <View className='min-h-[25vh] flex flex-column justify-center items-center relative overflow-hidden'>
                  <Image resizeMode='contain' className='w-full absolute' source={ STAR_WARS_IMAGES[sortFilms === 1 ? 5 - index % 6 : index % 6] } /> 
                  <Text className='flex mx-auto text-white relative font-jout text-3xl text-center'>{film.title}</Text>
                  <Text className='flex mx-auto text-white relative font-jout text-xl'>{film.releaseDate}</Text>
                </View>
              </Pressable>
              <Text className='bg-black/40 text-white font-jhol text-2xl text-center'>Characters:</Text>
              <ScrollView className='h-[15vh]' nestedScrollEnabled contentContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', flexDirection: 'row', flexWrap: 'wrap'}}>
                { film?.characterConnection?.characters && film.characterConnection.characters.map((character: any) => (
                  <View key={character.id} className='w-1/2'>
                    <Text className='font-jedi text-white'>{character.name.toLowerCase()}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}