import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  ScrollView, StatusBar 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = () => {
  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  // Fetch Data from AsyncStorage
  const loadUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem("userName");
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedImage = await AsyncStorage.getItem("profileImage");

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedImage) setProfileImage(storedImage);
    } catch (error) {
      console.log("Error loading user data:", error);
    }
  };

  // Open Gallery and Save Image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem("profileImage", uri); // Save so it persists
    }
  };

  const InfoRow = ({ icon, title, value }) => (
    <View style={styles.infoRow}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color="#3B82F6" />
      </View>
      <View style={styles.infoTextContainer}>
        <Text style={styles.infoLabel}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Matching the gradient from your Login Screen */}
      <LinearGradient 
        colors={['#4F2EE8', '#3B82F6']} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }} 
        style={styles.headerBackground} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Main Profile Card */}
        <View style={styles.profileCard}>
          
          {/* Avatar Section - Properly overlapping the header */}
          <View style={styles.avatarWrapper}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.9}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.placeholderAvatar]}>
                  <Ionicons name="person" size={50} color="#9CA3AF" />
                </View>
              )}
              <View style={styles.editBadge}>
                <Ionicons name="camera" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Name & Title */}
          <View style={styles.nameSection}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subText}>Active Member</Text>
          </View>

          {/* Details Section */}
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Account Details</Text>
            <InfoRow icon="mail" title="Email Address" value={email} />
            <View style={styles.divider} />
            <InfoRow icon="shield-checkmark" title="Account Status" value="Verified" />
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

// ==========================================
// STYLESHEET
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F9', // Slightly cooler, modern gray
  },
  headerBackground: {
    height: 220,
    width: '100%',
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 120, // Pushes the card down to overlap the gradient perfectly
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 25,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -55, // Pulls the avatar exactly halfway out of the card
    marginBottom: 15,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#F3F4F6',
  },
  placeholderAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#4F2EE8',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  nameSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subText: {
    color: '#4F2EE8',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailsContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
    marginLeft: 60, // Aligns divider with text, skipping the icon
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '600',
  }
});