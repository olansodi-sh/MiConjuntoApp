import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { GlobalColors } from '../../../theme/global.colors';
import {
  RoboBoldText,
  RoboRegularText,
  RoboExtraBoldText,
  RoboSemiBoldText,
} from '../../../components';

const { width, height } = Dimensions.get('window');

interface ZoneDetailProps {
  zone: any;
  isReservable: boolean;
  onReserve?: () => void;
  onBack?: () => void;
}

const ZoneDetailComponent = ({
  zone,
  isReservable,
  onBack,
}: ZoneDetailProps) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header / Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../public/images/loginBackground.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <RoboBoldText size={18} style={styles.backButtonText}>
            ←
          </RoboBoldText>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.headerInfo}>
          <RoboExtraBoldText size={24} style={styles.title}>
            {zone.name}
          </RoboExtraBoldText>
          {zone.phase && (
            <View style={styles.phaseBadge}>
              <RoboSemiBoldText size={12} style={styles.phaseText}>
                {zone.phase}
              </RoboSemiBoldText>
            </View>
          )}
        </View>

        {/* Main Information */}
        <View style={styles.infoRow}>
          {isReservable && zone.maxCapacity && (
            <View style={styles.infoItem}>
              <RoboBoldText size={14} style={styles.infoLabel}>
                Capacidad Máxima
              </RoboBoldText>
              <RoboRegularText size={16} style={styles.infoValue}>
                {zone.maxCapacity} personas
              </RoboRegularText>
            </View>
          )}
          {zone.isActive !== undefined && (
            <View style={styles.infoItem}>
              <RoboBoldText size={14} style={styles.infoLabel}>
                Estado
              </RoboBoldText>
              <RoboRegularText
                size={16}
                style={[
                  styles.infoValue,
                  {
                    color: zone.isActive
                      ? GlobalColors.emeraldSoft
                      : GlobalColors.burgundyElegant,
                  },
                ]}
              >
                {zone.isActive ? 'Disponible' : 'No disponible'}
              </RoboRegularText>
            </View>
          )}
        </View>

        {/* DescriptionSection */}
        {zone.description && (
          <View style={styles.section}>
            <RoboBoldText size={18} style={styles.sectionTitle}>
              Descripción
            </RoboBoldText>
            <RoboRegularText size={15} style={styles.description}>
              {zone.description}
            </RoboRegularText>
          </View>
        )}

        {/* Rules Section (Example) */}
        {zone.rules && zone.rules.length > 0 && (
          <View style={styles.section}>
            <RoboBoldText size={18} style={styles.sectionTitle}>
              Normas de uso
            </RoboBoldText>
            {zone.rules.map((rule: string, index: number) => (
              <View key={index} style={styles.ruleItem}>
                <RoboRegularText size={14} style={styles.ruleText}>
                  • {rule}
                </RoboRegularText>
              </View>
            ))}
          </View>
        )}

        <View style={styles.spacer} />
      </View>
    </ScrollView>
  );
};

export default ZoneDetailComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  imageContainer: {
    width: width,
    height: height * 0.4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButtonText: {
    color: GlobalColors.navyDeep,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: GlobalColors.navyDeep,
    textTransform: 'capitalize',
    flex: 1,
  },
  phaseBadge: {
    backgroundColor: GlobalColors.blueSoft,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  phaseText: {
    color: GlobalColors.blueElegant,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    backgroundColor: GlobalColors.white,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GlobalColors.marbleGray,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    color: GlobalColors.gray8,
    marginBottom: 4,
  },
  infoValue: {
    color: GlobalColors.navyDeep,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: GlobalColors.navyDeep,
    marginBottom: 10,
  },
  description: {
    color: GlobalColors.charcoalSoft,
    lineHeight: 22,
  },
  ruleItem: {
    marginBottom: 6,
  },
  ruleText: {
    color: GlobalColors.charcoalSoft,
  },
  spacer: {
    height: 100,
  },
});
