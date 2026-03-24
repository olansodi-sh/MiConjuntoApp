import React from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/home-stack.navigation';
import { GlobalColors } from '../../theme/global.colors';
import RoboExtraBoldText from '../../components/texts/robo-extrabold.text';
import RoboBoldText from '../../components/texts/robo-bold.text';
import RoboRegularText from '../../components/texts/robo-regular.text';
import RoboMediumText from '../../components/texts/robo-medium.text';

type NoticeDetailRouteProp = RouteProp<HomeStackParamList, 'NoticeDetailScreen'>;

const { width, height } = Dimensions.get('window');

const NoticeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<NoticeDetailRouteProp>();
  const { notice } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.cream} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.7}>
          <RoboMediumText size={15} style={styles.backText}>
            ← Atrás
          </RoboMediumText>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: notice.image }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.imageBadge}>
            <RoboMediumText size={11} style={styles.imageBadgeText}>
              {notice.category}
            </RoboMediumText>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <RoboRegularText size={12} style={styles.date}>
            {notice.date}
          </RoboRegularText>

          <RoboExtraBoldText size={22} style={styles.title}>
            {notice.title}
          </RoboExtraBoldText>

          <View style={styles.divider} />

          <RoboRegularText size={15} style={styles.body}>
            {notice.fullDescription}
          </RoboRegularText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoticeDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  header: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 12,
    backgroundColor: GlobalColors.cream,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backText: {
    color: GlobalColors.blueElegant,
  },
  scrollContent: {
    paddingBottom: height * 0.05,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.28,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute',
    bottom: 14,
    left: width * 0.05,
    backgroundColor: GlobalColors.navyDeep,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  imageBadgeText: {
    color: GlobalColors.white,
  },
  content: {
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
  },
  date: {
    color: GlobalColors.gray8,
    marginBottom: 8,
  },
  title: {
    color: GlobalColors.navyDeep,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  divider: {
    height: 1,
    backgroundColor: GlobalColors.marbleGray,
    marginVertical: 18,
  },
  body: {
    color: GlobalColors.charcoalSoft,
    lineHeight: 24,
  },
});
