import React from 'react';
import { TouchableOpacity, Text, View, FlatList, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';

import { Img } from '../assets/images';
import { Colors } from '../components/styles';
import { KeyName } from '../components/types';

export const ProfileInfo = (props: {
  title: string;
  content: string | number | undefined;
  metaData?: KeyName[];
  onPress?: (obj: { title: string; value: string | number; values: KeyName[] }) => void;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}) => {
  const { title, content, onPress, metaData, placeholder = '입력해주세요', onChangeText } = props;
  const name = metaData ? metaData?.find((i) => i.key === content)?.name : '';
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={() => onPress && onPress({ title, value: content, values: metaData })}
      style={{ flexDirection: 'row', alignItems: 'center', height: 44 }}>
      <Text style={{ width: '35%', paddingLeft: 16, fontSize: 16, color: Colors.Black }}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '65%', paddingRight: 16 }}>
        {onChangeText ? (
          <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={String(content || '')}
            style={{
              flex: 1,
              paddingLeft: 16,
              fontSize: !content ? 14 : 16,
              color: Colors.GlamBlue,
            }}
            clearButtonMode={'while-editing'}
          />
        ) : (
          <Text style={{ paddingLeft: 16, fontSize: !content ? 14 : 16, color: !content ? Colors.Gray2 : onPress ? Colors.GlamBlue : Colors.Black }}>
            {name || content || placeholder}
          </Text>
        )}
        {title === '닉네임' && <FastImage style={{ width: 16, height: 16, marginLeft: 4 }} source={Img.icon.profile_edit.lock} />}
      </View>
    </TouchableOpacity>
  );
};

export const ModalEdit = ({
  isVisible,
  title,
  values,
  value,
  onPress,
  onClose,
}: {
  isVisible: boolean;
  title: string;
  values: KeyName[] | undefined;
  value: string | number;
  onPress: (value: string | number) => void;
  onClose: () => void;
}) => {
  const renderItem = ({ item, index }: { item: KeyName; index: number }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item.key);
          onClose();
        }}
        key={String(item.key)}
        style={{ height: 44, paddingHorizontal: 16, justifyContent: 'center' }}>
        <Text style={{ color: value === item.key ? Colors.GlamBlue : undefined }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal onBackdropPress={onClose} isVisible={isVisible} backdropOpacity={0.4} style={{ marginHorizontal: 50 }}>
      <View style={{ backgroundColor: Colors.White, borderRadius: 12, maxHeight: title === '학력' ? 324 : 412 }}>
        <View
          style={{
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: '#eee',
          }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.Black }}>{title}</Text>
        </View>
        <FlatList
          data={values}
          renderItem={renderItem}
          contentContainerStyle={{ flexGrow: 1 }}
          initialScrollIndex={values?.findIndex((i) => i.key === value)}
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
