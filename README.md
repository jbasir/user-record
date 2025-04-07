### First clone the repository

```bash
git clone https://github.com/jbasir/user-record
```

### Run Frontend

# Step 1: Go to user-registration directory

```bash
cd user-registration
```

# Step 2: Install dependencies and Run project

```bash
npm install
ng serve
```

### Run Backend

# Step 1: Go to user-registration-express directory

```bash
cd user-registration-express
```

### Step 2: Set Up Environment Variables
1. Copy the `.env-example` file to create a new `.env` file:
```bash
cp .env-example .env
```

2. Update the following environment variables in your `.env` file:
- `DATABASE_URL`: Your MySQL connection string
- `MYSQL_ROOT_PASSWORD`: Your MySQL root password
- `MYSQL_DATABASE`: Your database name

Example configuration:
```
DATABASE_URL="mysql://root:root@localhost:3306/registro?schema=public"
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=registro
```

# Step 3: Install dependencies and Run project

```bash
npm install
npx prisma migrate dev --name init (Remember to have your MySQL server running)
npm run start
```


Run Frontend with Docker

# Step 1: Go to user-registration directory

```bash
cd user-registration-
```

# Step 2: Run commands

```bash
docker build -t user_registration_front .
docker run -p 4300:80 user_registration_front
```

Run Backend with Docker

# Step 1: Go to user-registration directory

```bash
cd user-registration-express
```

# Step 2: Run commands

```bash
docker compose up --build
```