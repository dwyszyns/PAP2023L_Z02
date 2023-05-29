import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchMembersQuery, useSendFriendRequestMutation } from '../../store/api';
import '../sidebar.css';
import MemberIcon from '../../icons/member-icon';
import CheckIcon from './check-icon.svg';

const propTypes = {
  selectedNewFriend: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  friends: PropTypes.array.isRequired,
};

const AddFriendList = ({ selectedNewFriend, friends }) => {
  const { data, isLoading, error } = useSearchMembersQuery(selectedNewFriend);
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [addFriend] = useSendFriendRequestMutation();

  const addNewFriend = () => {
    addFriend(selectedUserId);
  };

  const friendIds = friends.map((friend) => friend.friend.id);

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
                <>
                  {friendIds.includes(user.id)
                    ? (
                      <img src={CheckIcon} alt="X" className="check-icon" />
                    )
                    : (<p className="add-new-friend-btn">+</p>)}
                </>
              </button>
            </div>
          ))}
        </>
      ) : (
        <>
          {selectedNewFriend.length !== 0 ? (
            <p className="not-found-username">User not found</p>)
          // eslint-disable-next-line max-len
            : (<p className="info-add-friend"><i>Enter first name, last name or username to search and add a new friend</i></p>)}
        </>
      )}
    </div>
  );
};

AddFriendList.propTypes = propTypes;

export default AddFriendList;
