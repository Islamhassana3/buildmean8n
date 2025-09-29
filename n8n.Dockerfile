FROM n8nio/n8n:latest

# Set working directory
WORKDIR /data

# Install additional packages if needed
USER root
RUN apk add --no-cache tini

# Switch back to node user
USER node

# Copy custom configurations if any
COPY --chown=node:node n8n-config/ /data/

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5678/healthz || exit 1

# Expose n8n port
EXPOSE 5678

# Use tini for proper signal handling
ENTRYPOINT ["tini", "--"]

# Start n8n
CMD ["n8n", "start"]