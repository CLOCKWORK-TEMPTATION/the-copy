# Overview

This is **The Copy**, a comprehensive drama analysis platform built as a monorepo. The application provides AI-powered screenplay analysis, project management, and real-time collaboration features for dramatic content creators. It uses Next.js 15 for the frontend, Express/Node.js for the backend, and integrates with Google's Gemini AI for intelligent text analysis.

The platform supports Arabic and English content, follows strict TypeScript conventions, and emphasizes performance, security, and maintainability. The architecture includes sophisticated caching strategies (Redis), background job processing (BullMQ), real-time communication (WebSocket/SSE), and comprehensive monitoring (Sentry).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Core Technologies

**Frontend (Next.js 15 + TypeScript)**
- App Router with React Server Components
- Tailwind CSS v4 with shadcn/ui component library
- RTL-first design for Arabic content
- Strict TypeScript with comprehensive type safety
- Vitest for unit tests, Playwright for E2E tests
- Performance budgets enforced via CI/CD (LCP < 2.5s, bundle < 350KB)

**Backend (Node.js + Express + TypeScript)**
- RESTful API with modular controller/service architecture
- Drizzle ORM for database operations (PostgreSQL via Neon Serverless)
- BullMQ for background job processing
- WebSocket (Socket.IO) and SSE for real-time updates
- Comprehensive request/response validation with Zod
- MCP (Model Context Protocol) server implementation

**AI Integration**
- Google Gemini API for screenplay analysis
- Multi-agent analysis pipeline with specialized stations (characters, themes, structure)
- Intelligent caching strategy to reduce API costs by ~60%
- Text-only runtime outputs (no JSON in production analysis)

## Database Design

**PostgreSQL with Drizzle ORM**
- Primary entities: users, projects, scenes, characters, shots
- UUID-based primary keys for security
- Foreign key relationships with cascade behaviors
- 8+ composite indexes for query optimization (40-70% performance improvement)
- Session management via PostgreSQL (not Redis-based sessions)

**Performance Optimizations:**
- Composite indexes on multi-column WHERE clauses (userId + projectId, projectId + sceneId)
- Efficient JOIN patterns replacing N+1 query problems
- Baseline query times: 15-65ms reduced to <20ms with indexes
- Connection pooling with 60-second timeout for serverless cold starts

## Caching & Queue System

**Redis (ioredis)**
- Multi-layer caching strategy for Gemini API responses
- Dynamic TTL based on analysis type (60-120 minutes)
- Cache warming system for frequently accessed data
- Hit ratio target: >70%

**BullMQ Job Processing**
- Background processing for long-running AI analysis tasks
- Queue monitoring dashboard (Bull Board)
- Retry logic with exponential backoff
- Job status tracking via WebSocket/SSE

## Real-Time Communication

**Dual Protocol Support:**
1. **WebSocket (Socket.IO)**: Bi-directional communication for live updates (job progress, analysis status)
2. **SSE (Server-Sent Events)**: Unidirectional streaming for logs and long-running operations

**Unified Message Protocol:**
- Standardized event types: `job:started`, `job:progress`, `job:completed`, `analysis:progress`
- Room-based broadcasting for targeted updates
- Automatic reconnection and heartbeat mechanisms

## Security Architecture

**Authentication & Authorization:**
- JWT-based authentication with bcrypt password hashing
- Session management via cookie-parser and express-session
- Middleware-based route protection (authMiddleware)
- UUID validation to prevent SQL injection

**Security Headers & Middleware:**
- Helmet.js for security headers
- CORS configuration for cross-origin requests
- Rate limiting (Express Rate Limit) to prevent abuse
- Security logging for auth attempts and violations

**Input Validation:**
- Zod schemas for all environment variables and API inputs
- Strict TypeScript with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
- Path traversal protection in file operations (safeResolve utility)

## Monitoring & Observability

**Sentry Integration:**
- Error tracking and performance monitoring
- Web Vitals collection (LCP, INP, CLS, FCP, TTFB)
- Source map upload for production debugging
- Separate client/server/edge configurations via `instrumentation.ts`

**Metrics & Logging:**
- Prometheus-compatible metrics endpoint
- Custom Winston logger with structured logging
- Bull Board for queue monitoring
- Performance budget enforcement in CI/CD

## Development Environment

**Package Management:**
- PNPM workspaces for monorepo structure
- Node.js ≥20.11.0 requirement
- Automated dependency version overrides for compatibility

**CI/CD Pipeline:**
- ESLint with custom rules (no-duplicate-exports)
- TypeScript strict mode with comprehensive checks
- Pre-push hooks for lint/typecheck/test
- Lighthouse CI for performance regression detection

**Build Optimization:**
- Bundle analyzer integration (`ANALYZE=true`)
- Code splitting for large libraries (recharts, pdfjs, monaco)
- CDN support with configurable asset prefix
- Image optimization with next/image and sharp

## Deployment Strategy

**Production Considerations:**
- PostgreSQL least-privilege user (no superuser in production)
- SSL/TLS enforced for database connections
- Environment-based configuration via Zod
- Docker support with multi-stage builds
- Rollback plan documented for emergency recovery

**Performance Targets:**
- API response time: <100ms
- Database queries: <20ms
- Cache hit ratio: >70%
- Lighthouse score: >90
- Bundle size: <350KB (gzipped)

# External Dependencies

**AI Services:**
- Google Generative AI (Gemini API) - Primary AI analysis engine
- Mistral AI SDK - Secondary AI provider

**Database & Storage:**
- Neon Serverless PostgreSQL - Primary database
- Drizzle ORM - Type-safe database toolkit
- Redis (ioredis) - Caching and session storage

**Background Processing:**
- BullMQ - Job queue management
- Bull Board - Queue monitoring UI

**Real-Time Communication:**
- Socket.IO - WebSocket server/client
- Server-Sent Events (native) - Streaming updates

**Monitoring & Logging:**
- Sentry (@sentry/nextjs) - Error tracking and performance monitoring
- Winston - Structured logging

**Frontend UI Libraries:**
- Radix UI primitives - Accessible component primitives
- shadcn/ui - Pre-built component library
- Recharts - Data visualization
- React Hook Form + Zod - Form management and validation

**File Processing:**
- PDF.js (Mozilla) - PDF document parsing
- Mammoth - DOCX file processing
- Multer - File upload handling

**Security & Validation:**
- Helmet - HTTP security headers
- bcrypt - Password hashing
- jsonwebtoken - JWT token generation
- Zod - Runtime schema validation

**Development Tools:**
- Vitest - Unit testing framework
- Playwright - E2E testing framework
- ESLint + Prettier - Code quality and formatting
- Lighthouse CI - Performance regression testing

**Build & Optimization:**
- @next/bundle-analyzer - Bundle size analysis
- sharp - Image optimization
- Turbopack - Next.js bundler (experimental)

**Third-Party Integrations:**
- Firebase Hosting - Optional deployment target
- Vercel Blob Storage - Remote image hosting
- CDN support (configurable) - Static asset delivery