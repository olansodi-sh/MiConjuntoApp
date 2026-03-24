import { View, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar, Dimensions } from 'react-native';
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
import { Notice } from '../notices/notice.types';
import React from 'react';

type HomeNavProp = StackNavigationProp<HomeStackParamList>;

const { width, height } = Dimensions.get('window');

const DUMMY_NOTICES: Notice[] = [
  {
    id: 1,
    title: 'Mantenimiento piscina programado',
    description:
      'Se realizará mantenimiento preventivo en la piscina durante el fin de semana. Por favor planifique su visita con anticipación.',
    fullDescription:
      'Estimados residentes, informamos que el próximo fin de semana se llevará a cabo el mantenimiento preventivo trimestral de la piscina. Durante este período, el área permanecerá cerrada para garantizar la seguridad de todos. El trabajo incluye limpieza profunda, revisión del sistema de filtración y tratamiento químico del agua. Agradecemos su comprensión y paciencia durante este proceso.',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=200&h=200&fit=crop',
    date: '24 Mar 2026',
    category: 'Mantenimiento',
  },
  {
    id: 2,
    title: 'Asamblea general de residentes',
    description:
      'Convocatoria para la asamblea anual de propietarios. Se tratarán temas del presupuesto 2026 y obras pendientes.',
    fullDescription:
      'Se convoca a todos los propietarios y residentes a la Asamblea General Ordinaria que se realizará el próximo sábado 28 de marzo a las 10:00 AM en el salón comunal. En el orden del día se incluyen: aprobación de presupuesto 2026, informe de gestión, elección de consejo de administración y aprobación de obras de mejoramiento. Su participación es fundamental para la toma de decisiones de nuestra comunidad.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop',
    date: '22 Mar 2026',
    category: 'Reuniones',
  },
  {
    id: 3,
    title: 'Nuevas normas de seguridad en parqueadero',
    description:
      'A partir del 1 de abril se implementarán nuevos protocolos de acceso al parqueadero para mayor seguridad.',
    fullDescription:
      'Informamos a la comunidad que a partir del 1 de abril de 2026 se pondrán en vigencia nuevas medidas de seguridad en el área de parqueadero. Todos los vehículos deberán registrar su placa en portería al momento del ingreso. Los visitantes solo podrán acceder con autorización previa del residente. Se instalarán cámaras adicionales en todas las zonas del parqueadero.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=200&h=200&fit=crop',
    date: '20 Mar 2026',
    category: 'Seguridad',
  },
  {
    id: 4,
    title: 'Jornada de fumigación programada',
    description:
      'Se realizará fumigación en zonas comunes y áreas verdes. Tome las precauciones necesarias con mascotas y niños.',
    fullDescription:
      'La administración informa que el día martes 31 de marzo se realizará la jornada semestral de fumigación en todas las zonas comunes del conjunto: pasillos, áreas verdes, cuarto de basuras y sótano. Se recomienda no transitar por las áreas fumigadas durante las siguientes 4 horas. Por favor proteja a sus mascotas y niños durante el proceso. El horario estimado es de 8:00 AM a 12:00 PM.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop',
    date: '18 Mar 2026',
    category: 'Mantenimiento',
  },
  {
    id: 5,
    title: 'Corte de agua programado',
    description:
      'El día jueves habrá corte de agua de 8 AM a 2 PM por trabajos de mantenimiento en la red principal del conjunto.',
    fullDescription:
      'Por trabajos de mantenimiento y reparación en la red principal de acueducto, se realizará un corte de agua programado el día jueves 26 de marzo de 2026 entre las 8:00 AM y las 2:00 PM. Afectará a todas las torres del conjunto. Se recomienda almacenar agua con anticipación para las actividades básicas del hogar. Pedimos disculpas por los inconvenientes que esto pueda generar.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    date: '15 Mar 2026',
    category: 'Servicios',
  },
];

const CategoryBadge = ({ label }: { label: string }) => (
  <View style={styles.badge}>
    <RoboMediumText size={10} style={styles.badgeText}>
      {label}
    </RoboMediumText>
  </View>
);

const NoticeCard = ({ item }: { item: Notice }) => {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      style={styles.card}
      onPress={() => navigation.navigate('NoticeDetailScreen', { notice: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <CategoryBadge label={item.category} />
        <RoboBoldText size={14} style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </RoboBoldText>
        <RoboRegularText size={12} style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </RoboRegularText>
        <View style={styles.cardFooter}>
          <RoboRegularText size={11} style={styles.cardDate}>
            {item.date}
          </RoboRegularText>
          <TouchableOpacity
            style={styles.verButton}
            onPress={() => navigation.navigate('NoticeDetailScreen', { notice: item })}
            activeOpacity={0.8}
          >
            <RoboSemiBoldText size={12} style={styles.verButtonText}>
              Ver
            </RoboSemiBoldText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={GlobalColors.cream} />
      <SafeAreaView style={styles.safeareaContainer} edges={['top', 'left', 'right']}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <RoboExtraBoldText adjustsFontSizeToFit numberOfLines={1} size={28} style={styles.titleText}>
              Noticias
            </RoboExtraBoldText>
            <RoboRegularText size={15} numberOfLines={2} style={styles.subtitleText}>
              Mantente al día con todo lo que ocurre en tu conjunto
            </RoboRegularText>
          </View>
          <View style={{flex: 8.5, backgroundColor: GlobalColors.cream}}>
            <FlatList
              data={DUMMY_NOTICES}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <NoticeCard item={item} />}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
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
    flex: 1.2,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalColors.cream,
  },
  titleText: {
    alignSelf: 'center',
    color: GlobalColors.navyDeep,
  },
  subtitleText: {
    width: '90%',
    marginTop: '3%',
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: GlobalColors.charcoalSoft,
  },
  listContent: {
    paddingTop: height * 0.02,
    paddingBottom: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  card: {
    elevation: 3,
    borderWidth: 1,
    shadowRadius: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowOpacity: 0.07,
    flexDirection: 'row',
    shadowColor: GlobalColors.navyDeep,
    backgroundColor: GlobalColors.white,
    borderColor: GlobalColors.marbleGray,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    height: '100%',
    width: width * 0.22,
    minHeight: height * 0.14,
  },
  cardContent: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  badge: {
    marginBottom: 5,
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 7,
    alignSelf: 'flex-start',
    backgroundColor: GlobalColors.blueSoft,
  },
  badgeText: {
    color: GlobalColors.blueElegant,
  },
  cardTitle: {
    lineHeight: 19,
    marginBottom: 4,
    color: GlobalColors.navyDeep,
  },
  cardDescription: {
    flex: 1,
    lineHeight: 17,
    color: GlobalColors.charcoalSoft,
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardDate: {
    color: GlobalColors.gray8,
  },
  verButton: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 14,
    backgroundColor: GlobalColors.navyDeep,
  },
  verButtonText: {
    color: GlobalColors.white,
  },
});
