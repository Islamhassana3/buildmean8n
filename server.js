import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:net';

console.log('Starting server...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Function to check if a port is available
async function isPortAvailable(port) {
	return new Promise((resolve) => {
		const server = createServer();
		server.once('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				resolve(false);
			} else {
				resolve(false);
			}
		});
		server.once('listening', () => {
			server.close();
			resolve(true);
		});
		server.listen(port, '0.0.0.0');
	});
}

// Function to find an available port starting from a given port
async function findAvailablePort(startPort = 3000, maxAttempts = 100) {
	for (let port = startPort; port < startPort + maxAttempts; port++) {
		if (await isPortAvailable(port)) {
			return port;
		}
	}
	throw new Error(`No available port found in range ${startPort}-${startPort + maxAttempts - 1}`);
}

const PREFERRED_PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const PORT = await findAvailablePort(PREFERRED_PORT);

// Middleware to log requests
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
	next();
});

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/health', (req, res) => {
	console.log('Health check requested');
	res.status(200).json({ status: 'OK' });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
	console.error('Error:', err);
	res.status(500).send('Internal Server Error');
});

app
	.listen(PORT, '0.0.0.0', () => {
		console.log(`Server running on port ${PORT}`);
		console.log(`Open http://localhost:${PORT} in your browser`);
	})
	.on('error', (err) => {
		console.error('Failed to start server:', err);
		process.exit(1);
	});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
	console.error('Uncaught Exception:', err);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	process.exit(1);
});
