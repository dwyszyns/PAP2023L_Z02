import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeclineRequestForMemberIdAndRequestIdMutation, useGetFriendsForMemberIdQuery } from '../../store/api';
import '../sidebar.css';
import FriendRequest from './friend-request';
import MemberIcon from '../../icons/member-icon';
import TrashBin from '../calendars/trash-bin.svg';

const FriendsSidebar = () => {
  const [selectedFriend, setSelectedFriend] = useState('');
  const { data, isLoading, error } = useGetFriendsForMemberIdQuery('current');
  const [deleteRequest] = useDeclineRequestForMemberIdAndRequestIdMutation();

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
                    <MemberIcon />
                    {friendReq.friend.username}
                  </Link>
                  <button type="button" className="calendar-nav-elem-remove" onClick={() => deleteRequest(friendReq.requestId)}>
                    <img id={`trash${friendReq.requestId.toString()}`} src={TrashBin} alt="X" className="trash-bin-icon" />
                  </button>
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
