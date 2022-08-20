import React from 'react';
import {TouchableOpacity, Text, View, FlatList, TextInput} from 'react-native';
import {Colors} from '../components/styles';
import {KeyName} from '../components/types';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {Img} from '../assets/images';

export const ProfileInfo = (props: {
  title: string;
  content: string | number | undefined;
  onPress?: () => void;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
}) => {
  const {
    title,
    content,
    onPress,
    placeholder = '입력해주세요',
    onChangeText,
    editable = false,
  } = props;
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={() => onPress && onPress()}
      style={{flexDirection: 'row', alignItems: 'center', height: 44}}>
      <Text
        style={{
          width: '35%',
          paddingLeft: 16,
          fontSize: 16,
          color: Colors.Black,
        }}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '65%',
          paddingRight: 16,
        }}>
        {placeholder === '입력해주세요' ? (
          <TextInput
            editable={editable}
            autoCorrect={false}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={String(content || '')}
            style={{
              flex: editable ? 1 : undefined,
              paddingLeft: 16,
              fontSize: !content ? 14 : 16,
              color: onPress || editable ? Colors.GlamBlue : Colors.Black,
            }}
            clearButtonMode={'while-editing'}
          />
        ) : (
          <Text
            style={{
              paddingLeft: 16,
              fontSize: !content ? 14 : 16,
              color: !content
                ? Colors.Gray2
                : onPress
                ? Colors.GlamBlue
                : Colors.Black,
            }}>
            {content || placeholder}
            {title === '키' && 'cm'}
          </Text>
        )}

        {title === '닉네임' && (
          <FastImage
            style={{width: 16, height: 16, marginLeft: 4}}
            source={Img.icon.profile_edit.lock}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export const ModalEducation = ({
  isVisible,
  educations,
  education,
  onPress,
  onClose,
}: {
  isVisible: boolean;
  educations: KeyName[] | undefined;
  education: string;
  onPress: (type: string) => void;
  onClose: () => void;
}) => {
  const renderItem = ({item, index}: {item: KeyName; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item.key);
          onClose();
        }}
        key={String(item.key)}
        style={{height: 44, paddingHorizontal: 16, justifyContent: 'center'}}>
        <Text
          style={{color: education === item.key ? Colors.GlamBlue : undefined}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      backdropOpacity={0.4}
      style={{marginHorizontal: 50}}>
      <View
        style={{
          backgroundColor: Colors.White,
          borderRadius: 12,
          maxHeight: 324,
        }}>
        <View
          style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: Colors.Black}}>
            학력
          </Text>
        </View>
        <FlatList
          data={educations}
          renderItem={renderItem}
          contentContainerStyle={{flexGrow: 1}}
          getItemLayout={(data, index) => ({
            length: 44,
            offset: 44 * index,
            index,
          })}
        />
      </View>
    </Modal>
  );
};

export const ModalBodyType = ({
  isVisible,
  body_types,
  body_type,
  onPress,
  onClose,
}: {
  isVisible: boolean;
  body_types: KeyName[] | undefined;
  body_type: string;
  onPress: (type: string) => void;
  onClose: () => void;
}) => {
  const renderItem = ({item, index}: {item: KeyName; index: number}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item.key);
          onClose();
        }}
        key={String(item.key)}
        style={{height: 44, paddingHorizontal: 16, justifyContent: 'center'}}>
        <Text
          style={{color: body_type === item.key ? Colors.GlamBlue : undefined}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      backdropOpacity={0.4}
      style={{marginHorizontal: 50}}>
      <View
        style={{
          backgroundColor: Colors.White,
          borderRadius: 12,
          maxHeight: 412,
        }}>
        <View
          style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: Colors.Black}}>
            체형
          </Text>
        </View>
        <FlatList
          data={body_types}
          renderItem={renderItem}
          contentContainerStyle={{flexGrow: 1}}
          getItemLayout={(data, index) => ({
            length: 44,
            offset: 44 * index,
            index,
          })}
        />
      </View>
    </Modal>
  );
};

export const ModalHeight = ({
  isVisible,
  height_range,
  height,
  onPress,
  onClose,
}: {
  isVisible: boolean;
  height_range: {max: number; min: number} | undefined;
  height: number;
  onPress: (num: number) => void;
  onClose: () => void;
}) => {
  if (!height_range) return <></>;
  const heightArr = Array.from(
    {length: height_range?.max - height_range?.min + 1},
    (v, i) => height_range.min + i,
  );
  const renderItem = ({item, index}: {item: number; index: number}) => {
    const suffix =
      item === heightArr[0]
        ? '이하'
        : item === heightArr[heightArr.length - 1]
        ? '이상'
        : '';
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item);
          onClose();
        }}
        key={String(item)}
        style={{height: 44, paddingHorizontal: 16, justifyContent: 'center'}}>
        <Text style={{color: height === item ? Colors.GlamBlue : undefined}}>
          {item}cm {suffix}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={isVisible}
      backdropOpacity={0.4}
      style={{marginHorizontal: 50}}>
      <View
        style={{
          backgroundColor: Colors.White,
          borderRadius: 12,
          maxHeight: 412,
        }}>
        <View
          style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: Colors.Black}}>
            키
          </Text>
        </View>
        <FlatList
          data={heightArr}
          renderItem={renderItem}
          initialScrollIndex={heightArr.findIndex(i => i === height)}
          getItemLayout={(data, index) => ({
            length: 44,
            offset: 44 * index,
            index,
          })}
        />
      </View>
    </Modal>
  );
};
