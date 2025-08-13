# Run locally

## Ensure

```sh
node >= v22.14.0
pnpm >= v10.7.0
```

## CMD to dev

### first apply migration to generate db
```sh
pnpm prisma:deploy
```

### View collection table (like mongo compass)
```sh
pnpm prisma:studio
```

### if not have prisma client (use this command to generate)

```sh
pnpm prisma:generate
```

### Start dev
```sh
pnpm start:dev
```

# Run container

## Ensure

```sh
docker >= v27.4.0
```

## CMD to run

```sh
pnpm docker:start
```

## CMD to stop

```sh
pnpm docker:stop
```

# Api Docs (curent using Swagger)

```sh
at /swagger
```

# For use api in your app

## 🌱 Environment Variables

Create a `.env` file in the root of your project and define the following variables:

| Variable       | Description                                 | Example / Default                               |
|----------------|---------------------------------------------|--------------------------------------------------|
| `DATABASE_URL` | Connection string for your PostgreSQL DB    | `postgresql://jira:jira@localhost:5432/jira`     |
| `JWT_SECRET`   | Secret key for signing JWT tokens           | `asdakdhajhsdkjahsdkjhakdhkajhdkjashk`           |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated list) | `http://localhost:3000,http://localhost:4000`    |
| `PORT`         | Port number the app will run on             | `3001`                                           |

### 📄 Example `.env` file

```env
DATABASE_URL="postgresql://jira:jira@localhost:5432/jira"
JWT_SECRET="asdakdhajhsdkjahsdkjhakdhkajhdkjashk"
CORS_ORIGINS="http://localhost:3000,http://localhost:4000"
PORT=3001
