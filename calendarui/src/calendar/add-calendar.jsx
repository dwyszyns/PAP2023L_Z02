import React, { useState } from 'react';
import './add-calendar.css';

const AddCalendar = () => {
  const [fields, setFields] = useState({
    name: '',
    isPublic: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    isPublic: false,
  });

  const fieldNames = ['name', 'isPublic'];
  const [isPublicInfo, setIsPublicInfo] = useState('');

  const handleAdd = async () => {
    if (isPublicInfo === '1') {
      fields.isPublic = true;
    } else {
      fields.isPublic = false;
    }
    let newErrors = { ...errors };
    let isValid = true;
    fieldNames.forEach((fieldName) => {
      if (fields[fieldName].trim() === '') {
        newErrors = { ...newErrors, [fieldName]: true };
        isValid = false;
      } else {
        newErrors = { ...newErrors, [fieldName]: false };
      }
    });
    if (isValid) {
      const { ...body } = fields;
      // addCalendar(body);
    }
    setErrors(newErrors);
  };

  return (
    <div className="form-add-calendar">
      <header className="title-add-event">Add a new calendar</header>
      <label className="choose-name-calendar">Choose a name for your new calendar:</label>
      <input
        type="text"
        name="name"
        value={fields.name}
        placeholder={'Name'.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
        className="add-calendar-input"
        onChange={(e) => setFields({ ...fields, name: e.target.value })}
      />
      {errors.name && <p className="auth-error-message">Please enter a valid value</p>}

      <label htmlFor="visible" className="question-form-visible">Choose a privacy for your new calendar:</label>
      <select className="custom-select" onChange={(calendar) => setIsPublicInfo(calendar.target.value)} name="privacy">
        <option value="0">Private</option>
        <option value="1">Public</option>
      </select>
      <p className="info-add-calendar"><i>If you want your calendar to be visible to your friends, choose "Public", otherwise leave it on "Private".</i></p>

      <button type="button" className="add-calendar-button" onClick={handleAdd}>Add</button>
      <div className="auth-footer" />
    </div>
  );
};

export default AddCalendar;
