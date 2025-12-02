/* Quantum Trade Signals VIP - Main Styles */
:root {
    --quantum-primary: #0c0c1d;
    --quantum-secondary: #1a1a3d;
    --quantum-accent: #00d4ff;
    --quantum-accent-dark: #0088cc;
    --quantum-purple: #8a2be2;
    --quantum-neon: #00ff9d;
    --quantum-danger: #ff2d75;
    --quantum-success: #00ff88;
    --quantum-warning: #ffaa00;
    --quantum-text: #ffffff;
    --quantum-text-secondary: #b0b0d0;
    --quantum-border: #2a2a5a;
    --quantum-card-bg: rgba(16, 16, 48, 0.8);
    --quantum-glass: rgba(20, 20, 60, 0.7);
    --quantum-glow: 0 0 20px var(--quantum-accent);
    --quantum-glow-purple: 0 0 20px var(--quantum-purple);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, var(--quantum-primary) 0%, #1a1035 100%);
    color: var(--quantum-text);
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
    background-attachment: fixed;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(138, 43, 226, 0.1) 0%, transparent 50%);
    z-index: -1;
}

/* Typography */
h1, h2, h3, h4, .logo-text {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
}

h1 {
    font-size: 3.5rem;
    background: linear-gradient(90deg, var(--quantum-accent), var(--quantum-purple));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 1rem;
}

h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--quantum-text);
}

h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
}

p {
    color: var(--quantum-text-secondary);
    margin-bottom: 1rem;
}

/* Navigation */
.navbar {
    background: var(--quantum-glass);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--quantum-border);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    padding: 1rem 0;
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.quantum-icon {
    font-size: 2rem;
    color: var(--quantum-accent);
    animation: quantum-spin 10s linear infinite;
}

@keyframes quantum-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.logo-text {
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--quantum-accent);
    display: block;
}

.logo-subtext {
    font-size: 0.7rem;
    color: var(--quantum-text-secondary);
    letter-spacing: 2px;
    display: block;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-link {
    color: var(--quantum-text);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-link:hover {
    color: var(--quantum-accent);
}

.nav-auth {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.btn-auth {
    background: linear-gradient(90deg, var(--quantum-accent), var(--quantum-purple));
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s;
}

.btn-auth:hover {
    transform: translateY(-2px);
    box-shadow: var(--quantum-glow);
}

.btn-notification {
    background: var(--quantum-secondary);
    color: var(--quantum-text);
    border: 1px solid var(--quantum-border);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
}

.btn-notification:hover {
    background: var(--quantum-accent);
    color: var(--quantum-primary);
}

.notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--quantum-danger);
    color: white;
    font-size: 0.7rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--quantum-text);
    font-size: 1.5rem;
    cursor: pointer;
}

/* Hero Section */
.hero {
    padding: 12rem 2rem 6rem;
    max-width: 1400px;
    margin: 0 auto;
}

.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero-text h2 {
    font-size: 1.5rem;
    color: var(--quantum-accent);
    margin-bottom: 1.5rem;
}

.hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    max-width: 600px;
}

.hero-stats {
    display: flex;
    gap: 3rem;
    margin: 2.5rem 0;
}

.stat {
    text-align: center;
}

.stat-number {
    display: block;
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--quantum-neon);
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--quantum-text-secondary);
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.btn-quantum-large {
    background: linear-gradient(90deg, var(--quantum-accent), var(--quantum-purple));
    color: white;
    border: none;
    padding: 1.2rem 2.5rem;
    border-radius: 50px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s;
}

.btn-quantum-large:hover {
    transform: translateY(-3px);
    box-shadow: var(--quantum-glow);
}

.btn-outline {
    background: transparent;
    color: var(--quantum-accent);
    border: 2px solid var(--quantum-accent);
    padding: 1.2rem 2.5rem;
    border-radius: 50px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s;
}

.btn-outline:hover {
    background: var(--quantum-accent);
    color: var(--quantum-primary);
}

.hero-visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
}

.quantum-sphere {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, var(--quantum-accent), transparent 70%);
    position: relative;
    animation: quantum-pulse 4s ease-in-out infinite;
}

@keyframes quantum-pulse {
    0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 50px var(--quantum-accent);
    }
    50% { 
        transform: scale(1.05);
        box-shadow: 0 0 100px var(--quantum-accent);
    }
}

