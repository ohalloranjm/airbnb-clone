# waterbnb

A water-themed airbnb clone.

## Technologies Used

- Express
- Sequelize
- React
- Redux

## How to Launch Locally

### Backend Setup

1. `cd` into the `/backend` directory.
1. Run `npm install` to install dependencies.
1. Create a file named `.env` and populate it according to the `.env.example` file.
1. Run `npx dotenv sequelize db:migrate` to create your database and tables.
1. Run `npx dotenv sequelize db:seed:all` to populate your database with sample data.
1. Run `npm start` to start listening for API requests.

### Frontend Setup

1. `cd` into the `/frontend` folder.
1. Run `npm install` to install dependencies.
1. Run `npm run dev` to launch the project locally.
1. Open the `localhost` port in your browser (it will default to `localhost:5173` if possible) to view the site!
