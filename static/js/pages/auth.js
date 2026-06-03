/* ============================================
   PlayMood - Auth Pages JS
   Login, Register form validation
   ============================================ */

const AuthPage = {
  init() {
    this._initFormValidation();
    this._initPasswordStrength();
  },

  _initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        let isValid = true;
        
        // Basic required field check
        const requiredInputs = form.querySelectorAll('input[required]');
        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            this._showError(input, 'Trường này không được để trống');
            isValid = false;
          } else {
            this._clearError(input);
            
            // Email validation
            if (input.type === 'email') {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(input.value)) {
                this._showError(input, 'Email không hợp lệ');
                isValid = false;
              }
            }
            
            // Password length
            if (input.type === 'password' && input.value.length < 6) {
              this._showError(input, 'Mật khẩu phải có ít nhất 6 ký tự');
              isValid = false;
            }
          }
        });

        // Password confirmation
        const pwd = form.querySelector('input[name="password"]');
        const pwdConfirm = form.querySelector('input[name="password_confirm"]');
        
        if (pwd && pwdConfirm && pwd.value !== pwdConfirm.value) {
          this._showError(pwdConfirm, 'Mật khẩu xác nhận không khớp');
          isValid = false;
        }

        if (!isValid) {
          e.preventDefault();
        }
      });
      
      // Clear error on input
      const inputs = form.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('input', () => this._clearError(input));
      });
    });
  },

  _showError(input, message) {
    input.classList.add('error');
    let errorSpan = input.parentElement.querySelector('.pm-input-error');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'pm-input-error';
      input.parentElement.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
  },

  _clearError(input) {
    input.classList.remove('error');
    const errorSpan = input.parentElement.querySelector('.pm-input-error');
    if (errorSpan) {
      errorSpan.style.display = 'none';
    }
  },

  _initPasswordStrength() {
    const pwdInput = document.querySelector('input[name="password"]');
    const strengthBars = document.querySelectorAll('.password-strength-bar');
    
    if (!pwdInput || !strengthBars.length) return;

    pwdInput.addEventListener('input', (e) => {
      const val = e.target.value;
      
      // Reset
      strengthBars.forEach(bar => {
        bar.classList.remove('active', 'weak', 'medium', 'strong');
      });

      if (!val) return;

      // Calculate strength
      let strength = 0;
      if (val.length >= 6) strength += 1;
      if (val.length >= 10) strength += 1;
      if (/[A-Z]/.test(val)) strength += 1;
      if (/[0-9]/.test(val)) strength += 1;
      if (/[^A-Za-z0-9]/.test(val)) strength += 1;

      // Apply classes
      if (strength >= 1) {
        strengthBars[0].classList.add('active', 'weak');
      }
      if (strength >= 3) {
        strengthBars[0].classList.replace('weak', 'medium');
        strengthBars[1].classList.add('active', 'medium');
      }
      if (strength >= 4) {
        strengthBars[0].classList.replace('medium', 'strong');
        strengthBars[1].classList.replace('medium', 'strong');
        strengthBars[2].classList.add('active', 'strong');
      }
    });
  }
};

// Auto-init if on auth page
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.auth-page')) {
    AuthPage.init();
  }
});

if (typeof module !== 'undefined') module.exports = AuthPage;
