import { View, Image, TouchableOpacity, StyleSheet, StatusBar, Dimensions, Modal, Pressable } from 'react-native';
import RoboExtraBoldText from '../../components/texts/robo-extrabold.text';
import RoboSemiBoldText from '../../components/texts/robo-semibold.text';
import RoboRegularText from '../../components/texts/robo-regular.text';
import RoboMediumText from '../../components/texts/robo-medium.text';
import RoboBoldText from '../../components/texts/robo-bold.text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalColors } from '../../theme/global.colors';
import React, { useState } from 'react';
import { useAuthStore } from '../login/store/auth.store';

const { width, height } = Dimensions.get('window');

const DUMMY_USER = {
  name: 'Carlos Andrés Mejía',
  document: '1.023.456.789',
  email: 'carlos.mejia@email.com',
  phone: '+57 311 456 7890',
  torre: '3',
  apto: '302',
  upToDate: true,
  initials: 'CM',
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <RoboRegularText size={13} style={styles.infoLabel}>
      {label}
    </RoboRegularText>
    <RoboMediumText size={14} style={styles.infoValue}>
      {value}
    </RoboMediumText>
  </View>
);

const ProfileScreen = () => {
  const [qrVisible, setQrVisible] = useState(false);
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Ignored
    }
  };

  // Helper to get consistent display data
  const profileData = {
    name: user ? `${user.name} ${user.lastName}` : 'Usuario',
    email: (user?.type === 'resident' ? (user as any)?.email : (user as any)?.username) || 'N/A',
    document: (user as any)?.document || 'N/A',
    torre: (user as any)?.torre || (user as any)?.residentTypeLabel || 'N/A',
    apto: (user as any)?.apto || 'N/A',
    initials: (user?.name?.charAt(0) || '') + (user?.lastName?.charAt(0) || 'U'),
    upToDate: true, // This could come from API in the future
  };

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.cream} />
      <SafeAreaView style={styles.safeareaContainer} edges={['top', 'left', 'right']}>
      <View style ={{...styles.mainContainer}}>
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <View style={styles.titleWrapper}>
                <RoboExtraBoldText adjustsFontSizeToFit numberOfLines={1} size={25} style={styles.titleText}>
                  Mi Perfil
                </RoboExtraBoldText>
                <RoboRegularText size={15} numberOfLines={2} style={styles.subtitleText}>
                  Consulta y gestiona tu información
                </RoboRegularText>
              </View>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <RoboBoldText size={12} style={styles.logoutText}>SALIR</RoboBoldText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 8.5, backgroundColor: GlobalColors.cream}}>
            <View style={styles.avatarSection}>
              <View style={styles.avatarCircle}>
                <RoboExtraBoldText size={32} style={styles.avatarInitials}>
                  {profileData.initials}
                </RoboExtraBoldText>
              </View>
 
              <RoboBoldText size={20} style={styles.userName}>
                {profileData.name}
              </RoboBoldText>
 
              <RoboRegularText size={14} style={styles.userLocation}>
                {user?.type === 'resident' ? `Torre ${profileData.torre} · Apto ${profileData.apto}` : profileData.torre}
              </RoboRegularText>
 
              <View style={[styles.statusBadge, profileData.upToDate ? styles.statusGreen : styles.statusRed]}>
                <RoboSemiBoldText size={12} style={profileData.upToDate ? styles.statusTextGreen : styles.statusTextRed}>
                  {profileData.upToDate ? '✓  Al día con administración' : '✗  Pendiente de pago'}
                </RoboSemiBoldText>
              </View> 
            </View>

            <View style={styles.infoCard}>
              <RoboBoldText size={13} style={styles.sectionLabel}>
                INFORMACIÓN PERSONAL
              </RoboBoldText>
              <View style={styles.divider} />
              <InfoRow label="Documento" value={profileData.document} />
              <View style={styles.rowSeparator} />
              <InfoRow label="Email" value={profileData.email} />
              <View style={styles.rowSeparator} />
              <InfoRow label="Tipo" value={user?.type === 'employee' ? 'Empleado' : 'Residente'} />
            </View>

            <View style={styles.infoCard}>
              <RoboBoldText size={13} style={styles.sectionLabel}>
                RESIDENCIA
              </RoboBoldText>
              <View style={styles.divider} />
              <InfoRow label="Torre" value={`Torre ${DUMMY_USER.torre}`} />
              <View style={styles.rowSeparator} />
              <InfoRow label="Apartamento" value={`Apto ${DUMMY_USER.apto}`} />
            </View>

            <TouchableOpacity style={styles.qrButton} onPress={() => setQrVisible(true)} activeOpacity={0.85}>
              <RoboSemiBoldText size={16} style={styles.qrButtonText}>
                Mi QR
              </RoboSemiBoldText>
            </TouchableOpacity>
          </View>
      </View>

        {/* QR Modal */}
        <Modal
          visible={qrVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setQrVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setQrVisible(false)}>
            <Pressable style={styles.modalCard} onPress={() => {}}>
              <RoboBoldText size={18} style={styles.modalTitle}>
                Mi Código QR
              </RoboBoldText>
              <RoboRegularText size={13} style={styles.modalSubtitle}>
                Presenta este código en portería para tu identificación
              </RoboRegularText>

              <View style={styles.qrContainer}>
                <Image source={require('../../../public/images/myQR.png')} style={styles.qrImage} resizeMode="contain" />
              </View>

              <RoboMediumText size={13} style={styles.modalName}>
                {DUMMY_USER.name}
              </RoboMediumText>
              <RoboRegularText size={12} style={styles.modalApto}>
                Torre {DUMMY_USER.torre} · Apto {DUMMY_USER.apto}
              </RoboRegularText>

              <TouchableOpacity style={styles.closeButton} onPress={() => setQrVisible(false)} activeOpacity={0.8}>
                <RoboSemiBoldText size={14} style={styles.closeButtonText}>
                  Cerrar
                </RoboSemiBoldText>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeareaContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  mainContainer: {
    flex: 1, 
    backgroundColor: GlobalColors.cream
  },
  titleContainer: {
    flex: 1.5,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    alignSelf: 'center',
    color: GlobalColors.navyDeep,
  },
  subtitleText: {
    width: '90%',
    marginTop: '3%',
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    color: GlobalColors.charcoalSoft,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalColors.navyDeep,
    shadowColor: GlobalColors.navyDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  avatarInitials: {
    letterSpacing: 1,
    color: GlobalColors.white,
  },
  userName: {
    marginBottom: 4,
    textAlign: 'center',
    color: GlobalColors.navyDeep,
  },
  userLocation: {
    marginBottom: 14,
    color: GlobalColors.gray8,
  },
  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  statusGreen: {
    backgroundColor: GlobalColors.mintLight,
  },
  statusRed: {
    backgroundColor: GlobalColors.blushElegant,
  },
  statusTextGreen: {
    color: GlobalColors.emeraldSoft,
  },
  statusTextRed: {
    color: GlobalColors.burgundyElegant,
  },
  infoCard: {
    marginBottom: 14,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginHorizontal: width * 0.05,
    shadowColor: GlobalColors.navyDeep,
    backgroundColor: GlobalColors.white,
    borderColor: GlobalColors.marbleGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
  },
  sectionLabel: {
    marginBottom: 10,
    letterSpacing: 0.8,
    color: GlobalColors.gray8,
  },
  divider: {
    height: 1,
    marginBottom: 12,
    backgroundColor: GlobalColors.marbleGray,
  },
  infoRow: {
    paddingVertical: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: GlobalColors.gray8,
  },
  infoValue: {
    flexShrink: 1,
    marginLeft: 12,
    textAlign: 'right',
    color: GlobalColors.navyDeep,
  },
  rowSeparator: {
    height: 1,
    marginVertical: 6,
    backgroundColor: GlobalColors.gray5,
  },
  qrButton: {
    borderRadius: 14,
    alignItems: 'center',
    height: height * 0.06,
    justifyContent: 'center',
    marginHorizontal: width * 0.05,
    shadowColor: GlobalColors.navyDeep,
    backgroundColor: GlobalColors.navyDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  qrButtonText: {
    letterSpacing: 0.5,
    color: GlobalColors.white,
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCard: {
    padding: 28,
    borderRadius: 24,
    width: width * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: GlobalColors.white,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    marginBottom: 6,
    color: GlobalColors.navyDeep,
  },
  modalSubtitle: {
    lineHeight: 18,
    marginBottom: 22,
    textAlign: 'center',
    color: GlobalColors.gray8,
  },
  qrContainer: {
    borderRadius: 12,
    width: width * 0.55,
    alignItems: 'center',
    height: width * 0.5,
    justifyContent: 'center',
    shadowColor: GlobalColors.navyDeep,
    backgroundColor: GlobalColors.white,
    borderColor: GlobalColors.marbleGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
  },
  qrImage: {
    width: '88%',
    height: '88%',
  },
  modalName: {
    marginBottom: 3,
    color: GlobalColors.navyDeep,
  },
  modalApto: {
    marginBottom: 22,
    color: GlobalColors.gray8,
  },
  closeButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: GlobalColors.blueSoft,
  },
  closeButtonText: {
    color: GlobalColors.blueElegant,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flex: 1.5,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: GlobalColors.blushElegant,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: {
    color: GlobalColors.burgundyElegant,
    letterSpacing: 1,
  },
});
