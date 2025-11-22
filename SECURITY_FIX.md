# Security Fix: OpenAI API Backend Proxy

## Problem Fixed

**Critical Security Vulnerability:** OpenAI API keys were exposed in the browser, allowing anyone to steal the key and make unauthorized API calls.

## Solution

Created a secure backend proxy server that handles all OpenAI API calls server-side, keeping API keys completely hidden from the frontend.

---

## Architecture

```
┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│   Browser   │  HTTP    │   Backend   │   API    │   OpenAI    │
│  (Frontend) │ ────────▶│   Server    │ ────────▶│     API     │
│             │          │  (Express)  │          │             │
└─────────────┘          └─────────────┘          └─────────────┘
                                │
                         ┌──────┴──────┐
                         │ .env.server │
                         │  API_KEY    │
                         └─────────────┘
```

**Before:** Browser → OpenAI (API key exposed)
**After:** Browser → Backend → OpenAI (API key secure)

---

## What Changed

### Backend (NEW)
- **`/server/index.ts`** - Express server with security middleware
- **`/server/routes/ai.ts`** - API routes for AI features
- **`/server/controllers/aiController.ts`** - OpenAI API integration
- **`/server/middleware/`** - Validation, rate limiting, error handling
- **`/server/validators/`** - Request validation schemas
- **`/server/utils/`** - Custom error classes

### Frontend (UPDATED)
- **`/src/lib/api/client.ts`** - NEW: Secure API client
- **`/src/lib/ai-writing.ts`** - Uses API client instead of direct OpenAI
- **`/src/lib/translation.ts`** - Uses API client instead of direct OpenAI

### Configuration
- **`.env.example`** - Updated for frontend (API URL only)
- **`.env.server.example`** - NEW: Server environment variables
- **`package.json`** - Added server scripts
- **`tsconfig.server.json`** - TypeScript config for server

---

## Setup Instructions

### 1. Install Dependencies
Already installed if you ran `npm install`.

### 2. Configure Environment Variables

#### Frontend (.env)
```bash
cp .env.example .env
```

Edit `.env`:
```bash
VITE_API_URL=http://localhost:3001
```

#### Backend (.env.server)
```bash
cp .env.server.example .env.server
```

Edit `.env.server`:
```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Run the Application

#### Option A: Run Both Servers (Recommended)
```bash
npm run dev:all
```

This runs:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:3001`

#### Option B: Run Servers Separately

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run dev:server
```

---

## API Endpoints

### POST `/api/ai/rephrase`
Rephrase text professionally.

**Request:**
```json
{
  "text": "user input text",
  "language": "en"
}
```

**Response:**
```json
{
  "rephrased": "professionally rephrased text",
  "originalLength": 123,
  "rephrasedLength": 156
}
```

### POST `/api/ai/translate`
Translate names between English and Arabic.

**Request:**
```json
{
  "text": "John Smith",
  "direction": "toArabic"
}
```

**Response:**
```json
{
  "translated": "جون سميث",
  "original": "John Smith",
  "direction": "toArabic"
}
```

### GET `/health`
Health check endpoint.

---

## Security Features

### 1. API Key Protection
- ✅ API key stored in server environment only
- ✅ Never exposed to browser
- ✅ Not in frontend bundle

### 2. Rate Limiting
- ✅ 20 requests per minute per IP
- ✅ Prevents abuse and cost overruns

### 3. Input Validation
- ✅ Zod schemas validate all requests
- ✅ Max length limits (2000 chars for rephrase, 200 for names)
- ✅ Language/direction enum validation

### 4. Security Middleware
- ✅ Helmet.js for security headers
- ✅ CORS configured for specific origin
- ✅ Request size limits (10MB)
- ✅ Error sanitization (no stack traces in production)

### 5. Error Handling
- ✅ Custom error classes (ValidationError, AIServiceError)
- ✅ Proper HTTP status codes
- ✅ Retry hints for transient errors
- ✅ Comprehensive logging

---

## Testing

### Test Backend Health
```bash
curl http://localhost:3001/health
```

Expected:
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "uptime": 123.45
}
```

### Test AI Endpoints

**Rephrase:**
```bash
curl -X POST http://localhost:3001/api/ai/rephrase \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I need help with money",
    "language": "en"
  }'
```

**Translate:**
```bash
curl -X POST http://localhost:3001/api/ai/translate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Ahmed Ali",
    "direction": "toEnglish"
  }'
```

---

## Production Deployment

### Environment Variables
Set these in your production environment:

```bash
# Frontend
VITE_API_URL=https://your-api-domain.com

# Backend
OPENAI_API_KEY=sk-your-production-key
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Build Commands

```bash
# Build frontend
npm run build

# Build backend
npm run build:server

# Start backend in production
npm run start:server
```

### Deployment Considerations

1. **Separate Deployments:**
   - Frontend: Deploy to Vercel/Netlify/CloudFlare
   - Backend: Deploy to Railway/Render/Fly.io

2. **Environment Variables:**
   - Frontend: Set `VITE_API_URL` to backend URL
   - Backend: Set `OPENAI_API_KEY`, `FRONTEND_URL`

3. **CORS:**
   - Update `FRONTEND_URL` in backend to production domain
   - Verify CORS headers in production

4. **Rate Limiting:**
   - Consider adjusting limits for production
   - Add IP whitelisting if needed

5. **Monitoring:**
   - Add error tracking (Sentry, LogRocket)
   - Monitor API usage and costs
   - Set up alerts for rate limit hits

---

## Migration Checklist

- [x] Backend server created
- [x] API routes implemented
- [x] Security middleware configured
- [x] Frontend API client created
- [x] ai-writing.ts updated
- [x] translation.ts updated
- [x] Environment files configured
- [x] Package.json scripts added
- [ ] Test rephrase feature
- [ ] Test translation feature
- [ ] Remove old .env with VITE_OPENAI_API_KEY
- [ ] Deploy backend
- [ ] Update frontend environment variables
- [ ] Deploy frontend
- [ ] Verify production functionality

---

## Troubleshooting

### Issue: "Cannot connect to server"
**Solution:** Make sure backend is running on port 3001.
```bash
npm run dev:server
```

### Issue: "AI service is not configured"
**Solution:** Check `.env.server` has valid `OPENAI_API_KEY`.

### Issue: "CORS error"
**Solution:** Verify `FRONTEND_URL` in `.env.server` matches your frontend URL.

### Issue: "Rate limit exceeded"
**Solution:** Wait 1 minute or adjust rate limit in `server/routes/ai.ts`.

---

## Cost Optimization

The backend proxy allows you to:

1. **Cache responses** (future enhancement)
2. **Monitor usage** per user/IP
3. **Set spending limits**
4. **Track costs** in real-time
5. **Block abusive IPs**

Consider adding these features for production.

---

## Support

For issues, check:
1. Console logs in browser (frontend errors)
2. Terminal output (backend errors)
3. Network tab in DevTools (API calls)
4. `SECURITY_FIX.md` (this file)

---

**Security Status:** ✅ FIXED - API keys are now secure!