/* Sections */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

section {
    padding: 6rem 0;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-header h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.section-subtitle {
    font-size: 1.2rem;
    color: var(--quantum-text-secondary);
    max-width: 600px;
    margin: 0 auto;
}

/* Signals Section */
.signals-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: var(--quantum-secondary);
    color: var(--quantum-text);
    border: 1px solid var(--quantum-border);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
}

.filter-btn.active {
    background: linear-gradient(90deg, var(--quantum-accent), var(--quantum-purple));
    border-color: transparent;
}

.filter-btn:hover:not(.active) {
    background: var(--quantum-card-bg);
    border-color: var(--quantum-accent);
}

.quantum-select {
    background: var(--quantum-secondary);
    color: var(--quantum-text);
    border: 1px solid var(--quantum-border);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    min-width: 200px;
}

.signals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.signal-card {
    background: var(--quantum-card-bg);
    border: 1px solid var(--quantum-border);
    border-radius: 15px;
    padding: 1.5rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
}

.signal-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--quantum-accent), var(--quantum-purple));
}

.signal-card:hover {
    transform: translateY(-5px);
    border-color: var(--quantum-accent);
    box-shadow: var(--quantum-glow);
}

.signal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.signal-asset {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--quantum-accent);
}

.signal-action {
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.9rem;
}

.action-call {
    background: rgba(0, 255, 136, 0.1);
    color: var(--quantum-success);
    border: 1px solid var(--quantum-success);
}

.action-put {
    background: rgba(255, 45, 117, 0.1);
    color: var(--quantum-danger);
    border: 1px solid var(--quantum-danger);
}

.signal-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: var(--quantum-text-secondary);
}

.signal-details {
    margin: 1.5rem 0;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--quantum-border);
}

.detail-label {
    color: var(--quantum-text-secondary);
}

.detail-value {
    font-weight: 600;
    font-family: 'Orbitron', sans-serif;
}

.confidence-stars {
    color: var(--quantum-warning);
    font-size: 1.2rem;
}

.signal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--quantum-border);
}

.like-btn {
    background: none;
    border: none;
    color: var(--quantum-text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    transition: color 0.3s;
}

.like-btn:hover {
    color: var(--quantum-danger);
}

.like-btn.liked {
    color: var(--quantum-danger);
}

.like-count {
    font-size: 0.9rem;
    color: var(--quantum-text-secondary);
}

.signal-status {
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
}

.status-active {
    background: rgba(0, 255, 136, 0.1);
    color: var(--quantum-success);
}

.status-hit {
    background: rgba(0, 212, 255, 0.1);
    color: var(--quantum-accent);
}

.status-miss {
    background: rgba(255, 45, 117, 0.1);
    color: var(--quantum-danger);
}

.status-expired {
    background: rgba(170, 170, 170, 0.1);
    color: #aaa;
}

.create-signal-btn {
    text-align: center;
    margin-top: 3rem;
}

.btn-quantum {
    background: linear-gradient(90deg, var(--quantum-accent), var(--quantum-purple));
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s;
}

.btn-quantum:hover {
    transform: translateY(-2px);
    box-shadow: var(--quantum-glow);
}

/* Performance Section */
.performance-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
}

.performance-card {
    background: var(--quantum-card-bg);
    border: 1px solid var(--quantum-border);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s;
}

.performance-card:hover {
    transform: translateY(-5px);
    border-color: var(--quantum-accent);
}

.performance-icon {
    font-size: 2.5rem;
    color: var(--quantum-accent);
    margin-bottom: 1rem;
}

.performance-card h3 {
    font-size: 2.5rem;
    color: var(--quantum-neon);
    margin: 1rem 0;
}

.performance-trend {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.9rem;
    margin-top: 1rem;
}

.performance-trend.up {
    background: rgba(0, 255, 136, 0.1);
    color: var(--quantum-success);
}

.performance-trend.down {
    background: rgba(255, 45, 117, 0.1);
    color: var(--quantum-danger);
}

.performance-chart {
    background: var(--quantum-card-bg);
    border: 1px solid var(--quantum-border);
    border-radius: 15px;
    padding: 2rem;
    margin-top: 2rem;
}

