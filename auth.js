// Authentication Management
class QuantumAuth {
    constructor() {
        this.currentUser = null;
        this.isAdmin = false;
        this.init();
    }

    async init() {
        // Check existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            this.handleUserLogin(session.user);
        }

        // Listen for auth changes
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                this.handleUserLogin(session.user);
            } else if (event === 'SIGNED_OUT') {
                this.handleUserLogout();
            }
        });
    }

    async handleUserLogin(user) {
        this.currentUser = user;
        
        // Get user profile from database
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            // Create profile if doesn't exist
            await this.createUserProfile(user);
        } else {
            this.isAdmin = profile.is_admin || false;
            this.updateUIForUser(profile);
        }

        // Update UI
        this.updateAuthUI();
        this.loadNotifications();
        
        showToast(`Welcome back, ${user.email}!`, 'success');
    }

    async createUserProfile(user) {
        const { error } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                username: user.email.split('@')[0],
                full_name: user.user_metadata?.full_name || user.email.split('@')[0],
                avatar_url: user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email.split('@')[0])}&background=0c0c1d&color=00d4ff`
            });

        if (error) {
            console.error('Error creating profile:', error);
        }
    }

    handleUserLogout() {
        this.currentUser = null;
        this.isAdmin = false;
        this.updateAuthUI();
        showToast('Logged out successfully', 'info');
    }

    updateAuthUI() {
        const authButton = document.getElementById('authButton');
        const notificationBtn = document.getElementById('notificationBtn');
        const createSignalBtn = document.getElementById('createSignalBtn');

        if (this.currentUser) {
            authButton.innerHTML = `<i class="fas fa-user"></i> <span>${this.currentUser.email}</span>`;
            authButton.onclick = () => this.logout();
            notificationBtn.style.display = 'flex';
            
            if (this.isAdmin) {
                createSignalBtn.style.display = 'block';
            }
        } else {
            authButton.innerHTML = `<i class="fas fa-user"></i> <span>Sign In</span>`;
            authButton.onclick = () => this.openAuthModal('login');
            notificationBtn.style.display = 'none';
            createSignalBtn.style.display = 'none';
        }
    }

    updateUIForUser(profile) {
        // Update any user-specific UI elements
        const userElements = document.querySelectorAll('[data-user-id]');
        userElements.forEach(el => {
            if (el.dataset.userId === this.currentUser.id) {
                el.classList.add('current-user');
            }
        });
    }

    async login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;
            
            showToast('Login successful!', 'success');
            this.closeAuthModal();
            return true;
        } catch (error) {
            console.error('Login error:', error.message);
            showToast(error.message, 'error');
            return false;
        }
    }

    async signup(email, password, username, fullName) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username,
                        full_name: fullName
                    }
                }
            });

            if (error) throw error;
            
            showToast('Registration successful! Please check your email to confirm your account.', 'success');
            this.closeAuthModal();
            return true;
        } catch (error) {
            console.error('Signup error:', error.message);
            showToast(error.message, 'error');
            return false;
        }
    }

    async logout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            
            this.handleUserLogout();
        } catch (error) {
            console.error('Logout error:', error.message);
            showToast(error.message, 'error');
        }
    }

    openAuthModal(tab = 'login') {
        const modal = document.getElementById('authModal');
        modal.style.display = 'flex';
        
        // Switch to specified tab
        this.switchAuthTab(tab);
    }

    closeAuthModal() {
        const modal = document.getElementById('authModal');
        modal.style.display = 'none';
        
        // Reset forms
        document.getElementById('loginForm').reset();
        document.getElementById('signupForm').reset();
    }

    switchAuthTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.toggle('active', form.id === `${tabName}Form`);
        });
    }

    async loadNotifications() {
        if (!this.currentUser) return;

        const { data: notifications, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', this.currentUser.id)
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) {
            console.error('Error loading notifications:', error);
            return;
        }

        this.displayNotifications(notifications);
    }

    displayNotifications(notifications) {
        const notificationList = document.getElementById('notificationList');
        const notificationCount = document.getElementById('notificationCount');
        
        if (!notifications || notifications.length === 0) {
            notificationList.innerHTML = '<div class="notification-item"><p class="notification-message">No notifications yet</p></div>';
            notificationCount.textContent = '0';
            return;
        }

        const unreadCount = notifications.filter(n => !n.read).length;
        notificationCount.textContent = unreadCount > 9 ? '9+' : unreadCount;

        notificationList.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}" data-notification-id="${notification.id}">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${this.formatTime(notification.created_at)}</div>
            </div>
        `).join('');
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

    async markNotificationAsRead(notificationId) {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', notificationId);

        if (error) {
            console.error('Error marking notification as read:', error);
        }
    }

    async markAllNotificationsAsRead() {
        if (!this.currentUser) return;

        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', this.currentUser.id)
            .eq('read', false);

        if (error) {
            console.error('Error marking all notifications as read:', error);
            showToast('Error updating notifications', 'error');
        } else {
            this.loadNotifications();
            showToast('All notifications marked as read', 'success');
        }
    }
}

// Initialize auth system
const quantumAuth = new QuantumAuth();

// Auth event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            quantumAuth.switchAuthTab(tab.dataset.tab);
        });
    });

    // Login form
    document.getElementById('loginBtn').addEventListener('click', async () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        await quantumAuth.login(email, password);
    });

    // Signup form
    document.getElementById('signupBtn').addEventListener('click', async () => {
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const username = document.getElementById('signupUsername').value;
        const fullName = document.getElementById('signupFullName').value;
        
        if (!email || !password || !username) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        if (password.length < 8) {
            showToast('Password must be at least 8 characters', 'error');
            return;
        }
        
        await quantumAuth.signup(email, password, username, fullName);
    });

    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Get Started button
    document.getElementById('getStartedBtn').addEventListener('click', () => {
        quantumAuth.openAuthModal('signup');
    });

    // Notification button
    document.getElementById('notificationBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        const panel = document.getElementById('notificationPanel');
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });

    // Mark all notifications as read
    document.getElementById('markAllRead').addEventListener('click', () => {
        quantumAuth.markAllNotificationsAsRead();
    });

    // Close notification panel when clicking outside
    document.addEventListener('click', (event) => {
        const panel = document.getElementById('notificationPanel');
        const button = document.getElementById('notificationBtn');
        
        if (panel.style.display === 'block' && 
            !panel.contains(event.target) && 
            !button.contains(event.target)) {
            panel.style.display = 'none';
        }
    });

    // Handle notification clicks
    document.addEventListener('click', (event) => {
        const notificationItem = event.target.closest('.notification-item');
        if (notificationItem && !notificationItem.classList.contains('read')) {
            const notificationId = notificationItem.dataset.notificationId;
            notificationItem.classList.add('read');
            quantumAuth.markNotificationAsRead(notificationId);
            
            // Update badge count
            const badge = document.getElementById('notificationCount');
            let count = parseInt(badge.textContent);
            if (count > 0) {
                badge.textContent = count - 1;
            }
        }
    });
});

// Toast notification function
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Export for use in other modules
window.quantumAuth = quantumAuth;
window.showToast = showToast;
