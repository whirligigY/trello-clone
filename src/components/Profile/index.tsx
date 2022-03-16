import React, { useState, useEffect } from 'react';

import { Container, Button, Row, Col } from 'react-bootstrap';
import { Button as ButtonAuth } from '@supabase/ui';
import { Main } from '../Main';
import { useAuth } from '../../contexts/Auth';
import { UploadAvatar } from '../UploadAvatar/UploadAvatar';

import './profile.css';

const Profile = () => {
  const { user, client, signOut } = useAuth();
  const [nameEdit, setNameEdit] = useState(false);
  const [surnameEdit, setSurnameEdit] = useState(false);
  const [birthdateEdit, setBirthdateEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [nicknameEdit, setNicknameEdit] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState('');
  const [nickname, setNickname] = useState('');
  const [visible, setVisible] = useState(false);
  const signinClass = 'main_center';

  const closeHandle = () => {
    setVisible(false);
  };

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
          setAvatar(() => data[0].avatar_url);
          let nick = '';
          if (data[0].nickname) {
            nick = data[0].nickname;
          } else if (user.user_metadata.user_name) {
            nick = user.user_metadata.user_name;
          } else {
            [nick] = user.email.split('@');
          }
          setNickname(nick);
        }
      });
  }, [client, user.email, user.id, visible]);

  const saveName = async (value: string) => {
    await client.from('profiles').update({ name: value }).eq('id', user.id);
  };

  const saveSurname = async (value: string) => {
    await client.from('profiles').update({ surname: value }).eq('id', user.id);
  };

  const saveBirthdate = async (value: string) => {
    await client
      .from('profiles')
      .update({ birthdate: value })
      .eq('id', user.id);
  };

  const savePhone = async (value: string) => {
    await client.from('profiles').update({ phone: value }).eq('id', user.id);
  };

  const saveEmail = async (value: string) => {
    await client.from('profiles').update({ mail: value }).eq('id', user.id);
  };

  const saveNickname = async (value: string) => {
    await client.from('profiles').update({ nickname: value }).eq('id', user.id);
  };

  const saveData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let dataType = '';
    if (!e.target.dataset.type) {
      const closest = e.target.closest('.personal_item') as HTMLElement;
      dataType = closest.dataset.type;
    } else {
      dataType = e.target.dataset.type;
    }
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
      case 'nickname':
        setNickname(e.target.value);
        saveNickname(e.target.value);
        break;
    }
  };

  if (user) {
    return (
      <Main modClass={signinClass}>
        <UploadAvatar visible={visible} closeHandle={closeHandle} />
        <div className="profile">
          <Container>
            <Row className="profile__content content">
              <Col xs={6} md={4} className="side-content">
                <img
                  className="profile__avatar"
                  src={avatar}
                  alt=""
                  onClick={() => setVisible((oldState) => !oldState)}
                />
                {nicknameEdit && (
                  <input
                    className="user_nickname user_nickname_input"
                    type="text"
                    placeholder="Your nickname"
                    disabled={!nicknameEdit}
                    onBlur={() => setNicknameEdit(false)}
                    value={nickname}
                    onChange={saveData}
                    data-type="nickname"
                    maxLength={20}
                  />
                )}
                {!nicknameEdit && (
                  <Button
                    className="change_user_nickname"
                    onClick={() => setNicknameEdit(true)}
                  >
                    <h3 className="h3 user_nickname">{nickname}</h3>
                  </Button>
                )}
                <Button
                  className="change_user_avatar"
                  variant="outline-primary"
                  onClick={() => setVisible(true)}
                >
                  Change avatar
                </Button>
              </Col>
              <Col className="main-content" xs={12} md={8}>
                <h2 className="h2">User</h2>
                <div className="personal_item" data-type="name">
                  <label className="user_data" htmlFor="name">
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
                      maxLength={20}
                    />
                  </label>
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setNameEdit(!nameEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="personal_item" data-type="surname">
                  <label className="user_data" htmlFor="surname">
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
                      maxLength={20}
                    />
                  </label>
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setSurnameEdit(!surnameEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="personal_item" data-type="birthdate">
                  <label className="user_data" htmlFor="surname">
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
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setBirthdateEdit(!birthdateEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <hr />
                <h2 className="h2">Contacts</h2>
                <div className="personal_item" data-type="phone">
                  <label className="user_contact" htmlFor="phone">
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
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setPhoneEdit(!phoneEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="personal_item" data-type="email">
                  <label className="user_contact" htmlFor="email">
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
                  <Button
                    variant="outline-secondary"
                    className="edit-user-data"
                    onClick={() => setEmailEdit(!emailEdit)}
                  >
                    Edit
                  </Button>
                </div>
                <hr />
                <h2 className="h2">Account Management</h2>
                <ButtonAuth onClick={() => signOut()}>Sign out</ButtonAuth>
              </Col>
            </Row>
          </Container>
        </div>
      </Main>
    );
  }
  return null;
};

export { Profile };