/* Pricing Section */
.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.pricing-card {
    background: var(--quantum-card-bg);
    border: 1px solid var(--quantum-border);
    border-radius: 15px;
    padding: 2.5rem;
    position: relative;
    transition: all 0.3s;
}

.pricing-card:hover {
    transform: translateY(-10px);
    border-color: var(--quantum-accent);
}

.pricing-card.featured {
    border: 2px solid var(--quantum-accent);
    transform: scale(1.05);
}

.pricing-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(90deg, var(--quantum-accent), var(--quantum-purple));
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
}

.pricing-header {
    text-align: center;
    margin-bottom: 2rem;
}

.pricing-header h3 {
    font-size: 1.5rem;
    color: var(--quantum-text);
    margin-bottom: 1rem;
}

.price {
    font-family: 'Orbitron', sans-serif;
    font-size: 3rem;
    font-weight: 700;
    color: var(--quantum-neon);
}

.price span {
    font-size: 1rem;
    color: var(--quantum-text-secondary);
}

.pricing-features {
    list-style: none;
    margin: 2rem 0;
}

.pricing-features li {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.pricing-features .fa-check {
    color: var(--quantum-success);
}

.pricing-features .fa-times {
    color: var(--quantum-danger);
}

.btn-pricing {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--quantum-accent);
    background: transparent;
    color: var(--quantum-accent);
    border-radius: 50px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-pricing:hover {
    background: var(--quantum-accent);
    color: var(--quantum-primary);
}

/* Footer */
.footer {
    background: var(--quantum-secondary);
    border-top: 1px solid var(--quantum-border);
    padding: 4rem 0 2rem;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    margin-bottom: 3rem;
}

.footer-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.footer-description {
    margin-bottom: 1.5rem;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--quantum-card-bg);
    color: var(--quantum-text);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s;
}

.social-link:hover {
    background: var(--quantum-accent);
    color: var(--quantum-primary);
    transform: translateY(-3px);
}

.footer-col h4 {
    color: var(--quantum-accent);
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.75rem;
}

.footer-links a {
    color: var(--quantum-text-secondary);
    text-decoration: none;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: var(--quantum-accent);
}

.footer-contact li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    color: var(--quantum-text-secondary);
}

.footer-newsletter {
    margin-top: 2rem;
}

.newsletter-form {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.newsletter-form input {
    flex: 1;
    background: var(--quantum-card-bg);
    border: 1px solid var(--quantum-border);
    color: var(--quantum-text);
    padding: 0.75rem 1rem;
    border-radius: 8px;
}

.btn-small {
    background: linear-gradient(90deg, var(--quantum-accent), var(--quantum-purple));
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-small:hover {
    transform: translateY(-2px);
    box-shadow: var(--quantum-glow);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid var(--quantum-border);
    color: var(--quantum-text-secondary);
    font-size: 0.9rem;
}

.footer-bottom p {
    margin-bottom: 0.5rem;
}

/* Modals */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2000;
    backdrop-filter: blur(5px);
}

.modal-content {
    background: var(--quantum-card-bg);
    border: 1px solid var(--quantum-border);
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    position: relative;
    animation: modal-appear 0.3s ease-out;
}

@keyframes modal-appear {
    from {
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.quantum-modal {
    background: linear-gradient(135deg, var(--quantum-primary) 0%, var(--quantum-secondary) 100%);
    border: 1px solid var(--quantum-border);
    box-shadow: var(--quantum-glow);
}

.close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    color: var(--quantum-text-secondary);
    cursor: pointer;
    transition: color 0.3s;
}

.close-modal:hover {
    color: var(--quantum-accent);
}

.auth-tabs {
    display: flex;
    border-bottom: 1px solid var(--quantum-border);
    margin-bottom: 2rem;
}

.auth-tab {
    flex: 1;
    padding: 1rem;
    background: none;
    border: none;
    color: var(--quantum-text-secondary);
    font-family: 'Orbitron', sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.auth-tab.active {
    color: var(--quantum-accent);
    border-bottom: 2px solid var(--quantum-accent);
}

.auth-form {
    padding: 2rem;
    display: none;
}

.auth-form.active {
    display: block;
}

.auth-form h3 {
    text-align: center;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--quantum-text-secondary);
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    background: var(--quantum-secondary);
    border: 1px solid var(--quantum-border);
    color: var(--quantum-text);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--quantum-accent);
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
}

.form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.auth-footer {
    text-align: center;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--quantum-border);
    color: var(--quantum-text-secondary);
    font-size: 0.9rem;
}

