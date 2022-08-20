import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Img} from '../assets/images';
import {Colors} from '../components/styles';
import HomeScreen from '../screens/HomeScreen';
import LiveScreen from '../screens/LiveScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import MoreScreen from '../screens/MoreScreen';
import StationScreen from '../screens/StationScreen';

const BottomTab = createBottomTabNavigator();
const TabNavigator = (props): React.ReactElement => {
  return (
    <>
      <BottomTab.Navigator
        sceneContainerStyle={{backgroundColor: Colors.White}}
        screenListeners={({navigation}) => ({
          tabLongPress: e => {
            if (__DEV__) {
              navigation.jumpTo(e.target.split('-')[0]);
            }
          },
        })}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.Black,
          headerShown: false,
        }}>
        <BottomTab.Screen
          name={'Home'}
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <FastImage
                tintColor={color}
                style={{width: 28, height: 28}}
                source={Img.icon.nav.home}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={'Live'}
          component={LiveScreen}
          options={{
            tabBarIcon: ({color}) => (
              <FastImage
                tintColor={color}
                style={{width: 28, height: 28}}
                source={Img.icon.nav.live}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={'Station'}
          component={StationScreen}
          options={{
            tabBarIcon: ({color}) => (
              <FastImage
                tintColor={color}
                style={{width: 28, height: 28}}
                source={Img.icon.nav.station}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={'Connection'}
          component={ConnectionScreen}
          options={{
            tabBarIcon: ({color}) => (
              <FastImage
                tintColor={color}
                style={{width: 28, height: 28}}
                source={Img.icon.nav.connection}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={'More'}
          component={MoreScreen}
          options={{
            tabBarIcon: ({color}) => (
              <FastImage
                tintColor={color}
                style={{width: 28, height: 28}}
                source={Img.icon.nav.more}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};
export default TabNavigator;
