import React, {useState} from 'react';
import MapView, { Marker} from'react-native-maps';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';

export default function App() {

  const [address, setAddress] = useState('');
  const [region, setRegion] = useState(
    {
      latitude:60.200692,
      longitude:24.934302,
      latitudeDelta:0.0322,
      longitudeDelta:0.0221,
    }
  );
  const [coordinate, setCoordinate] = useState(
    {
      latitude:60.200692,
      longitude: 24.934302
    }
  );

  const getCoordinates = address => {
    console.log(address);
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=KZm8i8wxroMvRbCHHiSfnrJzWshuzTma&location=${address}`)
    .then(response=>  response.json())
    .then(responseJson=>{ 
      console.log(address)
      setCoordinate(
        {
          latitude: responseJson.results[0].locations[0].displayLatLng.lat,
          longitude: responseJson.results[0].locations[0].displayLatLng.lng
        }
      )
      setRegion(
        {
          latitude: responseJson.results[0].locations[0].displayLatLng.lat,
          longitude: responseJson.results[0].locations[0].displayLatLng.lng,
          latitudeDelta:0.0322,
          longitudeDelta:0.0221,
        }
      )
    })
    .catch(error=> { Alert.alert('Error',error); });
  }
  return (
    <View style={styles.container}>
      
      <MapView
      style={styles.map}
      region={region}
        >
        <Marker coordinate={region}/>
        </MapView>
        <View style={{flex: 1}}>
        <TextInput 
        style={styles.input}
        onChangeText={address=> setAddress(address)}
        value={address} />
        <Button onPress={() => getCoordinates(address)} title='Show' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  input: {
    width:200,
    borderColor:'gray',
    borderWidth:1
  },
  map: {
    flex:1,
    width: "100%",
    height: "100%"
  }

  
});
