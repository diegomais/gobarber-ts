import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/auth';

import { AvatarInput, Container, Content } from './styles';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const mysteryPerson =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

  const handleSubmit = useCallback(() => {}, []);

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
            <button type="button">
              <FiCamera />
            </button>
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
