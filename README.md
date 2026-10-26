# CST-391 Milestone 3 - Next.js Music REST API

- **Student:** Edgar Mendoza
- **Course:** CST-391 - JavaScript and TypeScript
- **Assignment:** Milestone 3 Benchmark - Next.js REST API

## Project Overview

This project implements a REST API for managing music albums and tracks using Next.js, TypeScript, and PostgreSQL.

The application supports CRUD operations, artist and description searches, database connectivity testing, input validation, and transactional updates.

**GitHub Repository:** https://github.com/Edgar480-design/cst391-music-app

**Live Application:** https://cst391-music-app-nu.vercel.app

## Technology Stack

- Next.js 16 and React 19
- TypeScript and Node.js
- PostgreSQL 18
- Neon PostgreSQL
- node-postgres (pg) connection pooling
- Git and GitHub
- Vercel deployment
- Postman API testing

## Architecture

The application uses the Next.js App Router and server-side REST API route handlers.

- app/page.tsx - Application home page
- app/api/albums/route.ts - GET, POST, and PUT operations
- app/api/albums/[slug]/route.ts - Artist retrieval and album deletion
- app/api/albums/search/artist/[searchTerm]/route.ts - Artist searches
- app/api/albums/search/description/[searchTerm]/route.ts - Description searches
- app/api/artists/route.ts - Distinct artist listing
- app/api/db-check/route.ts - Database connectivity verification
- lib/db.ts - PostgreSQL connection pool
- lib/types.ts - Shared TypeScript types
- lib/album-validation.ts - Input validation

## Local Setup

Requirements:

- Node.js and npm
- PostgreSQL
- A local database named music
- The course-provided music schema and sample records

Clone and prepare the project:

    git clone https://github.com/Edgar480-design/cst391-music-app.git
    cd cst391-music-app
    npm ci

Configure DATABASE_URL in an ignored local environment file with the appropriate PostgreSQL connection settings.

Import the course database schema and music sample records.

Start the development server:

    npm run dev

Local application: http://localhost:3000

## REST API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/db-check | Verify database connectivity |
| GET | /api/albums | Retrieve albums and tracks |
| GET | /api/albums?albumId=1 | Retrieve an album by ID |
| GET | /api/albums/The%20Beatles | Retrieve albums by artist |
| GET | /api/albums/search/artist/The%20Beatles | Search by artist |
| GET | /api/albums/search/description/Beatles | Search descriptions |
| GET | /api/artists | Retrieve distinct artists |
| POST | /api/albums | Create an album and its tracks |
| PUT | /api/albums | Update an album and its tracks |
| DELETE | /api/albums/14 | Delete an album by ID |

Album and track IDs in example requests must correspond to records in the selected database.

## Request Validation

POST and PUT validate album titles, artists, years, track information, and required identifiers.

- HTTP 200: Successful retrieval, update, or deletion
- HTTP 201: Successful album creation
- HTTP 400: Invalid request data
- HTTP 404: Missing album or track
- HTTP 500: Server or database error

The API uses parameterized SQL queries and PostgreSQL transactions. Failed transactional updates are rolled back to prevent partially saved changes.

## PostgreSQL Environments

Local development uses PostgreSQL.

The deployed application uses Neon PostgreSQL through the DATABASE_URL environment variable configured in Vercel.

Both environments were verified with equivalent demonstration datasets:

- 12 albums
- 177 tracks

## Testing

The API was verified with Postman and PowerShell in local and cloud environments.

Testing covered:

- Database connection verification
- Album retrieval and searches
- Artist listing
- POST, GET, PUT, and DELETE operations
- Invalid input handling
- HTTP 400 and 404 responses
- PostgreSQL transaction rollback
- Removal of temporary test records

Quality checks:

    npx tsc --noEmit
    npm run lint
    npm run build

The production build completed successfully.

## GitHub and Vercel Deployment

The repository is integrated with Vercel.

Pushing commits to the main branch automatically triggers a new Vercel deployment.

The latest API improvements were deployed and verified against Neon PostgreSQL.

## Security

Database credentials are provided through environment variables and are not tracked in Git.

Parameterized SQL queries help prevent SQL injection. Input validation and database transactions improve reliability and data integrity.

This project is an educational demonstration. CRUD endpoints are publicly accessible and do not implement authentication or authorization. A production application serving untrusted users would require appropriate access controls.

## References

- Next.js: https://nextjs.org/docs
- PostgreSQL: https://www.postgresql.org/docs/
- Neon: https://neon.com/docs
- Vercel: https://vercel.com/docs
- node-postgres: https://node-postgres.com/