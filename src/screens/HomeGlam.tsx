import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, LayoutAnimation, View } from 'react-native';

import { getIntroduction, getIntroductionAdditional, postIntroductionCustom } from '../api/api';
import { Card } from '../components/types';
import { wait } from '../components/util';
import { CardComponent, CustomRecommend } from './homeComponents';

const HomeGlam = () => {
  const [todayRecommendations, setTodayRecommendations] = useState<Card[] | null>(null);
  const [additionalRecommendations, setAdditionalRecommendations] = useState<Card[] | null>(null);
  const [nextUrl, setNextUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef();
  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    const resIntro = await getIntroduction();
    setTodayRecommendations(resIntro?.data?.map((i) => ({ ...i, type: '오늘의 추천' })) || []);
    const resAdditional = await getIntroductionAdditional();
    setAdditionalRecommendations(resAdditional.data || []);
    setNextUrl(resAdditional?.meta?.next?.url || '');
  };

  const onLoadMore = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      if (nextUrl) {
        const res = await getIntroductionAdditional(nextUrl);
        setAdditionalRecommendations([...(additionalRecommendations || []), ...res.data]);
        setNextUrl(res?.meta?.next?.url || '');
      } else {
        await wait(500);
      }
    } catch (error) {
    } finally {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Card }) => {
    const onTempAdditionalFunction = () => {
      const deletedArr = additionalRecommendations?.filter((i: Card) => i.id !== item.id) || [];
      setAdditionalRecommendations(deletedArr);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };
    return <CardComponent onClose={onTempAdditionalFunction} onLike={onTempAdditionalFunction} item={item} />;
  };

  const onCustomRecommend = async (title: string) => {
    const res = await postIntroductionCustom();
    const temp = [...res.data.map((i: Card) => ({ ...i, type: title })), ...(todayRecommendations || [])];
    const deduplicatedTemp = temp.filter((item, index) => index === temp.findIndex((i) => i.id === item.id));
    setTodayRecommendations(deduplicatedTemp);
    flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  };
  const onViewAll = () => {};

  const onTempTodayFunction = (id: number) => {
    const deletedArr = todayRecommendations?.filter((i: Card) => i.id !== id) || [];
    setTodayRecommendations(deletedArr);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  const ListHeaderComponent = () => {
    return (
      <>
        {todayRecommendations?.map((item: Card) => (
          <View key={String(item.id)}>
            <ItemSeparatorComponent />
            <CardComponent onClose={() => onTempTodayFunction(item.id)} onLike={() => onTempTodayFunction(item.id)} item={item} />
          </View>
        ))}
        <ItemSeparatorComponent />
        <CustomRecommend onChoose={onCustomRecommend} onViewAll={onViewAll} />
        <ItemSeparatorComponent />
      </>
    );
  };
  const ItemSeparatorComponent = () => <View style={{ height: 12 }} />;

  const ListFooterComponent = () => {
    return <ActivityIndicator size={24} style={{ margin: 20 }} color={'#999'} />;
  };

  if (todayRecommendations === null || additionalRecommendations === null) {
    return <></>;
  }

  return (
    <FlatList
      ref={flatListRef}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      data={additionalRecommendations || []}
      renderItem={renderItem}
      contentContainerStyle={{ alignItems: 'center' }}
      ItemSeparatorComponent={ItemSeparatorComponent}
      style={{ backgroundColor: '#fff' }}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0}
      ListFooterComponent={isLoading ? ListFooterComponent : undefined}
      // pagingEnabled
    />
  );
};

export default HomeGlam;
