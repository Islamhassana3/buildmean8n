#!/usr/bin/env node

// Automated test suite for Build Mean8n
const fs = require('fs');
const path = require('path');

class AutomatedTestRunner {
    constructor() {
        this.testResults = [];
        this.startTime = new Date();
    }

    // Run all automated tests
    async runAllTests() {
        console.log('🧪 Starting Automated Test Suite...\n');

        try {
            await this.testFileStructure();
            await this.testJavaScriptSyntax();
            await this.testHTMLValidity();
            await this.testCSSValidity();
            await this.testWorkflowFunctionality();
            await this.testSecurityChecks();
            await this.testPerformance();
            await this.testAccessibility();

            this.generateReport();
            this.exitWithStatus();

        } catch (error) {
            console.error('❌ Test runner failed:', error);
            process.exit(1);
        }
    }

    // Test file structure and required files
    async testFileStructure() {
        console.log('📁 Testing file structure...');
        
        const requiredFiles = [
            'index.html',
            'script.js',
            'styles.css',
            'ai-assistant.js',
            'automation-testing.js',
            'backend-automation.js',
            'package.json',
            'README.md'
        ];

        const requiredDirs = [
            '.github/workflows',
            'docs',
            'test'
        ];

        let passed = 0;
        let failed = 0;

        // Check required files
        for (const file of requiredFiles) {
            if (fs.existsSync(file)) {
                console.log(`  ✅ ${file} exists`);
                passed++;
            } else {
                console.log(`  ❌ ${file} missing`);
                failed++;
            }
        }

        // Check required directories
        for (const dir of requiredDirs) {
            if (fs.existsSync(dir)) {
                console.log(`  ✅ ${dir}/ exists`);
                passed++;
            } else {
                console.log(`  ❌ ${dir}/ missing`);
                failed++;
            }
        }

        this.testResults.push({
            test: 'File Structure',
            passed: passed,
            failed: failed,
            status: failed === 0 ? 'PASS' : 'FAIL'
        });

        console.log(`  Result: ${passed} passed, ${failed} failed\n`);
    }

