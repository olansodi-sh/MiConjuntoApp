import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/home-stack.navigation';
import {
  RoboExtraBoldText,
  RoboBoldText,
  RoboRegularText,
  RoboSemiBoldText,
} from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalColors } from '../../theme/global.colors';
import { RouteProp } from '@react-navigation/native';
import React from 'react';

type ShowZoneDetailsRouteProp = RouteProp<HomeStackParamList, 'ShowZoneDetailsScreen'>;
type ShowZoneDetailsNavProp = StackNavigationProp<HomeStackParamList, 'ShowZoneDetailsScreen'>;

interface ShowZoneDetailsScreenProps {
  route: ShowZoneDetailsRouteProp;
  navigation: ShowZoneDetailsNavProp;
}

const { width, height } = Dimensions.get('window');

const ShowZoneDetailsScreen = ({ route, navigation }: ShowZoneDetailsScreenProps) => {
  const { zone, isReservable } = route.params;

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
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: zone.image }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            {/* Name + badge */}
            <View style={styles.nameRow}>
              <RoboExtraBoldText
                adjustsFontSizeToFit
                numberOfLines={2}
                size={22}
                style={styles.zoneName}
              >
                {zone.name}
              </RoboExtraBoldText>
              {isReservable && (
                <View style={styles.reservableBadge}>
                  <RoboSemiBoldText size={11} style={styles.reservableBadgeText}>
                    Reservable
                  </RoboSemiBoldText>
                </View>
              )}
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Description */}
            <View style={styles.section}>
              <RoboSemiBoldText size={15} style={styles.sectionLabel}>
                Descripción
              </RoboSemiBoldText>
              <RoboRegularText size={14} style={styles.descriptionText}>
                {zone.description}
              </RoboRegularText>
            </View>

            {/* Rules */}
            {zone.rules.length > 0 && (
              <View style={styles.section}>
                <RoboSemiBoldText size={15} style={styles.sectionLabel}>
                  Reglas
                </RoboSemiBoldText>
                {zone.rules.map((rule, index) => (
                  <View key={index} style={styles.ruleRow}>
                    <View style={styles.ruleDot} />
                    <RoboRegularText size={14} style={styles.ruleText}>
                      {rule}
                    </RoboRegularText>
                  </View>
                ))}
              </View>
            )}

            {/* Bottom spacing for CTA */}
            {isReservable && <View style={{ height: 90 }} />}
          </ScrollView>

          {/* CTA Reservar — solo si es reservable */}

        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default ShowZoneDetailsScreen;

const styles = StyleSheet.create({
  safeareaContainer: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  mainContainer: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: GlobalColors.white,
  },
  header: {
    width: '90%',
    alignSelf: 'flex-start',
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
  },
  scrollContent: {
    paddingBottom: 20,
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
  nameRow: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  zoneName: {
    color: GlobalColors.navyDeep,
    flex: 1,
  },
  reservableBadge: {
    backgroundColor: GlobalColors.mintLight,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  reservableBadgeText: {
    color: GlobalColors.emeraldSoft,
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
    marginBottom: 20,
    gap: 8,
  },
  sectionLabel: {
    color: GlobalColors.navyDeep,
  },
  descriptionText: {
    color: GlobalColors.black3,
    lineHeight: 22,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  ruleDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: GlobalColors.navyDeep,
    marginTop: 7,
  },
  ruleText: {
    color: GlobalColors.black3,
    flex: 1,
    lineHeight: 22,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: 16,
    backgroundColor: GlobalColors.white,
    borderTopWidth: 1,
    borderTopColor: GlobalColors.gray5,
  },
  ctaButton: {
    width: '100%',
    height: height * 0.065,
    borderRadius: 14,
    backgroundColor: GlobalColors.navyDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: GlobalColors.white,
  },
});
