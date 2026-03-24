import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/home-stack.navigation';
import {
  RoboExtraBoldText,
  RoboBoldText,
  RoboRegularText,
  RoboSemiBoldText,
} from '../../components';
import { GlobalColors } from '../../theme/global.colors';
import { RouteProp } from '@react-navigation/native';
import React from 'react';

type NoticeDetailRouteProp = RouteProp<HomeStackParamList, 'NoticeDetailScreen'>;
type NoticeDetailNavProp = StackNavigationProp<HomeStackParamList, 'NoticeDetailScreen'>;

interface NoticeDetailScreenProps {
  route: NoticeDetailRouteProp;
  navigation: NoticeDetailNavProp;
}

const { width, height } = Dimensions.get('window');

const NoticeDetailScreen = ({ route, navigation }: NoticeDetailScreenProps) => {
  const { notice } = route.params;

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.white} />
      <SafeAreaView style={styles.safeareaContainer} edges={['top', 'left', 'right']}>
        <View style={styles.mainContainer}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
              <RoboExtraBoldText size={22} style={styles.backArrow}>{'‹  '}</RoboExtraBoldText>
              <RoboRegularText size={15} style={styles.backText}>Atrás</RoboRegularText>
            </TouchableOpacity>
          </View>

          {/* Scrollable content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero Image */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: notice.image }} style={styles.image} resizeMode="cover" />
              <View style={styles.imageBadge}>
                <RoboSemiBoldText size={11} style={styles.imageBadgeText}>
                  {notice.category}
                </RoboSemiBoldText>
              </View>
            </View>

            {/* Title + date */}
            <View style={styles.titleRow}>
              <RoboRegularText size={12} style={styles.date}>
                {notice.date}
              </RoboRegularText>
              <RoboExtraBoldText adjustsFontSizeToFit numberOfLines={3} size={22} style={styles.title}>
                {notice.title}
              </RoboExtraBoldText>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Body */}
            <View style={styles.section}>
              <RoboRegularText size={15} style={styles.body}>
                {notice.fullDescription}
              </RoboRegularText>
            </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default NoticeDetailScreen;

const styles = StyleSheet.create({
  safeareaContainer: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 2,
  },
  backArrow: {
    color: GlobalColors.navyDeep,
    lineHeight: 26,
  },
  backText: {
    color: GlobalColors.navyDeep,
  },
  scrollView: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    width: '90%',
    height: height * 0.28,
    alignSelf: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: GlobalColors.blueSoft,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    backgroundColor: GlobalColors.navyDeep,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  imageBadgeText: {
    color: GlobalColors.white,
  },
  titleRow: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 14,
    gap: 6,
  },
  date: {
    color: GlobalColors.gray8,
  },
  title: {
    color: GlobalColors.navyDeep,
    lineHeight: 30,
  },
  divider: {
    width: '90%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: GlobalColors.gray5,
    marginBottom: 18,
  },
  section: {
    width: '90%',
    alignSelf: 'center',
  },
  body: {
    color: GlobalColors.black3,
    lineHeight: 24,
  },
});
