import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { useToast } from '../../contexts/toast';
import api from '../../services/api';

import { AvatarInput, Container, Content } from './styles';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { updateUser, user } = useAuth();
  const { addToast } = useToast();
  const mysteryPerson =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

  const handleSubmit = useCallback(() => {}, []);

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
        <Form ref={formRef} onSubmit={handleSubmit}>
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
          />
          <Input name="password" icon={FiLock} placeholder="New password" />
          <Input
            name="password_confirmation"
            icon={FiLock}
            placeholder="New password confirmation"
          />

          <Button type="submit">Save profile</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
