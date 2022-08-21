import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BASE_URL, getProfile } from '../api/api';
import { Img } from '../assets/images';
import { Colors, SCREEN_WIDTH } from '../components/styles';
import { Meta, Profile } from '../components/types';
import { ModalBodyType, ModalEducation, ModalHeight, ProfileInfo } from './profileEditComponents';

function ProfileEditScreen(props) {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<Profile>();
  const [meta, setMeta] = useState<Meta>();
  const [isVisibleHeight, setIsVisibleHeight] = useState(false);
  const [isVisibleBodyType, setIsVisibleBodyType] = useState(false);
  const [isVisibleEducation, setIsVisibleEducation] = useState(false);

  useEffect(() => {
    initialFetch();
  }, []);

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
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: Colors.DarkGray1,
              }}>
              더 알아보기
            </Text>
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
          <Text
            style={{
              fontSize: 16,
              color: Colors.Black,
              lineHeight: 35,
            }}>
            소개
          </Text>
          <TextInput
            multiline
            autoCorrect={false}
            placeholder={'회원님의 매력을 간단하게 소개해주세요'}
            onChangeText={(text) => {
              setProfile({ ...profile, introduction: text });
            }}
            value={String(profile.introduction || '')}
            style={{
              fontSize: 14,
              color: profile.introduction ? Colors.GlamBlue : Colors.Black,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              color: Colors.Gray4,
              lineHeight: 30,
            }}>
            SNS 아이디 등 연락처 입력 시 서비스 이용 제한됩니다.
          </Text>
        </TouchableOpacity>
        <View style={{ borderTopWidth: 1, borderColor: '#eee', marginVertical: 8 }} />
        <ProfileInfo
          title="키"
          content={profile.height}
          onPress={() => {
            setIsVisibleHeight(true);
          }}
          placeholder={'선택해주세요'}
        />
        <ProfileInfo
          title="체형"
          content={meta?.body_types?.find((type) => type.key === profile.body_type)?.name}
          onPress={() => {
            setIsVisibleBodyType(true);
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
          content={meta?.educations?.find((edu) => edu.key === profile.education)?.name}
          onPress={() => {
            setIsVisibleEducation(true);
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

      <ModalEducation
        isVisible={isVisibleEducation}
        educations={meta?.educations}
        education={profile.education}
        onPress={(edu) => {
          setProfile({ ...profile, education: edu });
        }}
        onClose={() => setIsVisibleEducation(false)}
      />
      <ModalBodyType
        isVisible={isVisibleBodyType}
        body_types={meta?.body_types}
        body_type={profile.body_type}
        onPress={(type) => {
          setProfile({ ...profile, body_type: type });
        }}
        onClose={() => setIsVisibleBodyType(false)}
      />
      <ModalHeight
        isVisible={isVisibleHeight}
        height_range={meta?.height_range}
        height={profile.height}
        onPress={(num) => {
          setProfile({ ...profile, height: num });
        }}
        onClose={() => setIsVisibleHeight(false)}
      />
    </>
  );
}

export default ProfileEditScreen;
