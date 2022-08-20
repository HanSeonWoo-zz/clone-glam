import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Img} from '../assets/images';
import {Colors} from '../components/styles';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import TabNavigator from './TabNavigator';

const MainNavi = createStackNavigator();
function MainNavigator(props) {
  return (
    <MainNavi.Navigator
      screenOptions={{
        headerLeftLabelVisible: false,
        headerBackImage: () => (
          <FastImage
            style={{marginLeft: 16, width: 28, height: 28}}
            source={Img.icon.profile_edit.back}
          />
        ),
        cardStyle: {backgroundColor: Colors.White},
        headerStyle: {shadowColor: 'transparent'},
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 17,
          fontWeight: '600',
          color: Colors.Black,
        },
      }}>
      <MainNavi.Screen
        name={'Tab'}
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <MainNavi.Screen
        name={'ProfileEdit'}
        component={ProfileEditScreen}
        options={{headerShown: true, title: '프로필 수정'}}
      />
    </MainNavi.Navigator>
  );
}
export default MainNavigator;
