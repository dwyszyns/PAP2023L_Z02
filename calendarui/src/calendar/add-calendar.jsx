import React, { useState } from 'react';
import './add-calendar.css';
import { useAddCalendarMutation } from '../store/api';

const AddCalendar = () => {
  const defaultFields = {
    name: '',
    isPublic: false,
  };

  const [fields, setFields] = useState(defaultFields);

  const [errors, setErrors] = useState({
    name: false,
    isPublic: false,
  });

  const [isPublicInfo, setIsPublicInfo] = useState('');
  const [addCalendar] = useAddCalendarMutation();

  const handleAdd = () => {
    fields.isPublic = isPublicInfo === '1';
    let newErrors = { ...errors };
    let isValid = true;
    if (!fields.name) {
      newErrors = { ...newErrors, name: true };
      isValid = false;
    } else {
      newErrors = { ...newErrors, name: false };
    }
    if (isValid) {
      const { ...body } = fields;
      addCalendar(body);
    }
    setErrors(newErrors);
    setFields(defaultFields);
  };

  return (
    <div className="form-add-calendar">
      <header className="title-add-calendar">Add a new calendar</header>
      <label className="choose-name-calendar">Choose a name for your new calendar:</label>
      <input
        type="text"
        name="name"
        value={fields.name}
        placeholder={'Name'.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
        className="add-calendar-input"
        onChange={(e) => setFields({ ...fields, name: e.target.value })}
      />
      {errors.name && <p className="auth-error-message-cal">Please enter a valid value</p>}

      <label htmlFor="visible" className="question-form-visible">Choose a privacy for your new calendar:</label>
      <select className="custom-select" onChange={(calendar) => setIsPublicInfo(calendar.target.value)} name="privacy">
        <option value="0">Private</option>
        <option value="1">Public</option>
      </select>
      <p className="info-add-calendar">
        <i>
          If you want your calendar to be visible to your friends,
          choose &quot;Public&quot;, otherwise leave it on &quot;Private&quot;
        </i>
      </p>

      <button type="button" className="add-calendar-button" onClick={() => handleAdd()}>Add</button>
      <div className="auth-footer" />
    </div>
  );
};

export default AddCalendar;
