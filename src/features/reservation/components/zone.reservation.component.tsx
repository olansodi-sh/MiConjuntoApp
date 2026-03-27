
import { View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GlobalColors } from '../../../theme/global.colors';
import { RoboBoldText, RoboRegularText, RoboSemiBoldText, RoboExtraBoldText } from '../../../components';
import { useAuthStore } from '../../login/store/auth.store';
import { useZonesStore } from '../store/zones.store';
import { ReservationsApi, ReservationStatus } from '../api/reservations.api';
import { ReservationZone } from '../reservation.types';

interface ZoneReservationProps {
  zone: ReservationZone;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ZoneReservationComponent = ({
  zone,
  onSuccess,
  onCancel,
}: ZoneReservationProps) => {
  const { user } = useAuthStore();
  const { fetchZones } = useZonesStore();
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState<ReservationStatus[]>([]);
  
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ success: true, title: '', message: '' });

  const [form, setForm] = useState({
    reservationDate: '',
    startTime: '',
    endTime: '',
    notesByResident: '',
  });

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await ReservationsApi.getStatuses();
        setStatuses(data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };
    fetchStatuses();
  }, []);

  const handleCreate = async () => {
    if (!form.reservationDate || !form.startTime || !form.endTime) {
      showFeedback(false, 'Campos incompletos', 'Todos los campos son obligatorios');
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(form.reservationDate)) {
      showFeedback(false, 'Formato inválido', 'La fecha debe tener formato YYYY-MM-DD');
      return;
    }

    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(form.startTime) || !timeRegex.test(form.endTime)) {
      showFeedback(false, 'Formato inválido', 'Las horas deben tener formato HH:mm');
      return;
    }

    setLoading(true);
    try {
      const pendingStatus =
        statuses.find(
          s =>
            s.name.toLowerCase().includes('pend') ||
            s.name.toLowerCase().includes('solicitado') ||
            s.isActive,
        ) || statuses[0];

      if (!pendingStatus) {
        throw new Error('No se pudo encontrar un estado de reserva válido');
      }

      const payload = {
        residentId: user?.id,
        areaId: zone.id,
        reservationDate: form.reservationDate,
        startTime: form.startTime,
        endTime: form.endTime,
        statusId: pendingStatus.id,
        notesByResident: form.notesByResident,
        notesByAdministrator: '',
      };

      await ReservationsApi.createReservation(payload as any);
      
      // Refresh all data
      await fetchZones();
      
      showFeedback(true, '¡Solicitud Exitosa!', 'Tu reserva ha sido creada y está pendiente de aprobación.');
    } catch (error: any) {
      let errorMsg = 'No se pudo crear la reserva';
      if (error.response?.data) {
        errorMsg = JSON.stringify(error.response.data, null, 2);
      } else if (error.message) {
        errorMsg = error.message;
      }
      showFeedback(false, 'Error en la solicitud', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (success: boolean, title: string, message: string) => {
    setModalContent({ success, title, message });
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalContent.success) {
      onSuccess?.();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView bounces={false} contentContainerStyle={styles.content}>
          <View style={styles.headerInfo}>
            <RoboSemiBoldText size={16} style={styles.zoneName}>
              Area: {zone.name}
            </RoboSemiBoldText>
            {zone.maxCapacity && (
              <RoboRegularText size={14} style={styles.capacityText}>
                Capacidad max: {zone.maxCapacity} personas
              </RoboRegularText>
            )}
          </View>

          <View style={styles.formGroup}>
            <RoboBoldText size={14} style={styles.label}>
              Fecha de la reserva (YYYY-MM-DD)
            </RoboBoldText>
            <TextInput
              style={styles.input}
              placeholder="Ej: 2026-03-28"
              placeholderTextColor={GlobalColors.gray6}
              value={form.reservationDate}
              onChangeText={txt => setForm({ ...form, reservationDate: txt })}
              keyboardType="numbers-and-punctuation"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.inputHalf}>
              <RoboBoldText size={14} style={styles.label}>
                Hora Inicio (00:00)
              </RoboBoldText>
              <TextInput
                style={styles.input}
                placeholder="Ej: 10:30"
                placeholderTextColor={GlobalColors.gray6}
                value={form.startTime}
                onChangeText={txt => setForm({ ...form, startTime: txt })}
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={styles.inputFlex}>
              <RoboBoldText size={14} style={styles.label}>
                Hora Fin (00:00)
              </RoboBoldText>
              <TextInput
                style={styles.input}
                placeholder="Ej: 12:30"
                placeholderTextColor={GlobalColors.gray6}
                value={form.endTime}
                onChangeText={txt => setForm({ ...form, endTime: txt })}
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <RoboBoldText size={14} style={styles.label}>
              Notas o motivos de la reserva
            </RoboBoldText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Escribe aquí tus necesidades..."
              placeholderTextColor={GlobalColors.gray6}
              multiline
              numberOfLines={4}
              value={form.notesByResident}
              onChangeText={txt => setForm({ ...form, notesByResident: txt })}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.disabledButton]}
              onPress={handleCreate}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={GlobalColors.white} />
              ) : (
                <RoboSemiBoldText size={16} style={styles.submitText}>
                  Crear solicitud
                </RoboSemiBoldText>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              disabled={loading}
              activeOpacity={0.5}
            >
              <RoboRegularText size={15} style={styles.cancelText}>
                Regresar
              </RoboRegularText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Modal for Feedback */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.iconContainer, { backgroundColor: modalContent.success ? GlobalColors.emeraldSoft + '20' : GlobalColors.burgundyElegant + '20'}]}>
               <RoboExtraBoldText size={30} style={{ color: modalContent.success ? GlobalColors.emeraldSoft : GlobalColors.burgundyElegant }}>
                   {modalContent.success ? '✓' : '✕'}
               </RoboExtraBoldText>
            </View>
            
            <RoboBoldText size={20} style={styles.modalTitle}>{modalContent.title}</RoboBoldText>
            <RoboRegularText size={14} style={styles.modalMessage}>{modalContent.message}</RoboRegularText>
            
            <TouchableOpacity 
              style={[styles.modalButton, { backgroundColor: modalContent.success ? GlobalColors.navyDeep : GlobalColors.burgundyElegant }]}
              onPress={handleModalClose}
            >
              <RoboSemiBoldText size={16} style={styles.modalButtonText}>Entendido</RoboSemiBoldText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ZoneReservationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.white,
  },
  content: {
    padding: 20,
    backgroundColor: GlobalColors.white,
  },
  headerInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: GlobalColors.blueSoft,
    borderRadius: 12,
  },
  zoneName: {
    color: GlobalColors.navyDeep,
    textTransform: 'capitalize',
  },
  capacityText: {
    color: GlobalColors.blueElegant,
    marginTop: 4,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: GlobalColors.navyDeep,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: GlobalColors.marbleGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: GlobalColors.navyDeep,
    backgroundColor: GlobalColors.marbleGray + '20',
  },
  inputHalf: {
    marginBottom: 20,
    flex: 1,
    marginRight: 10,
  },
  inputFlex: {
    marginBottom: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  buttonsContainer: {
    marginTop: 20,
    gap: 12,
  },
  submitButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: GlobalColors.navyDeep,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: GlobalColors.navyDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitText: {
    color: GlobalColors.white,
  },
  cancelButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: GlobalColors.charcoalSoft,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: GlobalColors.white,
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: GlobalColors.navyDeep,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    color: GlobalColors.charcoalSoft,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  modalButton: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: GlobalColors.white,
  }
});
