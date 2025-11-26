# replit.md

## Overview

This is a full-stack web application for BennCo Advisors, a financial advisory firm specializing in retirement planning and investment management. The application features a modern React frontend built with TypeScript and shadcn/ui components, powered by an Express.js backend with PostgreSQL database integration through Drizzle ORM.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React with TypeScript, built using Vite
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Framework**: shadcn/ui components with Tailwind CSS for styling
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: Comprehensive shadcn/ui component system with custom BennCo branding
- **Reusable Components**: Form components (RadioGroupField, CheckboxGroupField) for consistency and reduced duplication
- **Error Handling**: React Error Boundary implementation for graceful error recovery
- **Styling**: Tailwind CSS with custom design tokens matching company brand colors
- **Forms**: React Hook Form integration with Zod validation and custom validation hooks
- **Performance**: Memoized components (React.memo) and optimized callbacks to prevent unnecessary re-renders
- **Navigation**: Single-page application with smooth scrolling and page transitions
- **Responsive Design**: Mobile-first approach with glass morphism effects and modern animations

### Backend Architecture
- **API Structure**: RESTful endpoints for consultation form submissions and admin functionality
- **Security**: Rate limiting middleware, input sanitization, and validation on all endpoints
- **Database Operations**: Type-safe queries using Drizzle ORM with connection pooling and pagination
- **File Generation**: Excel spreadsheet generation for consultation data export
- **Development Server**: Vite integration for hot module replacement in development
- **Error Handling**: Comprehensive error handling, logging, and structured API responses

### Database Schema
- **consultation_responses**: Stores client consultation form submissions with fields for personal information, financial goals, investment experience, and service interests
- **Schema Validation**: Drizzle-Zod integration for runtime type checking and validation

## Data Flow

1. **Client Interaction**: Users fill out consultation forms through the questionnaire interface
2. **Form Submission**: Data is validated client-side and submitted to the backend API
3. **Database Storage**: Consultation responses are stored in PostgreSQL with automatic timestamps
4. **Admin Access**: Administrative users can view, filter, and export consultation data
5. **External Integration**: Successful submissions redirect users to Calendly for appointment scheduling

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, Wouter for routing, TanStack Query for data fetching
- **UI Components**: Complete shadcn/ui library with Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS processing
- **Backend**: Express.js with TypeScript support via tsx

### Database & ORM
- **Neon Database**: Serverless PostgreSQL with WebSocket support
- **Drizzle ORM**: Type-safe database operations with migration support
- **Connection Management**: Connection pooling with timeout configurations

### Development Tools
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Development**: Hot module replacement and runtime error overlay
- **Type Checking**: TypeScript with strict configuration
- **Replit Integration**: Custom cartographer plugin for development environment

## Deployment Strategy

The application is configured for deployment on Replit's autoscale platform:

- **Build Process**: Frontend assets built to `dist/public`, backend compiled to `dist/index.js`
- **Production Server**: Simple Express server serving static files with SPA fallback
- **Environment**: Node.js 20 with PostgreSQL 16 support
- **Port Configuration**: Application runs on port 5000 with external port 80 mapping
- **Database**: Environment variable `DATABASE_URL` required for PostgreSQL connection

## Changelog

```
Changelog:
- June 16, 2025. Initial setup
- June 16, 2025. Reorganized navigation with Services dropdown menu containing Investment Management, Real Estate Exchanges, and Retirement Planning
- June 17, 2025. Updated user flow: all CTA buttons now redirect to contact page before questionnaire. Redesigned contact page with cleaner layout matching provided design specifications.
- June 17, 2025. Comprehensive code quality improvements: Added reusable form components (RadioGroupField, CheckboxGroupField), implemented Error Boundary for better error handling, created form validation hooks, improved type safety with proper TypeScript interfaces, added rate limiting middleware for security, implemented memoized admin components for performance optimization, and enhanced input sanitization in API routes.
- June 18, 2025. Added phone contact information (719) 577-0099 at end of questionnaire for scheduling conflicts. Contact info appears in styled notice box on final step with clickable phone link.
- June 18, 2025. Removed background image from Real Estate Exchanges page hero section. Restored to clean beige background for better readability.
- June 18, 2025. Added fly fishing background image to Retirement Planning page hero section. Serene fishing scene represents leisure activities in retirement with dark overlay for readability.
- June 23, 2025. Fixed application startup error caused by corrupted RealEstateExchanges.tsx file. Cleaned invalid content and restored proper TypeScript syntax.
- June 23, 2025. Implemented clickable team member bio system. Team photos and names on home page now navigate to individual bio pages with detailed information including credentials, specialties, education, and contact details for Brian Bennett, Taylor Willson, Roland Quast, and Marie Patti.
- June 24, 2025. Fixed JSX syntax error in InvestmentManagement.tsx that was preventing application startup. Restructured Investment Management page subtitle to match Real Estate Exchanges page layout positioning.
- June 24, 2025. Updated Investment Management page to match Retirement Planning page format with hero section, background image overlay, and consistent styling. Replaced fly fishing image with coin stacks image for better thematic alignment.
- June 24, 2025. Updated Investment Management page background with new coin stacks image for better visual representation of investment growth and financial planning themes.
- June 24, 2025. Added hero background image to Real Estate Exchanges page featuring 1031 Exchange sign with mountain homes for better thematic representation of real estate services.
- June 24, 2025. Updated Retirement Planning page background with new fly fishing image showing angler in waders for better representation of retirement leisure activities.
- June 25, 2025. Implemented user experience improvements: Added sticky mobile CTA button with schedule/call options, streamlined contact page with dual-path approach (direct scheduling vs questionnaire), added trust statistics and client testimonials sections to home page for social proof and credibility.
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```