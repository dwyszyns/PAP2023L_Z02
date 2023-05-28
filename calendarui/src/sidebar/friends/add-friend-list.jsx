import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchMembersQuery } from '../../store/api';
import '../sidebar.css';
import MemberIcon from '../../icons/member-icon';

const propTypes = {
  selectedNewFriend: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  friends: PropTypes.array.isRequired,
};

const AddFriendList = ({ selectedNewFriend, friends }) => {
  const { data, isLoading, error } = useSearchMembersQuery(selectedNewFriend);
  const [selectedUserId, setSelectedUserId] = useState(-1);

  const addNewFriend = () => {
    setSelectedUserId(0);
  };

  return (
    <div className="add-friend-list-container">
      {!isLoading && !error && data.length !== 0 ? (
        <>
          {!isLoading && !error && data.map((user) => (
            <div className="new-friend-elem">
              <div className="new-friend-username">
                <MemberIcon />
                {user.username}
              </div>
              <button
                type="button"
                className="add-new-friend-btn-container"
                onClick={() => {
                  setSelectedUserId(user.id);
                  addNewFriend();
                }}
              >
                <p className="add-new-friend-btn">+</p>
              </button>
            </div>
          ))}
        </>
      ) : (
        <>
          {selectedNewFriend.length !== 0 ? (
            <p className="not-found-username">User not found</p>) : ('')}
        </>
      )}
    </div>
  );
};

AddFriendList.propTypes = propTypes;

export default AddFriendList;
