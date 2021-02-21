import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

import { Feather } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import mapMarker from '../../images/map-marker.png';
import api from '../../services/api';

interface Orphanege {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

const OrphanageMap: React.FC = () => {
    const navigation = useNavigation();
    const [orphanages, setOrphanages] = useState<Orphanege[]>([]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        map: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },
        colloutContainer: {
            width: 160,
            height: 46,
            paddingHorizontal: 16,
            backgroundColor: 'rgba(255,255,255, 0.8)',
            borderRadius: 16,
            justifyContent: 'center',
            elevation: 3,
        },
        colloutText: {
            color: '#0089a5',
            fontSize: 14,
            fontFamily: 'N700',
        },
        footer: {
            position: 'absolute',
            left: 24,
            right: 24,
            bottom: 32,
            backgroundColor: '#fff',
            borderRadius: 20,
            height: 56,
            paddingLeft: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 3,
        },
        footerText: {
            color: '#8fa7b3',
            fontFamily: 'N700',
        },
        createOrphanegeButton: {
            width: 56,
            height: 56,
            borderRadius: 20,
            backgroundColor: '#15c3d6',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', {
            id,
        });
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition');
    }

    useFocusEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    });

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -22.9190021,
                    longitude: -47.1046973,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
            >
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8,
                            }}
                            icon={mapMarker}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                        >
                            <Callout
                                tooltip
                                onPress={() =>
                                    handleNavigateToOrphanageDetails(
                                        orphanage.id,
                                    )
                                }
                            >
                                <View style={styles.colloutContainer}>
                                    <Text style={styles.colloutText}>
                                        {orphanage.name}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {`${orphanages.length} orfanatos encontratos`}
                </Text>
                <RectButton
                    style={styles.createOrphanegeButton}
                    onPress={handleNavigateToCreateOrphanage}
                >
                    <Feather name="plus" size={20} color="#fff" />
                </RectButton>
            </View>
        </View>
    );
};

export default OrphanageMap;
