// Quantum Signals Management
class QuantumSignals {
    constructor() {
        this.signals = [];
        this.filteredSignals = [];
        this.currentFilter = 'all';
        this.currentSort = 'newest';
        this.isLoading = false;
        this.init();
    }

    async init() {
        await this.loadSignals();
        this.setupEventListeners();
        this.setupRealtime();
    }

    async loadSignals() {
        this.isLoading = true;
        this.showLoading();

        try {
            const { data: signals, error } = await supabase
                .from('signals')
                .select(`
                    *,
                    profiles:created_by(username, full_name),
                    signal_likes(count),
                    user_likes:signal_likes!inner(user_id)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            this.signals = signals || [];
            this.applyFilters();
            
            // Update stats
            this.updateStats();
            
        } catch (error) {
            console.error('Error loading signals:', error);
            showToast('Error loading signals', 'error');
        } finally {
            this.isLoading = false;
        }
    }

    showLoading() {
        const grid = document.getElementById('signalsGrid');
        grid.innerHTML = `
            <div class="loading-signals">
                <div class="quantum-loader"></div>
                <p>Loading Quantum Signals...</p>
            </div>
        `;
    }

    displaySignals(signals) {
        const grid = document.getElementById('signalsGrid');
        
        if (!signals || signals.length === 0) {
            grid.innerHTML = `
                <div class="no-signals">
                    <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--quantum-accent); margin-bottom: 1rem;"></i>
                    <h3>No signals found</h3>
                    <p>Check back soon for new trading opportunities</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = signals.map(signal => this.createSignalCard(signal)).join('');
        
        // Add event listeners to like buttons
        this.setupLikeButtons();
    }

    createSignalCard(signal) {
        const isLiked = signal.user_likes && signal.user_likes.length > 0;
        const likeCount = signal.signal_likes?.[0]?.count || 0;
        const userLikedClass = isLiked ? 'liked' : '';
        
        // Calculate time ago
        const timeAgo = this.getTimeAgo(signal.created_at);
        
        // Create confidence stars
        const confidenceStars = '★'.repeat(signal.confidence_level) + '☆'.repeat(5 - signal.confidence_level);
        
        return `
            <div class="signal-card" data-signal-id="${signal.id}">
                <div class="signal-header">
                    <div class="signal-asset">${signal.asset_name}</div>
                    <div class="signal-action ${signal.action === 'CALL' ? 'action-call' : 'action-put'}">
                        ${signal.action}
                    </div>
                </div>
                
                <div class="signal-meta">
                    <span><i class="far fa-clock"></i> ${timeAgo}</span>
                    <span><i class="fas fa-user"></i> ${signal.profiles?.username || 'Admin'}</span>
                </div>
                
                <div class="signal-details">
                    <div class="detail-row">
                        <span class="detail-label">Expiry</span>
                        <span class="detail-value">${signal.expiry_time} min</span>
                    </div>
                    
                    ${signal.entry_price ? `
                    <div class="detail-row">
                        <span class="detail-label">Entry Price</span>
                        <span class="detail-value">${parseFloat(signal.entry_price).toFixed(5)}</span>
                    </div>
                    ` : ''}
                    
                    ${signal.target_price ? `
                    <div class="detail-row">
                        <span class="detail-label">Target</span>
                        <span class="detail-value">${parseFloat(signal.target_price).toFixed(5)}</span>
                    </div>
                    ` : ''}
                    
                    ${signal.stop_loss ? `
                    <div class="detail-row">
                        <span class="detail-label">Stop Loss</span>
                        <span class="detail-value">${parseFloat(signal.stop_loss).toFixed(5)}</span>
                    </div>
                    ` : ''}
                    
                    <div class="detail-row">
                        <span class="detail-label">Confidence</span>
                        <span class="detail-value confidence-stars">${confidenceStars}</span>
                    </div>
                </div>
                
                <div class="signal-footer">
                    <button class="like-btn ${userLikedClass}" data-signal-id="${signal.id}">
                        <i class="fas fa-heart"></i>
                        <span class="like-count">${likeCount}</span>
                    </button>
                    <div class="signal-status status-${signal.status}">
                        ${signal.status.toUpperCase()}
                    </div>
                </div>
            </div>
        `;
    }

    getTimeAgo(timestamp) {
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

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentFilter = button.dataset.filter;
                this.applyFilters();
            });
        });

        // Sort select
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });

        // Create signal button
        document.getElementById('createSignalBtn').addEventListener('click', () => {
            this.openSignalModal();
        });

        // Signal form submission
        document.getElementById('signalForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createSignal();
        });

        // Refresh button (hidden but can be added)
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'btn-small';
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        refreshBtn.onclick = () => this.loadSignals();
        document.querySelector('.signals-controls').appendChild(refreshBtn);
    }

    setupLikeButtons() {
        document.querySelectorAll('.like-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                e.stopPropagation();
                const signalId = button.dataset.signalId;
                
                if (!quantumAuth.currentUser) {
                    showToast('Please login to like signals', 'error');
                    quantumAuth.openAuthModal('login');
                    return;
                }

                await this.toggleLike(signalId, button);
            });
        });
    }

    async toggleLike(signalId, button) {
        try {
            const isLiked = button.classList.contains('liked');
            
            if (isLiked) {
                // Unlike
                const { error } = await supabase
                    .from('signal_likes')
                    .delete()
                    .eq('signal_id', signalId)
                    .eq('user_id', quantumAuth.currentUser.id);

                if (error) throw error;
                
                button.classList.remove('liked');
                const countSpan = button.querySelector('.like-count');
                countSpan.textContent = parseInt(countSpan.textContent) - 1;
                
                showToast('Like removed', 'info');
            } else {
                // Like
                const { error } = await supabase
                    .from('signal_likes')
                    .insert({
                        signal_id: signalId,
                        user_id: quantumAuth.currentUser.id
                    });

                if (error) throw error;
                
                button.classList.add('liked');
                const countSpan = button.querySelector('.like-count');
                countSpan.textContent = parseInt(countSpan.textContent) + 1;
                
                showToast('Signal liked!', 'success');
                
                // Create notification for signal creator
                await this.createLikeNotification(signalId);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            showToast('Error updating like', 'error');
        }
    }

    async createLikeNotification(signalId) {
        try {
            // Get signal details
            const { data: signal, error } = await supabase
                .from('signals')
                .select('created_by, asset_name')
                .eq('id', signalId)
                .single();

            if (error) throw error;

            // Only create notification if not liking own signal
            if (signal.created_by !== quantumAuth.currentUser.id) {
                await supabase
                    .from('notifications')
                    .insert({
                        user_id: signal.created_by,
                        title: 'New Like',
                        message: `${quantumAuth.currentUser.email} liked your ${signal.asset_name} signal`,
                        type: 'like',
                        related_signal_id: signalId
                    });
            }
        } catch (error) {
            console.error('Error creating like notification:', error);
        }
    }

    applyFilters() {
        let filtered = [...this.signals];

        // Apply filter
        switch (this.currentFilter) {
            case 'active':
                filtered = filtered.filter(s => s.status === 'active');
                break;
            case 'call':
                filtered = filtered.filter(s => s.action === 'CALL');
                break;
            case 'put':
                filtered = filtered.filter(s => s.action === 'PUT');
                break;
            case 'hit':
                filtered = filtered.filter(s => s.status === 'hit');
                break;
            case 'miss':
                filtered = filtered.filter(s => s.status === 'miss');
                break;
        }

        // Apply sort
        switch (this.currentSort) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                break;
            case 'confidence':
                filtered.sort((a, b) => b.confidence_level - a.confidence_level);
                break;
            case 'likes':
                // Note: This requires additional query optimization in production
                filtered.sort((a, b) => {
                    const aLikes = a.signal_likes?.[0]?.count || 0;
                    const bLikes = b.signal_likes?.[0]?.count || 0;
                    return bLikes - aLikes;
                });
                break;
        }

        this.filteredSignals = filtered;
        this.displaySignals(filtered);
    }

    updateStats() {
        // Update total signals
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todaySignals = this.signals.filter(s => new Date(s.created_at) >= today);
        document.getElementById('totalSignals').textContent = todaySignals.length;

        // Update success rate
        const hitSignals = this.signals.filter(s => s.status === 'hit');
        const successRate = this.signals.length > 0 
            ? Math.round((hitSignals.length / this.signals.length) * 100)
            : 0;
        document.getElementById('successRate').textContent = `${successRate}%`;

        // Active users (simulated - would need real user data)
        document.getElementById('activeUsers').textContent = Math.floor(Math.random() * 100) + 50;
    }

    openSignalModal() {
        const modal = document.getElementById('signalModal');
        modal.style.display = 'flex';
    }

    closeSignalModal() {
        const modal = document.getElementById('signalModal');
        modal.style.display = 'none';
        document.getElementById('signalForm').reset();
    }

    async createSignal() {
        if (!quantumAuth.currentUser) {
            showToast('Please login to create signals', 'error');
            return;
        }

        if (!quantumAuth.isAdmin) {
            showToast('Only admins can create signals', 'error');
            return;
        }

        const assetName = document.getElementById('assetName').value;
        const action = document.getElementById('action').value;
        const expiryTime = parseInt(document.getElementById('expiryTime').value);
        const confidenceLevel = parseInt(document.getElementById('confidenceLevel').value);
        const entryPrice = document.getElementById('entryPrice').value || null;
        const targetPrice = document.getElementById('targetPrice').value || null;
        const stopLoss = document.getElementById('stopLoss').value || null;
        const notes = document.getElementById('signalNotes').value;

        if (!assetName || !action || !expiryTime || !confidenceLevel) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('signals')
                .insert({
                    asset_name: assetName,
                    action: action,
                    expiry_time: expiryTime,
                    entry_price: entryPrice,
                    target_price: targetPrice,
                    stop_loss: stopLoss,
                    confidence_level: confidenceLevel,
                    created_by: quantumAuth.currentUser.id,
                    status: 'active'
                })
                .select()
                .single();

            if (error) throw error;

            // Create notification for all users
            await this.createSignalNotification(data);

            // Reload signals
            await this.loadSignals();
            
            this.closeSignalModal();
            showToast('Signal created successfully!', 'success');
            
        } catch (error) {
            console.error('Error creating signal:', error);
            showToast('Error creating signal: ' + error.message, 'error');
        }
    }

    async createSignalNotification(signal) {
        try {
            // Get all users (excluding admin who created the signal)
            const { data: profiles, error } = await supabase
                .from('profiles')
                .select('id')
                .neq('id', quantumAuth.currentUser.id);

            if (error) throw error;

            // Create notifications for each user
            const notifications = profiles.map(profile => ({
                user_id: profile.id,
                title: 'New Signal Alert',
                message: `New ${signal.action} signal for ${signal.asset_name} (${signal.expiry_time}min)`,
                type: 'signal',
                related_signal_id: signal.id
            }));

            // Insert all notifications (Supabase supports bulk inserts)
            if (notifications.length > 0) {
                await supabase
                    .from('notifications')
                    .insert(notifications);
            }
        } catch (error) {
            console.error('Error creating signal notifications:', error);
        }
    }

    setupRealtime() {
        // Real-time subscription for signals
        const signalsChannel = supabase
            .channel('public:signals')
            .on('postgres_changes', 
                { event: 'INSERT', schema: 'public', table: 'signals' },
                (payload) => {
                    this.handleNewSignal(payload.new);
                }
            )
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'signals' },
                (payload) => {
                    this.handleUpdatedSignal(payload.new);
                }
            )
            .subscribe();

        // Real-time subscription for likes
        const likesChannel = supabase
            .channel('public:signal_likes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'signal_likes' },
                () => {
                    this.refreshSignalLikes();
                }
            )
            .subscribe();
    }

    handleNewSignal(signal) {
        // Add signal to beginning of array
        this.signals.unshift(signal);
        this.applyFilters();
        
        // Update stats
        this.updateStats();
        
        // Show notification for current user (if not the creator)
        if (quantumAuth.currentUser && signal.created_by !== quantumAuth.currentUser.id) {
            showToast(`New signal: ${signal.asset_name} ${signal.action}`, 'info');
        }
    }

    handleUpdatedSignal(signal) {
        // Update signal in array
        const index = this.signals.findIndex(s => s.id === signal.id);
        if (index !== -1) {
            this.signals[index] = signal;
            this.applyFilters();
        }
    }

    async refreshSignalLikes() {
        // Reload signals to get updated like counts
        await this.loadSignals();
    }

    async updateSignalStatus(signalId, status) {
        try {
            const { error } = await supabase
                .from('signals')
                .update({ status: status })
                .eq('id', signalId);

            if (error) throw error;

            showToast('Signal status updated', 'success');
            await this.loadSignals();
        } catch (error) {
            console.error('Error updating signal status:', error);
            showToast('Error updating signal status', 'error');
        }
    }
}

// Initialize signals system
const quantumSignals = new QuantumSignals();

// Export for use in other modules
window.quantumSignals = quantumSignals;
