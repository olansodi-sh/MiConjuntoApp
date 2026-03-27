
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
import { News } from '../types/news.types';

const { width, height } = Dimensions.get('window');

interface NoticeDetailProps {
  notice: News;
  onBack?: () => void;
}

const NoticeDetailComponent = ({
  notice,
  onBack,
}: NoticeDetailProps) => {
  const categoryLabel = typeof notice.category === 'string'
    ? notice.category
    : (notice.category as any)?.name || 'Noticia';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header / Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: notice.image || 'https://via.placeholder.com/400' }}
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
          <View style={styles.categoryBadge}>
            <RoboSemiBoldText size={12} style={styles.categoryText}>
              {categoryLabel}
            </RoboSemiBoldText>
          </View>
          <RoboRegularText size={13} style={styles.dateText}>
            {notice.date || 'Reciente'}
          </RoboRegularText>
        </View>

        <RoboExtraBoldText size={24} style={styles.title}>
          {notice.title || 'Sin Título'}
        </RoboExtraBoldText>

        {/* Description Section */}
        <View style={styles.section}>
          <RoboRegularText size={16} style={styles.fullDescription}>
            {notice.fullDescription || notice.description || 'Sin descripción detallada disponible.'}
          </RoboRegularText>
        </View>

        <View style={styles.spacer} />
      </View>
    </ScrollView>
  );
};

export default NoticeDetailComponent;

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
    marginBottom: 15,
  },
  title: {
    color: GlobalColors.navyDeep,
    marginBottom: 20,
    lineHeight: 30,
  },
  categoryBadge: {
    backgroundColor: GlobalColors.blueSoft,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: GlobalColors.blueElegant,
    textTransform: 'uppercase',
  },
  dateText: {
    color: GlobalColors.gray8,
  },
  section: {
    marginBottom: 25,
  },
  fullDescription: {
    color: GlobalColors.charcoalSoft,
    lineHeight: 24,
    textAlign: 'justify',
  },
  spacer: {
    height: 60,
  },
});
