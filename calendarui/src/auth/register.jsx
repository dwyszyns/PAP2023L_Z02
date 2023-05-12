import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { useRegisterMutation } from '../store/api';

const Register = () => {
  const [fields, setFields] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    username: false,
    firstName: false,
    lastName: false,
    password: false,
    confirmPassword: false,
  });
  const [register, { isError, isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();
  const fieldNames = ['username', 'firstName', 'lastName', 'password', 'confirmPassword'];

  const handleSubmit = () => {
    let newErrors = { ...errors };
    let isValid = true;
    fieldNames.forEach((fieldName) => {
      if (fields[fieldName].trim() === '' || (fieldName === 'confirmPassword' && fields.confirmPassword !== fields.password)) {
        newErrors = { ...newErrors, [fieldName]: true };
        isValid = false;
      } else {
        newErrors = { ...newErrors, [fieldName]: false };
      }
    });
    if (isValid) {
      const { confirmPassword, ...body } = fields;
      register(body);
    }
    setErrors(newErrors);
  };

  const render = () => {
    if (isError) {
      return <p className="auth-error-message">User already exists</p>;
    }
    if (isSuccess) {
      navigate('/login');
    }
    return <></>;
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      {fieldNames.map((fieldName) => (
        <>
          <input
            key={fieldName}
            id={`auth-${fieldName}-input`}
            type={fieldName === 'password' || fieldName === 'confirmPassword' ? 'password' : 'text'}
            name={fieldName}
            value={fields[fieldName]}
            placeholder={fieldName.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
            onChange={(e) => setFields({ ...fields, [fieldName]: e.target.value })}
            className={`auth-input ${errors[fieldName] ? 'invalid' : ''}`}
          />
          {errors[fieldName] && <p className="auth-error-message">Please enter a valid value</p>}
        </>
      ))}
      <button type="button" className="auth-submit-button" onClick={handleSubmit}>Submit</button>
      <div className="auth-footer">
        <Link to="/login" className="auth-link">Already have an account?</Link>
        {render()}
      </div>

    </div>
  );
};

export default Register;
