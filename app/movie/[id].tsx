import { useQuery } from '@apollo/client';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { GET_FILM } from '../../apollo';
import { STAR_WARS_IMAGES } from '../../constants/images';

export default function MovieScreen() {
  const { id } = useLocalSearchParams();

  const { loading, data, error } = useQuery(GET_FILM, { variables: { filmId: id } });
  
    return loading ?
      <ActivityIndicator /> 
    : data && !error && (
      <ScrollView>
        <View className='flex flex-col relative w-full min-h-[100vh]'>
          <View className='max-h-[30vh] w-[100vw] relative flex items-start justify-center overflow-hidden'>
            <Image resizeMode='contain' className='w-full top-0' source={ STAR_WARS_IMAGES[Math.round(Math.random() * 5)] } />
          </View>
          <View className='flex flex-row mb-4'>
            <View className='w-1/2 pl-1'>
              <Text className='text-center mb-2 font-jedi text-white text-lg'>Counts:</Text>
              <View className='flex flex-row'>
                <Text className='mr-auto text-white'>Species:</Text>
                <Text className='mr-2 text-white'>{data.film.speciesConnection.totalCount}</Text>
              </View>
              <View className='flex flex-row'>
                <Text className='mr-auto text-white'>Planets:</Text>
                <Text className='mr-2 text-white'>{data.film.planetConnection.totalCount}</Text>
              </View>
              <View className='flex flex-row'>
                <Text className='mr-auto text-white'>Vehicles:</Text>
                <Text className='mr-2 text-white'>{data.film.vehicleConnection.totalCount}</Text>
              </View>
            </View>
            <View className='w-1/2 pr-1'>
              <Text className='text-center mb-2 font-jedi text-white text-lg'>Main information:</Text>
              <View className='flex flex-row'>
                <Text className='ml-2 text-white'>Title:</Text>
                <Text className='ml-auto text-white'>{data.film.title}</Text>
              </View>
              <View className='flex flex-row'>
                <Text className='ml-2 text-white'>Release:</Text>
                <Text className='ml-auto text-white'>{data.film.releaseDate}</Text>
              </View>
            </View>
          </View>
          <View className='flex flex-col w-full items-center mb-4'>
            <Text className='font-jedi text-xl text-white'>opening:</Text>
            <Text className='font-jedi text-center text-white'>{data.film.openingCrawl.toLowerCase()}</Text>
          </View>
          <Text className='text-center w-full font-jedi text-xl text-white'>Characters:</Text>
          <View className='flex flex-row flex-wrap'>
              { data.film.characterConnection.characters.map((character: any) => (
                <Pressable 
                  key = {character.id} 
                  className='w-1/2' 
                  onPress={() => router.replace({ pathname: `/character/${character.id}` })}>
                  <View className='h-16 flex justify-center border-white border-[1px] mb-1'>
                    <Text className='text-center font-jedi text-white  py-auto'>{character.name.toLowerCase()}</Text>
                  </View>
                </Pressable>
              ))}
          </View>
        </View>
      </ScrollView>
    );
  }