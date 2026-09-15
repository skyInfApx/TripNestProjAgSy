# TripNest — Travel Planning & Trip Management Platform

TripNest is a full-stack web application designed for modern travelers to plan trips, organize day-wise itineraries, manage travel budgets, track expenses, and collaborate with travel companions.

---

## 🏗️ Tech Stack

### Backend
- **Java 17 / 21** & **Spring Boot 3.3.3**
- **Spring Security 6** (Stateless JWT Authentication + Role-Based Access Control)
- **Spring OAuth2 Client** (Google Sign-In)
- **Spring Data JPA & Hibernate**
- **PostgreSQL / MySQL / H2**
- **JJWT 0.12.5**
- **Maven** & **Lombok**

### Frontend
- **React.js 18** (Vite)
- **Tailwind CSS**
- **React Router v6**
- **Axios** (with automatic JWT Authorization Interceptor)
- **Lucide Icons**
- **Context API**

---

## 🚀 Getting Started

### 1. Backend Setup

1. Make sure you have **Java 17+** and **PostgreSQL** installed (or use MySQL/H2).
2. Create database (if using PostgreSQL):
   ```sql
   CREATE DATABASE tripnest_db;
   ```
3. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   *The backend starts on `http://localhost:8080`.*
   *On first run, default roles (`ROLE_TRAVELER`, `ROLE_GROUP_ADMIN`, `ROLE_ADMIN`) and demo accounts are automatically seeded!*

#### Default Demo Accounts:
- **Traveler Account**: `traveler@tripnest.com` / `Traveler@123`
- **Admin Account**: `admin@tripnest.com` / `Admin@123`

---

### 2. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Vite dev server:
   ```bash
   npm run dev
   ```
   *The frontend starts on `http://localhost:5173`.*

---

## 📋 Milestone 1 Completed Features

- [x] **Database Schema**: Comprehensive JPA entities (`User`, `Role`, `UserProfile`, `Trip`, `Itinerary`, `Activity`, `Budget`, `Expense`, `Destination`, `Notification`).
- [x] **Spring Security 6 & JWT**: Stateless token issuance, validation, password hashing with BCrypt.
- [x] **Google OAuth2**: Integration flow and token exchange.
- [x] **Role-Based Access Control (RBAC)**: `ROLE_TRAVELER`, `ROLE_GROUP_ADMIN`, `ROLE_ADMIN`.
- [x] **Authentication REST APIs**:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
  - `GET /api/auth/check-email`
  - `GET /api/users/profile`
  - `PUT /api/users/profile`
- [x] **React Frontend**:
  - Modern responsive UI with Tailwind CSS & Glassmorphism styling.
  - Centralized Axios client with JWT request interceptor and error handling.
  - `AuthContext` for global session management and token persistence.
  - Pages: Home, Login, Register, OAuth2 Redirect Handler, Profile & Travel Preferences, 404.
  - Security & RBAC playground for live endpoint testing.


------------

*********************************************
------------
# TripNest Backend — Travel Planning & Management API
------------
*********************************************


TripNest is a modular, high-performance **Spring Boot 3.3.3** backend application designed for modern travel planning, day-wise itinerary scheduling, budget and expense tracking, group collaboration, and travel analytics.

---

## 🏗️ Tech Stack & Frameworks

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Language** | Java | `17` / `21` (LTS) | Core application runtime |
| **Framework** | Spring Boot | `3.3.3` | Application framework & IoC container |
| **Security** | Spring Security | `6.3.3` | Stateless authentication, authorization & filter chain |
| **Token Auth** | JJWT (`jjwt-api`, `jjwt-impl`, `jjwt-jackson`) | `0.12.5` | Secure HMAC-SHA256 JWT generation and parsing |
| **OAuth2** | Spring Security OAuth2 Client | `6.3.3` | Google OAuth2 social login |
| **Data / ORM** | Spring Data JPA / Hibernate | `6.5.2` | Object-relational mapping & repositories |
| **Database** | PostgreSQL | `14+` / `15+` / `16+` | Primary relational database (Production & Dev) |
| **Alternative DB**| MySQL / H2 Engine | `8.3.0` / `2.2.224` | Optional local development & zero-setup in-memory testing |
| **Validation** | Jakarta Bean Validation | `3.0.2` | Input validation (`@Valid`, `@NotBlank`, `@Email`) |
| **Boilerplate** | Project Lombok | `1.18.34` | Code simplification (Getters, Setters, Builders) |
| **Testing** | JUnit 5 & Mockito | `5.10.x` | Unit and integration test suite |
| **Build Tool** | Apache Maven | `3.8+` / `3.9+` | Build & dependency management |

