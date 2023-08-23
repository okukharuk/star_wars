import { useQuery } from '@apollo/client';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';

import { GET_CHARACTER } from '../../apollo';
import { STAR_WARS_IMAGES } from '../../constants/images';

export default function CharacterScreen() {
  const { id } = useLocalSearchParams();

  const { loading, data, error } = useQuery(GET_CHARACTER, { variables: { personId: id } });
  
    return loading ?
      <ActivityIndicator /> 
    : data && !error && (
      <ScrollView>
        <View className='flex flex-col relative w-full items-center min-h-[100vh]'>
          <View className='max-h-[30vh] relative flex overflow-hidden'>
            <Image resizeMode='contain' className='h-full relative' source={ require("../../assets/images/default.png") } />
          </View>
          <Text className='text-white font-jout text-3xl border-b-[1px] border-white'>{data.person.name.toLowerCase()}</Text>
          <View className='flex flex-row'>
            <Text className='text-white uppercase text-lg mr-4'>Birthyear:</Text>
            <Text className='text-white text-lg'>{data.person.birthYear}</Text>
          </View>
          <View className='flex flex-row'>
            <Text className='text-white uppercase text-lg mr-4'>Height:</Text>
            <Text className='text-white text-lg'>{data.person.height}</Text>
          </View>
          <View className='flex flex-row'>
            <Text className='text-white uppercase text-lg mr-4'>Mass:</Text>
            <Text className='text-white text-lg'>{data.person.mass}</Text>
          </View>
          <View className='flex flex-row'>
            <Text className='text-white uppercase text-lg mr-4'>Planet:</Text>
            <Text className='text-white text-lg'>{data.person.homeworld.name}</Text>
          </View>
          <Text className='text-white font-jout text-2xl border-b-[1px] border-white mt-4'> Movies appeared in:</Text>
          <View className='flex flex-row flex-wrap'>
            {data.person.filmConnection.films.map((film: any, index: number) => (
              <Pressable key = { film.id } className='w-1/2 p-[2px]' onPress={() => router.replace({ pathname: `/movie/${film.id}` }) }>
                <View className='min-h-[30vw] flex flex-column justify-center items-center relative overflow-hidden'>
                  <Image resizeMode='contain' className='w-[110%] absolute' source={ STAR_WARS_IMAGES[index % 6] } /> 
                  <Text className='flex mx-auto text-white relative font-jout text-lg text-center'>{film.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }