import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetFriendsForMemberIdQuery } from '../../store/api';
import '../sidebar.css';
import FriendRequest from './friend-request';

const FriendsSidebar = () => {
  const [selectedFriend, setSelectedFriend] = useState('');
  const { data, isLoading, error } = useGetFriendsForMemberIdQuery('current');

  const isSelected = (username) => username === selectedFriend;

  const renderClassName = (friendReq) => [
    'nested-sidebar-button',
    isSelected(friendReq.friend.username) ? 'selected' : '',
  ].join(' ');

  return (
    <>
      <div className="nested-sidebar">
        <p className="nested-sidebar-title">
          Friends
        </p>
        {!isLoading && !error && data.map((friendReq) => (
          <>
            {friendReq.accepted
              ? (
                <button
                  type="button"
                  key={friendReq.friend.username}
                  className={renderClassName(friendReq)}
                  onClick={() => setSelectedFriend(friendReq.friend.username)}
                >
                  <Link to={`/member/${friendReq.friend.id}`} className="nested-sidebar-link">
                    <div className="friend-profile-picture" />
                    {friendReq.friend.username}
                  </Link>
                </button>
              )
              : <FriendRequest request={friendReq} />}
          </>

        ))}
      </div>
    </>
  );
};

export default FriendsSidebar;
