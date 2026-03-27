import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
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
  const { user, myApartments, logout } = useAuthStore();

  const mainApartment =
    myApartments && myApartments.length > 0 ? myApartments[0].apartment : null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
  };

  const profileData = {
    name: user ? `${user.name} ${user.lastName}` : 'Usuario',
    email:
      (user?.type === 'resident'
        ? (user as any)?.email
        : (user as any)?.username) || 'N/A',
    document: (user as any)?.document || 'N/A',
    torre: mainApartment?.towerData?.name || 'N/A',
    apto: mainApartment?.number || 'N/A',
    floor:
      mainApartment?.floor !== undefined
        ? mainApartment.floor.toString()
        : 'N/A',
    initials:
      (user?.name?.charAt(0) || '') + (user?.lastName?.charAt(0) || 'U'),
    upToDate: true,
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.cream} />

      <SafeAreaView
        style={styles.safeareaContainer}
        edges={['top', 'left', 'right']}
      >
        <View style={styles.mainContainer}>
          {/* HEADER (sin flex) */}
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <View style={styles.titleWrapper}>
                <RoboExtraBoldText
                  numberOfLines={1}
                  size={25}
                  style={styles.titleText}
                >
                  Mi Perfil
                </RoboExtraBoldText>
                <RoboRegularText
                  size={15}
                  numberOfLines={2}
                  style={styles.subtitleText}
                >
                  Consulta y gestiona tu información
                </RoboRegularText>
              </View>

              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <RoboBoldText size={12} style={styles.logoutText}>
                  SALIR
                </RoboBoldText>
              </TouchableOpacity>
            </View>
          </View>

          {/* CONTENIDO */}
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
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
                {user?.type === 'resident'
                  ? `${profileData.torre} · Apto ${profileData.apto} · Piso ${profileData.floor}`
                  : profileData.torre}
              </RoboRegularText>

              <View
                style={[
                  styles.statusBadge,
                  profileData.upToDate ? styles.statusGreen : styles.statusRed,
                ]}
              >
                <RoboSemiBoldText
                  size={12}
                  style={
                    profileData.upToDate
                      ? styles.statusTextGreen
                      : styles.statusTextRed
                  }
                >
                  {profileData.upToDate
                    ? '✓  Al día con administración'
                    : '✗  Pendiente de pago'}
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
              <InfoRow
                label="Tipo"
                value={user?.type === 'employee' ? 'Empleado' : 'Residente'}
              />
            </View>

            {myApartments?.map((item, index) => (
              <View key={item.id} style={styles.infoCard}>
                <RoboBoldText size={13} style={styles.sectionLabel}>
                  RESIDENCIA {myApartments.length > 1 ? `#${index + 1}` : ''}
                </RoboBoldText>
                <View style={styles.divider} />
                <InfoRow
                  label="Torre"
                  value={item.apartment?.towerData?.name || 'N/A'}
                />
                <View style={styles.rowSeparator} />
                <InfoRow
                  label="Piso"
                  value={item.apartment?.floor?.toString() || 'N/A'}
                />
                <View style={styles.rowSeparator} />
                <InfoRow
                  label="Apartamento"
                  value={item.apartment?.number || 'N/A'}
                />
              </View>
            ))}

            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => setQrVisible(true)}
            >
              <RoboSemiBoldText size={16} style={styles.qrButtonText}>
                Mi QR
              </RoboSemiBoldText>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </ScrollView>
        </View>

        {/* MODAL QR */}
        <Modal visible={qrVisible} transparent animationType="fade">
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setQrVisible(false)}
          >
            <Pressable style={styles.modalCard}>
              <RoboBoldText size={18} style={styles.modalTitle}>
                Mi Código QR
              </RoboBoldText>

              <View style={styles.qrContainer}>
                <Image
                  source={require('../../../public/images/myQR.png')}
                  style={styles.qrImage}
                />
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setQrVisible(false)}
              >
                <RoboSemiBoldText size={14} style={styles.closeButtonText}>
                  Cerrar
                </RoboSemiBoldText>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </>
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
  },

  // ✅ FIX AQUÍ
  headerContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 16,
    justifyContent: 'center',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },

  titleText: {
    color: GlobalColors.navyDeep,
  },
  subtitleText: {
    marginTop: 4,
    color: GlobalColors.charcoalSoft,
  },

  logoutButton: {
    backgroundColor: GlobalColors.blushElegant,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  logoutText: {
    color: GlobalColors.burgundyElegant,
  },

  avatarSection: {
    alignItems: 'center',
    paddingVertical: height * 0.03,
  },

  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalColors.navyDeep,
  },

  avatarInitials: {
    color: GlobalColors.white,
  },

  userName: {
    marginTop: 10,
    color: GlobalColors.navyDeep,
  },

  userLocation: {
    marginBottom: 10,
    color: GlobalColors.gray8,
  },

  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },

  statusGreen: {
    backgroundColor: GlobalColors.mintLight,
  },

  statusTextGreen: {
    color: GlobalColors.emeraldSoft,
  },

  infoCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: GlobalColors.white,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoLabel: {
    color: GlobalColors.gray8,
  },

  infoValue: {
    color: GlobalColors.navyDeep,
  },

  qrButton: {
    margin: 16,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: GlobalColors.navyDeep,
  },

  qrButtonText: {
    color: GlobalColors.white,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalCard: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  qrContainer: {
    width: 200,
    height: 200,
  },

  qrImage: {
    width: '100%',
    height: '100%',
  },

  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: GlobalColors.blueSoft,
    borderRadius: 10,
  },

  closeButtonText: {
    color: GlobalColors.blueElegant,
  },
});
