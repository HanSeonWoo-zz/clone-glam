import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BASE_URL, getProfile } from '../api/api';
import { Img } from '../assets/images';
import { Colors, SCREEN_WIDTH } from '../components/styles';
import { KeyName, Meta, Profile } from '../components/types';
import { ModalEdit, ProfileInfo } from './profileEditComponents';
interface CurrentModal {
  title: string;
  values: KeyName[];
  value: string | number;
  profileKey: string;
}

function ProfileEditScreen(props) {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<Profile>();
  const [meta, setMeta] = useState<Meta>();
  const [isVisible, setIsVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState<CurrentModal | null>(null);
  const [heightKeyName, setHeightKeyName] = useState<KeyName[] | null>(null);

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    if (meta?.height_range) {
      // 키 관련 메타 정보 max,min를 토대로 key, name 배열로 변경
      const heightArr: KeyName[] = Array.from({ length: meta?.height_range?.max - meta?.height_range?.min + 1 }, (v, i) => {
        const height = meta?.height_range.min + i;
        const suffix = height === meta?.height_range.min ? ' 이하' : height === meta?.height_range.max ? ' 이상' : '';
        return {
          key: height,
          name: height + 'cm' + suffix,
        };
      });
      setHeightKeyName(heightArr);
    }
  }, [meta]);

  const initialFetch = async () => {
    const res = await getProfile();
    setProfile(res.data);
    setMeta(res.meta);
  };

  const renderImage = useCallback(
    (item: number) => {
      return (
        <FastImage
          key={String(item)}
          style={{
            width: SCREEN_WIDTH / 3 - 2,
            height: SCREEN_WIDTH / 3 - 2,
            marginBottom: 4,
          }}
          source={profile?.pictures[item] ? { uri: BASE_URL + profile?.pictures[item] } : Img.image.person}
        />
      );
    },
    [profile],
  );

  if (!profile) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <KeyboardAwareScrollView scrollIndicatorInsets={{ right: 1 }} contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {[0, 1, 2, 3, 4, 5].map(renderImage)}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 44,
            borderTopWidth: 1,
            borderColor: '#eee',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 12, color: Colors.Gray4, marginRight: 4 }}>다양한 매력을 보여줄 수 있는 사진을 올려주세요</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 12, fontWeight: '600', color: Colors.DarkGray1 }}>더 알아보기</Text>
          </TouchableOpacity>
        </View>

        <View style={{ borderTopWidth: 1, borderColor: '#eee', paddingTop: 8 }}>
          <ProfileInfo title="닉네임" content={profile.name} onPress={() => {}} />
          <ProfileInfo title="성별" content={meta?.genders?.find((gender) => gender.key === profile.gender)?.name} />
          <ProfileInfo title="생일" content={profile.birthday} onPress={() => {}} />
          <ProfileInfo title="위치" content={profile.location} onPress={() => {}} />
        </View>
        <View style={{ borderTopWidth: 1, borderColor: '#eee', marginVertical: 8 }} />
        <TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={() => {}}>
          <Text style={{ fontSize: 16, color: Colors.Black, lineHeight: 35 }}>소개</Text>
          <TextInput
            multiline
            autoCorrect={false}
            placeholder={'회원님의 매력을 간단하게 소개해주세요'}
            onChangeText={(text) => {
              setProfile({ ...profile, introduction: text });
            }}
            value={String(profile.introduction || '')}
            style={{ fontSize: 14, color: Colors.GlamBlue }}
          />
          <Text style={{ fontSize: 12, color: Colors.Gray4, lineHeight: 30 }}>SNS 아이디 등 연락처 입력 시 서비스 이용 제한됩니다.</Text>
        </TouchableOpacity>
        <View style={{ borderTopWidth: 1, borderColor: '#eee', marginVertical: 8 }} />
        <ProfileInfo
          title="키"
          content={profile.height}
          metaData={heightKeyName}
          onPress={(obj) => {
            setIsVisible(true);
            setCurrentModal({ ...obj, profileKey: 'height' });
          }}
          placeholder={'선택해주세요'}
        />
        <ProfileInfo
          title="체형"
          content={profile.body_type}
          metaData={meta?.body_types}
          onPress={(obj) => {
            setIsVisible(true);
            setCurrentModal({ ...obj, profileKey: 'body_type' });
          }}
          placeholder={'선택해주세요'}
        />
        <View style={{ borderTopWidth: 1, borderColor: '#eee', marginVertical: 8 }} />
        <ProfileInfo
          title="직장"
          content={profile.company}
          onChangeText={(text) => {
            setProfile({ ...profile, company: text });
          }}
        />
        <ProfileInfo
          title="직업"
          content={profile.job}
          onChangeText={(text) => {
            setProfile({ ...profile, job: text });
          }}
        />
        <ProfileInfo
          title="학력"
          content={profile.education}
          metaData={meta?.educations}
          onPress={(obj) => {
            setIsVisible(true);
            setCurrentModal({ ...obj, profileKey: 'education' });
          }}
          placeholder={'선택해주세요'}
        />
        <ProfileInfo
          title="학교"
          content={profile.school}
          onChangeText={(text) => {
            setProfile({ ...profile, school: text });
          }}
        />
      </KeyboardAwareScrollView>

      {!!currentModal && (
        <ModalEdit
          isVisible={isVisible}
          title={currentModal?.title}
          values={currentModal?.values}
          value={currentModal?.value}
          onPress={(text) => {
            const temp = { ...profile };
            temp[currentModal?.profileKey] = text;
            setProfile(temp);
          }}
          onClose={() => setIsVisible(false)}
        />
      )}
    </>
  );
}

export default ProfileEditScreen;
