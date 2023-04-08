import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { useToast } from '../../contexts/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { AvatarInput, Container, Content } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { updateUser, user } = useAuth();
  const { addToast } = useToast();
  const mysteryPerson =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          email: Yup.string()
            .required('Email is required.')
            .email('Invalid email.'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Password is required.'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Password is required.'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Passwords do not match.'),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = data.old_password
          ? data
          : { name: data.name, email: data.email };

        const response = await api.put('/profile', formData);
        updateUser(response.data);
        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Profile updated!',
          description: 'Your profile has been updated successfully!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Update profile error!',
          description:
            'There was an error updating your profile, please try again.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleUpdateAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar updated successfully!',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form ref={formRef} initialData={user} onSubmit={handleSubmit}>
          <AvatarInput>
            <img src={user.avatar_url || mysteryPerson} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleUpdateAvatar} />
            </label>
          </AvatarInput>

          <h1>My profile</h1>

          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="Email" />

          <hr />

          <Input
            name="old_password"
            icon={FiLock}
            placeholder="Current password"
            type="password"
          />
          <Input
            name="password"
            icon={FiLock}
            placeholder="New password"
            type="password"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            placeholder="New password confirmation"
            type="password"
          />

          <Button type="submit">Save profile</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
