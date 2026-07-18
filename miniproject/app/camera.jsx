import {
  View, Text, StyleSheet, Pressable, Image, Alert, ActivityIndicator
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, RADIUS } from '../constants/theme';

const ACCENT = '#070355';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto]               = useState(null);
  const [loading, setLoading]           = useState(true);
  const [time, setTime]                 = useState('');

  const cameraRef = useRef(null);

  useEffect(() => {
    if (permission?.granted) {
      setLoading(false);
    }
  }, [permission]);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const result = await cameraRef.current.takePictureAsync();
    setPhoto(result.uri);
    setTime(new Date().toLocaleString());
  };

  const retake = () => {
    setPhoto(null);
  };

  const deletePhoto = () => {
    Alert.alert('Delete Photo', 'Are you sure?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => setPhoto(null), style: 'destructive' },
    ]);
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Header title="Camera" />
        <View style={styles.center}>
          <View style={styles.permissionIcon}>
            <Ionicons name="camera-off-outline" size={50} color={ACCENT} />
          </View>
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionSub}>
            Please allow camera access to capture survey photos.
          </Text>
          <Pressable
            onPress={requestPermission}
            style={({ pressed }) => [styles.permissionBtn, pressed && { opacity: 0.8 }]}
          >
            <Ionicons name="camera-outline" size={18} color="#fff" />
            <Text style={styles.permissionBtnText}>Allow Camera</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Camera" />
        <View style={styles.center}>
          <ActivityIndicator size="large" color={ACCENT} />
          <Text style={styles.loadingText}>Opening Camera...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Camera" />

      {/* Camera or Preview */}
      {!photo ? (
        <CameraView style={styles.camera} ref={cameraRef} />
      ) : (
        <View style={styles.preview}>
          <Image source={{ uri: photo }} style={styles.image} />
          <View style={styles.timeBadge}>
            <Ionicons name="time-outline" size={14} color="#64748B" />
            <Text style={styles.timeText}>Captured: {time}</Text>
          </View>
        </View>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        {!photo ? (
          <Pressable
            onPress={takePicture}
            style={({ pressed }) => [styles.captureOuter, pressed && { opacity: 0.85 }]}
          >
            <View style={styles.captureBtn}>
              <Ionicons name="camera" size={28} color="#fff" />
            </View>
          </Pressable>
        ) : (
          <View style={styles.actionRow}>
            <Pressable
              onPress={retake}
              style={({ pressed }) => [styles.actionBtn, { backgroundColor: ACCENT }, pressed && { opacity: 0.8 }]}
            >
              <Ionicons name="refresh-outline" size={18} color="#fff" />
              <Text style={styles.actionText}>Retake</Text>
            </Pressable>

            <Pressable
              onPress={deletePhoto}
              style={({ pressed }) => [styles.actionBtn, { backgroundColor: '#EF4444' }, pressed && { opacity: 0.8 }]}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text style={styles.actionText}>Delete</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  camera: { flex: 1 },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F8F9FB',
  },
  image: {
    width: '100%',
    height: '75%',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  timeText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
  },
  controls: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EAECF0',
  },
  captureOuter: {
    borderRadius: 999,
    padding: 4,
    borderWidth: 3,
    borderColor: ACCENT + '20',
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: RADIUS.md,
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  permissionIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: ACCENT + '0D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  permissionSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  permissionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: RADIUS.md,
    backgroundColor: ACCENT,
  },
  permissionBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  loadingText: {
    marginTop: 14,
    color: '#64748B',
    fontSize: 14,
  },
});