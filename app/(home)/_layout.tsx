import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';

import { actions, useAppDispatch, useAppSelector } from '../../redux/store';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const dispatch = useAppDispatch();
  const { sortFilms } = useAppSelector((state) => state.reducer);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Episodes',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerRight: () => (
            <Pressable onPress={() => dispatch(actions.changeFilmSort())}>
              <View className='h-full flex justify-center mr-4'>
                <FontAwesome
                  name={ sortFilms === 1 ? 'arrow-up' : 'arrow-down' }
                  size={25}
                  color='white'
                />
              </View>
            </Pressable>
          )
        }}
      />
      <Tabs.Screen
        name="characters"
        options={{
          title: 'Characters',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