---

## 🏛️ System Architecture & Layered Package Structure

The backend follows a strict multi-tier, clean architecture:

```
com.tripnest/
├── TripNestApplication.java       # Application entry point with @EnableJpaAuditing
├── common/                        # Shared base models and response wrappers
│   ├── ApiResponse.java           # Standardized API response format { success, message, data, errors, timestamp }
│   ├── BaseEntity.java            # Auditing superclass with createdAt & updatedAt
│   └── AppConstants.java          # Global constants (Roles, Auth headers, Pagination defaults)
├── config/                        # Security and application configurations
│   ├── SecurityConfig.java        # Spring Security 6 FilterChain, CORS, stateless session
│   ├── CorsConfig.java            # Cross-Origin Resource Sharing configuration
│   └── DataInitializer.java      # Startup seeding for default roles & demo accounts
├── controller/                    # REST API controllers
│   ├── AuthController.java        # Registration, Login, Current User, Email check
│   ├── UserController.java        # Profile viewing and updates
│   └── TestController.java        # Public & RBAC role verification endpoints
├── dto/                           # Data Transfer Objects
│   ├── request/                   # LoginRequest, RegisterRequest, UpdateProfileRequest
│   └── response/                  # AuthResponse, UserResponse, UserProfileResponse
├── entity/                        # JPA persistent database entities
│   ├── User.java, Role.java, RoleName.java, UserProfile.java, AuthProvider.java
│   ├── Trip.java, TripStatus.java, TripVisibility.java
│   ├── Itinerary.java, Activity.java, ActivityType.java, ActivityStatus.java
│   ├── Budget.java, Expense.java, ExpenseCategory.java
│   └── Destination.java, Notification.java, NotificationType.java
├── exception/                     # Global exception handling
│   ├── GlobalExceptionHandler.java# @RestControllerAdvice for uniform error responses
│   ├── ResourceNotFoundException.java
│   ├── BadRequestException.java
│   └── UnauthorizedException.java
├── repository/                    # Spring Data JPA repositories
│   ├── UserRepository.java, RoleRepository.java, UserProfileRepository.java
│   ├── TripRepository.java, ItineraryRepository.java, ActivityRepository.java
│   ├── BudgetRepository.java, ExpenseRepository.java
│   └── DestinationRepository.java, NotificationRepository.java
├── security/                      # Authentication & authorization implementation
│   ├── JwtTokenProvider.java      # JWT generation, signature verification, claims extraction
│   ├── JwtAuthenticationFilter.java# Intercepts requests & sets SecurityContext
│   ├── CustomUserDetailsService.java# Loads UserDetails from database
│   ├── UserPrincipal.java         # UserDetails & OAuth2User implementation
│   ├── RestAuthenticationEntryPoint.java # Returns 401 JSON on unauthenticated access
│   └── oauth2/                    # Google OAuth2 user service, success & failure handlers
└── service/                       # Business logic layer (Interfaces & Implementations)
    ├── AuthService.java / AuthServiceImpl.java
    └── UserService.java / UserServiceImpl.java
```

---

## 🗺️ Detailed Milestone Coverage (Milestones 1 to 4)

### 📌 Milestone 1: Requirements, Database Schema & Authentication (Completed)
- **Database Schema**: Comprehensive JPA relational schema with foreign key constraints, unique indexes, cascading, and JPA auditing timestamps (`BaseEntity`).
- **Spring Security 6 & JWT Auth**:
  - Stateless Bearer token authentication via `JwtAuthenticationFilter`.
  - Password encryption using `BCryptPasswordEncoder` (10 rounds).
  - Role-Based Access Control (RBAC) with `ROLE_TRAVELER`, `ROLE_GROUP_ADMIN`, and `ROLE_ADMIN`.
  - Google OAuth2 social login integration with automatic user and profile creation.
- **REST APIs**:
  - `POST /api/auth/register` — Validates input, hashes password, assigns `ROLE_TRAVELER`, returns JWT + User details.
  - `POST /api/auth/login` — Authenticates credentials via `AuthenticationManager`, returns JWT token.
  - `GET /api/auth/me` — Fetches current authenticated user details.
  - `GET /api/auth/check-email` — Validates email availability during registration.
  - `GET /api/users/profile` & `PUT /api/users/profile` — Manages personal info, travel styles, and favorite destinations.
  - `GET /api/test/public`, `/traveler`, `/admin` — Verification endpoints for RBAC rules.
