/* ============================================
 * نظام التنبيهات المخصصة (Toast & Confirm)
 * متناسق مع هوية النظام (Glassmorphism)
 * ============================================ */
function showToast(message, type = 'success', duration = 3000) {
  // Remove existing toasts
  document.querySelectorAll('.custom-toast').forEach(t => t.remove());
  
  const icons = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
  const toast = document.createElement('div');
  toast.className = `custom-toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-icons-round toast-icon">${icons[type]}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;
  document.body.appendChild(toast);
  
  // Animate in with spring effect
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0) scale(1)';
  });
  
  // Auto remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px) scale(0.9)';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

function showConfirm(message, onConfirm) {
  // Remove existing modals
  document.querySelectorAll('.custom-modal-overlay').forEach(m => m.remove());
  
  const overlay = document.createElement('div');
  overlay.className = 'custom-modal-overlay';
  overlay.innerHTML = `
    <div class="custom-modal">
      <div class="modal-icon material-icons-round">${message.includes('حذف') ? 'warning' : 'help'}</div>
      <p class="modal-message">${message}</p>
      <div class="modal-actions">
        <button class="modal-btn cancel-btn">إلغاء</button>
        <button class="modal-btn confirm-btn">تأكيد</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  
  // Events
  overlay.querySelector('.cancel-btn').onclick = () => {
    overlay.remove();
  };
  overlay.querySelector('.confirm-btn').onclick = () => {
    overlay.remove();
    if (onConfirm) onConfirm();
  };
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
  
// Add styles if not exists
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .custom-toast {
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%) translateY(-100px) scale(0.8);
        background: rgba(30,41,59,0.95); backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.15); border-radius: 12px;
        padding: 14px 20px; display: flex; align-items: center; gap: 12px;
        z-index: 10000; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        font-family: 'Cairo', sans-serif; transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        opacity: 0;
      }
      .custom-toast { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
      .toast-success { border-right: 3px solid #22c55e; }
      .toast-error { border-right: 3px solid #ef4444; }
      .toast-warning { border-right: 3px solid #f59e0b; }
      .toast-info { border-right: 3px solid #3b82f6; }
      .toast-icon { font-size: 22px; flex-shrink: 0; }
      .toast-success .toast-icon { color: #22c55e; }
      .toast-error .toast-icon { color: #ef4444; }
      .toast-warning .toast-icon { color: #f59e0b; }
      .toast-info .toast-icon { color: #3b82f6; }
      .toast-message { color: #f8fafc; font-size: 0.95rem; font-weight: 500; flex: 1; }
      .toast-close {
        background: none; border: none; color: #64748b; font-size: 16px;
        cursor: pointer; padding: 4px; margin-right: 4px;
        transition: color 0.2s; flex-shrink: 0;
      }
      .toast-close:hover { color: #f8fafc; }
      .custom-modal-overlay {
        position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(8px); animation: fadeIn 0.25s ease;
      }
      .custom-modal {
        background: rgba(30,41,59,0.98); backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.15); border-radius: 16px;
        padding: 24px; width: 90%; max-width: 340px; text-align: center;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5); font-family: 'Cairo', sans-serif;
        animation: modalSlide 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes modalSlide { from { transform: scale(0.8) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
      .modal-icon { font-size: 48px; color: #f59e0b; margin-bottom: 12px; }
      .modal-message { color: #f8fafc; font-size: 1rem; margin-bottom: 24px; line-height: 1.6; }
      .modal-actions { display: flex; gap: 12px; }
      .modal-btn {
        flex: 1; padding: 12px; border: none; border-radius: 10px;
        font-size: 0.95rem; font-weight: 600; cursor: pointer;
        font-family: 'Cairo', sans-serif; transition: all 0.2s;
      }
      .cancel-btn { background: rgba(255,255,255,0.1); color: #94a3b8; }
      .cancel-btn:hover { background: rgba(255,255,255,0.15); }
      .confirm-btn { background: #ef4444; color: #fff; }
      .confirm-btn:hover { background: #dc2626; transform: translateY(-2px); }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      html.light-mode .custom-toast {
        background: rgba(255,255,255,0.98); border-color: rgba(59,130,246,0.3);
        box-shadow: 0 8px 32px rgba(59,130,246,0.2);
      }
      html.light-mode .toast-message { color: #1e293b; }
      html.light-mode .toast-close { color: #94a3b8; }
      html.light-mode .toast-close:hover { color: #1e293b; }
      html.light-mode .custom-modal { background: rgba(255,255,255,0.98); }
      html.light-mode .modal-message { color: #1e293b; }
      html.light-mode .cancel-btn { background: rgba(0,0,0,0.08); color: #64748b; }
    `;
    document.head.appendChild(style);
  }
  
  // Trigger animation
  requestAnimationFrame(() => overlay.classList.add('show'));
}

// Alias functions for easy use
function alert(msg, type = 'success') { showToast(msg, type); }
function confirm(msg, callback) { showConfirm(msg, callback); }

/**
 * نظام المصادقة والصلاحيات - نظام التميز
 * يُستدعى في بداية كل صفحة محمية
 * ✅ الآن متصل بالسيرفر (Database)
 */

// رابط API الأساسي (غيّره إذا رفعت الملفات في مجلد فرعي)
const API_BASE = '/api';

/**
 * جلب بيانات المستخدم الحالي من السيرفر
 */
async function getCurrentUser() {
  try {
    const res = await fetch(`${API_BASE}/me.php`, {
      method: 'GET',
      credentials: 'include', // مهم جداً لإرسال الكوكيز/السيشن
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (data.authenticated && data.user) {
      // نحفظ في localStorage للاستخدام السريع
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      return data.user;
    }
    localStorage.removeItem('currentUser');
    return null;
  } catch (e) {
    // إذا السيرفر مو متاح، نرجع للـ localStorage كاحتياطي
    try {
      return JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch (e2) {
      return null;
    }
  }
}

/**
 * التحقق إذا كان المستخدم الحالي مدير النظام (admin)
 */
async function isAdmin() {
  const user = await getCurrentUser();
  return user && (user.role === 'admin' || (user.permissions && user.permissions.includes('*')));
}

/**
 * التحقق إذا كان المستخدم لديه صلاحية للصفحة المحددة
 * ⚠️ تم التعديل: جميع المستخدمين لديهم صلاحيات كاملة (كالمدير)
 * @param {string} page - اسم الملف مثل 'customers.html'
 */
async function hasPermission(page) {
  const user = await getCurrentUser();
  if (!user) return false;
  // جميع المستخدمين يرون كل الصفحات (صلاحيات كاملة)
  if (user.role === 'admin') return true;
  // المستخدم العادي له كل الصلاحيات أيضاً
  return true;
}

/**
 * تصفية البيانات لعرض فقط بيانات المستخدم الحالي
 * المدير يشاهد كل البيانات
 * @param {Array} dataArray - مصفوفة البيانات
 * @param {string} key - مفتاح المقارنة (افتراضي: createdBy)
 * 
 * ⚠️ ملاحظة: العزل الآن يتم على السيرفر، هذه الدالة للتوافق مع الكود القديم
 */
function filterDataByUser(dataArray, key = 'user_id') {
  if (!Array.isArray(dataArray)) return [];
  // السيرفر يرجع البيانات مفلترة فعلياً
  return dataArray;
}

/**
 * تطبيق صلاحيات القائمة الجانبية (Sidebar)
 */
async function applySidebarPermissions() {
  const user = await getCurrentUser();
  if (!user) return;
  if (user.role === 'admin') return; // المدير يرى كل شيء

  // إخفاء روابط القائمة الجانبية
  document.querySelectorAll('.sidebar-nav .sub-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !user.permissions.includes(href)) {
      link.style.display = 'none';
    }
  });

  // إخفاء الأزرار الرئيسية في القائمة الجانبية إذا لم يكن لها روابط فرعية مرئية
  document.querySelectorAll('.sidebar-nav .submenu-container').forEach(container => {
    const submenu = container.querySelector('.submenu');
    if (submenu) {
      const visibleLinks = submenu.querySelectorAll('.sub-link:not([style*="display: none"])');
      if (visibleLinks.length === 0) {
        container.style.display = 'none';
      }
    }
  });

  // إخفاء روابط nav-btn-3d المباشرة (غير المنسدلة)
  document.querySelectorAll('.sidebar-nav > .nav-btn-3d').forEach(btn => {
    const href = btn.getAttribute('href');
    if (href && !user.permissions.includes(href)) {
      btn.style.display = 'none';
    }
  });
}

/**
 * تطبيق صلاحيات الفوتر (Footer)
 */
async function applyFooterPermissions() {
  const user = await getCurrentUser();
  if (!user) return;
  if (user.role === 'admin') return;

  document.querySelectorAll('.mobile-footer .footer-btn').forEach(btn => {
    const href = btn.getAttribute('href');
    if (href && !user.permissions.includes(href)) {
      btn.style.display = 'none';
    }
  });
}

/**
 * حماية الصفحة الحالية - إعادة التوجيه إذا لم يكن لديه صلاحية
 */
async function protectPage() {
  const user = await getCurrentUser();
  if (!user) {
    window.location.href = 'index.html';
    return;
  }
  if (user.role === 'admin') return;

  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  if (!user.permissions.includes(currentPage)) {
    alert('⛔ ليس لديك صلاحية للوصول إلى هذه الصفحة');
    window.location.href = 'home.html';
  }
}

/**
 * تحديث معلومات المستخدم في الهيدر
 */
async function updateUserInfo() {
  // ✅ Fix: تحقق من وجود العناصر قبل الوصول لها
  await new Promise(resolve => requestAnimationFrame(resolve)); // تأكيد DOM جاهز
  
  const user = await getCurrentUser();
  if (!user) {
    console.warn('No user data available for updateUserInfo');
    return;
  }

  // دقيق: استهداف العناصر المحددة بدلاً من querySelectorAll
  const nameSpan = document.querySelector('.user-info > span');
  const roleSmall = document.querySelector('.user-info > small');
  
  if (nameSpan && nameSpan instanceof HTMLElement) {
    const currentText = nameSpan.textContent?.trim();
    if (currentText && currentText !== 'admin' && currentText !== 'مدير النظام') {
      nameSpan.textContent = user.name || user.phone || 'مستخدم';
      console.log('✅ Updated user name:', nameSpan.textContent);
    }
  } else {
    console.warn('User name span not found');
  }
  
  if (roleSmall && roleSmall instanceof HTMLElement) {
    const currentRoleText = roleSmall.textContent?.trim();
    if (currentRoleText === 'admin' || currentRoleText === 'مدير النظام') {
      if (user.role !== 'admin') {
        roleSmall.textContent = user.role === 'user' ? 'مستخدم' : (user.role || 'مستخدم');
        console.log('✅ Updated user role:', roleSmall.textContent);
      }
    }
  } else {
    console.warn('User role small not found');
  }
}

/**
 * دالة تهيئة شاملة - تُستدعى عند تحميل الصفحة
 */
async function initAuth() {
  await protectPage();
  await updateUserInfo();
  await applySidebarPermissions();
  await applyFooterPermissions();
}

/**
 * ✅ دالة مساعدة: جلب البيانات من API
 * @param {string} endpoint - مثل 'customers.php'
 */
async function apiGet(endpoint) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    credentials: 'include'
  });
  return await res.json();
}

/**
 * ✅ دالة مساعدة: إرسال بيانات إلى API
 * @param {string} endpoint - مثل 'customers.php'
 * @param {string} method - GET, POST, PUT, DELETE
 * @param {object} data - البيانات
 */
async function apiSend(endpoint, method = 'POST', data = null) {
  const options = {
    method: method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const res = await fetch(`${API_BASE}/${endpoint}`, options);
  return await res.json();
}

/**
 * ====== نظام العمل Offline ======
 * يدعم: Server-first مع offline cache + sync تلقائي
 */

// حفظ في localStorage كـ cache
function saveOfflineCache(key, data) {
  try {
    const cacheData = {
      data: data,
      timestamp: Date.now(),
      user_id: getCurrentUserId() // إضافة user_id للعزل
    };
    localStorage.setItem(`offline_${key}`, JSON.stringify(cacheData));
  } catch (e) {
    console.warn('Offline cache save failed:', e);
  }
}

// جلب من localStorage cache
function loadOfflineCache(key) {
  try {
    const cached = localStorage.getItem(`offline_${key}`);
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    const currentUserId = getCurrentUserId();
    
    // التأكد من أن البيانات تنتمي للمستخدم الحالي
    if (cacheData.user_id && cacheData.user_id !== currentUserId) {
      console.warn('Cache user mismatch, clearing...');
      localStorage.removeItem(`offline_${key}`);
      return null;
    }
    
    return cacheData.data;
  } catch (e) {
    console.warn('Offline cache load failed:', e);
    return null;
  }
}

// جلب user_id منsession أو localStorage
function getCurrentUserId() {
  try {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user?.id || localStorage.getItem('user_id') || null;
  } catch (e) {
    return null;
  }
}

// حذف cache معين
function clearOfflineCache(key) {
  localStorage.removeItem(`offline_${key}`);
}

// حذف كل cache لمستخدم معين
function clearAllOfflineCache() {
  const currentUserId = getCurrentUserId();
  if (!currentUserId) return;
  
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('offline_')) {
      const cached = localStorage.getItem(key);
      if (cached) {
        try {
          const data = JSON.parse(cached);
          if (data.user_id !== currentUserId) {
            localStorage.removeItem(key);
          }
        } catch (e) {}
      }
    }
  });
}

// حفظ العمليات المعلقة للمزامنة لاحقاً
function savePendingOperation(endpoint, method, data) {
  try {
    const pending = JSON.parse(localStorage.getItem('pending_sync') || '[]');
    pending.push({
      endpoint,
      method,
      data,
      timestamp: Date.now(),
      user_id: getCurrentUserId()
    });
    localStorage.setItem('pending_sync', JSON.stringify(pending));
    console.log('✅ Pending operation saved:', endpoint);
  } catch (e) {
    console.warn('Failed to save pending operation:', e);
  }
}

// جلب كل العمليات المعلقة
function getPendingOperations() {
  try {
    const currentUserId = getCurrentUserId();
    const pending = JSON.parse(localStorage.getItem('pending_sync') || '[]');
    // فلترة للمستخدم الحالي فقط
    return pending.filter(op => op.user_id === currentUserId);
  } catch (e) {
    return [];
  }
}

// حذف عملية منقولة
function clearPendingOperation(index) {
  try {
    const pending = JSON.parse(localStorage.getItem('pending_sync') || '[]');
    pending.splice(index, 1);
    localStorage.setItem('pending_sync', JSON.stringify(pending));
  } catch (e) {}
}

// مزامنة تلقائية عند الاتصال
async function syncPendingOperations(onComplete) {
  const pending = getPendingOperations();
  if (pending.length === 0) {
    if (onComplete) onComplete(true);
    return;
  }
  
  console.log(`🔄 Sync started: ${pending.length} operations pending`);
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < pending.length; i++) {
    const op = pending[i];
    try {
      const res = await fetch(`${API_BASE}/${op.endpoint}`, {
        method: op.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(op.data)
      });
      const result = await res.json();
      
      if (result.success) {
        clearPendingOperation(i);
        i--; //_adjust index after splice
        successCount++;
      } else {
        failCount++;
      }
    } catch (e) {
      failCount++;
    }
  }
  
  console.log(`✅ Sync complete: ${successCount} success, ${failCount} failed`);
  if (onComplete) onComplete(failCount === 0);
}

// اكتشاف حالة الاتصال
function isOnline() {
  return navigator.onLine;
}

// الاستماع لتغيير حالة الاتصال
window.addEventListener('online', () => {
  console.log('🌐 Back online! Syncing...');
  syncPendingOperations((success) => {
    if (success) {
      alert('✅ تمت مزامنة البيانات بنجاح!');
      // إعادة تحميل الصفحة الحالية
      window.location.reload();
    }
  });
});

window.addEventListener('offline', () => {
  console.log('📴 Went offline');
  alert('⚠️ لا يوجد اتصال. سيتم العمل في وضع القراءة فقط.', 'warning');
});

