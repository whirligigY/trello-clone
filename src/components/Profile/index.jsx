import React, { useState, useEffect } from 'react';


import { Container, Button, Row, Col } from 'react-bootstrap';
import { Button as ButtonAuth } from '@supabase/ui';
import Main from '../Main';
import { useAuth } from '../../contexts/Auth';
import './profile.css';

const Profile = () => {
  const { user, client, signOut } = useAuth();
  const [nameEdit, setNameEdit] = useState(false);
  const [surnameEdit, setSurnameEdit] = useState(false);
  const [birthdateEdit, setBirthdateEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [nicknameEdit, setNicknameEdit] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    client
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .then(({ data, error }) => {
        if (!error) {
          setName(() => (data[0].name) ? data[0].name : '');
          setSurname(() => (data[0].surname) ? data[0].surname : '');
          setBirthdate(() => (data[0].birthdate) ? data[0].birthdate : '');
          setPhone(() => (data[0].phone) ? data[0].phone : '');
          setEmail(() => (data[0].mail) ? data[0].mail : user.email);
          setAvatar(() => (data[0].avatar_url))
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
  }, [client, user.email, user.id]);

  const saveName = async (value) => {
    await client.from('profiles').update({ name: value }).eq('id', user.id);
  };

  const saveSurname = async (value) => {
    await client.from('profiles').update({ surname: value }).eq('id', user.id);
  };

  const saveBirthdate = async (value) => {
    await client.from('profiles').update({ birthdate: value }).eq('id', user.id);
  };

  const savePhone = async (value) => {
    await client.from('profiles').update({ phone: value }).eq('id', user.id);
  };

  const saveEmail = async (value) => {
    await client.from('profiles').update({ mail: value }).eq('id', user.id);
  };

  const saveNickname = async (value) => {
    await client.from('profiles').update({ nickname: value }).eq('id', user.id);
  };

  const saveData = async (e) => {
    const dataType = e.target.closest('.personal_item').dataset.type;
    switch (dataType) {
      case 'name':
        setName(e.target.value)
        saveName(e.target.value)
        break;
      case 'surname':
        setSurname(e.target.value)
        saveSurname(e.target.value)
        break;
      case 'birthdate':
        setBirthdate(e.target.value)
        saveBirthdate(e.target.value)
        break;
      case 'phone':
        setPhone(e.target.value)
        savePhone(e.target.value)
        break;
      case 'email':
        setEmail(e.target.value)
        saveEmail(e.target.value)
        break;
      case 'nickname':
        setNickname(e.target.value);
        saveNickname(e.target.value);
        break;
      default:
        console.log('nothing');
    }
  };

  if (user) {
    return (
      <Main>
          <div className="profile">
            <Container>
            <Row className="profile__content content">
              <Col xs={6} md={4} className="side-content">
              <img
                  className="profile__avatar"
                  src={avatar}
                  alt=''
                />
                {nicknameEdit && <input
                  className="user_nickname user_nickname_input"
                  type="text"
                  placeholder="Your nickname"
                  disabled={!nicknameEdit}
                  onBlur={() => setNicknameEdit(false)}
                  value={nickname}
                  onChange={saveData}
                  data-type="nickname"
                />}
                {!nicknameEdit &&
                <Button className="change_user_nickname" onClick={() => setNicknameEdit(true)}><h3 className='h3 user_nickname'>{nickname}</h3></Button>}
              </Col>
              <Col className="main-content" xs={12} md={8}>
                <h2 className="h2">User inform</h2>
                <div className="personal_item" data-type="name">
                  <div className="user_data">
                    <label htmlFor="name">Name</label>
                    <input className='profile-input' 
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    disabled={!nameEdit}
                    onBlur={() => setNameEdit(false)}
                    value={name}
                    onChange={saveData}/>
                  </div>
                  <Button variant="outline-secondary" className="edit-user-data" onClick={() => setNameEdit(!nameEdit)}>Edit</Button>
                </div>
                <div className="personal_item" data-type="surname">
                  <div className="user_data">
                    <label htmlFor="surname">Surname</label>
                    <input className='profile-input' 
                    type="text"
                    id="surname"
                    name="surname"
                    placeholder="Your surname"
                    disabled={!surnameEdit}
                    onBlur={() => setSurnameEdit(false)}
                    value={surname}
                    onChange={saveData}
                    />
                  </div>
                  <Button variant="outline-secondary" className="edit-user-data" onClick={() => setSurnameEdit(!surnameEdit)}>Edit</Button>
                </div>
                <div className="personal_item" data-type="birthdate">
                  <div className="user_data">
                    <label htmlFor="surname">Birthdate</label>
                    <input className='profile-input' 
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    placeholder="Your birthdate"
                    disabled={!birthdateEdit}
                    onBlur={() => setBirthdateEdit(false)}
                    value={birthdate}
                    onChange={saveData}
                    />
                  </div>
                  <Button variant="outline-secondary" className="edit-user-data" onClick={() => setBirthdateEdit(!birthdateEdit)}>Edit</Button>
                </div>
                <hr/>
                <h2 className="h2">Contact inform</h2>
                <div className="personal_item" data-type="phone">
                  <div className="user_contact">
                    <label htmlFor="phone">Phone</label>
                    <input className='profile-input' 
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your phone"
                    disabled={!phoneEdit}
                    onBlur={() => setPhoneEdit(false)}
                    value={phone}
                    onChange={saveData}
                    />
                  </div>
                  <Button variant="outline-secondary" className="edit-user-data" onClick={() => setPhoneEdit(!phoneEdit)}>Edit</Button>
                </div>
                <div className="personal_item" data-type="email">
                  <div className="user_contact">
                    <label htmlFor="email">E-mail</label>
                    <input className='profile-input' 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Your e-mail" 
                    disabled={!emailEdit}
                    onBlur={() => setEmailEdit(false)}
                    value={email}
                    onChange={saveData}
                    />
                  </div>
                  <Button variant="outline-secondary" className="edit-user-data" onClick={() => setEmailEdit(!emailEdit)}>Edit</Button>
                </div>
                <hr/>
                <h2 className="h2">Account management</h2>
                <ButtonAuth onClick={() => signOut()}>
                  Sign out
                </ButtonAuth>
              </Col>
              </Row>
            </Container>
          </div>
      </Main>
    );
  } else {
    history.push("/sign-in");
    return null;
  }
}

export { Profile };
