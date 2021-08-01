import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import * as S from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { goBack } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSaveProfile = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          email: Yup.string()
            .required('Email is required.')
            .email('Enter a valid email.'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (value: string) => !!value.length,
            then: Yup.string().required('Password is required.'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (value: string) => !!value.length,
              then: Yup.string().required('New password is required.'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmation does not match.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = data.old_password
          ? data
          : { name: data.name, email: data.email };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        Alert.alert(
          'Profile updated successfully!',
          'Profile information has been updated.',
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Error saving profile!',
          'An error occurred while updating profile, check the data and try again.',
        );
      }
    },
    [updateUser],
  );

  const handleUpdateAvatar = useCallback(async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      Alert.alert('Error updating your avatar!');
    } else {

    const data = new FormData();
      data.append('avatar', {
        name: pickerResult.uri.split('/').pop(),
        type: pickerResult.type || 'image',
        uri: pickerResult.uri,
      });

      api.patch('/users/avatar', data).then(res => {
        updateUser(res.data);
      });
    }
  }, [updateUser]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <S.Container>
          <S.BackButton onPress={handleGoBack}>
            <Feather name="chevron-left" size={24} color="#999591" />
          </S.BackButton>

          <TouchableOpacity onPress={handleUpdateAvatar}>
            <S.Avatar source={{ uri: user.avatar_url }} />
          </TouchableOpacity>

          <View>
            <S.Header>Profile</S.Header>
          </View>

          <Form initialData={user} ref={formRef} onSubmit={handleSaveProfile}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Name"
              autoCompleteType="name"
              textContentType="name"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              placeholder="Email"
              autoCompleteType="email"
              textContentType="emailAddress"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <S.LineBreak />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="old_password"
              icon="lock"
              placeholder="Current password"
              autoCompleteType="password"
              textContentType="password"
              returnKeyType="next"
              onSubmitEditing={() => newPasswordInputRef.current?.focus()}
            />

            <Input
              ref={newPasswordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="New password"
              textContentType="newPassword"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />

            <Input
              ref={confirmPasswordInputRef}
              secureTextEntry
              name="password_confirmation"
              icon="lock"
              placeholder="New password confirmation"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>Save</Button>
          </Form>
        </S.Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
