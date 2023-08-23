import { FontAwesome } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { actions, useAppDispatch, useAppSelector } from '../../redux/store';

export default function MovieLayout() {
  const { id } = useLocalSearchParams();

  const { liked } = useAppSelector((state) => state.reducer);

  const isLiked = React.useMemo(() => liked[`character_${id}`] || false, [ liked ]);
  const dispatch = useAppDispatch();
  
  return (
    <Stack screenOptions={{ headerTitle: 'Character', headerRight: () => (
      <Pressable onPress={() => dispatch(actions.changeLiked({ character: 'character_' + id as string, liked: !isLiked }))}>
        <FontAwesome
          name={ isLiked ? 'heart' : 'heart-o' }
          size={25}
          color='white'
        />
      </Pressable>
    )}} />
  );
}