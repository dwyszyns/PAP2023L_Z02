# PAP2023L-Z02

# Technology
### Backend
- Java 17 with Gradle build engine
- Springboot 3.04
    - Spring Web
    - Spring Data JPA
    - Spring Security
    - Spring Websocket
### Frontend
- Javascript
- React with Neutrino toolchain
- Redux with Redux Toolkit
### Database
- In-memory H2 database (for prototyping)
- MySQL database

# Functionality

### Security
- User authorization and authentication based on jwt tokens (with refresh)
- A page for logging in and registering

### Core functionality

- Creating calendars and allowing users to add others to their calendars
- Allowing users to find and join public calendars
- Creating events inside calendars
- Listening to / ingoring already created events
- Toggling automatic listening to new events for a calendar
- Allowing / disallowing event creation for users by calendar owner
- Receiving notifications for reminders for events
- Dynamic reminders
- Sending / receiving friend requests

# Running the application

### Full application

Make sure that docker and docker-compose are installed and the docker daemon is running. Then run

```docker compose up```

from the root directory of the project. This will start the database and the backend and frontend servers.

### Only the database instance (local development)

Make sure that docker and docker-compose are installed and the docker daemon is running. Then run

```docker compose create mysqldb && docker compose start mysqldb```

from the root directory of the project. This will start the database without the backend and frontend servers.

# Authors

- Rafał Cendrowski

- Dominika Wyszyńska

- Filip Szyszko
