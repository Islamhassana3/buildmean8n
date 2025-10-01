# Dual-Service Deployment Setup Guide

This guide walks you through setting up the Build Mean8n dual-service architecture with n8n + PostgreSQL.

## Quick Setup

### 1. Local Development with Docker

```bash
# Clone and setup
git clone https://github.com/Islamhassana3/buildmean8n.git
cd buildmean8n

# Setup environment
npm run setup

# Configure your .env file (optional for local dev)
# cp .env.example .env

# Start all services with Docker
npm run dev:docker
```

**Services will be available at:**

- Frontend: http://localhost:8080
- n8n: http://localhost:5678
- PostgreSQL: localhost:5432

### 2. Railway.app Production Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
npm run deploy:railway
```

This deploys three connected services on Railway:

- **n8n-workflow-builder**: Frontend application
- **n8n**: Workflow execution engine
- **postgres**: Database service

## Service Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Frontend App   │───▶│  n8n Service    │───▶│  PostgreSQL     │
│  (Port 8080)    │    │  (Port 5678)    │    │  (Port 5432)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Key Features

### Automatic Service Detection

- **Real n8n Mode**: When n8n service is available, workflows execute on actual n8n
- **Simulation Mode**: When n8n is unavailable, falls back to local simulation
- **Seamless Transition**: No configuration changes needed

### Database Integration

- PostgreSQL stores workflow definitions and execution history
- Automatic schema initialization with custom tables
- Connection pooling and health monitoring

### Development Workflow

1. **Local Development**: Use Docker Compose for full service stack
2. **Testing**: Built-in health checks and automated testing
3. **Deployment**: One-command Railway deployment
4. **Monitoring**: Service health dashboard and alerting

## Environment Variables

### Required for Production

```bash
N8N_API_URL=https://your-n8n-service-url
DATABASE_URL=postgresql://user:password@host:5432/database
N8N_ENCRYPTION_KEY=your-secure-encryption-key
```

### Optional Configuration

```bash
N8N_WEBHOOK_URL=https://your-webhook-url
EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
EXECUTIONS_DATA_SAVE_ON_ERROR=all
N8N_METRICS=true
```

## Troubleshooting

### Service Connection Issues

```bash
# Check service health
npm run health-check

# View container logs
docker-compose logs n8n
docker-compose logs postgres
```

### Database Issues

```bash
# Reset database (development only)
docker-compose down -v
docker-compose up -d postgres
```

### n8n Service Issues

```bash
# Restart n8n service
docker-compose restart n8n

# Check n8n health
curl http://localhost:5678/healthz
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Database initialized with proper credentials
- [ ] n8n encryption key set (keep secure!)
- [ ] Services can communicate (firewall/networking)
- [ ] Health checks passing
- [ ] Backup strategy in place

## Support

- Check the [main README](README.md) for detailed features
- Review logs with `npm run health-check`
- Use simulation mode for development without n8n service
- Database node works in both real and simulation modes
