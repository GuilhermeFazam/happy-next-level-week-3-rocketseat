import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    Linking,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import mapMarkerImg from '../../images/map-marker.png';
import api from '../../services/api';

interface OrphanegesParams {
    id: number;
}

interface Images {
    id: string;
    urlMobile: string;
}

interface Orphanege {
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: Array<Images>;
}
const OrphanageDetails: React.FC = () => {
    const route = useRoute();
    const params = route.params as OrphanegesParams;
    const [orphanege, setOrphanege] = useState<Orphanege>();

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(response => {
            setOrphanege(response.data);
        });
    }, [params.id]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },

        imagesContainer: {
            height: 240,
        },

        image: {
            width: Dimensions.get('window').width,
            height: 240,
            resizeMode: 'cover',
        },

        detailsContainer: {
            padding: 24,
        },

        title: {
            color: '#4D6F80',
            fontSize: 30,
            fontFamily: 'N700',
        },

        description: {
            fontFamily: 'N600',
            color: '#5c8599',
            lineHeight: 24,
            marginTop: 16,
        },

        mapContainer: {
            borderRadius: 20,
            overflow: 'hidden',
            borderWidth: 1.2,
            borderColor: '#B3DAE2',
            marginTop: 40,
            backgroundColor: '#E6F7FB',
        },

        mapStyle: {
            width: '100%',
            height: 150,
        },

        routesContainer: {
            padding: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },

        routesText: {
            fontFamily: 'N700',
            color: '#0089a5',
        },

        separator: {
            height: 0.8,
            width: '100%',
            backgroundColor: '#D3E2E6',
            marginVertical: 40,
        },

        scheduleContainer: {
            marginTop: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        scheduleItem: {
            width: '48%',
            padding: 20,
        },

        scheduleItemBlue: {
            backgroundColor: '#E6F7FB',
            borderWidth: 1,
            borderColor: '#B3DAE2',
            borderRadius: 20,
        },

        scheduleItemGreen: {
            backgroundColor: '#EDFFF6',
            borderWidth: 1,
            borderColor: '#A1E9C5',
            borderRadius: 20,
        },

        scheduleItemRed: {
            backgroundColor: '#FEF6F9',
            borderWidth: 1,
            borderColor: '#FFBCD4',
            borderRadius: 20,
        },
        scheduleText: {
            fontFamily: 'N600',
            fontSize: 16,
            lineHeight: 24,
            marginTop: 20,
        },

        scheduleTextBlue: {
            color: '#5C8599',
        },
        scheduleTextRed: {
            color: '#FF669D',
        },
        scheduleTextGreen: {
            color: '#37C77F',
        },

        contactButton: {
            backgroundColor: '#3CDC8C',
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 56,
            marginTop: 40,
        },

        contactButtonText: {
            fontFamily: 'N800',
            color: '#FFF',
            fontSize: 16,
            marginLeft: 16,
        },
    });

    if (!orphanege) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando...</Text>
            </View>
        );
    }

    function handleOpenGoogleMapsRoute() {
        Linking.openURL(
            `https://www.google.com/maps/dir/?api=1&destination=${orphanege?.latitude},${orphanege?.longitude}`,
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {orphanege.images.map(image => {
                        return (
                            <Image
                                key={image.id}
                                style={styles.image}
                                source={{
                                    uri: image.urlMobile,
                                }}
                            />
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{orphanege.name}</Text>
                <Text style={styles.description}>{orphanege.about}</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={{
                            latitude: orphanege.latitude,
                            longitude: orphanege.longitude,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008,
                        }}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        style={styles.mapStyle}
                    >
                        <Marker
                            icon={mapMarkerImg}
                            coordinate={{
                                latitude: orphanege.latitude,
                                longitude: orphanege.longitude,
                            }}
                        />
                    </MapView>

                    <TouchableOpacity
                        onPress={handleOpenGoogleMapsRoute}
                        style={styles.routesContainer}
                    >
                        <Text style={styles.routesText}>
                            Ver rotas no Google Maps
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <Text style={styles.title}>Instruções para visita</Text>
                <Text style={styles.description}>{orphanege.instructions}</Text>

                <View style={styles.scheduleContainer}>
                    <View
                        style={[styles.scheduleItem, styles.scheduleItemBlue]}
                    >
                        <Feather name="clock" size={40} color="#2AB5D1" />
                        <Text
                            style={[
                                styles.scheduleText,
                                styles.scheduleTextBlue,
                            ]}
                        >
                            {orphanege.opening_hours}
                        </Text>
                    </View>

                    {orphanege.open_on_weekends ? (
                        <View
                            style={[
                                styles.scheduleItem,
                                styles.scheduleItemGreen,
                            ]}
                        >
                            <Feather name="info" size={40} color="#39CC83" />
                            <Text
                                style={[
                                    styles.scheduleText,
                                    styles.scheduleTextGreen,
                                ]}
                            >
                                Atendemos fim de semana
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={[
                                styles.scheduleItem,
                                styles.scheduleItemRed,
                            ]}
                        >
                            <Feather name="info" size={40} color="#FF669D" />
                            <Text
                                style={[
                                    styles.scheduleText,
                                    styles.scheduleTextRed,
                                ]}
                            >
                                Não Atendemos fim de semana
                            </Text>
                        </View>
                    )}
                </View>

                <RectButton style={styles.contactButton} onPress={() => {}}>
                    <FontAwesome name="whatsapp" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>
                        Entrar em contato
                    </Text>
                </RectButton>
            </View>
        </ScrollView>
    );
};
export default OrphanageDetails;
