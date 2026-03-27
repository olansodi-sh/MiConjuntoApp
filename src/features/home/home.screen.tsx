import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { HomeStackParamList } from '../../navigation/home-stack.navigation';
import RoboExtraBoldText from '../../components/texts/robo-extrabold.text';
import RoboSemiBoldText from '../../components/texts/robo-semibold.text';
import RoboRegularText from '../../components/texts/robo-regular.text';
import RoboMediumText from '../../components/texts/robo-medium.text';
import RoboBoldText from '../../components/texts/robo-bold.text';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { GlobalColors } from '../../theme/global.colors';
import React, { useEffect } from 'react';
import { useNewsStore } from './store/news.store';
import { News } from './types/news.types';

type HomeNavProp = StackNavigationProp<HomeStackParamList>;

const { width } = Dimensions.get('window');

const CategoryBadge = ({
  label,
  color = GlobalColors.blueSoft,
  textColor = GlobalColors.blueElegant,
}: {
  label: string;
  color?: string;
  textColor?: string;
}) => (
  <View style={[styles.badge, { backgroundColor: color }]}>
    <RoboMediumText size={10} style={[styles.badgeText, { color: textColor }]}>
      {label}
    </RoboMediumText>
  </View>
);

const NoticeCard = ({ item }: { item: News }) => {
  const navigation = useNavigation<HomeNavProp>();

  // Determine badge color based on category
  const getCategoryStyles = (category?: string | any) => {
    // If it's an object (common in some APIs), try to get the name property
    const name = typeof category === 'string' 
      ? category 
      : category?.name || '';

    if (!name || typeof name !== 'string')
      return { bg: GlobalColors.blueSoft, text: GlobalColors.blueElegant };

    const lowerName = name.toLowerCase();

    switch (lowerName) {
      case 'mantenimiento':
        return { bg: '#FFF4E5', text: '#B76E00' };
      case 'reuniones':
        return { bg: '#EBF5FF', text: '#0055CC' };
      case 'seguridad':
        return { bg: '#FFEBEB', text: '#CC0000' };
      case 'servicios':
        return { bg: '#E8F5E9', text: '#2E7D32' };
      default:
        return { bg: GlobalColors.blueSoft, text: GlobalColors.blueElegant };
    }
  };

  const catStyles = getCategoryStyles(item.category);
  const categoryLabel = typeof item.category === 'string' 
    ? item.category 
    : (item.category as any)?.name || 'Noticia';

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      style={styles.card}
      onPress={() =>
        navigation.navigate('NoticeDetailScreen', { notice: item })
      }
    >
      <View style={styles.cardImageContainer}>
        <Image
          source={{ uri: item.image || 'https://via.placeholder.com/400' }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardOverlay}>
          <CategoryBadge
            label={categoryLabel}
            color={catStyles.bg}
            textColor={catStyles.text}
          />
        </View>
      </View>
      <View style={styles.cardContent}>
        <View>
          <RoboBoldText size={16} style={styles.cardTitle} numberOfLines={2}>
            {item.title || 'Sin Título'}
          </RoboBoldText>
          <RoboRegularText
            size={13}
            style={styles.cardDescription}
            numberOfLines={2}
          >
            {item.description || 'Sin descripción disponible.'}
          </RoboRegularText>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.dateContainer}>
            <View style={styles.dot} />
            <RoboRegularText size={11} style={styles.cardDate}>
              {item.date || 'Reciente'}
            </RoboRegularText>
          </View>
          <View style={styles.readMore}>
            <RoboSemiBoldText size={12} style={styles.readMoreText}>
              Leer más
            </RoboSemiBoldText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const { newsList, isLoading, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const onRefresh = () => {
    fetchNews();
  };

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.cream} />
      <SafeAreaView
        style={styles.safeareaContainer}
        edges={['top', 'left', 'right']}
      >
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <RoboExtraBoldText
              adjustsFontSizeToFit
              numberOfLines={1}
              size={32}
              style={styles.titleText}
            >
              Noticias
            </RoboExtraBoldText>
            <RoboRegularText
              size={15}
              numberOfLines={2}
              style={styles.subtitleText}
            >
              Mantente al día con todo lo que ocurre en tu conjunto residencial
            </RoboRegularText>
          </View>

          <View style={{ flex: 8.5, backgroundColor: GlobalColors.cream }}>
            {isLoading && newsList.length === 0 ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={GlobalColors.navyDeep} />
              </View>
            ) : (
              <FlatList
                data={newsList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <NoticeCard item={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                    colors={[GlobalColors.navyDeep]}
                  />
                }
                ListEmptyComponent={
                  !isLoading ? (
                    <View style={styles.emptyContainer}>
                      <RoboMediumText size={16} style={styles.emptyText}>
                        No hay noticias disponibles en este momento.
                      </RoboMediumText>
                    </View>
                  ) : null
                }
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeareaContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalColors.cream,
  },
  titleContainer: {
    paddingVertical: 20,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleText: {
    color: GlobalColors.navyDeep,
    letterSpacing: -0.5,
  },
  subtitleText: {
    marginTop: 6,
    color: GlobalColors.charcoalSoft,
    lineHeight: 20,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: width * 0.05,
  },
  card: {
    backgroundColor: GlobalColors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: GlobalColors.navyDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  cardImageContainer: {
    width: '100%',
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  cardContent: {
    padding: 16,
    flex: 1,
  },
  badge: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeText: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardTitle: {
    lineHeight: 22,
    marginBottom: 8,
    color: GlobalColors.navyDeep,
  },
  cardDescription: {
    lineHeight: 18,
    color: GlobalColors.charcoalSoft,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GlobalColors.blueElegant,
    marginRight: 6,
  },
  cardDate: {
    color: GlobalColors.gray8,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    color: GlobalColors.navyDeep,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    color: GlobalColors.charcoalSoft,
    textAlign: 'center',
  },
  separator: {
    height: 16,
  },
});
