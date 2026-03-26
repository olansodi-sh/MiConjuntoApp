import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useReceptionStore } from '../store/reception.store';
import ReceptionCard from '../components/ReceptionCard';
import { GlobalColors } from '../../../theme/global.colors';
import {
  RoboBoldText,
  RoboRegularText,
  RoboMediumText,
} from '../../../components';
import { Package } from '../types/reception.types';

const { width, height } = Dimensions.get('window');

const PackagesTab = () => {
  const {
    packages,
    fetchPackages,
    fetchPackagePhotos,
    isLoading,
    selectedPackagePhotos,
  } = useReceptionStore();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fullscreenVisible, setFullscreenVisible] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const onRefresh = () => {
    fetchPackages();
  };

  const handleOpenDetail = async (pkg: Package) => {
    setSelectedPackage(pkg);
    setModalVisible(true);
    if (pkg.photoCount > 0) {
      await fetchPackagePhotos(pkg.id);
    }
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📦</Text>
      <RoboBoldText size={18} style={styles.emptyTitle}>
        No hay paquetes
      </RoboBoldText>
      <RoboRegularText size={14} style={styles.emptySubtitle}>
        Te avisaremos cuando llegue algo para ti.
      </RoboRegularText>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ReceptionCard
            type="package"
            title={item.description || 'Paquete sin descripción'}
            subtitle={`Recibido por: ${
              item.createdByEmployee?.name || 'Portería'
            }`}
            date={
              item.arrivalTime
                ? new Date(item.arrivalTime).toLocaleDateString()
                : 'N/A'
            }
            isDelivered={item.delivered}
            onPress={() => handleOpenDetail(item)}
          />
        )}
        ListEmptyComponent={!isLoading ? renderEmpty : null}
        contentContainerStyle={[
          styles.listContent,
          !packages || packages.length === 0
            ? { flex: 1, justifyContent: 'center' }
            : {},
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
              <RoboBoldText size={20} style={styles.modalTitle}>
                Detalle del Paquete
              </RoboBoldText>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}
              >
                <RoboBoldText size={18}>✕</RoboBoldText>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.infoSection}>
                <RoboMediumText size={13} style={styles.label}>
                  DESCRIPCIÓN
                </RoboMediumText>
                <RoboBoldText size={17} style={styles.descriptionText}>
                  {selectedPackage?.description || 'Sin descripción'}
                </RoboBoldText>
              </View>

              <View style={styles.row}>
                <View style={styles.col}>
                  <RoboMediumText size={12} style={styles.label}>
                    FECHA LLEGADA
                  </RoboMediumText>
                  <RoboRegularText size={14} style={styles.value}>
                    {selectedPackage?.arrivalTime
                      ? new Date(
                          selectedPackage.arrivalTime,
                        ).toLocaleDateString()
                      : 'N/A'}
                  </RoboRegularText>
                </View>
                <View style={styles.col}>
                  <RoboMediumText size={12} style={styles.label}>
                    HORA LLEGADA
                  </RoboMediumText>
                  <RoboRegularText size={14} style={styles.value}>
                    {selectedPackage?.arrivalTime
                      ? new Date(
                          selectedPackage.arrivalTime,
                        ).toLocaleTimeString()
                      : 'N/A'}
                  </RoboRegularText>
                </View>
              </View>

              <View style={styles.infoSection}>
                <RoboMediumText size={12} style={styles.label}>
                  RECIBIDO POR
                </RoboMediumText>
                <RoboRegularText size={14} style={styles.value}>
                  {selectedPackage?.createdByEmployee?.name}{' '}
                  {selectedPackage?.createdByEmployee?.lastName} (Portería)
                </RoboRegularText>
              </View>

              {selectedPackage?.delivered && (
                <View style={[styles.infoSection, styles.deliveredBox]}>
                  <RoboMediumText
                    size={12}
                    style={[styles.label, { color: GlobalColors.emeraldSoft }]}
                  >
                    ESTADO
                  </RoboMediumText>
                  <RoboBoldText
                    size={14}
                    style={{ color: GlobalColors.emeraldSoft }}
                  >
                    ENTREGADO el{' '}
                    {selectedPackage.deliveredTime
                      ? new Date(
                          selectedPackage.deliveredTime,
                        ).toLocaleDateString()
                      : 'N/A'}
                  </RoboBoldText>
                </View>
              )}

              {selectedPackage?.photoCount && selectedPackage.photoCount > 0 ? (
                <View style={styles.photosSection}>
                  <RoboMediumText
                    size={12}
                    style={[styles.label, { marginBottom: 10 }]}
                  >
                    EVIDENCIA FOTOGRÁFICA ({selectedPackagePhotos.length})
                  </RoboMediumText>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {selectedPackagePhotos.map(photo => (
                      <TouchableOpacity
                        key={photo.id}
                        onPress={() => {
                          setActiveImage(photo.url);
                          setFullscreenVisible(true);
                        }}
                        activeOpacity={0.8}
                      >
                        <Image
                          source={{ uri: photo.url }}
                          style={styles.packageImage}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ))}
                    {selectedPackagePhotos.length === 0 && (
                      <View style={[styles.packageImage, styles.loadingImage]}>
                        <RoboMediumText size={12}>
                          Cargando fotos...
                        </RoboMediumText>
                      </View>
                    )}
                  </ScrollView>
                </View>
              ) : null}

              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
      {/* Fullscreen Viewer */}
      <Modal
        visible={fullscreenVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFullscreenVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.fullscreenOverlay}
          onPress={() => setFullscreenVisible(false)}
        >
          <View style={styles.fullscreenHeader}>
            <TouchableOpacity
              onPress={() => setFullscreenVisible(false)}
              style={styles.fullscreenClose}
            >
              <RoboBoldText size={14} style={styles.fullscreenCloseText}>✕ Cerrar</RoboBoldText>
            </TouchableOpacity>
          </View>
          {activeImage && (
            <Image
              source={{ uri: activeImage }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PackagesTab;

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
  deliveredBox: {
    backgroundColor: GlobalColors.mintLight,
    padding: 15,
    borderRadius: 12,
  },
  photosSection: {
    marginTop: 10,
  },
  packageImage: {
    width: width * 0.7,
    height: 200,
    borderRadius: 16,
    marginRight: 15,
    backgroundColor: GlobalColors.marbleGray,
  },
  loadingImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenHeader: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  fullscreenClose: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  fullscreenCloseText: {
    color: GlobalColors.white,
  },
  fullscreenImage: {
    width: width,
    height: height * 0.8,
  },
});
