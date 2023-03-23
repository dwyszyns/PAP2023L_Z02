import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMemberByIdQuery } from '../store';
import './member.css';

const MemberProfile = () => {
  const { memberId } = useParams();
  const { error, data, isLoading } = useGetMemberByIdQuery(memberId);

  const renderProfile = (profileData) => data && (
  <div className="profile-container">
    <div className="profile-picture" />
    <div className="names-container">
      <p>{`${profileData.firstName} ${profileData.lastName}`}</p>
      <p>{profileData.username}</p>
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
