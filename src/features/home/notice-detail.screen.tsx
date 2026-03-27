
import { View, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/home-stack.navigation';
import { GlobalColors } from '../../theme/global.colors';
import NoticeDetailComponent from './components/notice-detail.component';

type NoticeDetailRouteProp = RouteProp<HomeStackParamList, 'NoticeDetailScreen'>;

const NoticeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<NoticeDetailRouteProp>();
  const { notice } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <NoticeDetailComponent 
        notice={notice} 
        onBack={handleBack}
      />
    </View>
  );
};

export default NoticeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
});
