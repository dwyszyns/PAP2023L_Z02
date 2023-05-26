import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeclineRequestForMemberIdAndRequestIdMutation, useGetFriendsForMemberIdQuery } from '../../store/api';
import '../sidebar.css';
import FriendRequest from './friend-request';
import MemberIcon from '../../icons/member-icon';
import './friend-request.css';
import TrashBin from '../calendars/trash-bin.svg';
import SearchIcon from './search-icon.svg';

const FriendsSidebar = () => {
  const [selectedFriend, setSelectedFriend] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
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
              ? ('')
              : <FriendRequest request={friendReq} />}
          </>
        ))}
        <div className="searching-friends-container">
          <input
            type="text"
            name="name"
            value={selectedFilter}
            placeholder={'Username'.replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1} ${p2.toLowerCase()}`)}
            className="searching-friends-input"
            onChange={(e) => setSelectedFilter(e.target.value)}
          />
          <button
            type="button"
            className="searching-friends-button"
          >
            <img src={SearchIcon} alt="X" className="seen-icon" />
          </button>
        </div>
        {!isLoading && !error && data.map((friendReq) => (
          <>
            {friendReq.accepted && friendReq.friend.username.includes(selectedFilter)
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
              : ('')}
          </>
        ))}
        { selectedFilter.length === 0 ? (
          <div className="action-btn-calendar">
            <button type="button">+</button>
          </div>
        ) : ('')}
      </div>
    </>
  );
};

export default FriendsSidebar;
