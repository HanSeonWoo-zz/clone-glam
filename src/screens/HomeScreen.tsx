import React, {useState} from 'react';
import {View} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Colors, SCREEN_WIDTH} from '../components/styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {renderTabBar} from './homeComponents';
import HomeGlam from './HomeGlam';

const NearRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;
const LiveRoute = () => <View style={{flex: 1, backgroundColor: '#123123'}} />;

const renderScene = SceneMap({
  glam: HomeGlam,
  near: NearRoute,
  live: LiveRoute,
});

function HomeScreen(props) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'glam', title: 'Glam'},
    {key: 'near', title: '근처'},
    {key: 'live', title: '라이브'},
  ]);

  return (
    <SafeAreaView edges={['top']} style={{flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: SCREEN_WIDTH}}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
