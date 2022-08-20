import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { SceneRendererProps, NavigationState, TabBar, TabBarItem, TabBarItemProps, Route } from 'react-native-tab-view';

import { BASE_URL } from '../api/api';
import { Img } from '../assets/images';
import { Colors, SCREEN_WIDTH } from '../components/styles';
import { Card } from '../components/types';

const renderTabBarItem = (
  props: TabBarItemProps<Route> & {
    key: string;
  },
) => {
  return (
    <TabBarItem
      {...props}
      renderLabel={(scene: { route: Route; focused: boolean; color: string }) => {
        if (scene.route.key === 'glam') {
          return (
            <FastImage style={{ width: 63, height: 26 }} source={Img.icon.main.logo} tintColor={props.navigationState.index === 0 ? props.activeColor : props.inactiveColor} />
          );
        }
        return <Text style={{ fontSize: 20, fontWeight: '600', color: scene.color }}>{props.route.title}</Text>;
      }}
    />
  );
};

export const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  },
) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 8,
        marginRight: 12,
        marginTop: 12,
        height: 44,
        borderBottomWidth: 0.5,
        borderColor: '#eee',
      }}>
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={{ backgroundColor: Colors.Black }}
        style={{ backgroundColor: Colors.Trans }}
        renderTabBarItem={renderTabBarItem}
        activeColor={Colors.Black}
        inactiveColor={Colors.Gray2}
        tabStyle={{ width: 'auto' }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ProfileEdit')}>
        <FastImage style={{ width: 30, height: 30 }} source={Img.icon.main.setting} />
      </TouchableOpacity>
    </View>
  );
};

export const CardComponent = (props: { item: Card & { type?: string }; onClose: () => void; onLike: () => void }) => {
  const { item, onClose, onLike } = props;
  const [pictureIndex, setPictureIndex] = useState(0);

  const onLeft = () => {
    const temp = Math.max(pictureIndex - 1, 0);
    setPictureIndex(temp);
  };
  const onRight = () => {
    const temp = Math.min(pictureIndex + 1, item.pictures?.length - 1);
    setPictureIndex(temp);
  };
  const renderGuide = (item, index) => {
    return <View style={{ flex: 1, height: 3, backgroundColor: pictureIndex === index ? Colors.White : 'rgba(255,255,255,0.5)', borderRadius: 4, marginHorizontal: 2 }} />;
  };
  return (
    <View
      style={{
        width: SCREEN_WIDTH - 10,
        height: (SCREEN_WIDTH - 10) * 1.4,
      }}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <FastImage
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          source={{ uri: BASE_URL + item.pictures[pictureIndex] }}
        />
        <TouchableOpacity onPress={onLeft} activeOpacity={1} style={{ width: '50%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
        <TouchableOpacity onPress={onRight} activeOpacity={1} style={{ width: '50%', height: '100%', position: 'absolute', top: 0, right: 0 }} />
        <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 1, paddingTop: 8, width: SCREEN_WIDTH / 3 }}>{item.pictures.map(renderGuide)}</View>
        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} locations={[0, 1]} colors={['rgba(51,51,51,1)', 'rgba(51,51,51,0)']}>
          <View style={{ paddingHorizontal: 16 }}>
            {item.type && (
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  paddingVertical: 4,
                  paddingHorizontal: 12,
                  alignSelf: 'flex-start',
                  borderRadius: 4,
                  marginBottom: 12,
                }}>
                <Text style={{ fontSize: 14, color: Colors.White }}>{item.type}</Text>
              </View>
            )}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: Colors.White,
                }}>
                {item.name}, {item.age}
              </Text>
              <FastImage style={{ width: 16, height: 17, marginLeft: 4 }} source={Img.icon.main.info} />
            </View>
            {item.introduction ? (
              <Text style={{ marginTop: 8, fontSize: 16, color: Colors.White }}>{item.introduction}</Text>
            ) : (
              <>
                <Text style={{ marginTop: 8, fontSize: 16, color: Colors.White }}>
                  {item.job} , {item.distance / 1000}km
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 16,
                    color: 'rgba(255,255,255,0.6)',
                  }}>
                  {item.height}cm
                </Text>
              </>
            )}
          </View>
        </LinearGradient>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 15,
          backgroundColor: '#333333',
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            width: 48,
            height: 44,
            borderRadius: 4,
            backgroundColor: Colors.DarkGray1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FastImage source={Img.icon.main.delete} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onLike}
          style={{
            flex: 1,
            height: 44,
            borderRadius: 4,
            backgroundColor: Colors.GlamBlue,
            marginLeft: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: Colors.White, fontSize: 14, fontWeight: '600' }}>좋아요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const CustomRecommend = (props: { onChoose: (title: string) => void; onViewAll: () => void }) => {
  const { onChoose, onViewAll } = props;
  return (
    <View
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        width: SCREEN_WIDTH - 10,
        borderRadius: 12,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: Colors.Black,
          marginBottom: 12,
        }}>
        맞춤 추천
      </Text>
      <CustomRecommendLine icon={Img.icon.recommendations.today} title={'글램 추천'} isHOT onPress={onChoose} />
      <CustomRecommendLine icon={Img.icon.recommendations.dia} title={'최상위 매력'} isHOT onPress={onChoose} />
      <CustomRecommendLine icon={Img.icon.recommendations.glamour} title={'볼륨감 있는 체형'} isHOT onPress={onChoose} />
      <CustomRecommendLine icon={Img.icon.recommendations.withpet} title={'반려 동물을 키우는'} onPress={onChoose} />
      <TouchableOpacity
        onPress={onViewAll}
        style={{
          marginTop: 16,
          height: 44,
          backgroundColor: '#F2F2F2',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.Black }}>{24}개 항목 모두 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CustomRecommendLine = ({ icon, title, onPress, isHOT }: { icon: number; title: string; onPress: (title: string) => void; isHOT?: boolean }) => {
  const onPress_ = () => {
    Alert.alert(title, '최근 접속한 2명을 추천합니다.', [{ text: '추천받기', onPress: () => onPress(title) }, { text: '돌아가기' }]);
  };
  return (
    <TouchableOpacity
      // onPress={onViewAll}
      activeOpacity={1}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginVertical: 11,
      }}>
      <FastImage style={{ width: 40, height: 40 }} source={icon} />
      <Text style={{ marginLeft: 12 }}>{title}</Text>
      {isHOT && <FastImage style={{ width: 30, height: 13, marginLeft: 8 }} source={Img.icon.recommendations.hot} />}

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        onPress={onPress_}
        style={{
          backgroundColor: Colors.GlamBlue,
          width: 76,
          height: 32,
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.White }}>선택</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
