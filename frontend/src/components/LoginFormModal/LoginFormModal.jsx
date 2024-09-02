import { useState, useContext } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { ElementContext } from '../../context/ElementContext';
import '../SessionModal.css'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const { element } = useContext(ElementContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors({ credential: data.message });
        }
      });
  };

  const loginDemo = () => {
    setErrors({});
    return dispatch(sessionActions.login({ credential: 'DemoUser', password: 'demo-user-password'}))
      .then(closeModal)
      .catch(console.error)
  }

  return (
    <div className="session-modal">
      <h1 className="session-modal-title">Log In</h1>
      <form onSubmit={handleSubmit} className="session-modal-form">
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Username or Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        {errors.credential && (
          <p className='errors'>{errors.credential}</p>
        )}
        <button className='session-modal-submit' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
      </form>
      <button className={`link-${element} demo-button`} onClick={loginDemo}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;