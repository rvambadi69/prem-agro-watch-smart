Agriculture module

This module is a small Spring Boot application inside the repo that provides demo API endpoints for the 
frontend to use.

Endpoints
- GET /api/health — returns { status: "UP", application: "Agriculture" }
- GET /api/farms — returns demo farms matching frontend `mockFarms` shape

Run
- From the `Agriculture` folder you can run with Maven:
  - `mvn spring-boot:run` or `mvn -DskipTests spring-boot:run`

Notes
- This module is intentionally lightweight. It uses package `com.Agri.Agriculture` to match the existing files.
- Do not change `pom.xml` here unless you know the required Spring Boot version for the module; the main `backend` module is the primary service.