- **Data Seeding**: Automatic startup creation of roles and demo traveler/admin accounts via `DataInitializer`.

---

### 📌 Milestone 2: Trip & Itinerary Management (Weeks 3 & 4)
- **Trip Management APIs (`/api/trips`)**:
  - Create, view, update, delete, and list personal trips.
  - Support for destinations, start/end dates, estimated budgets, currencies, status (`PLANNING`, `ONGOING`, `COMPLETED`, `CANCELLED`), and visibility (`PRIVATE`, `SHARED`, `PUBLIC`).
- **Day-Wise Itinerary Planning APIs (`/api/itineraries`)**:
  - Create, retrieve, update, and delete day-wise itinerary sheets linked to trips.
  - Ordered by `dayNumber` and `itineraryDate` with day titles and notes.
- **Activity Scheduling APIs (`/api/activities`)**:
  - Schedule time-slotted activities under itineraries with types: `SIGHTSEEING`, `TRANSPORTATION`, `ACCOMMODATION`, `DINING`, `ADVENTURE`, `SHOPPING`.
  - Start/end time tracking, location coordinates, costs, status (`PLANNED`, `COMPLETED`, `SKIPPED`), and notes.
- **Destination Catalog APIs (`/api/destinations`)**:
  - Query destination guides, attractions, coordinates (latitude/longitude), climate info, and average user ratings.
  - Public search and autocomplete endpoint by city, country, or keyword.
- **Trip Workflow Integration**: Relational integrity connecting `Trip` → `Itinerary` → `Activity` → `Destination`.

---

### 📌 Milestone 3: Budget, Expenses, Collaboration & Media (Weeks 5 & 6)
- **Budget Planning APIs (`/api/budgets`)**:
  - Trip budget creation and management with configurable threshold percentage alerts (e.g., alert when 80% of budget is consumed).
- **Expense Tracking & Summary APIs (`/api/expenses`)**:
  - Record, update, and delete expenses linked to trips and budgets.
  - Categorization: `TRANSPORTATION`, `HOTEL`, `FOOD`, `SHOPPING`, `ENTERTAINMENT`, `MISCELLANEOUS`.
  - Aggregation queries for total trip expense vs planned budget.
- **Group Collaboration APIs (`/api/groups`)**:
  - Create travel groups, generate invite codes/links, manage group member roles (`GROUP_ADMIN`, `MEMBER`, `VIEWER`), and share itineraries.
  - Real-time discussion/activity comments.
- **Shared Expenses & Settlement**:
  - Split expense calculations among group members, tracking who paid and who owes.
- **Notifications & Document Management (`/api/notifications`, `/api/media`)**:
  - Dispatch trip reminders, budget threshold alerts, and group invitations.
  - File upload endpoints for travel tickets, hotel booking confirmations, and trip photos (local multi-part or AWS S3 / Cloudinary).

---

### 📌 Milestone 4: Analytics, Testing, Optimization & Deployment (Weeks 7 & 8)
- **Traveler Analytics APIs (`/api/analytics/traveler`)**:
  - Aggregated metrics: Upcoming trips count, budget utilization rate, category-wise spending breakdown, monthly travel frequency, and top visited destinations.
- **Admin Platform Analytics APIs (`/api/analytics/admin`)**:
  - System-wide statistics: Total registered travelers, active ongoing trips, top trending destinations, user growth rate, and error logs.
- **Automated Testing Suite**:
  - Unit tests with **JUnit 5** and **Mockito** for all service layers (`AuthServiceTest`, `TripServiceTest`, `BudgetServiceTest`).
  - Integration tests with **Spring Security Test** and `MockMvc` for controller endpoints.
- **Performance & Security Tuning**:
  - Database composite indexing on high-frequency query columns (`user_id`, `trip_id`, `start_date`).
  - Connection pooling optimization via **HikariCP** tuning.
  - `EXPLAIN ANALYZE` query plan validation to prevent N+1 query problems.
- **Production Deployment & Dockerization**:
  - Multi-stage `Dockerfile` producing a lightweight container image.
  - `docker-compose.yml` orchestrating the Spring Boot Backend and PostgreSQL database.

