import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Button, Row, Col } from 'react-bootstrap';
import { Auth, Button as ButtonAuth } from '@supabase/ui';
import { supabase } from '../../client';
import Main from '../Main';
import { useAuth } from '../../contexts/Auth';

import './profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, client, signOut } = useAuth();
  const [nameEdit, setNameEdit] = useState(false);
  const [surnameEdit, setSurnameEdit] = useState(false);
  const [birthdateEdit, setBirthdateEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [navigate, user]);

  useEffect(() => {
    client
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .then(({ data, error }) => {
        if (!error) {
          setName(() => (data[0].name ? data[0].name : ''));
          setSurname(() => (data[0].surname ? data[0].surname : ''));
          setBirthdate(() => (data[0].birthdate ? data[0].birthdate : ''));
          setPhone(() => (data[0].phone ? data[0].phone : ''));
          setEmail(() => (data[0].mail ? data[0].mail : user.email));
        }
      });
  }, [client, user.email, user.id]);

  const saveName = async (value) => {
    await client.from('profiles').update({ name: value }).eq('id', user.id);
  };

  const saveSurname = async (value) => {
    await client.from('profiles').update({ surname: value }).eq('id', user.id);
  };

  const saveBirthdate = async (value) => {
    await client
      .from('profiles')
      .update({ birthdate: value })
      .eq('id', user.id);
  };

  const savePhone = async (value) => {
    await client.from('profiles').update({ phone: value }).eq('id', user.id);
  };

  const saveEmail = async (value) => {
    await client.from('profiles').update({ mail: value }).eq('id', user.id);
  };

  const saveData = async (e) => {
    const dataType = e.target.closest('.personal_item').dataset.type;

    switch (dataType) {
      case 'name':
        setName(e.target.value);
        saveName(e.target.value);
        break;
      case 'surname':
        setSurname(e.target.value);
        saveSurname(e.target.value);
        break;
      case 'birthdate':
        setBirthdate(e.target.value);
        saveBirthdate(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        savePhone(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        saveEmail(e.target.value);
        break;
      default:
        setEmail('Нет таких значений');
    }
  };

  return (
    <Main>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <div className="profile">
          <Container>
            <Row className="profile__content content">
              <Col xs={6} md={4} className="side-content">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img
                  className="profile__avatar"
                  src="../../assets/A_r2u6uZhnxA_x.jpg"
                />
                <h1 className="h3 user_nickname">
                  {user.user_metadata.user_name
                    ? user.user_metadata.user_name
                    : user.username}
                </h1>
              </Col>
              <Col className="main-content" xs={12} md={8}>
                <h2 className="h2">User inform</h2>
                <div className="personal_item" data-type="name">
                  <div className="user_data">
                    <label htmlFor="name">
                      <span>Name</span>
                      <input
                        className="profile-input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        disabled={!nameEdit}
                        onBlur={() => setNameEdit(false)}
                        value={name}
                        onChange={saveData}
                      />
                    </label>
                  </div>
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setNameEdit(!nameEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="personal_item" data-type="surname">
                  <div className="user_data">
                    <label htmlFor="surname">
                      Surname
                      <input
                        className="profile-input"
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder="Your surname"
                        disabled={!surnameEdit}
                        onBlur={() => setSurnameEdit(false)}
                        value={surname}
                        onChange={saveData}
                      />
                    </label>
                  </div>
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setSurnameEdit(!surnameEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="personal_item" data-type="birthdate">
                  <div className="user_data">
                    <label htmlFor="surname">
                      Birthdate
                      <input
                        className="profile-input"
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        placeholder="Your birthdate"
                        disabled={!birthdateEdit}
                        onBlur={() => setBirthdateEdit(false)}
                        value={birthdate}
                        onChange={saveData}
                      />
                    </label>
                  </div>
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setBirthdateEdit(!birthdateEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <hr />
                <h2 className="h2">Contact inform</h2>
                <div className="personal_item" data-type="phone">
                  <div className="user_contact">
                    <label htmlFor="phone">
                      Phone
                      <input
                        className="profile-input"
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Your phone"
                        disabled={!phoneEdit}
                        onBlur={() => setPhoneEdit(false)}
                        value={phone}
                        onChange={saveData}
                      />
                    </label>
                  </div>
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setPhoneEdit(!phoneEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="personal_item" data-type="email">
                  <div className="user_contact">
                    <label htmlFor="email">
                      E-mail
                      <input
                        className="profile-input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your e-mail"
                        disabled={!emailEdit}
                        onBlur={() => setEmailEdit(false)}
                        value={email}
                        onChange={saveData}
                      />
                    </label>
                  </div>
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setEmailEdit(!emailEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <hr />
                <h2 className="h2">Account management</h2>
                <p>Change password</p>
                <ButtonAuth onClick={() => signOut()}>Sign out</ButtonAuth>
              </Col>
            </Row>
          </Container>
        </div>
      </Auth.UserContextProvider>
    </Main>
  );
};

export { Profile };
