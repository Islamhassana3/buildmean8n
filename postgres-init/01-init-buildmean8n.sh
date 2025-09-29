#!/bin/bash
set -e

# Initialize n8n database schema
echo "Initializing n8n database..."

# Create additional tables for buildmean8n integration if needed
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create extension for UUID generation
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    -- Create additional tables for buildmean8n integration
    CREATE TABLE IF NOT EXISTS buildmean8n_workflows (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        workflow_data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        is_active BOOLEAN DEFAULT true
    );
    
    CREATE TABLE IF NOT EXISTS buildmean8n_executions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        workflow_id UUID REFERENCES buildmean8n_workflows(id),
        execution_data JSONB NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'running',
        started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        finished_at TIMESTAMP WITH TIME ZONE,
        error_message TEXT
    );
    
    -- Create indexes for better performance
    CREATE INDEX IF NOT EXISTS idx_buildmean8n_workflows_active ON buildmean8n_workflows(is_active);
    CREATE INDEX IF NOT EXISTS idx_buildmean8n_executions_workflow_id ON buildmean8n_executions(workflow_id);
    CREATE INDEX IF NOT EXISTS idx_buildmean8n_executions_status ON buildmean8n_executions(status);
    
    -- Grant permissions
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $POSTGRES_USER;
    
    echo "Database initialization completed successfully!"
EOSQL