/* Notifications Panel */
.notification-panel {
    position: fixed;
    top: 70px;
    right: 20px;
    width: 350px;
    background: var(--quantum-card-bg);
    border: 1px solid var(--quantum-border);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    z-index: 1001;
    display: none;
    animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateX(100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.notification-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--quantum-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.notification-header h3 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.notification-list {
    max-height: 400px;
    overflow-y: auto;
}

.notification-item {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--quantum-border);
    transition: background 0.3s;
}

.notification-item:hover {
    background: var(--quantum-secondary);
}

.notification-item.unread {
    background: rgba(0, 212, 255, 0.05);
    border-left: 3px solid var(--quantum-accent);
}

.notification-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--quantum-text);
}

.notification-message {
    color: var(--quantum-text-secondary);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.notification-time {
    font-size: 0.8rem;
    color: var(--quantum-text-secondary);
}

/* Loading States */
.loading-signals {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem;
}

.quantum-loader {
    width: 60px;
    height: 60px;
    margin: 0 auto 2rem;
    border: 3px solid var(--quantum-border);
    border-top-color: var(--quantum-accent);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 1024px) {
    h1 {
        font-size: 2.5rem;
    }
    
    h2 {
        font-size: 2rem;
    }
    
    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 3rem;
    }
    
    .hero-stats {
        justify-content: center;
    }
    
    .hero-visual {
        height: 300px;
    }
    
    .quantum-sphere {
        width: 250px;
        height: 250px;
    }
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--quantum-glass);
        backdrop-filter: blur(10px);
        flex-direction: column;
        padding: 1rem;
        border-top: 1px solid var(--quantum-border);
    }
    
    .nav-links.active {
        display: flex;
    }
    
    .menu-toggle {
        display: block;
    }
    
    .hero {
        padding: 10rem 1rem 4rem;
    }
    
    .hero-stats {
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .hero-buttons {
        flex-direction: column;
    }
    
    .signals-controls {
        flex-direction: column;
        align-items: stretch;
    }
    
    .filters {
        justify-content: center;
    }
    
    .signals-grid {
        grid-template-columns: 1fr;
    }
    
    .pricing-card.featured {
        transform: none;
    }
    
    .notification-panel {
        width: calc(100% - 40px);
        right: 20px;
        left: 20px;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 1rem;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
    
    .modal-content {
        width: 95%;
        margin: 1rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
}

/* Utility Classes */
.quantum-glow {
    text-shadow: 0 0 10px var(--quantum-accent), 0 0 20px var(--quantum-accent);
}

.glass-effect {
    background: var(--quantum-glass);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.text-center {
    text-align: center;
}

.mt-4 {
    margin-top: 4rem;
}

.mb-4 {
    margin-bottom: 4rem;
}

.hidden {
    display: none !important;
}

.visible {
    display: block !important;
}

/* Toast Notifications */
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 3000;
    animation: toast-slide 0.3s ease-out;
    max-width: 350px;
}

@keyframes toast-slide {
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.toast.success {
    background: linear-gradient(90deg, var(--quantum-success), #00cc77);
}

.toast.error {
    background: linear-gradient(90deg, var(--quantum-danger), #ff0055);
}

.toast.info {
    background: linear-gradient(90deg, var(--quantum-accent), var(--quantum-purple));
}

/* Signal Creation Modal */
#signalForm {
    padding-top: 1rem;
}

#signalForm .form-group {
    margin-bottom: 1.5rem;
}

#signalForm label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--quantum-text-secondary);
    font-weight: 500;
}

#signalForm input,
#signalForm select,
#signalForm textarea {
    width: 100%;
    background: var(--quantum-secondary);
    border: 1px solid var(--quantum-border);
    color: var(--quantum-text);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 1rem;
}

#signalForm input:focus,
#signalForm select:focus,
#signalForm textarea:focus {
    outline: none;
    border-color: var(--quantum-accent);
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
}

#signalForm textarea {
    resize: vertical;
    min-height: 100px;
}
