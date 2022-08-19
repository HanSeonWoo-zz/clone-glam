import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import TabNavigator from './TabNavigator';

const MainNavi = createStackNavigator();
function MainNavigator(props) {
  return (
    <MainNavi.Navigator>
      <MainNavi.Screen
        name={'Tab'}
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </MainNavi.Navigator>
  );
}
export default MainNavigator;
