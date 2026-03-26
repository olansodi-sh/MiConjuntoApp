import { View, FlatList, RefreshControl, StyleSheet, Text, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useReceptionStore } from '../store/reception.store';
import ReceptionCard from '../components/ReceptionCard';
import { GlobalColors } from '../../../theme/global.colors';
import { RoboBoldText, RoboRegularText, RoboMediumText } from '../../../components';
import { AccessAudit } from '../types/reception.types';

const { width, height } = Dimensions.get('window');

const EntriesTab = () => {
  const { accessLogs, fetchAccessLogs, isLoading } = useReceptionStore();
  const [selectedEntry, setSelectedEntry] = useState<AccessAudit | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAccessLogs();
  }, []);

  const onRefresh = () => {
    fetchAccessLogs();
  };

  const handleOpenDetail = (entry: AccessAudit) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>👤</Text>
      <RoboBoldText size={18} style={styles.emptyTitle}>Sin ingresos recientes</RoboBoldText>
      <RoboRegularText size={14} style={styles.emptySubtitle}>
        Aquí aparecerán las personas que te visiten.
      </RoboRegularText>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={accessLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReceptionCard
            type="entry"
            title={item.visitor?.name ? `${item.visitor.name} ${item.visitor.lastName}` : 'Visitante'}
            subtitle={`Ingreso: ${item.entryTime ? new Date(item.entryTime).toLocaleTimeString() : 'N/A'}`}
            date={item.entryTime ? new Date(item.entryTime).toLocaleDateString() : 'N/A'}
            statusLabel={item.authorizedByEmployee ? 'Autorizado' : undefined}
            onPress={() => handleOpenDetail(item)}
          />
        )}
        ListEmptyComponent={!isLoading ? renderEmpty : null}
        contentContainerStyle={[
          styles.listContent,
          !accessLogs || accessLogs.length === 0 ? { flex: 1, justifyContent: 'center' } : {}
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={[GlobalColors.navyDeep]}
          />
        }
      />

      {/* Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <RoboBoldText size={20} style={styles.modalTitle}>Detalle de Ingreso</RoboBoldText>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <RoboBoldText size={18}>✕</RoboBoldText>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.infoSection}>
                <RoboMediumText size={13} style={styles.label}>VISITANTE</RoboMediumText>
                <RoboBoldText size={17} style={styles.descriptionText}>
                  {selectedEntry?.visitor?.name} {selectedEntry?.visitor?.lastName}
                </RoboBoldText>
                {selectedEntry?.visitor?.document && (
                  <RoboRegularText size={14} style={styles.value}>
                    DOC: {selectedEntry.visitor.document}
                  </RoboRegularText>
                )}
              </View>

              <View style={styles.row}>
                <View style={styles.col}>
                  <RoboMediumText size={12} style={styles.label}>FECHA INGRESO</RoboMediumText>
                  <RoboRegularText size={14} style={styles.value}>
                    {selectedEntry?.entryTime ? new Date(selectedEntry.entryTime).toLocaleDateString() : 'N/A'}
                  </RoboRegularText>
                </View>
                <View style={styles.col}>
                  <RoboMediumText size={12} style={styles.label}>HORA INGRESO</RoboMediumText>
                  <RoboRegularText size={14} style={styles.value}>
                    {selectedEntry?.entryTime ? new Date(selectedEntry.entryTime).toLocaleTimeString() : 'N/A'}
                  </RoboRegularText>
                </View>
              </View>

              {selectedEntry?.exitTime && (
                <View style={styles.infoSection}>
                  <RoboMediumText size={12} style={styles.label}>HORA SALIDA</RoboMediumText>
                  <RoboRegularText size={14} style={styles.value}>
                    {new Date(selectedEntry.exitTime).toLocaleTimeString()}
                  </RoboRegularText>
                </View>
              )}

              {selectedEntry?.vehicle && (
                <View style={styles.infoSection}>
                  <RoboMediumText size={12} style={styles.label}>VEHÍCULO</RoboMediumText>
                  <RoboBoldText size={14} style={styles.value}>
                    Placa: {selectedEntry.vehicle.plate}
                  </RoboBoldText>
                </View>
              )}

              <View style={styles.infoSection}>
                <RoboMediumText size={12} style={styles.label}>AUTORIZADO POR</RoboMediumText>
                <RoboRegularText size={14} style={styles.value}>
                  {selectedEntry?.authorizedByEmployee?.name} {selectedEntry?.authorizedByEmployee?.lastName}
                </RoboRegularText>
              </View>

              {selectedEntry?.notes && (
                <View style={styles.notesBox}>
                  <RoboMediumText size={12} style={styles.label}>NOTAS / OBSERVACIONES</RoboMediumText>
                  <RoboRegularText size={14} style={styles.value}>
                    {selectedEntry.notes}
                  </RoboRegularText>
                </View>
              )}

              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EntriesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  listContent: {
    paddingVertical: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 20,
    opacity: 0.3,
  },
  emptyTitle: {
    color: GlobalColors.navyDeep,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: GlobalColors.charcoalSoft,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: GlobalColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 20,
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    color: GlobalColors.navyDeep,
  },
  closeBtn: {
    padding: 10,
  },
  infoSection: {
    marginBottom: 20,
  },
  label: {
    color: GlobalColors.gray8,
    letterSpacing: 1,
    marginBottom: 4,
  },
  descriptionText: {
    color: GlobalColors.navyDeep,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  col: {
    flex: 1,
  },
  value: {
    color: GlobalColors.charcoalSoft,
  },
  notesBox: {
    backgroundColor: GlobalColors.blueSoft,
    padding: 15,
    borderRadius: 12,
  }
});
