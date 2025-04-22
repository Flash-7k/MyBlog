// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加淡入动画效果
    const fadeElements = document.querySelectorAll('header, section, .card');
    fadeElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });

    // 导航栏滚动效果
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('shadow-md');
            nav.classList.add('bg-white');
            nav.classList.remove('bg-opacity-80');
        } else {
            nav.classList.remove('shadow-md');
            nav.classList.add('bg-opacity-80');
        }
    });

    // 平滑滚动导航
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 加载更多按钮
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // 模拟加载更多照片
            const gallery = document.querySelector('#gallery .grid');
            
            // 创建新照片元素的HTML
            const newPhotos = [
                {
                    image: 'images/photo7.jpg',
                    title: '宁静时刻',
                    desc: '午后的咖啡时光'
                },
                {
                    image: 'images/photo8.jpg',
                    title: '城市风光',
                    desc: '繁华都市的一角'
                },
                {
                    image: 'images/photo9.jpg',
                    title: '自然之美',
                    desc: '大自然的馈赠'
                }
            ];
            
            // 显示加载动画
            loadMoreBtn.innerHTML = '<span class="inline-block animate-spin mr-2">⟳</span> 加载中...';
            
            // 模拟网络延迟
            setTimeout(() => {
                // 添加新照片
                newPhotos.forEach(photo => {
                    const photoElement = document.createElement('div');
                    photoElement.className = 'group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 opacity-0';
                    photoElement.innerHTML = `
                        <div class="relative overflow-hidden h-64">
                            <img src="${photo.image}" alt="${photo.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <div class="p-4 bg-white">
                            <h3 class="font-medium text-lg">${photo.title}</h3>
                            <p class="text-gray-600 mt-1">${photo.desc}</p>
                        </div>
                    `;
                    gallery.appendChild(photoElement);
                    
                    // 添加淡入动画
                    setTimeout(() => {
                        photoElement.style.transition = 'opacity 0.5s ease';
                        photoElement.style.opacity = '1';
                    }, 100);
                });
                
                // 恢复按钮状态
                loadMoreBtn.innerHTML = '加载更多';
                
                // 所有照片加载完毕后隐藏按钮
                if (gallery.children.length >= 12) {
                    loadMoreBtn.disabled = true;
                    loadMoreBtn.innerHTML = '已加载全部';
                    loadMoreBtn.classList.add('bg-gray-400');
                    loadMoreBtn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                }
            }, 1500);
        });
    }

    // 表单验证
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单字段
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            
            // 简单验证
            let isValid = true;
            if (!nameField.value.trim()) {
                isValid = false;
                nameField.classList.add('border-red-500');
            } else {
                nameField.classList.remove('border-red-500');
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value.trim())) {
                isValid = false;
                emailField.classList.add('border-red-500');
            } else {
                emailField.classList.remove('border-red-500');
            }
            
            if (!messageField.value.trim()) {
                isValid = false;
                messageField.classList.add('border-red-500');
            } else {
                messageField.classList.remove('border-red-500');
            }
            
            // 如果表单有效，模拟提交
            if (isValid) {
                // 显示成功消息
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">⟳</span> 发送中...';
                submitBtn.disabled = true;
                
                // 模拟网络请求
                setTimeout(() => {
                    // 创建成功消息
                    const successMsg = document.createElement('div');
                    successMsg.className = 'bg-green-100 text-green-700 p-4 rounded-md mt-4';
                    successMsg.innerHTML = '您的消息已成功发送！我会尽快回复您。';
                    
                    // 添加到表单后面
                    contactForm.appendChild(successMsg);
                    
                    // 重置表单
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // 3秒后移除成功消息
                    setTimeout(() => {
                        successMsg.style.opacity = '0';
                        successMsg.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => successMsg.remove(), 500);
                    }, 3000);
                }, 1500);
            }
        });
    }

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img.lazy-load');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 降级方案
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }

    // 动态年份更新
    const yearElement = document.querySelector('.copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// 添加暗色模式切换（如果需要）
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    
    // 保存用户偏好
    const isDarkMode = document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// 检查用户之前的暗色模式偏好
if (localStorage.getItem('darkMode') === 'enabled' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches && 
     !localStorage.getItem('darkMode'))) {
    document.documentElement.classList.add('dark');
} 