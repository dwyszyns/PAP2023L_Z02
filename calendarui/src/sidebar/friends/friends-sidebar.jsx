import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useDeclineRequestForMemberIdAndRequestIdMutation,
  useGetFriendsForMemberIdQuery,
  useSearchMembersQuery,
} from '../../store/api';
import '../sidebar.css';
import FriendRequest from './friend-request';
import MemberIcon from '../../icons/member-icon';
import TrashBin from '../calendars/trash-bin.svg';
import SearchIcon from './search-icon.svg';

const FriendsSidebar = () => {
  const [selectedFriend, setSelectedFriend] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const { data, isLoading, error } = useGetFriendsForMemberIdQuery('current');
  const [deleteRequest] = useDeclineRequestForMemberIdAndRequestIdMutation();

  const defaultFields = {
    username: '',
  };

  const [fields, setFields] = useState(defaultFields);

  // const [errors, setErrors] = useState({
  //   username: false,
  // });

  const { searchedData, loading, err } = useSearchMembersQuery(fields.username);
  const isSelected = (username) => username === selectedFriend;

  const renderClassName = (friendReq) => [
    'nested-sidebar-button',
    isSelected(friendReq.friend.username) ? 'selected' : '',
  ].join(' ');

  const handleSearch = () => {
    fields.username = selectedFilter;
    console.log(searchedData);
  };

  return (
    <>
      <div className="nested-sidebar">
        <p className="nested-sidebar-title">
          Friends
        </p>
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
            onClick={handleSearch}
          >
            <img src={SearchIcon} alt="X" className="seen-icon" />
          </button>
        </div>
        <div>
          <div>
            {!loading && !err ? (<p />) : (<p> moja stara</p>) }
          </div>
        </div>
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
