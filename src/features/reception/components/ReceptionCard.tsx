import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { GlobalColors } from '../../../theme/global.colors';
import { RoboBoldText, RoboRegularText, RoboMediumText } from '../../../components';

interface ReceptionCardProps {
  title: string;
  subtitle: string;
  date: string;
  statusLabel?: string;
  isDelivered?: boolean;
  type: 'package' | 'entry';
  onPress?: () => void;
}

const { width } = Dimensions.get('window');

const ReceptionCard: React.FC<ReceptionCardProps> = ({ title, subtitle, date, statusLabel, isDelivered, type, onPress }) => {
  const isPackage = type === 'package';
  
  return (
    <TouchableOpacity 
      style={styles.cardContainer} 
      onPress={onPress} 
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.contentRow}>
        <View style={[styles.iconContainer, isPackage ? styles.packageIcon : styles.entryIcon]}>
          <RoboBoldText size={20} style={styles.iconText}>
            {isPackage ? '📦' : '👤'}
          </RoboBoldText>
        </View>
        
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <RoboBoldText size={16} style={styles.titleText} numberOfLines={1}>
              {title}
            </RoboBoldText>
            {isPackage ? (
              <View style={[styles.statusBadge, isDelivered ? styles.statusDelivered : styles.statusPending]}>
                <RoboMediumText size={10} style={isDelivered ? styles.statusTextDelivered : styles.statusTextPending}>
                  {isDelivered ? 'ENTREGADO' : 'RECIBIDO'}
                </RoboMediumText>
              </View>
            ) : statusLabel && (
              <View style={[styles.statusBadge, styles.statusEntry]}>
                <RoboMediumText size={10} style={styles.statusTextEntry}>
                  {statusLabel.toUpperCase()}
                </RoboMediumText>
              </View>
            )}
          </View>
          
          <RoboRegularText size={13} style={styles.subtitleText}>
            {subtitle}
          </RoboRegularText>
          
          <View style={styles.footerRow}>
            <RoboRegularText size={11} style={styles.dateText}>
              {date}
            </RoboRegularText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReceptionCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: GlobalColors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: GlobalColors.marbleGray,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  packageIcon: {
    backgroundColor: GlobalColors.blueSoft,
  },
  entryIcon: {
    backgroundColor: GlobalColors.mintLight,
  },
  iconText: {
    color: GlobalColors.navyDeep,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleText: {
    color: GlobalColors.navyDeep,
    flex: 1,
    marginRight: 8,
  },
  subtitleText: {
    color: GlobalColors.charcoalSoft,
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dateText: {
    color: GlobalColors.gray8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusDelivered: {
    backgroundColor: GlobalColors.mintLight,
  },
  statusPending: {
    backgroundColor: GlobalColors.blueSoft,
  },
  statusEntry: {
    backgroundColor: GlobalColors.mintLight,
  },
  statusTextDelivered: {
    color: GlobalColors.emeraldSoft,
  },
  statusTextPending: {
    color: GlobalColors.blueElegant,
  },
  statusTextEntry: {
    color: GlobalColors.emeraldSoft,
  },
});
