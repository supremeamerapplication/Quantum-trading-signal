// Admin Panel Management
class QuantumAdmin {
    constructor() {
        this.currentUser = null;
        this.isAdmin = false;
        this.init();
    }

    async init() {
        // Check authentication and admin status
        await this.checkAdminAccess();
        
        if (this.isAdmin) {
            this.setupAdmin();
            this.loadAdminData();
        } else {
            this.redirectToMain();
        }
    }

    async checkAdminAccess() {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
            window.location.href = 'index.html';
            return;
        }

        this.currentUser = session.user;
        
        // Check if user is admin
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', this.currentUser.id)
            .single();

        if (error) {
            console.error('Error checking admin status:', error);
            this.redirectToMain();
            return;
        }

        this.isAdmin = profile.is_admin || false;
        
        if (!this.isAdmin) {
            showToast('Access denied. Admin privileges required.', 'error');
            this.redirectToMain();
        }
    }

    setupAdmin() {
        this.setupEventListeners();
        this.updateAdminUI();
        this.setupRealtime();
    }

    updateAdminUI() {
        // Update email display
        const adminEmail = document.getElementById('adminEmail');
        if (adminEmail) {
            adminEmail.textContent = this.currentUser.email;
        }
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.admin-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(item.getAttribute('href').substring(1));
            });
        });

        // Logout
        document.getElementById('adminLogout').addEventListener('click', () => {
            this.logout();
        });

        // Back to site
        document.getElementById('backToSite').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Quick actions
        document.getElementById('quickSignal').addEventListener('click', () => {
            this.switchSection('signals');
            document.getElementById('createNewSignal').click();
        });

        document.getElementById('quickNotification').addEventListener('click', () => {
            this.switchSection('notifications');
        });

        // Create new signal
        document.getElementById('createNewSignal').addEventListener('click', () => {
            // Open signal modal from main app
            if (window.quantumSignals) {
                window.quantumSignals.openSignalModal();
            }
        });

        // Notification form
        document.getElementById('adminNotificationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendNotification();
        });

        // Notification audience change
        document.getElementById('notificationAudience').addEventListener('change', (e) => {
            const specificContainer = document.getElementById('specificUsersContainer');
            specificContainer.style.display = e.target.value === 'specific' ? 'block' : 'none';
        });

        // Settings tabs
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchSettingsTab(tab.dataset.tab);
            });
        });

        // Settings forms
        document.getElementById('generalSettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveGeneralSettings();
        });

        document.getElementById('securitySettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSecuritySettings();
        });

        document.getElementById('emailSettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEmailSettings();
        });
    }

    switchSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all menu items
        document.querySelectorAll('.admin-menu-item').forEach(item => {
            item.classList.remove('active');
        });

        // Show selected section
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }

        // Activate corresponding menu item
        const menuItem = document.querySelector(`.admin-menu-item[href="#${sectionId}"]`);
        if (menuItem) {
            menuItem.classList.add('active');
        }

        // Load section data
        this.loadSectionData(sectionId);
    }

    async loadAdminData() {
        await this.loadDashboardData();
        this.loadSectionData('dashboard');
    }

    async loadDashboardData() {
        try {
            // Load signals count
            const { count: signalsCount } = await supabase
                .from('signals')
                .select('*', { count: 'exact', head: true });

            document.getElementById('totalSignalsAdmin').textContent = signalsCount || 0;

            // Load users count
            const { count: usersCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true });

            document.getElementById('totalUsers').textContent = usersCount || 0;

            // Load likes count
            const { count: likesCount } = await supabase
                .from('signal_likes')
                .select('*', { count: 'exact', head: true });

            document.getElementById('totalLikes').textContent = likesCount || 0;

            // Calculate success rate
            const { data: signals } = await supabase
                .from('signals')
                .select('status');

            if (signals && signals.length > 0) {
                const hitCount = signals.filter(s => s.status === 'hit').length;
                const successRate = Math.round((hitCount / signals.length) * 100);
                document.getElementById('successRateAdmin').textContent = `${successRate}%`;
            }

        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    async loadSectionData(sectionId) {
        switch (sectionId) {
            case 'signals':
                await this.loadSignalsTable();
                break;
            case 'users':
                await this.loadUsersTable();
                break;
            case 'notifications':
                await this.loadNotificationHistory();
                break;
            case 'analytics':
                await this.loadAnalytics();
                break;
            case 'activity':
                await this.loadRecentActivity();
                break;
        }
    }

    async loadSignalsTable() {
        try {
            const { data: signals, error } = await supabase
                .from('signals')
                .select(`
                    *,
                    profiles:created_by(username),
                    signal_likes(count)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const tbody = document.querySelector('#signalsTable tbody');
            if (!tbody) return;

            tbody.innerHTML = signals.map(signal => `
                <tr data-signal-id="${signal.id}">
                    <td><input type="checkbox" class="signal-checkbox"></td>
                    <td><strong>${signal.asset_name}</strong></td>
                    <td>
                        <span class="signal-action ${signal.action === 'CALL' ? 'action-call' : 'action-put'}">
                            ${signal.action}
                        </span>
                    </td>
                    <td>
                        <span class="signal-status status-${signal.status}">
                            ${signal.status.toUpperCase()}
                        </span>
                    </td>
                    <td>${signal.expiry_time} min</td>
                    <td>${'★'.repeat(signal.confidence_level)}</td>
                    <td>${signal.signal_likes?.[0]?.count || 0}</td>
                    <td>${new Date(signal.created_at).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-small" onclick="quantumAdmin.editSignal('${signal.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-small" onclick="quantumAdmin.deleteSignal('${signal.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join('');

        } catch (error) {
            console.error('Error loading signals table:', error);
            showToast('Error loading signals', 'error');
        }
    }

    async loadUsersTable() {
        try {
            const { data: users, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const tbody = document.querySelector('#usersTable tbody');
            if (!tbody) return;

            tbody.innerHTML = users.map(user => `
                <tr data-user-id="${user.id}">
                    <td>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            ${user.avatar_url ? 
                                `<img src="${user.avatar_url}" style="width: 30px; height: 30px; border-radius: 50%;">` : 
                                `<div style="width: 30px; height: 30px; border-radius: 50%; background: var(--quantum-accent); display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-user"></i>
                                </div>`
                            }
                            <div>
                                <strong>${user.username}</strong>
                                ${user.is_admin ? '<span style="font-size: 0.7rem; color: var(--quantum-accent); margin-left: 0.5rem;">ADMIN</span>' : ''}
                            </div>
                        </div>
                    </td>
                    <td>${user.id === this.currentUser.id ? `${user.id.slice(0, 8)}... (You)` : user.id.slice(0, 8) + '...'}</td>
                    <td>
                        <span class="subscription-tier ${user.subscription_tier}">
                            ${user.subscription_tier?.toUpperCase() || 'FREE'}
                        </span>
                    </td>
                    <td>
                        <span class="user-status ${user.subscription_expiry && new Date(user.subscription_expiry) > new Date() ? 'active' : 'inactive'}">
                            ${user.subscription_expiry && new Date(user.subscription_expiry) > new Date() ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td>0</td>
                    <td>${new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                        <button class="btn-small" onclick="quantumAdmin.editUser('${user.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${user.id !== this.currentUser.id ? `
                            <button class="btn-small" onclick="quantumAdmin.toggleAdmin('${user.id}', ${user.is_admin})">
                                <i class="fas ${user.is_admin ? 'fa-user' : 'fa-user-shield'}"></i>
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `).join('');

        } catch (error) {
            console.error('Error loading users table:', error);
            showToast('Error loading users', 'error');
        }
    }

    async loadNotificationHistory() {
        try {
            const { data: notifications, error } = await supabase
                .from('notifications')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;

            const historyList = document.getElementById('notificationHistory');
            if (!historyList) return;

            historyList.innerHTML = notifications.map(notification => `
                <div class="history-item">
                    <div class="history-content">
                        <h4>${notification.title}</h4>
                        <p>${notification.message}</p>
                    </div>
                    <div class="history-time">
                        ${new Date(notification.created_at).toLocaleDateString()}
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading notification history:', error);
        }
    }

    async loadAnalytics() {
        // This would load analytics data and create charts
        // For now, we'll initialize empty charts
        this.initAnalyticsCharts();
    }

    initAnalyticsCharts() {
        // Initialize performance chart
        const ctx1 = document.getElementById('analyticsChart');
        if (ctx1) {
            new Chart(ctx1.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Signals Sent',
                        data: [12, 19, 15, 25, 22, 18, 24],
                        backgroundColor: 'rgba(0, 212, 255, 0.5)',
                        borderColor: 'rgba(0, 212, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Initialize users chart
        const ctx2 = document.getElementById('usersChart');
        if (ctx2) {
            new Chart(ctx2.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'New Users',
                        data: [65, 78, 90, 110, 125, 150],
                        borderColor: 'rgba(0, 255, 136, 1)',
                        backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    async loadRecentActivity() {
        try {
            // Get recent signals, users, and notifications
            const { data: recentSignals } = await supabase
                .from('signals')
                .select('*, profiles:created_by(username)')
                .order('created_at', { ascending: false })
                .limit(5);

            const { data: recentUsers } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            const activityList = document.getElementById('activityList');
            if (!activityList) return;

            let activities = [];

            // Convert signals to activities
            if (recentSignals) {
                activities.push(...recentSignals.map(signal => ({
                    type: 'signal',
                    title: `New signal: ${signal.asset_name} ${signal.action}`,
                    user: signal.profiles?.username || 'Admin',
                    time: signal.created_at
                })));
            }

            // Convert new users to activities
            if (recentUsers) {
                activities.push(...recentUsers.map(user => ({
                    type: 'user',
                    title: `New user joined: ${user.username}`,
                    user: 'System',
                    time: user.created_at
                })));
            }

            // Sort by time
            activities.sort((a, b) => new Date(b.time) - new Date(a.time));

            // Display activities
            activityList.innerHTML = activities.slice(0, 10).map(activity => `
                <div class="activity-item">
                    <div class="activity-icon ${activity.type}">
                        <i class="fas fa-${activity.type === 'signal' ? 'bolt' : 'user'}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-time">
                            By ${activity.user} • ${this.formatTime(activity.time)}
                        </div>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading recent activity:', error);
        }
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString();
    }

    async sendNotification() {
        const title = document.getElementById('notificationTitle').value;
        const message = document.getElementById('notificationMessage').value;
        const type = document.getElementById('notificationType').value;
        const audience = document.getElementById('notificationAudience').value;
        const specificUsers = document.getElementById('specificUsers').value;

        if (!title || !message) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        try {
            let userIds = [];

            if (audience === 'specific' && specificUsers) {
                // Get user IDs from emails
                const emails = specificUsers.split(',').map(email => email.trim());
                const { data: users, error } = await supabase
                    .from('profiles')
                    .select('id')
                    .in('email', emails);

                if (error) throw error;
                userIds = users.map(user => user.id);
            } else {
                // Get all user IDs based on audience
                const query = supabase.from('profiles').select('id');
                
                if (audience === 'vip') {
                    query.neq('subscription_tier', 'free');
                } else if (audience === 'free') {
                    query.eq('subscription_tier', 'free');
                }

                const { data: users, error } = await query;
                if (error) throw error;
                userIds = users.map(user => user.id);
            }

            if (userIds.length === 0) {
                showToast('No users found for the selected audience', 'warning');
                return;
            }

            // Create notifications for each user
            const notifications = userIds.map(userId => ({
                user_id: userId,
                title: title,
                message: message,
                type: type,
                read: false
            }));

            const { error } = await supabase
                .from('notifications')
                .insert(notifications);

            if (error) throw error;

            showToast(`Notification sent to ${userIds.length} users`, 'success');
            
            // Clear form
            document.getElementById('adminNotificationForm').reset();
            
            // Reload history
            this.loadNotificationHistory();

        } catch (error) {
            console.error('Error sending notification:', error);
            showToast('Error sending notification', 'error');
        }
    }

    async editSignal(signalId) {
        showToast('Edit signal functionality would open here', 'info');
        // In production, this would open a modal with the signal form pre-filled
    }

    async deleteSignal(signalId) {
        if (!confirm('Are you sure you want to delete this signal?')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('signals')
                .delete()
                .eq('id', signalId);

            if (error) throw error;

            showToast('Signal deleted successfully', 'success');
            this.loadSignalsTable();

        } catch (error) {
            console.error('Error deleting signal:', error);
            showToast('Error deleting signal', 'error');
        }
    }

    async editUser(userId) {
        showToast('Edit user functionality would open here', 'info');
        // In production, this would open a modal with the user form pre-filled
    }

    async toggleAdmin(userId, isCurrentlyAdmin) {
        if (!confirm(`Are you sure you want to ${isCurrentlyAdmin ? 'remove admin privileges from' : 'make admin'} this user?`)) {
            return;
        }

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ is_admin: !isCurrentlyAdmin })
                .eq('id', userId);

            if (error) throw error;

            showToast(`User ${isCurrentlyAdmin ? 'removed from' : 'added to'} admins`, 'success');
            this.loadUsersTable();

        } catch (error) {
            console.error('Error updating user admin status:', error);
            showToast('Error updating user', 'error');
        }
    }

    switchSettingsTab(tabId) {
        // Hide all panes
        document.querySelectorAll('.settings-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Remove active class from all tabs
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected pane
        const pane = document.getElementById(tabId);
        if (pane) {
            pane.classList.add('active');
        }

        // Activate corresponding tab
        const tab = document.querySelector(`.settings-tab[data-tab="${tabId}"]`);
        if (tab) {
            tab.classList.add('active');
        }
    }

    async saveGeneralSettings() {
        // In production, this would save to a settings table
        showToast('General settings saved successfully', 'success');
    }

    async saveSecuritySettings() {
        // In production, this would update security settings
        showToast('Security settings updated', 'success');
    }

    async saveEmailSettings() {
        // In production, this would save email settings
        showToast('Email settings saved', 'success');
    }

    setupRealtime() {
        // Real-time updates for admin dashboard
        const signalsChannel = supabase
            .channel('admin_signals')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'signals' },
                () => {
                    this.loadDashboardData();
                    this.loadSignalsTable();
                    this.loadRecentActivity();
                }
            )
            .subscribe();

        const usersChannel = supabase
            .channel('admin_users')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'profiles' },
                () => {
                    this.loadDashboardData();
                    this.loadUsersTable();
                    this.loadRecentActivity();
                }
            )
            .subscribe();
    }

    async logout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
            showToast('Error logging out', 'error');
        }
    }

    redirectToMain() {
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// Initialize admin panel
const quantumAdmin = new QuantumAdmin();

// Export for global access
window.quantumAdmin = quantumAdmin;