    // Test JavaScript syntax and basic functionality
    async testJavaScriptSyntax() {
        console.log('📜 Testing JavaScript syntax...');
        
        const jsFiles = [
            'script.js',
            'ai-assistant.js',
            'automation-testing.js',
            'backend-automation.js'
        ];

        let passed = 0;
        let failed = 0;

        for (const file of jsFiles) {
            try {
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, 'utf8');
                    
                    // Basic syntax checks
                    if (this.checkJavaScriptSyntax(content)) {
                        console.log(`  ✅ ${file} syntax OK`);
                        passed++;
                    } else {
                        console.log(`  ❌ ${file} syntax errors`);
                        failed++;
                    }
                } else {
                    console.log(`  ⚠️  ${file} not found`);
                }
            } catch (error) {
                console.log(`  ❌ ${file} error: ${error.message}`);
                failed++;
            }
        }

        this.testResults.push({
            test: 'JavaScript Syntax',
            passed: passed,
            failed: failed,
            status: failed === 0 ? 'PASS' : 'FAIL'
        });

        console.log(`  Result: ${passed} passed, ${failed} failed\n`);
    }

    // Check JavaScript syntax
    checkJavaScriptSyntax(content) {
        try {
            // Basic checks for common syntax issues
            const hasUnmatchedBraces = this.countChar(content, '{') !== this.countChar(content, '}');
            const hasUnmatchedParens = this.countChar(content, '(') !== this.countChar(content, ')');
            const hasUnmatchedBrackets = this.countChar(content, '[') !== this.countChar(content, ']');
            
            if (hasUnmatchedBraces || hasUnmatchedParens || hasUnmatchedBrackets) {
                return false;
            }

            // Check for required function definitions
            const requiredFunctions = [
                'processNaturalLanguage',
                'createNode',
                'executeWorkflow'
            ];

            for (const func of requiredFunctions) {
                if (!content.includes(func)) {
                    console.log(`    ⚠️  Missing function: ${func}`);
                }
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    // Count character occurrences
    countChar(str, char) {
        return str.split(char).length - 1;
    }

    // Test HTML validity
    async testHTMLValidity() {
        console.log('🌐 Testing HTML validity...');
        
        let passed = 0;
        let failed = 0;

        try {
            if (fs.existsSync('index.html')) {
                const content = fs.readFileSync('index.html', 'utf8');
                
                // Basic HTML validation
                const hasDoctype = content.includes('<!DOCTYPE html>');
                const hasHtml = content.includes('<html');
                const hasHead = content.includes('<head>');
                const hasBody = content.includes('<body>');
                const hasTitle = content.includes('<title>');

                const checks = [
                    { name: 'DOCTYPE declaration', result: hasDoctype },
                    { name: 'HTML tag', result: hasHtml },
                    { name: 'HEAD section', result: hasHead },
                    { name: 'BODY section', result: hasBody },
                    { name: 'TITLE tag', result: hasTitle }
                ];

                checks.forEach(check => {
                    if (check.result) {
                        console.log(`  ✅ ${check.name}`);
                        passed++;
                    } else {
                        console.log(`  ❌ Missing ${check.name}`);
                        failed++;
                    }
                });

                // Check for required scripts
                const requiredScripts = [
                    'script.js',
                    'ai-assistant.js',
                    'automation-testing.js',
                    'backend-automation.js'
                ];

                requiredScripts.forEach(script => {
                    if (content.includes(script)) {
                        console.log(`  ✅ ${script} included`);
                        passed++;
                    } else {
                        console.log(`  ❌ ${script} not included`);
                        failed++;
                    }
                });

            } else {
                console.log(`  ❌ index.html not found`);
                failed++;
            }
        } catch (error) {
            console.log(`  ❌ HTML validation error: ${error.message}`);
            failed++;
        }

        this.testResults.push({
            test: 'HTML Validity',
            passed: passed,
            failed: failed,
            status: failed === 0 ? 'PASS' : 'FAIL'
        });

        console.log(`  Result: ${passed} passed, ${failed} failed\n`);
    }

    // Test CSS validity
    async testCSSValidity() {
        console.log('🎨 Testing CSS validity...');
        
        let passed = 0;
        let failed = 0;

        try {
            if (fs.existsSync('styles.css')) {
                const content = fs.readFileSync('styles.css', 'utf8');
                
                // Basic CSS checks
                const hasBasicStyles = content.includes('.app-container');
                const hasResponsive = content.includes('@media');
                const hasNoEmptyRules = !content.includes('{}');
                
                const checks = [
                    { name: 'App container styles', result: hasBasicStyles },
                    { name: 'Responsive design', result: hasResponsive },
                    { name: 'No empty rules', result: hasNoEmptyRules }
                ];

                checks.forEach(check => {
                    if (check.result) {
                        console.log(`  ✅ ${check.name}`);
                        passed++;
                    } else {
                        console.log(`  ❌ ${check.name}`);
                        failed++;
                    }
                });

            } else {
                console.log(`  ❌ styles.css not found`);
                failed++;
            }
        } catch (error) {
            console.log(`  ❌ CSS validation error: ${error.message}`);
            failed++;
        }

        this.testResults.push({
            test: 'CSS Validity',
            passed: passed,
            failed: failed,
            status: failed === 0 ? 'PASS' : 'FAIL'
        });

        console.log(`  Result: ${passed} passed, ${failed} failed\n`);
    }

    // Test workflow functionality
    async testWorkflowFunctionality() {
        console.log('⚙️  Testing workflow functionality...');
        
        let passed = 0;
        let failed = 0;

        try {
            const scriptContent = fs.readFileSync('script.js', 'utf8');
            
            // Test for core workflow functions
            const coreFunctions = [
                'createNode',
                'processNaturalLanguage',
                'executeWorkflow',
                'saveWorkflow',
                'clearWorkflow'
            ];

            coreFunctions.forEach(func => {
                if (scriptContent.includes(`function ${func}`) || scriptContent.includes(`${func} =`)) {
                    console.log(`  ✅ ${func} function found`);
                    passed++;
                } else {
                    console.log(`  ❌ ${func} function missing`);
                    failed++;
                }
            });

            // Test for AI assistant integration
            const aiContent = fs.readFileSync('ai-assistant.js', 'utf8');
            if (aiContent.includes('AIWorkflowAssistant')) {
                console.log(`  ✅ AI assistant class found`);
                passed++;
            } else {
                console.log(`  ❌ AI assistant class missing`);
                failed++;
            }

            // Test for automation testing
            const testingContent = fs.readFileSync('automation-testing.js', 'utf8');
            if (testingContent.includes('WorkflowTestingBot')) {
                console.log(`  ✅ Testing framework found`);
                passed++;
            } else {
                console.log(`  ❌ Testing framework missing`);
                failed++;
            }

        } catch (error) {
            console.log(`  ❌ Workflow functionality test error: ${error.message}`);
            failed++;
        }

        this.testResults.push({
            test: 'Workflow Functionality',
            passed: passed,
            failed: failed,
            status: failed === 0 ? 'PASS' : 'FAIL'
        });

        console.log(`  Result: ${passed} passed, ${failed} failed\n`);
    }

    // Test security checks
    async testSecurityChecks() {
        console.log('🔒 Testing security...');
        
        let passed = 0;
        let failed = 0;

        try {
            const files = ['script.js', 'ai-assistant.js', 'automation-testing.js', 'backend-automation.js'];
            
            for (const file of files) {
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, 'utf8');
                    
                    // Check for potential security issues
                    const hasEval = content.includes('eval(');
                    const hasInnerHTML = content.includes('innerHTML =');
                    const hasDocumentWrite = content.includes('document.write');
                    
                    if (!hasEval) {
                        console.log(`  ✅ ${file}: No eval() usage`);
                        passed++;
                    } else {
                        console.log(`  ⚠️  ${file}: Uses eval() - potential security risk`);
                    }
                    
                    if (!hasInnerHTML) {
                        console.log(`  ✅ ${file}: Safe DOM manipulation`);
                        passed++;
                    } else {
                        console.log(`  ⚠️  ${file}: Uses innerHTML - check for XSS`);
                    }
                    
                    if (!hasDocumentWrite) {
                        console.log(`  ✅ ${file}: No document.write usage`);
                        passed++;
                    } else {
                        console.log(`  ⚠️  ${file}: Uses document.write`);
                    }
                }
            }

        } catch (error) {
            console.log(`  ❌ Security check error: ${error.message}`);
            failed++;
        }

        this.testResults.push({
            test: 'Security Checks',
            passed: passed,
            failed: failed,
            status: failed === 0 ? 'PASS' : 'WARN'
        });

        console.log(`  Result: ${passed} passed, ${failed} warnings\n`);
    }

    // Test performance
    async testPerformance() {
        console.log('⚡ Testing performance...');
        
        let passed = 0;
        let failed = 0;

        try {
            const files = ['script.js', 'ai-assistant.js', 'automation-testing.js', 'backend-automation.js', 'styles.css'];
            
            let totalSize = 0;
            for (const file of files) {
                if (fs.existsSync(file)) {
                    const stats = fs.statSync(file);
                    totalSize += stats.size;
                    
                    if (stats.size < 100000) { // 100KB
                        console.log(`  ✅ ${file}: ${(stats.size / 1024).toFixed(1)}KB (good size)`);
                        passed++;
                    } else {
                        console.log(`  ⚠️  ${file}: ${(stats.size / 1024).toFixed(1)}KB (large file)`);
                        failed++;
                    }
                }
            }

            console.log(`  📊 Total bundle size: ${(totalSize / 1024).toFixed(1)}KB`);
            
            if (totalSize < 500000) { // 500KB
                console.log(`  ✅ Bundle size acceptable`);
                passed++;
            } else {
                console.log(`  ⚠️  Bundle size large`);
                failed++;
            }

        } catch (error) {
            console.log(`  ❌ Performance test error: ${error.message}`);
            failed++;
        }

        this.testResults.push({
            test: 'Performance',
            passed: passed,
            failed: failed,
            status: failed === 0 ? 'PASS' : 'WARN'
        });

        console.log(`  Result: ${passed} passed, ${failed} warnings\n`);
    }

    // Test accessibility
    async testAccessibility() {
        console.log('♿ Testing accessibility...');
        
        let passed = 0;
        let failed = 0;

        try {
            if (fs.existsSync('index.html')) {
                const content = fs.readFileSync('index.html', 'utf8');
                
                // Basic accessibility checks
                const hasLang = content.includes('lang=');
                const hasAltTags = content.includes('alt=') || !content.includes('<img');
                const hasSemanticTags = content.includes('<main>') || content.includes('<section>') || content.includes('<article>');
                const hasAriaLabels = content.includes('aria-') || content.includes('role=');
                
                const checks = [
                    { name: 'Language attribute', result: hasLang },
                    { name: 'Alt text for images', result: hasAltTags },
                    { name: 'Semantic HTML tags', result: hasSemanticTags },
                    { name: 'ARIA attributes', result: hasAriaLabels }
                ];

                checks.forEach(check => {
                    if (check.result) {
                        console.log(`  ✅ ${check.name}`);
                        passed++;
                    } else {
                        console.log(`  ⚠️  ${check.name} could be improved`);
                        failed++;
                    }
                });

            } else {
                console.log(`  ❌ index.html not found`);
                failed++;
            }
        } catch (error) {
            console.log(`  ❌ Accessibility test error: ${error.message}`);
            failed++;
        }

        this.testResults.push({
            test: 'Accessibility',
            passed: passed,
            failed: failed,
            status: failed === 0 ? 'PASS' : 'WARN'
        });

        console.log(`  Result: ${passed} passed, ${failed} warnings\n`);
    }

    // Generate test report
    generateReport() {
        const endTime = new Date();
        const duration = endTime - this.startTime;
        
        console.log('📊 TEST REPORT');
        console.log('='.repeat(50));
        console.log(`Execution time: ${duration}ms`);
        console.log(`Timestamp: ${endTime.toISOString()}`);
        console.log('');

        let totalPassed = 0;
        let totalFailed = 0;
        let totalTests = 0;

        this.testResults.forEach(result => {
            totalPassed += result.passed;
            totalFailed += result.failed;
            totalTests++;
            
            const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'WARN' ? '⚠️' : '❌';
            console.log(`${statusIcon} ${result.test}: ${result.passed} passed, ${result.failed} failed [${result.status}]`);
        });

        console.log('');
        console.log(`SUMMARY: ${totalPassed} assertions passed, ${totalFailed} assertions failed across ${totalTests} test suites`);
        
        const passRate = totalPassed + totalFailed > 0 ? ((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1) : 0;
        console.log(`Pass rate: ${passRate}%`);

        // Save report to file
        const report = {
            timestamp: endTime.toISOString(),
            duration: duration,
            summary: {
                totalTests: totalTests,
                totalPassed: totalPassed,
                totalFailed: totalFailed,
                passRate: parseFloat(passRate)
            },
            results: this.testResults
        };

        fs.writeFileSync('test/test-report.json', JSON.stringify(report, null, 2));
        console.log('\n📄 Detailed report saved to test/test-report.json');
    }

    // Exit with appropriate status code
    exitWithStatus() {
        const hasFailures = this.testResults.some(result => result.status === 'FAIL');
        
        if (hasFailures) {
            console.log('\n❌ Tests completed with failures');
            process.exit(1);
        } else {
            console.log('\n✅ All tests passed successfully');
            process.exit(0);
        }
    }
}

// Run tests if called directly
if (require.main === module) {
    const runner = new AutomatedTestRunner();
    runner.runAllTests().catch(error => {
        console.error('Test runner error:', error);
        process.exit(1);
    });
}

module.exports = AutomatedTestRunner;