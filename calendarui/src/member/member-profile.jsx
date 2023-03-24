import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMemberByIdQuery } from '../store';
import './member.css';

const MemberProfile = () => {
  const { memberId } = useParams();
  const { error, data, isLoading } = useGetMemberByIdQuery(memberId);

  const renderDateJoined = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return `Joined on ${new Date(Date.parse(date)).toLocaleString('en-GB', options)}`;
  };

  const renderProfile = (profileData) => data && (
  <div className="profile-container">
    <div className="profile-picture" />
    <div className="description">
      <p className="full-name">{`${profileData.firstName} ${profileData.lastName}`}</p>
      <p className="username">
        {`#${profileData.username}`}
      </p>
      <p className="joined">
        {renderDateJoined(profileData.dateJoined)}
      </p>
    </div>
  </div>
  );

  const render = () => {
    if (error) return <>Oh no! There was an error!</>;
    if (isLoading) return <>Loading</>;
    return renderProfile(data);
  };

  return render();
};

export default MemberProfile;
