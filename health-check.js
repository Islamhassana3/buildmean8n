#!/usr/bin/env node

// Health check script for automated monitoring
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HealthCheckAgent {
	constructor() {
		this.checks = [];
		this.alerts = [];
	}

	async performHealthCheck() {
		console.log('🏥 Starting Health Check...\n');

		try {
			await this.checkSystemHealth();
			await this.checkApplicationHealth();
			await this.checkSecurityHealth();
			await this.checkPerformanceHealth();

			this.generateHealthReport();
			this.sendAlertsIfNeeded();
		} catch (error) {
			console.error('❌ Health check failed:', error);
			process.exit(1);
		}
	}

	async checkSystemHealth() {
		console.log('🖥️  Checking system health...');

		const checks = [this.checkFileSystem(), this.checkDependencies(), this.checkConfiguration()];

		for (const check of checks) {
			const result = await check;
			this.checks.push(result);
			this.logCheck(result);
		}
	}

	async checkFileSystem() {
		try {
			const requiredFiles = ['index.html', 'script.js', 'styles.css', 'package.json'];

			let healthy = true;
			const issues = [];

			for (const file of requiredFiles) {
				if (!fs.existsSync(file)) {
					healthy = false;
					issues.push(`Missing file: ${file}`);
				}
			}

			// Check file permissions
			try {
				fs.accessSync('.', fs.constants.R_OK | fs.constants.W_OK);
			} catch (error) {
				healthy = false;
				issues.push('Insufficient file permissions');
			}

			return {
				name: 'File System',
				healthy: healthy,
				issues: issues,
				details: `${requiredFiles.length - issues.length}/${requiredFiles.length} required files present`,
			};
		} catch (error) {
			return {
				name: 'File System',
				healthy: false,
				issues: [error.message],
				details: 'File system check failed',
			};
		}
	}

	async checkDependencies() {
		try {
			const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

			let healthy = true;
			const issues = [];

			// Check if node_modules exists (if there are dependencies)
			if (packageJson.dependencies || packageJson.devDependencies) {
				if (!fs.existsSync('node_modules')) {
					healthy = false;
					issues.push('node_modules directory missing - run npm install');
				}
			}

			// Check for security vulnerabilities (simplified)
			const hasSecurityField = packageJson.scripts && packageJson.scripts['audit'];

			return {
				name: 'Dependencies',
				healthy: healthy,
				issues: issues,
				details: `Package.json valid, ${Object.keys(packageJson.scripts || {}).length} scripts defined`,
			};
		} catch (error) {
			return {
				name: 'Dependencies',
				healthy: false,
				issues: [error.message],
				details: 'Dependency check failed',
			};
		}
	}

	async checkConfiguration() {
		try {
			let healthy = true;
			const issues = [];

			// Check GitHub Actions configuration
			const workflowsDir = '.github/workflows';
			if (fs.existsSync(workflowsDir)) {
				const workflows = fs.readdirSync(workflowsDir).filter((f) => f.endsWith('.yml'));
				if (workflows.length === 0) {
					issues.push('No GitHub Actions workflows found');
				}
			} else {
				healthy = false;
				issues.push('GitHub Actions workflows directory missing');
			}

			// Check documentation
			if (!fs.existsSync('README.md')) {
				issues.push('README.md missing');
			}

			return {
				name: 'Configuration',
				healthy: healthy,
				issues: issues,
				details: 'Configuration files checked',
			};
		} catch (error) {
			return {
				name: 'Configuration',
				healthy: false,
				issues: [error.message],
				details: 'Configuration check failed',
			};
		}
	}

	async checkApplicationHealth() {
		console.log('🚀 Checking application health...');

		const checks = [this.checkJavaScriptHealth(), this.checkHTMLHealth(), this.checkCSSHealth()];

		for (const check of checks) {
			const result = await check;
			this.checks.push(result);
			this.logCheck(result);
		}
	}

	async checkJavaScriptHealth() {
		try {
			const jsFiles = [
				'script.js',
				'ai-assistant.js',
				'automation-testing.js',
				'backend-automation.js',
			];
			let healthy = true;
			const issues = [];
			let totalSize = 0;

			for (const file of jsFiles) {
				if (fs.existsSync(file)) {
					const content = fs.readFileSync(file, 'utf8');
					const size = content.length;
					totalSize += size;

					// Check for syntax errors (basic)
					try {
						// Simple checks for unmatched brackets
						const openBraces = (content.match(/\{/g) || []).length;
						const closeBraces = (content.match(/\}/g) || []).length;

						if (openBraces !== closeBraces) {
							healthy = false;
							issues.push(`${file}: Unmatched braces`);
						}
					} catch (error) {
						healthy = false;
						issues.push(`${file}: ${error.message}`);
					}

					// Check file size
					if (size > 100000) {
						// 100KB
						issues.push(`${file}: Large file size (${(size / 1024).toFixed(1)}KB)`);
					}
				}
			}

			return {
				name: 'JavaScript Health',
				healthy: healthy,
				issues: issues,
				details: `Total JS size: ${(totalSize / 1024).toFixed(1)}KB`,
			};
		} catch (error) {
			return {
				name: 'JavaScript Health',
				healthy: false,
				issues: [error.message],
				details: 'JavaScript health check failed',
			};
		}
	}

	async checkHTMLHealth() {
		try {
			if (!fs.existsSync('index.html')) {
				return {
					name: 'HTML Health',
					healthy: false,
					issues: ['index.html missing'],
					details: 'HTML file not found',
				};
			}

			const content = fs.readFileSync('index.html', 'utf8');
			let healthy = true;
			const issues = [];

			// Basic HTML validation
			if (!content.includes('<!DOCTYPE html>')) {
				issues.push('Missing DOCTYPE declaration');
			}

			if (!content.includes('<title>')) {
				issues.push('Missing title tag');
			}

			// Check for required scripts
			const requiredScripts = ['script.js'];
			for (const script of requiredScripts) {
				if (!content.includes(script)) {
					healthy = false;
					issues.push(`Missing script: ${script}`);
				}
			}

			return {
				name: 'HTML Health',
				healthy: healthy,
				issues: issues,
				details: `HTML file size: ${(content.length / 1024).toFixed(1)}KB`,
			};
		} catch (error) {
			return {
				name: 'HTML Health',
				healthy: false,
				issues: [error.message],
				details: 'HTML health check failed',
			};
		}
	}

	async checkCSSHealth() {
		try {
			if (!fs.existsSync('styles.css')) {
				return {
					name: 'CSS Health',
					healthy: false,
					issues: ['styles.css missing'],
					details: 'CSS file not found',
				};
			}

			const content = fs.readFileSync('styles.css', 'utf8');
			let healthy = true;
			const issues = [];

			// Check for empty file
			if (content.trim().length === 0) {
				healthy = false;
				issues.push('CSS file is empty');
			}

			// Check for basic responsive design
			if (!content.includes('@media')) {
				issues.push('No responsive design detected');
			}

			// Check file size
			if (content.length > 50000) {
				// 50KB
				issues.push(`Large CSS file: ${(content.length / 1024).toFixed(1)}KB`);
			}

			return {
				name: 'CSS Health',
				healthy: healthy,
				issues: issues,
				details: `CSS file size: ${(content.length / 1024).toFixed(1)}KB`,
			};
		} catch (error) {
			return {
				name: 'CSS Health',
				healthy: false,
				issues: [error.message],
				details: 'CSS health check failed',
			};
		}
	}

	async checkSecurityHealth() {
		console.log('🔒 Checking security health...');

		const checks = [
			this.checkCodeSecurity(),
			this.checkDependencySecurity(),
			this.checkConfigSecurity(),
		];

		for (const check of checks) {
			const result = await check;
			this.checks.push(result);
			this.logCheck(result);
		}
	}

	async checkCodeSecurity() {
		try {
			const jsFiles = [
				'script.js',
				'ai-assistant.js',
				'automation-testing.js',
				'backend-automation.js',
			];
			let healthy = true;
			const issues = [];

			for (const file of jsFiles) {
				if (fs.existsSync(file)) {
					const content = fs.readFileSync(file, 'utf8');

					// Check for potential security issues
					const securityPatterns = [
						{ pattern: /eval\s*\(/g, issue: 'eval() usage detected' },
						{ pattern: /innerHTML\s*=/g, issue: 'innerHTML usage (XSS risk)' },
						{ pattern: /document\.write/g, issue: 'document.write usage' },
						{ pattern: /\$\{.*\}/g, issue: 'Template literal injection risk' },
					];

					securityPatterns.forEach(({ pattern, issue }) => {
						if (pattern.test(content)) {
							issues.push(`${file}: ${issue}`);
						}
					});
				}
			}

			return {
				name: 'Code Security',
				healthy: issues.length === 0,
				issues: issues,
				details: `${jsFiles.length} JavaScript files scanned`,
			};
		} catch (error) {
			return {
				name: 'Code Security',
				healthy: false,
				issues: [error.message],
				details: 'Code security check failed',
			};
		}
	}

	async checkDependencySecurity() {
		try {
			let healthy = true;
			const issues = [];

			// Check for package-lock.json or yarn.lock
			const hasLockFile = fs.existsSync('package-lock.json') || fs.existsSync('yarn.lock');
			if (!hasLockFile) {
				issues.push('No lock file found - dependency versions not locked');
			}

			// Check for .nvmrc or node version specification
			const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
			if (!packageJson.engines || !packageJson.engines.node) {
				issues.push('Node.js version not specified in package.json');
			}

			return {
				name: 'Dependency Security',
				healthy: issues.length === 0,
				issues: issues,
				details: 'Dependency security checked',
			};
		} catch (error) {
			return {
				name: 'Dependency Security',
				healthy: false,
				issues: [error.message],
				details: 'Dependency security check failed',
			};
		}
	}

	async checkConfigSecurity() {
		try {
			let healthy = true;
			const issues = [];

			// Check for exposed secrets in configuration files
			const configFiles = ['package.json', '.env', '.env.example'];
			const secretPatterns = [
				/password\s*[:=]\s*['"]/i,
				/secret\s*[:=]\s*['"]/i,
				/api[_-]?key\s*[:=]\s*['"]/i,
				/token\s*[:=]\s*['"]/i,
			];

			configFiles.forEach((file) => {
				if (fs.existsSync(file)) {
					const content = fs.readFileSync(file, 'utf8');
					secretPatterns.forEach((pattern) => {
						if (pattern.test(content)) {
							issues.push(`${file}: Potential secret exposure`);
						}
					});
				}
			});

			// Check .gitignore
			if (fs.existsSync('.gitignore')) {
				const gitignore = fs.readFileSync('.gitignore', 'utf8');
				const shouldIgnore = ['.env', 'node_modules', '*.log'];
				shouldIgnore.forEach((item) => {
					if (!gitignore.includes(item)) {
						issues.push(`${item} not in .gitignore`);
					}
				});
			} else {
				issues.push('.gitignore file missing');
			}

			return {
				name: 'Configuration Security',
				healthy: issues.length === 0,
				issues: issues,
				details: 'Configuration security checked',
			};
		} catch (error) {
			return {
				name: 'Configuration Security',
				healthy: false,
				issues: [error.message],
				details: 'Configuration security check failed',
			};
		}
	}

	async checkPerformanceHealth() {
		console.log('⚡ Checking performance health...');

		const result = await this.checkResourceUsage();
		this.checks.push(result);
		this.logCheck(result);
	}

	async checkResourceUsage() {
		try {
			let healthy = true;
			const issues = [];
			let totalSize = 0;

			// Calculate total bundle size
			const files = [
				'index.html',
				'script.js',
				'ai-assistant.js',
				'automation-testing.js',
				'backend-automation.js',
				'styles.css',
			];

			files.forEach((file) => {
				if (fs.existsSync(file)) {
					const stats = fs.statSync(file);
					totalSize += stats.size;
				}
			});

			// Check bundle size thresholds
			const bundleSizeMB = totalSize / (1024 * 1024);
			if (bundleSizeMB > 5) {
				// 5MB threshold
				healthy = false;
				issues.push(`Large bundle size: ${bundleSizeMB.toFixed(2)}MB`);
			} else if (bundleSizeMB > 2) {
				// 2MB warning
				issues.push(`Bundle size warning: ${bundleSizeMB.toFixed(2)}MB`);
			}

			// Check for performance best practices
			const htmlContent = fs.existsSync('index.html') ? fs.readFileSync('index.html', 'utf8') : '';

			if (!htmlContent.includes('defer') && !htmlContent.includes('async')) {
				issues.push('Scripts not optimized with defer/async');
			}

			// Check for minification in production (simplified check)
			const jsContent = fs.existsSync('script.js') ? fs.readFileSync('script.js', 'utf8') : '';
			const hasMinification = jsContent.includes('/*') || jsContent.includes('//');

			return {
				name: 'Performance Health',
				healthy: healthy,
				issues: issues,
				details: `Bundle size: ${bundleSizeMB.toFixed(2)}MB`,
			};
		} catch (error) {
			return {
				name: 'Performance Health',
				healthy: false,
				issues: [error.message],
				details: 'Performance health check failed',
			};
		}
	}

	logCheck(check) {
		const icon = check.healthy ? '✅' : '❌';
		const issueCount = check.issues.length;
		const issueText = issueCount > 0 ? ` (${issueCount} issues)` : '';

		console.log(`  ${icon} ${check.name}: ${check.details}${issueText}`);

		if (issueCount > 0) {
			check.issues.forEach((issue) => {
				console.log(`    ⚠️  ${issue}`);
			});
		}
	}

	generateHealthReport() {
		const timestamp = new Date();
		const healthyChecks = this.checks.filter((c) => c.healthy).length;
		const totalChecks = this.checks.length;
		const healthPercentage = ((healthyChecks / totalChecks) * 100).toFixed(1);

		console.log('\n📊 HEALTH REPORT');
		console.log('='.repeat(50));
		console.log(`Timestamp: ${timestamp.toISOString()}`);
		console.log(
			`Overall Health: ${healthPercentage}% (${healthyChecks}/${totalChecks} checks passed)`,
		);
		console.log('');

		// Categorize issues by severity
		const criticalIssues = this.checks.filter((c) => !c.healthy);
		const warnings = this.checks.filter((c) => c.healthy && c.issues.length > 0);

		if (criticalIssues.length > 0) {
			console.log('🚨 CRITICAL ISSUES:');
			criticalIssues.forEach((check) => {
				console.log(`  • ${check.name}: ${check.issues.join(', ')}`);
			});
			console.log('');
		}

		if (warnings.length > 0) {
			console.log('⚠️  WARNINGS:');
			warnings.forEach((check) => {
				console.log(`  • ${check.name}: ${check.issues.join(', ')}`);
			});
			console.log('');
		}

		// Save report
		const report = {
			timestamp: timestamp.toISOString(),
			healthPercentage: parseFloat(healthPercentage),
			summary: {
				totalChecks: totalChecks,
				healthyChecks: healthyChecks,
				criticalIssues: criticalIssues.length,
				warnings: warnings.length,
			},
			checks: this.checks,
		};

		fs.writeFileSync('health-report.json', JSON.stringify(report, null, 2));
		console.log('📄 Health report saved to health-report.json');

		// Determine if alerts are needed
		if (criticalIssues.length > 0) {
			this.alerts.push({
				level: 'critical',
				message: `${criticalIssues.length} critical health issues detected`,
				issues: criticalIssues,
			});
		}

		if (healthPercentage < 80) {
			this.alerts.push({
				level: 'warning',
				message: `Health score below threshold: ${healthPercentage}%`,
				issues: warnings,
			});
		}
	}

	sendAlertsIfNeeded() {
		if (this.alerts.length > 0) {
			console.log('\n🚨 ALERTS GENERATED:');
			this.alerts.forEach((alert) => {
				console.log(`  ${alert.level.toUpperCase()}: ${alert.message}`);
			});

			// In a real implementation, this would send alerts via email, Slack, etc.
			// For now, we'll just exit with error code for critical issues
			const hasCritical = this.alerts.some((a) => a.level === 'critical');
			if (hasCritical) {
				console.log('\n❌ Health check completed with critical issues');
				process.exit(1);
			}
		} else {
			console.log('\n✅ Health check completed successfully - no alerts');
		}
	}
}

// Run health check if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	const agent = new HealthCheckAgent();
	agent.performHealthCheck().catch((error) => {
		console.error('Health check error:', error);
		process.exit(1);
	});
}

export default HealthCheckAgent;