---

## 📡 REST API Reference (Milestones 1 – 4)

### 1. Authentication & User Profile (Milestone 1)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | ❌ None | Register a new user account |
| `POST` | `/api/auth/login` | ❌ None | Login and receive JWT access token |
| `GET` | `/api/auth/me` | 🔒 Traveler / Admin | Get authenticated user info |
| `GET` | `/api/auth/check-email` | ❌ None | Check if an email is already registered |
| `GET` | `/api/users/profile` | 🔒 Traveler / Admin | Retrieve full profile & travel preferences |
| `PUT` | `/api/users/profile` | 🔒 Traveler / Admin | Update profile details, currency, travel tags |
| `GET` | `/api/test/public` | ❌ None | Public test endpoint |
| `GET` | `/api/test/traveler` | 🔒 Traveler / Admin | RBAC test for authenticated users |
| `GET` | `/api/test/admin` | 🔒 Admin only | RBAC test requiring `ROLE_ADMIN` |

---

### 2. Trips, Itineraries & Activities (Milestone 2)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/trips` | 🔒 Traveler | Create a new trip |
| `GET` | `/api/trips` | 🔒 Traveler | Get all trips owned by logged-in user |
| `GET` | `/api/trips/{id}` | 🔒 Traveler | Get full trip details with itineraries |
| `PUT` | `/api/trips/{id}` | 🔒 Traveler (Owner) | Update trip information |
| `DELETE`| `/api/trips/{id}` | 🔒 Traveler (Owner) | Delete a trip and associated data |
| `POST` | `/api/trips/{tripId}/itineraries` | 🔒 Traveler | Add a day-wise itinerary sheet |
| `GET` | `/api/trips/{tripId}/itineraries` | 🔒 Traveler | Get all itinerary days for a trip |
| `POST` | `/api/itineraries/{itineraryId}/activities` | 🔒 Traveler | Add an activity to an itinerary day |
| `PUT` | `/api/activities/{id}` | 🔒 Traveler | Update activity timing, cost, or status |
| `DELETE`| `/api/activities/{id}` | 🔒 Traveler | Remove an activity |
| `GET` | `/api/destinations` | ❌ None | Search & browse destination guides |
| `GET` | `/api/destinations/{id}` | ❌ None | Get destination details & attractions |

---

### 3. Budgets, Expenses, Groups & Notifications (Milestone 3)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/trips/{tripId}/budget` | 🔒 Traveler | Set or update trip total budget |
| `GET` | `/api/trips/{tripId}/budget` | 🔒 Traveler | Get budget allocation and spent amount |
| `POST` | `/api/trips/{tripId}/expenses` | 🔒 Traveler | Log a new expense |
| `GET` | `/api/trips/{tripId}/expenses` | 🔒 Traveler | Get all logged expenses for a trip |
| `GET` | `/api/trips/{tripId}/expenses/summary`| 🔒 Traveler | Get category-wise expense breakdown |
| `DELETE`| `/api/expenses/{id}` | 🔒 Traveler | Delete an expense entry |
| `POST` | `/api/groups` | 🔒 Traveler | Create a new travel group |
| `POST` | `/api/groups/{groupId}/invite` | 🔒 Group Admin | Invite member to group |
| `GET` | `/api/notifications` | 🔒 Traveler | Get user notifications & alerts |
| `PATCH` | `/api/notifications/{id}/read` | 🔒 Traveler | Mark notification as read |
| `POST` | `/api/media/upload` | 🔒 Traveler | Upload tickets, booking docs, or photos |

---

### 4. Analytics & Reports (Milestone 4)
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/analytics/traveler` | 🔒 Traveler | Get personal travel stats & dashboard metrics |
| `GET` | `/api/analytics/admin/overview` | 🔒 Admin only | Get platform-wide user, trip & revenue stats |
| `GET` | `/api/reports/trip/{tripId}/pdf` | 🔒 Traveler | Export complete trip & expense report |

---

## ⚙️ Configuration Profiles

Configuration is managed via Spring Boot profiles in `src/main/resources/`:

### 1. `dev` Profile (Default — PostgreSQL)
Located at `application-dev.yml`:
```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/tripnest_db}
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:postgres}
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

### 2. `h2` Profile (Zero-Setup In-Memory Mode)
Located at `application-h2.yml`:
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:tripnest_db;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;MODE=PostgreSQL
    driverClassName: org.h2.Driver
    username: sa
    password: 
  h2:
    console:
      enabled: true
      path: /h2-console
