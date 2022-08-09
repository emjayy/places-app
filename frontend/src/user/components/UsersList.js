import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  return (
    <>
      <div className="center">
        <Card className="dark">
          <h1>Welcome to PlaceUp!</h1>
          <p>
            Login to add and share your favourite visited places, and check out
            amazing places visited by others.
          </p>
        </Card>
      </div>

      {props.items.length === 0 && (
        <div className="center">
          <Card className="dark">
            <h2>No users found.</h2>
          </Card>
        </div>
      )}

      {props.items.length > 0 && (
        <ul className="users-list">
          {props.items.map((user) => (
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name}
              placeCount={user.places.length}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default UsersList;
