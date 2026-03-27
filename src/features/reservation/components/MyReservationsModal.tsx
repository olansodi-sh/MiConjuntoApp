
import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { GlobalColors } from '../../../theme/global.colors';
import {
  RoboBoldText,
  RoboRegularText,
  RoboSemiBoldText,
  RoboMediumText,
} from '../../../components';
import { ReservationsApi } from '../api/reservations.api';

const { height, width } = Dimensions.get('window');

interface MyReservationsModalProps {
  visible: boolean;
  onClose: () => void;
  reservations: any[];
  onRefresh?: () => void;
}

const MyReservationsModal = ({
  visible,
  onClose,
  reservations,
  onRefresh,
}: MyReservationsModalProps) => {
  const [selectedResId, setSelectedResId] = useState<string | null>(null);
  const [detail, setDetail] = useState<any | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleOpenDetail = async (id: string) => {
    setSelectedResId(id);
    setShowDetail(true);
    setLoadingDetail(true);
    try {
      const data = await ReservationsApi.getReservationById(id);
      setDetail(data);
    } catch (error) {
      console.error('Error fetching reservation detail:', error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setDetail(null);
    setSelectedResId(null);
  };

  const getStatusColor = (statusName: string) => {
    const name = statusName.toLowerCase();
    if (name.includes('aprob') || name.includes('acept') || name.includes('activ')) return GlobalColors.emeraldSoft;
    if (name.includes('rechaz') || name.includes('cancel')) return GlobalColors.burgundyElegant;
    return GlobalColors.blueElegant;
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.resCard} 
      onPress={() => handleOpenDetail(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.resCardHeader}>
        <RoboSemiBoldText size={16} style={styles.areaName}>
          {item.area?.name || 'Área Común'}
        </RoboSemiBoldText>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status?.name || '') + '20' }]}>
           <RoboMediumText size={11} style={{ color: getStatusColor(item.status?.name || '') }}>
             {item.status?.name?.toUpperCase() || 'PENDIENTE'}
           </RoboMediumText>
        </View>
      </View>
      
      <View style={styles.resCardBody}>
        <RoboRegularText size={14} style={styles.resDate}>
          📅 {item.reservationDate}
        </RoboRegularText>
        <RoboRegularText size={14} style={styles.resTime}>
          ⏰ {item.startTime} - {item.endTime}
        </RoboRegularText>
      </View>
      <RoboRegularText size={12} style={styles.tapToView}>Toca para ver detalles</RoboRegularText>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <RoboBoldText size={20} style={styles.title}>Mis Reservas</RoboBoldText>
            <TouchableOpacity onPress={onClose} style={styles.closeHeaderBtn}>
              <RoboBoldText size={18}>✕</RoboBoldText>
            </TouchableOpacity>
          </View>

          <FlatList
            data={reservations}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <RoboRegularText size={16} style={styles.emptyText}>
                  Aún no tienes reservas realizadas.
                </RoboRegularText>
              </View>
            }
            onRefresh={onRefresh}
            refreshing={false}
          />
        </View>

        {/* Detail View (Nested Modal or Overlay) */}
        {showDetail && (
          <View style={[styles.container, styles.detailContainer]}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleCloseDetail} style={styles.backBtn}>
                <RoboBoldText size={18}>← Volver</RoboBoldText>
              </TouchableOpacity>
              <RoboBoldText size={18} style={styles.title}>Detalle de Reserva</RoboBoldText>
              <View style={{ width: 40 }} />
            </View>

            {loadingDetail ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={GlobalColors.navyDeep} />
                <RoboRegularText style={{ marginTop: 10 }}>Cargando información...</RoboRegularText>
              </View>
            ) : detail ? (
              <ScrollView contentContainerStyle={styles.detailScroll}>
                <View style={styles.detailSection}>
                  <RoboMediumText size={12} style={styles.label}>ÁREA / LUGAR</RoboMediumText>
                  <RoboBoldText size={22} style={styles.valueLarge}>{detail.area?.name}</RoboBoldText>
                </View>

                <View style={styles.statusRow}>
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(detail.status?.name || '') }]} />
                  <RoboSemiBoldText size={16} style={{ color: getStatusColor(detail.status?.name || '') }}>
                    Estado: {detail.status?.name}
                  </RoboSemiBoldText>
                </View>

                <View style={styles.infoGrid}>
                  <View style={styles.infoCol}>
                    <RoboMediumText size={12} style={styles.label}>FECHA</RoboMediumText>
                    <RoboBoldText size={16} style={styles.value}>{detail.reservationDate}</RoboBoldText>
                  </View>
                  <View style={styles.infoCol}>
                    <RoboMediumText size={12} style={styles.label}>HORARIO</RoboMediumText>
                    <RoboBoldText size={16} style={styles.value}>{detail.startTime} - {detail.endTime}</RoboBoldText>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <RoboMediumText size={12} style={styles.label}>TUS NOTAS</RoboMediumText>
                  <View style={styles.notesBox}>
                    <RoboRegularText size={14} style={styles.notesText}>
                      {detail.notesByResident || 'Sin notas adicionales.'}
                    </RoboRegularText>
                  </View>
                </View>

                {detail.notesByAdministrator && (
                  <View style={styles.detailSection}>
                    <RoboMediumText size={12} style={styles.label}>RESPUESTA ADMINISTRACIÓN</RoboMediumText>
                    <View style={[styles.notesBox, styles.adminNotes]}>
                      <RoboRegularText size={14} style={styles.notesText}>
                        {detail.notesByAdministrator}
                      </RoboRegularText>
                    </View>
                  </View>
                )}

                <View style={styles.footerInfo}>
                   <RoboRegularText size={12} style={styles.footerText}>
                     Solicitud creada el {new Date(detail.createdAt).toLocaleDateString()}
                   </RoboRegularText>
                </View>
              </ScrollView>
            ) : (
                <View style={styles.emptyContainer}>
                    <RoboRegularText>No se pudo cargar la información</RoboRegularText>
                </View>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default MyReservationsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    height: height * 0.8,
    backgroundColor: GlobalColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  detailContainer: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.82,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.marbleGray,
  },
  backBtn: {
    paddingVertical: 5,
  },
  title: {
    color: GlobalColors.navyDeep,
  },
  closeHeaderBtn: {
    padding: 5,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  resCard: {
    backgroundColor: GlobalColors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: GlobalColors.marbleGray,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  resCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  areaName: {
    color: GlobalColors.navyDeep,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  resCardBody: {
    flexDirection: 'row',
    gap: 15,
  },
  resDate: {
    color: GlobalColors.charcoalSoft,
  },
  resTime: {
    color: GlobalColors.charcoalSoft,
  },
  tapToView: {
    marginTop: 10,
    color: GlobalColors.gray6,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: GlobalColors.gray8,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailScroll: {
    padding: 25,
    paddingBottom: 60,
  },
  detailSection: {
    marginBottom: 25,
  },
  label: {
    color: GlobalColors.gray8,
    letterSpacing: 1,
    marginBottom: 8,
  },
  valueLarge: {
    color: GlobalColors.navyDeep,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: GlobalColors.marbleGray + '20',
    padding: 15,
    borderRadius: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  infoGrid: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 20,
  },
  infoCol: {
    flex: 1,
    backgroundColor: GlobalColors.blueSoft + '10',
    padding: 15,
    borderRadius: 15,
  },
  value: {
    color: GlobalColors.navyDeep,
  },
  notesBox: {
    backgroundColor: GlobalColors.marbleGray + '30',
    padding: 15,
    borderRadius: 12,
    minHeight: 80,
  },
  adminNotes: {
    backgroundColor: GlobalColors.blueSoft + '20',
    borderLeftWidth: 4,
    borderLeftColor: GlobalColors.blueElegant,
  },
  notesText: {
    color: GlobalColors.charcoalSoft,
    lineHeight: 20,
  },
  footerInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  footerText: {
    color: GlobalColors.gray6,
  }
});