```

---

## 🚀 How to Run the Backend

### Prerequisites
- **JDK 17+** (`java -version`)
- **Maven 3.8+** (`mvn -v`)
- **PostgreSQL 14+** (or use H2 mode with zero installation)

### Option 1: Run with PostgreSQL (Standard)
1. Create the database:
   ```sql
   CREATE DATABASE tripnest_db;
   ```
2. Run Spring Boot:
   ```bash
   mvn spring-boot:run
   ```

### Option 2: Run with In-Memory H2 (Instant Zero-Setup)
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```
*Backend starts immediately on `http://localhost:8080`.*  
*H2 Web Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:tripnest_db`).*

---

## 👥 Seeded Demo Accounts (Instant Testing)

The `DataInitializer` seeds these accounts automatically on startup:

| Account Type | Email | Password | Assigned Roles |
| :--- | :--- | :--- | :--- |
| **Traveler** | `traveler@tripnest.com` | `Traveler@123` | `ROLE_TRAVELER` |
| **Admin** | `admin@tripnest.com` | `Admin@123` | `ROLE_ADMIN`, `ROLE_TRAVELER`, `ROLE_GROUP_ADMIN` |

---

## 🧪 Testing with cURL / Postman

### 1. Login to get JWT Token
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "traveler@tripnest.com",
    "password": "Traveler@123"
  }'
```
**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400000,
    "user": {
      "id": 2,
      "email": "traveler@tripnest.com",
      "fullName": "Alex Rivera",
      "roles": ["ROLE_TRAVELER"]
    }
  }
}
```

### 2. Access Protected Endpoint with Token
```bash
curl -X GET http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

## 📦 Build & Package

To build the executable JAR file:
```bash
mvn clean package -DskipTests
```
The compiled JAR will be located at `target/tripnest-backend-0.0.1-SNAPSHOT.jar`. Run it with:
```bash
java -jar target/tripnest-backend-0.0.1-SNAPSHOT.jar
```


-----------------------
-----------------------



*********************************************
------------
# ✈️ TripNest — Frontend
------------
*********************************************


## Overview

TripNest is an **AI-powered travel planning and management platform** that brings trip planning, destination discovery, itineraries, budgets, expenses, and group collaboration into a unified application.

This folder contains the **React.js frontend** of TripNest. It provides the user interface and communicates with the Spring Boot backend through REST APIs.

The frontend is being developed incrementally across **4 project milestones**, with AI and distributed-system enhancements planned for future milestones.

---

## 🛠️ Technology Stack

* **React.js** — UI development
* **JavaScript** — Application logic
* **Vite** — Frontend build tool and development server
* **HTML5 / CSS3** — Structure and styling
* **Tailwind CSS** — UI styling
* **ESLint** — Code quality and linting
* **REST APIs** — Backend communication
* **JWT** — Authentication and protected API access

### Future Technologies

* Chart.js — Analytics visualization
* Spring AI + Google Gemini — AI-powered travel features
* WebSocket / real-time communication — Collaboration features as required

---

# 🏗️ Frontend Architecture

The frontend follows a component-based React architecture.

```text
React Application
│
├── Pages
│   ├── Authentication
│   ├── Dashboard
│   ├── Trips
│   ├── Itinerary
│   ├── Budget & Expenses
│   ├── Destinations
│   ├── Groups
│   └── Admin
│
├── Components
│   ├── Navbar
│   ├── Forms
│   ├── Cards
│   ├── Modals
│   └── Common UI
│
├── Services
│   └── REST API communication
│
├── Context / State
│   └── Authentication and application state
│
└── Assets
    └── Images, icons and other static resources
```

The frontend communicates with the backend through HTTP REST APIs.

```text
React Frontend
      ↓
   REST APIs
      ↓
Spring Boot Backend
      ↓
  PostgreSQL
```

---

# 📂 Project Structure

```text
code_Frontend/

├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │
│   ├── hooks/
│   │
│   ├── context/
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

The structure will evolve as additional TripNest modules are implemented.

---

# 📌 Milestone 1 — Frontend Foundation & Authentication

### React Setup

* Created React application using Vite.
* Established the initial frontend project structure.
* Configured ESLint and basic development tooling.
* Created the initial application layout.

### Backend Integration

* Connected React frontend with Spring Boot REST APIs.
* Implemented registration and login API integration.
* Added JWT-based authentication handling.
* Prepared protected API communication using Bearer tokens.

### Authentication Flow

```text
User
 ↓
