import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import {
    requestPermissionsAsync,
    getCurrentPositionAsync,
} from 'expo-location';

import mapMarkerImg from '../../images/map-marker.png';

interface LocationMap {
    coords: {
        latitude: number;
        longitude: number;
    };
}

const SelectMapPosition: React.FC = () => {
    const [location, setLocation] = useState<LocationMap>({
        coords: {
            latitude: 0,
            longitude: 0,
        },
    });

    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const { status } = await requestPermissionsAsync();
            const location = await getCurrentPositionAsync({});

            if (status !== 'granted' && !error) {
                setError(false);
                Alert.alert('Eita, precisamos de acesso a sua localização =(');
            }

            setError(true);
            setLocation(location);
        })();
    }, [error]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            position: 'relative',
        },
        description: {
            fontFamily: 'N600',
            color: '#5c8599',
            lineHeight: 24,
            marginTop: 16,
        },
        mapStyle: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },

        nextButton: {
            backgroundColor: '#15c3d6',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            height: 56,

            position: 'absolute',
            left: 24,
            right: 24,
            bottom: 40,
        },

        nextButtonText: {
            fontFamily: 'N800',
            fontSize: 16,
            color: '#FFF',
        },
    });

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    const navigation = useNavigation();

    function handleNextStep() {
        navigation.navigate('OrphanageData', { position });
    }

    function handleSelectMapPosition(event: MapEvent) {
        setPosition(event.nativeEvent.coordinate);
    }

    if (location.coords.latitude === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <MapView
                onPress={handleSelectMapPosition}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
                style={styles.mapStyle}
            >
                {position.latitude !== 0 && (
                    <Marker
                        icon={mapMarkerImg}
                        coordinate={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                        }}
                    />
                )}
            </MapView>

            {position.latitude !== 0 && (
                <RectButton style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Próximo</Text>
                </RectButton>
            )}
        </View>
    );
};

export default SelectMapPosition;
