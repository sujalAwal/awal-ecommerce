# Deployment Guide

## Local Development

### Quick Start
```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Production Build

### Build the application
```bash
npm run build
npm start
```

### Type checking
```bash
npm run type-check
```

## Vercel Deployment (Recommended)

Vercel is optimized for Next.js and provides automatic deployments.

### Steps:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Set environment variables in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
   NEXT_PUBLIC_APP_NAME=Awal Ecommerce
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```
5. Click "Deploy"

### Automatic Deployments
- Commits to `main` branch automatically deploy to production
- Pull requests get preview deployments

## Docker Deployment

### Build image
```bash
docker build -t awal-ecommerce:latest .
```

### Run container
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.example.com \
  -e NEXT_PUBLIC_APP_URL=https://store.example.com \
  awal-ecommerce:latest
```

### Docker Compose
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_BASE_URL: http://api:8000
    depends_on:
      - api

  api:
    image: your-api-image:latest
    ports:
      - "8000:8000"
```

## AWS Deployment

### Option 1: Elastic Beanstalk
```bash
# Install EB CLI
npm install -g @aws-amplify/cli

# Initialize
eb init

# Create environment
eb create production

# Deploy
eb deploy
```

### Option 2: EC2 with PM2
```bash
# SSH into EC2
ssh -i your-key.pem ec2-user@your-instance

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs

# Clone repository
git clone your-repo.git
cd awal-ecommerce

# Install dependencies
npm install --production

# Build
npm run build

# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start npm --name "awal-ecommerce" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

## Google Cloud Platform

### Cloud Run Deployment
```bash
# Build image
docker build -t gcr.io/your-project/awal-ecommerce .

# Push to registry
docker push gcr.io/your-project/awal-ecommerce

# Deploy to Cloud Run
gcloud run deploy awal-ecommerce \
  --image gcr.io/your-project/awal-ecommerce \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Environment Variables

### Development
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Awal Ecommerce
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production
```env
NEXT_PUBLIC_API_BASE_URL=https://api.awal-ecommerce.com
NEXT_PUBLIC_APP_NAME=Awal Ecommerce
NEXT_PUBLIC_APP_URL=https://awal-ecommerce.com
NODE_ENV=production
```

## Performance Optimization

### Before deployment, ensure:
1. ✅ Run `npm run build` successfully
2. ✅ Test production build locally: `npm run start`
3. ✅ Check Core Web Vitals with Lighthouse
4. ✅ Enable gzip compression on server
5. ✅ Configure CDN for static assets
6. ✅ Set appropriate cache headers

### Nginx configuration example:
```nginx
location /_next/static/ {
  expires 365d;
  add_header Cache-Control "public, immutable";
}

location / {
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
  
  # Compression
  gzip on;
  gzip_types text/plain text/css application/json application/javascript;
}
```

## SSL/TLS Certificate

### Using Let's Encrypt with Certbot:
```bash
sudo certbot certonly --standalone -d awal-ecommerce.com

# Auto-renew
sudo certbot renew --dry-run
```

## Monitoring & Logging

### Vercel Analytics
- Automatic Core Web Vitals tracking
- Real-time edge function logs
- Error tracking

### Application Logging
Add to your app:
```typescript
// pages/api/logs.ts
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(request: NextRequest) {
  console.log('Request:', {
    timestamp: new Date(),
    path: request.nextUrl.pathname,
    method: request.method,
  });
  
  return new Response('Logged', { status: 200 });
}
```

## Backup & Recovery

### Database Backups
```bash
# MongoDB backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/dbname"

# PostgreSQL backup
pg_dump -U user dbname > backup.sql
```

## Performance Benchmarks

After deployment, measure:
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **First Contentful Paint (FCP)**: < 1.8s
- **Time to Interactive (TTI)**: < 3.8s

Use:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Vercel Analytics Dashboard

## Troubleshooting

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Memory issues in production
- Increase Node.js memory: `NODE_OPTIONS=--max_old_space_size=4096`
- Check for memory leaks in API calls
- Implement proper caching strategies

### API connection issues
- Verify CORS settings on backend
- Check firewall rules
- Validate environment variables

## Rollback

### Vercel
- Automatic rollback available in Vercel dashboard
- Click "Deployments" → select previous version → click "..."

### Manual rollback
```bash
git revert <commit-hash>
git push origin main
```
