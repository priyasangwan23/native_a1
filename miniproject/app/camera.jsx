import { 
  View, Text, StyleSheet, Pressable, Image, Alert, ActivityIndicator 
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Header from '../components/Header';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState('');

  const cameraRef = useRef(null);

  useEffect(() => {
    if (permission?.granted) {
      setLoading(false);
    }
  }, [permission]);

  //  Take Photo
  const takePicture = async () => {
    if (!cameraRef.current) return;

    const result = await cameraRef.current.takePictureAsync();
    setPhoto(result.uri);
    setTime(new Date().toLocaleString());
  };

  // Retake
  const retake = () => {
    setPhoto(null);
  };

  // 🗑 Delete
  const deletePhoto = () => {
    Alert.alert(
      "Delete Photo",
      "Are you sure?",
      [
        { text: "Cancel" },
        { text: "Delete", onPress: () => setPhoto(null) }
      ]
    );
  };

  //  No permission
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  //  Loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Opening Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Camera" />

      {/*  Camera or Preview */}
      {!photo ? (
        <CameraView style={styles.camera} ref={cameraRef} />
      ) : (
        <View style={styles.preview}>
          <Image source={{ uri: photo }} style={styles.image} />
          <Text style={styles.time}>Captured: {time}</Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.controls}>
        {!photo ? (
          <Pressable style={styles.captureBtn} onPress={takePicture}>
            <Text style={styles.text}>Capture</Text>
          </Pressable>
        ) : (
          <>
            <Pressable style={styles.btn} onPress={retake}>
              <Text style={styles.text}>Retake</Text>
            </Pressable>

            <Pressable style={styles.deleteBtn} onPress={deletePhoto}>
              <Text style={styles.text}>Delete</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  preview: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '90%', height: '70%', borderRadius: 10 },
  time: { marginTop: 10 },

  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },

  captureBtn: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 50,
  },

  btn: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  deleteBtn: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  text: {
    color: '#fff',
    fontWeight: '600',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: 10,
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
  },
});