React Login Page
 ↓
POST /api/auth/login
 ↓
Spring Boot
 ↓
Authentication
 ↓
JWT Token
 ↓
React
 ↓
Protected API Requests
```

**Status: 🚧 In Progress / Core Authentication Integration**

---

# 📌 Milestone 2 — Trips, Itineraries & Destinations

### Trip Management

* Trip creation and management interface.
* Trip dates, status, destinations and estimated budget.
* Personal trip listing and trip details.

### Itinerary Management

* Day-wise itinerary interface.
* Activity scheduling and management.
* Time-based activity organization.

### Destination Discovery

* Destination search and browsing.
* Destination details and attractions.
* Location and travel-related information.

**Status: 📋 Planned**

---

# 📌 Milestone 3 — Budget, Expenses & Collaboration

### Budget & Expenses

* Trip budget management interface.
* Expense recording and categorization.
* Budget utilization and threshold alerts.
* Expense summaries and visual breakdowns.

### Group Collaboration

* Travel group creation and member management.
* Group invitations.
* Shared trip and itinerary collaboration.
* Shared expense and settlement views.
* Notifications and travel document/media management.

**Status: 📋 Planned**

---

# 📌 Milestone 4 — Analytics, Testing & Deployment

### Analytics

* Traveler dashboard.
* Trip and travel statistics.
* Budget vs. actual expense visualization.
* Category-wise spending analysis.
* Admin analytics dashboard.

### Quality & Deployment

* Frontend testing.
* API integration testing.
* UI validation and error handling.
* Production build optimization.
* Docker-based deployment integration.

**Status: 📋 Planned**

---

# 🚀 Future Scope

## Milestone 5 — GenAI Travel Copilot

* Build an AI-powered travel assistant using **Spring AI + Google Gemini** for intelligent itinerary generation and contextual travel recommendations.
* Add AI-assisted receipt processing to extract expense information and simplify expense logging.

## Milestone 6 — Distributed & Event-Driven Architecture

* Integrate frontend capabilities with event-driven backend services using **Apache Kafka** and distributed caching using **Redis** where required.
* Evolve the application toward a scalable microservices-based architecture while maintaining a consistent user experience.

---

# 🔐 Authentication & Security

TripNest uses **JWT-based stateless authentication**.

After successful login, the backend returns a JWT access token. The frontend uses the token when accessing protected APIs.

```text
Login
  ↓
JWT received
  ↓
Frontend authentication state
  ↓
Authorization: Bearer <JWT>
  ↓
Protected Backend API
```

Role-based access will control features and pages based on the authenticated user's permissions.

---

# 🔄 Frontend–Backend Integration

The frontend consumes Spring Boot REST APIs for application data.

```text
┌─────────────────────┐
│    React Frontend   │
│                     │
│ Pages / Components  │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           │
           ▼
┌─────────────────────┐
│ Spring Boot Backend │
│                     │
│ REST Controllers    │
│ Services            │
│ Security / JWT      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PostgreSQL      │
└─────────────────────┘
```

---

# ▶️ Development Setup

## Prerequisites

* Node.js
* npm
* Git

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Build Production Version

```bash
npm run build
```

## Run ESLint

```bash
npm run lint
```

---

# 🌐 Backend Configuration

The frontend will communicate with the Spring Boot backend running locally during development.

Typical backend URL:

```text
http://localhost:8080
```

API configuration will be centralized as the frontend grows to avoid hard-coding backend URLs across components.

-DN-CGT-APZN
---

# 📈 Development Roadmap

```text
M1
│
├── React + Vite Setup
├── Authentication UI
├── REST API Integration
└── JWT Authentication
        ↓
M2
│
├── Trips
├── Itineraries
└── Destinations
        ↓
M3
│
├── Budgets
├── Expenses
└── Collaboration
        ↓
M4
│
├── Analytics
├── Testing
└── Deployment
        ↓
M5
│
└── GenAI Travel Copilot
        ↓
M6
│
└── Event-Driven / Distributed Architecture
```



---

# 📌 Status

**TripNest Frontend — Active Development**

The React + Vite foundation has been established and frontend-backend integration is being developed incrementally according to the project milestones.


---------------
-----------------------
-----------------------
