# Realtime Collaborative Whiteboard — PRD

## 1. Problem Statement

- Teams discussing meetings over video calls have no lightweight shared canvas to sketch diagrams together in real time.

## 2. Goals

### What is gonna be in v1

- Users will be able to perform basic CRUD ops on the whiteboard.
- Users will be able to draw basic shapes and use the pen tool, meaning a toolbar is going to be there.
- Single whiteboard can have up to 6 users at once.
- Users/members within that whiteboard can see changes in real-time
- Basic auth with features like register and login (access + refresh tokens)

## 3. Non-Goals

- Not mobile-optimized(desktop only).
- Not a general-purpose design tool(not Figma).
- No offline support.

## 4. User Stories

### Stories of v1

- As a user, I want to draw shapes, diagrams, and freehand lines on a board, so that I can visually explain an idea to my team.
- As a user, I want to see other users' drawings and strokes appear live on my screen, so that we can collaborate without delay or confusion about who drew what.
- As a user, I want to join a whiteboard that a teammate created, so that we can work on the same canvas together.
- As a user, I want to register and log in, so that my boards are tied to my account and not accessible by strangers.
- As a user, I want to know if a board is full, so that I understand why I can't join a session with too many people already in it.

## 5. Core Features (MVP Scope)

- Real-time whiteboard with tools
- Authentication and authorization

## 6. Next Version & Beyond (Out of Scope for Now)

- Real-time chat feature
- AI summarizer of the whiteboard
- Premium tiers (paywall)
- Video calling feature
- Animated shapes and diagrams
- 3D shapes
- AI note taking in real-time video calls

## 7. Technical Approach (High-Level)

## 8. Success Criteria

### Success Criteria of v1

- A user can draw basic shapes and freehand lines on the canvas.
- 2 or more(up to 6) users should be on the same board where each ohter's stroke appear on the same canvas.
- Room is capped, meaning there can only be 6 users/members in one canvas, A 7th user attempting to join a board that already has 6 users is blocked/notified, not silently allowed in.
- A user can register, log in, and their session persists via access + refresh tokens (i.e., they're not logged out on refresh, and expired access tokens are silently renewed).
- Only authenticated users can create/join boards; boards are tied to the creator's account.
- Once the whiteboard is created it persists untill the created user(admin) deletes it  
