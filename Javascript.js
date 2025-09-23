// Enhanced Diablo IV Portfolio JavaScript
// Variables for slider functionality
let SlideIndex = 0;
let slideInterval;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced features
    initializeSlider();
    initializeScrollEffects();
    initializeSearch();
    initializeCharacterFilters();
    initializeForum();
    initializeInteractiveElements();
    initializeParallaxEffects();
    initializeAnimations();
    initializeCommunityTabs();
    initializeLoreExplorer();
    initializeResourceCards();
    initializeConceptArtFilters();
});

// Enhanced slider functionality
function initializeSlider() {
    showSlides(SlideIndex);
    autoSlide();
}

function NextSlide(SlideImage) {
    clearInterval(slideInterval);
    showSlides(SlideIndex += SlideImage);
    autoSlide();
}

function CurrentSlide(SlideImage) {
    clearInterval(slideInterval);
    showSlides(SlideIndex = SlideImage);
    autoSlide();
}

function showSlides(SlideImage) {
    let loop;
    let Slides = document.getElementsByClassName("MySlide");
    let Dots = document.getElementsByClassName("dot");

    // Boundary checking
    if (SlideImage > Slides.length) {
        SlideIndex = 1;
    }
    if (SlideImage < 1) {
        SlideIndex = Slides.length;
    }

    // Hide all slides
    for (loop = 0; loop < Slides.length; loop++) {
        Slides[loop].style.display = "none";
        Slides[loop].classList.remove("active");
    }

    // Remove active class from all dots
    for (loop = 0; loop < Dots.length; loop++) {
        Dots[loop].className = Dots[loop].className.replace(" active", "");
    }

    // Show current slide with animation
    if (Slides.length > 0) {
        Slides[SlideIndex - 1].style.display = "block";
        Slides[SlideIndex - 1].classList.add("active", "fade-in-up");
    }

    // Add active class to current dot
    if (Dots.length > 0) {
        Dots[SlideIndex - 1].className += " active";
    }
}

// Auto-slide functionality
function autoSlide() {
    slideInterval = setInterval(function() {
        SlideIndex++;
        showSlides(SlideIndex);
    }, 5000); // Change slide every 5 seconds
}

// Interactive search functionality
function openPage() {
    var searchTerm = document.getElementById("search") ? document.getElementById("search").value : "";
    var searchInput = document.querySelector('input[type="text"]');
    
    if (searchInput && !searchTerm) {
        searchTerm = searchInput.value;
    }
    
    searchTerm = searchTerm.toLowerCase();
    
    // Enhanced search logic
    if (searchTerm.includes("diablo") || searchTerm.includes("portfolio")) {
        window.open("portfolio.html", "_self");
    } else if (searchTerm.includes("character") || searchTerm.includes("elias") || searchTerm.includes("inarius") || searchTerm.includes("lilith")) {
        window.open("character.html", "_self");
    } else if (searchTerm.includes("about") || searchTerm.includes("home")) {
        window.open("index.html", "_self");
    } else if (searchTerm.includes("forum") || searchTerm.includes("discussion")) {
        window.open("forum.html", "_self");
    } else if (searchTerm) {
        // Show search suggestions
        showSearchSuggestions(searchTerm);
    }
}

// Search suggestions functionality
function showSearchSuggestions(term) {
    const suggestions = [
        { text: "Characters", url: "character.html" },
        { text: "Portfolio", url: "portfolio.html" },
        { text: "Forum", url: "forum.html" },
        { text: "About", url: "index.html" }
    ];
    
    const filtered = suggestions.filter(item => 
        item.text.toLowerCase().includes(term)
    );
    
    if (filtered.length > 0) {
        window.open(filtered[0].url, "_self");
    } else {
        alert(`No results found for "${term}". Try searching for: Characters, Portfolio, Forum, or About`);
    }
}

// Interactive elements initialization
function initializeInteractiveElements() {
    // Add search on Enter key
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                openPage();
            }
        });
    });

    // Add hover effects to navigation
    const navLinks = document.querySelectorAll('ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize tooltips
    initializeTooltips();
    
    // Initialize gallery interactions
    initializeGallery();
}

// Tooltip functionality
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-popup';
            tooltip.innerHTML = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: linear-gradient(135deg, var(--diablo-dark-red), var(--diablo-red));
                color: var(--diablo-gold);
                padding: 10px 15px;
                border-radius: 8px;
                border: 2px solid var(--diablo-gold);
                z-index: 1000;
                font-size: 14px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            // Fade in
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// Gallery interactions
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openImageModal(img.src, img.alt);
            }
        });
    });
}

// Image modal functionality
function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border: 3px solid var(--diablo-gold);
        border-radius: 10px;
        box-shadow: 0 0 50px rgba(255, 215, 0, 0.3);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 40px;
        background: var(--diablo-red);
        color: var(--diablo-gold);
        border: 2px solid var(--diablo-gold);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Fade in
    setTimeout(() => modal.style.opacity = '1', 10);
}

// Parallax effects
function initializeParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.flip-card, .content-section, .gallery-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced age verification with better UX
function ageVerification() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
        backdrop-filter: blur(10px);
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, var(--diablo-gray), var(--diablo-black));
        border: 3px solid var(--diablo-red);
        border-radius: 15px;
        padding: 40px;
        text-align: center;
        color: var(--diablo-gold);
        max-width: 500px;
        box-shadow: 0 20px 60px rgba(139, 0, 0, 0.5);
    `;
    
    modal.innerHTML = `
        <h2 style="font-family: 'Cinzel Decorative', cursive; margin-bottom: 20px; color: var(--diablo-gold);">
            Age Verification
        </h2>
        <p style="margin-bottom: 30px; line-height: 1.6;">
            This website contains content related to Diablo IV, which is rated M for Mature (17+). 
            Are you 18 years of age or older?
        </p>
        <div>
            <button id="ageYes" style="
                background: linear-gradient(135deg, var(--diablo-dark-red), var(--diablo-red));
                color: var(--diablo-gold);
                border: 2px solid var(--diablo-gold);
                padding: 12px 25px;
                margin: 0 10px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            ">Yes, I am 18+</button>
            <button id="ageNo" style="
                background: linear-gradient(135deg, var(--diablo-light-gray), var(--diablo-gray));
                color: var(--diablo-gold);
                border: 2px solid var(--diablo-gold);
                padding: 12px 25px;
                margin: 0 10px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            ">No, I am under 18</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    document.getElementById('ageYes').addEventListener('click', function() {
        overlay.remove();
        localStorage.setItem('ageVerified', 'true');
    });
    
    document.getElementById('ageNo').addEventListener('click', function() {
        window.location.href = 'https://www.esrb.org/';
    });
}

// Check if age verification is needed
if (!localStorage.getItem('ageVerified')) {
    window.addEventListener('load', ageVerification);
}

// Character filter functionality for character page
function filterCharacters(category) {
    const characters = document.querySelectorAll('.flip-card');
    
    characters.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'inline-block';
            card.classList.add('fade-in-up');
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth scroll functionality
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced Forum functionality
function initializeForum() {
    // Forum category interaction
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3').textContent;
            filterPostsByCategory(category);
        });
    });

    // Post interaction
    const postHeaders = document.querySelectorAll('.post-header h4');
    postHeaders.forEach(header => {
        header.addEventListener('click', () => {
            expandPost(header.closest('.post-item'));
        });
    });

    // Search functionality for forum
    const searchInput = document.querySelector('#forum-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchPosts(e.target.value);
        });
    }

    // New post form handling
    const newPostForm = document.querySelector('#new-post-form');
    if (newPostForm) {
        newPostForm.addEventListener('submit', handleNewPost);
    }

    // Preview functionality
    const previewBtn = document.querySelector('.preview-btn');
    if (previewBtn) {
        previewBtn.addEventListener('click', previewPost);
    }

    // Reply buttons
    const replyButtons = document.querySelectorAll('.reply-btn');
    replyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postItem = e.target.closest('.post-item');
            showReplyForm(postItem);
        });
    });

    // Like buttons
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            toggleLike(e.target);
        });
    });
}

function filterPostsByCategory(category) {
    const posts = document.querySelectorAll('.post-item');
    posts.forEach(post => {
        const postCategory = post.querySelector('.category-tag')?.textContent;
        if (category === 'All' || postCategory === category) {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.5s ease';
        } else {
            post.style.display = 'none';
        }
    });

    // Update active category visual feedback
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const cardCategory = card.querySelector('h3').textContent;
        if (cardCategory === category) {
            card.style.borderColor = 'var(--diablo-gold)';
            card.style.transform = 'translateY(-5px)';
        } else {
            card.style.borderColor = 'var(--diablo-red)';
            card.style.transform = 'translateY(0)';
        }
    });
}

function expandPost(postItem) {
    const isExpanded = postItem.classList.contains('expanded');
    
    if (isExpanded) {
        postItem.classList.remove('expanded');
        const expandedContent = postItem.querySelector('.expanded-content');
        if (expandedContent) {
            expandedContent.remove();
        }
    } else {
        postItem.classList.add('expanded');
        const expandedContent = document.createElement('div');
        expandedContent.className = 'expanded-content';
        expandedContent.innerHTML = `
            <div class="post-full-content">
                <p>This is the full content of the post. In a real application, this would contain the complete post content, including any images, formatted text, and embedded media.</p>
                <div class="post-stats">
                    <span class="views">👁️ 1,234 views</span>
                    <span class="shares">🔗 45 shares</span>
                    <span class="rating">⭐ 4.8/5</span>
                </div>
                <div class="comments-section">
                    <h5>Comments</h5>
                    <div class="comment">
                        <strong>Player123:</strong> Great post! This really helped me understand the mechanics better.
                    </div>
                    <div class="comment">
                        <strong>DiabloFan:</strong> Thanks for sharing this strategy. Will definitely try it out!
                    </div>
                </div>
            </div>
        `;
        postItem.appendChild(expandedContent);
        
        // Scroll to expanded content smoothly
        expandedContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function searchPosts(searchTerm) {
    const posts = document.querySelectorAll('.post-item');
    const searchLower = searchTerm.toLowerCase();
    
    posts.forEach(post => {
        const title = post.querySelector('h4').textContent.toLowerCase();
        const content = post.textContent.toLowerCase();
        
        if (title.includes(searchLower) || content.includes(searchLower)) {
            post.style.display = 'block';
            post.style.animation = 'fadeIn 0.5s ease';
            
            // Highlight search terms
            if (searchTerm.length > 2) {
                highlightSearchTerm(post, searchTerm);
            }
        } else {
            post.style.display = 'none';
        }
    });
}

function handleNewPost(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const postData = {
        title: formData.get('title'),
        category: formData.get('category'),
        content: formData.get('content'),
        author: 'Current User',
        timestamp: new Date().toLocaleDateString()
    };
    
    // Create new post element
    const newPost = createPostElement(postData);
    
    // Add to recent discussions
    const recentDiscussions = document.querySelector('.recent-discussions .posts-list');
    if (recentDiscussions) {
        recentDiscussions.insertBefore(newPost, recentDiscussions.firstChild);
    }
    
    // Clear form
    e.target.reset();
    
    // Show success message
    showNotification('Post created successfully!', 'success');
    
    // Smooth scroll to new post
    newPost.scrollIntoView({ behavior: 'smooth' });
}

function createPostElement(postData) {
    const postElement = document.createElement('div');
    postElement.className = 'post-item';
    postElement.innerHTML = `
        <div class="post-header">
            <h4>${postData.title}</h4>
            <div class="post-meta">
                <span class="author">By ${postData.author}</span>
                <span class="timestamp">${postData.timestamp}</span>
                <span class="category-tag">${postData.category}</span>
                <span class="replies">0 replies</span>
            </div>
        </div>
        <p>${postData.content.substring(0, 150)}${postData.content.length > 150 ? '...' : ''}</p>
        <div class="post-actions">
            <button class="reply-btn">Reply</button>
            <button class="like-btn">👍 Like (0)</button>
            <button class="share-btn">Share</button>
        </div>
    `;
    
    // Add event listeners to new post
    const replyBtn = postElement.querySelector('.reply-btn');
    const likeBtn = postElement.querySelector('.like-btn');
    const postHeader = postElement.querySelector('.post-header h4');
    
    replyBtn.addEventListener('click', () => showReplyForm(postElement));
    likeBtn.addEventListener('click', () => toggleLike(likeBtn));
    postHeader.addEventListener('click', () => expandPost(postElement));
    
    return postElement;
}

function previewPost() {
    const title = document.querySelector('#post-title').value;
    const category = document.querySelector('#post-category').value;
    const content = document.querySelector('#post-content').value;
    
    if (!title || !content) {
        showNotification('Please fill in title and content to preview', 'warning');
        return;
    }
    
    const previewData = {
        title,
        category,
        content,
        author: 'You',
        timestamp: 'Preview - ' + new Date().toLocaleDateString()
    };
    
    const previewElement = createPostElement(previewData);
    previewElement.classList.add('preview-post');
    
    // Remove any existing preview
    const existingPreview = document.querySelector('.preview-post');
    if (existingPreview) {
        existingPreview.remove();
    }
    
    // Insert preview after form
    const form = document.querySelector('#new-post-form');
    form.parentNode.insertBefore(previewElement, form.nextSibling);
    
    // Scroll to preview
    previewElement.scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Preview generated successfully!', 'info');
}

function showReplyForm(postItem) {
    // Remove any existing reply forms
    const existingForms = document.querySelectorAll('.reply-form');
    existingForms.forEach(form => form.remove());
    
    const replyForm = document.createElement('div');
    replyForm.className = 'reply-form';
    replyForm.innerHTML = `
        <div class="form">
            <h4>Reply to this post</h4>
            <form class="reply-submission">
                <div class="form-group">
                    <label for="reply-content">Your Reply:</label>
                    <textarea id="reply-content" name="content" rows="4" placeholder="Write your reply..." required></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" class="submit-btn">Post Reply</button>
                    <button type="button" class="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    postItem.appendChild(replyForm);
    
    // Add event listeners
    const form = replyForm.querySelector('.reply-submission');
    const cancelBtn = replyForm.querySelector('.cancel-btn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = e.target.content.value;
        addReply(postItem, content);
        replyForm.remove();
    });
    
    cancelBtn.addEventListener('click', () => {
        replyForm.remove();
    });
    
    // Focus on textarea
    replyForm.querySelector('textarea').focus();
}

function addReply(postItem, content) {
    const repliesSpan = postItem.querySelector('.replies');
    const currentReplies = parseInt(repliesSpan.textContent.match(/\d+/)[0]);
    repliesSpan.textContent = `${currentReplies + 1} replies`;
    
    // In expanded view, add the reply
    if (postItem.classList.contains('expanded')) {
        const commentsSection = postItem.querySelector('.comments-section');
        if (commentsSection) {
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `<strong>You:</strong> ${content}`;
            commentsSection.appendChild(newComment);
        }
    }
    
    showNotification('Reply posted successfully!', 'success');
}

function toggleLike(likeBtn) {
    const isLiked = likeBtn.classList.contains('liked');
    const likesMatch = likeBtn.textContent.match(/\((\d+)\)/);
    const currentLikes = likesMatch ? parseInt(likesMatch[1]) : 0;
    
    if (isLiked) {
        likeBtn.classList.remove('liked');
        likeBtn.textContent = `👍 Like (${currentLikes - 1})`;
        likeBtn.style.background = 'linear-gradient(135deg, var(--diablo-dark-red), var(--diablo-red))';
    } else {
        likeBtn.classList.add('liked');
        likeBtn.textContent = `❤️ Liked (${currentLikes + 1})`;
        likeBtn.style.background = 'linear-gradient(135deg, var(--diablo-red), var(--diablo-orange))';
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: var(--diablo-gold);
        font-weight: bold;
        z-index: 10000;
        opacity: 0;
        transform: translateX(300px);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    // Set background based on type
    const backgrounds = {
        success: 'linear-gradient(135deg, #28a745, #20c997)',
        warning: 'linear-gradient(135deg, #ffc107, #fd7e14)',
        error: 'linear-gradient(135deg, #dc3545, #e74c3c)',
        info: 'linear-gradient(135deg, var(--diablo-red), var(--diablo-orange))'
    };
    
    notification.style.background = backgrounds[type] || backgrounds.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(300px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Community Tabs Functionality
function initializeCommunityTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Add animation effect
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Initialize fan art interactions
    initializeFanArtGallery();
}

function initializeFanArtGallery() {
    const artPieces = document.querySelectorAll('.art-piece');
    
    artPieces.forEach(piece => {
        piece.addEventListener('click', () => {
            expandArtPiece(piece);
        });
        
        const likeBtn = piece.querySelector('.like-art');
        const shareBtn = piece.querySelector('.share-art');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleArtLike(likeBtn);
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                shareArtPiece(piece);
            });
        }
    });
}

function expandArtPiece(artPiece) {
    const modal = document.createElement('div');
    modal.className = 'art-modal';
    modal.innerHTML = `
        <div class="art-modal-content">
            <span class="art-modal-close">&times;</span>
            <img src="${artPiece.querySelector('.art-image').src}" alt="Expanded Art" class="art-modal-image">
            <div class="art-modal-info">
                <h3>${artPiece.querySelector('h4').textContent}</h3>
                <p>${artPiece.querySelector('p').textContent}</p>
                <div class="art-modal-actions">
                    <button class="modal-like-btn">❤️ Like</button>
                    <button class="modal-share-btn">🔗 Share</button>
                    <button class="modal-download-btn">⬇️ Download</button>
                </div>
            </div>
        </div>
    `;
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeBtn = modal.querySelector('.art-modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

function toggleArtLike(likeBtn) {
    const isLiked = likeBtn.classList.contains('liked');
    const currentLikes = parseInt(likeBtn.textContent.match(/\d+/)[0]);
    
    if (isLiked) {
        likeBtn.classList.remove('liked');
        likeBtn.textContent = `❤️ ${currentLikes - 1}`;
        likeBtn.style.background = 'rgba(139, 0, 0, 0.8)';
    } else {
        likeBtn.classList.add('liked');
        likeBtn.textContent = `💖 ${currentLikes + 1}`;
        likeBtn.style.background = 'var(--diablo-red)';
        
        // Add heart animation
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.cssText = `
            position: absolute;
            font-size: 2rem;
            color: var(--diablo-red);
            pointer-events: none;
            animation: heartFloat 1s ease-out forwards;
        `;
        
        const rect = likeBtn.getBoundingClientRect();
        heart.style.left = rect.left + 'px';
        heart.style.top = rect.top + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

function shareArtPiece(artPiece) {
    const title = artPiece.querySelector('h4').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `Check out this amazing Diablo IV fan art: ${title}`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const shareText = `Check out this amazing Diablo IV fan art: ${title} - ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        });
    }
}

// Lore Explorer Functionality
function initializeLoreExplorer() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Intersection Observer for timeline animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInFromSide 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        timelineObserver.observe(item);
        
        // Add hover effects
        item.addEventListener('mouseenter', () => {
            item.querySelector('.timeline-marker').style.transform = 'scale(1.5)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.timeline-marker').style.transform = 'scale(1)';
        });
    });
}

function openLoreModal(era) {
    const loreData = {
        creation: {
            title: "The Creation of Sanctuary",
            content: "Long ago, the Angel Inarius and the Demon Lilith discovered each other on the battlefield during the Eternal Conflict. Despite being mortal enemies, they fell in love and fled the war together. They gathered other angels and demons who were weary of the endless fighting and created Sanctuary, a realm hidden from both Heaven and Hell.",
            image: "media/background.jpg"
        },
        'sin-war': {
            title: "The Sin War",
            content: "When Heaven and Hell discovered Sanctuary and its inhabitants - the Nephalem, children of angels and demons - both sides sought to claim them. This led to the Sin War, a secret conflict fought for the souls of humanity. The outcome would determine the fate of all creation.",
            image: "media/2.jpg"
        },
        'dark-exile': {
            title: "The Dark Exile",
            content: "The three Prime Evils - Diablo, Mephisto, and Baal - were exiled from Hell by the Lesser Evils in a coup. They were banished to Sanctuary, where they would corrupt the world from within, setting the stage for the events of the Diablo games.",
            image: "media/3.jpeg"
        },
        'return': {
            title: "Lilith's Return",
            content: "After millennia of imprisonment, Lilith has returned to Sanctuary. As the Mother of Sanctuary and creator of the Nephalem, she seeks to reclaim her domain and protect her children from the machinations of both Heaven and Hell. Her return marks the beginning of Diablo IV's dark story.",
            image: "media/Lilith.jpg"
        }
    };
    
    const data = loreData[era];
    if (!data) return;
    
    const modal = document.createElement('div');
    modal.className = 'lore-modal';
    modal.innerHTML = `
        <div class="lore-modal-content">
            <span class="lore-modal-close">&times;</span>
            <div class="lore-modal-header">
                <img src="${data.image}" alt="${data.title}" class="lore-modal-image">
                <h2>${data.title}</h2>
            </div>
            <div class="lore-modal-body">
                <p>${data.content}</p>
                <div class="lore-modal-actions">
                    <button class="lore-explore-more">Explore More</button>
                    <button class="lore-share">Share Lore</button>
                </div>
            </div>
        </div>
    `;
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeBtn = modal.querySelector('.lore-modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Resource Cards Functionality
function initializeResourceCards() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardTitle = card.querySelector('h3').textContent;
            handleResourceCardClick(cardTitle, card);
        });
        
        // Add ripple effect on click
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function handleResourceCardClick(cardTitle, cardElement) {
    switch(cardTitle) {
        case 'Concept Art Gallery':
            showConceptArtGallery();
            break;
        case 'Developer Insights':
            showDeveloperContent();
            break;
        case 'Lore & Storyline':
            smoothScrollTo('lore-section');
            break;
        case 'Gameplay Trailers':
            showTrailerGallery();
            break;
        default:
            showNotification('Feature coming soon!', 'info');
    }
}

function showConceptArtGallery() {
    const galleryModal = document.createElement('div');
    galleryModal.className = 'concept-gallery-modal';
    galleryModal.innerHTML = `
        <div class="gallery-modal-content">
            <span class="gallery-modal-close">&times;</span>
            <h2>Official Concept Art Gallery</h2>
            <div class="concept-gallery-grid">
                <div class="concept-art-item">
                    <img src="media/1.jpg" alt="Lilith Concept">
                    <h4>Lilith - Mother of Sanctuary</h4>
                </div>
                <div class="concept-art-item">
                    <img src="media/2.jpg" alt="Barbarian Concept">
                    <h4>Barbarian Class Design</h4>
                </div>
                <div class="concept-art-item">
                    <img src="media/3.jpeg" alt="Environment Concept">
                    <h4>Sanctuary Environments</h4>
                </div>
                <div class="concept-art-item">
                    <img src="media/4.jpg" alt="Demon Concept">
                    <h4>Demon Designs</h4>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(galleryModal);
    initializeGalleryModal(galleryModal);
}

function showDeveloperContent() {
    const devModal = document.createElement('div');
    devModal.className = 'developer-modal';
    devModal.innerHTML = `
        <div class="dev-modal-content">
            <span class="dev-modal-close">&times;</span>
            <h2>Developer Insights</h2>
            <div class="dev-content-grid">
                <div class="dev-video-item">
                    <div class="video-placeholder">🎬</div>
                    <h4>Behind the Scenes: Creating Lilith</h4>
                    <p>Lead developers discuss the process of bringing the Mother of Sanctuary to life.</p>
                </div>
                <div class="dev-video-item">
                    <div class="video-placeholder">🎬</div>
                    <h4>World Building: Designing Sanctuary</h4>
                    <p>Environmental artists share their vision for the dark fantasy world.</p>
                </div>
                <div class="dev-video-item">
                    <div class="video-placeholder">🎬</div>
                    <h4>Combat System Deep Dive</h4>
                    <p>Gameplay programmers explain the enhanced combat mechanics.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(devModal);
    initializeGalleryModal(devModal);
}

function showTrailerGallery() {
    const trailerModal = document.createElement('div');
    trailerModal.className = 'trailer-gallery-modal';
    trailerModal.innerHTML = `
        <div class="trailer-modal-content">
            <span class="trailer-modal-close">&times;</span>
            <h2>Gameplay Trailers & Cinematics</h2>
            <div class="trailer-grid">
                <div class="trailer-item">
                    <div class="trailer-thumbnail">
                        <img src="media/background.jpg" alt="Announcement Trailer">
                        <div class="play-button">▶️</div>
                    </div>
                    <h4>Official Announcement Trailer</h4>
                </div>
                <div class="trailer-item">
                    <div class="trailer-thumbnail">
                        <img src="media/5.webp" alt="Gameplay Trailer">
                        <div class="play-button">▶️</div>
                    </div>
                    <h4>Gameplay Overview</h4>
                </div>
                <div class="trailer-item">
                    <div class="trailer-thumbnail">
                        <img src="media/Lilith.jpg" alt="Lilith Cinematic">
                        <div class="play-button">▶️</div>
                    </div>
                    <h4>Lilith Returns Cinematic</h4>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(trailerModal);
    initializeGalleryModal(trailerModal);
}

function initializeGalleryModal(modal) {
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        overflow-y: auto;
    `;
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeBtn = modal.querySelector('[class$="-close"]');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Add CSS animations for new features
const additionalStyles = `
    @keyframes rippleEffect {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
    }
    
    @keyframes heartFloat {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-50px); opacity: 0; }
    }
    
    .art-modal-content,
    .lore-modal-content,
    .gallery-modal-content,
    .dev-modal-content,
    .trailer-modal-content {
        background: linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(139, 0, 0, 0.1));
        border: 2px solid var(--diablo-gold);
        border-radius: 15px;
        padding: 30px;
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }
    
    .art-modal-close,
    .lore-modal-close,
    .gallery-modal-close,
    .dev-modal-close,
    .trailer-modal-close {
        position: absolute;
        top: 15px;
        right: 25px;
        font-size: 2rem;
        color: var(--diablo-gold);
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .art-modal-close:hover,
    .lore-modal-close:hover,
    .gallery-modal-close:hover,
    .dev-modal-close:hover,
    .trailer-modal-close:hover {
        color: var(--diablo-red);
    }
`;

// Inject additional styles
if (!document.querySelector('#additional-interactive-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'additional-interactive-styles';
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

// Concept Art Filters Functionality
function initializeConceptArtFilters() {
    const conceptFilters = document.querySelectorAll('.concept-filter');
    const conceptItems = document.querySelectorAll('.concept-item');
    
    conceptFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-category');
            
            // Update active filter
            conceptFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter concept art items
            conceptItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Add button animation
            filter.style.transform = 'scale(0.95)';
            setTimeout(() => {
                filter.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Initialize concept art item interactions
    initializeConceptArtInteractions();
}

function initializeConceptArtInteractions() {
    const conceptItems = document.querySelectorAll('.concept-item');
    
    conceptItems.forEach(item => {
        item.addEventListener('click', () => {
            expandConceptArt(item);
        });
        
        // Add hover effects for better interactivity
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Initialize developer commentary interactions
    initializeDeveloperCommentary();
    
    // Initialize community showcase interactions
    initializeCommunityShowcase();
}

function expandConceptArt(conceptItem) {
    const image = conceptItem.querySelector('.concept-image');
    const title = conceptItem.querySelector('h4').textContent;
    const description = conceptItem.querySelector('p').textContent;
    const artist = conceptItem.querySelector('.concept-artist').textContent;
    const year = conceptItem.querySelector('.concept-year').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'concept-art-modal';
    modal.innerHTML = `
        <div class="concept-modal-content">
            <span class="concept-modal-close">&times;</span>
            <div class="concept-modal-header">
                <img src="${image.src}" alt="${title}" class="concept-modal-image">
            </div>
            <div class="concept-modal-info">
                <h2>${title}</h2>
                <p class="concept-modal-description">${description}</p>
                <div class="concept-modal-details">
                    <div class="detail-item">
                        <strong>Artist:</strong> ${artist.replace('Artist: ', '')}
                    </div>
                    <div class="detail-item">
                        <strong>Year:</strong> ${year.replace('Year: ', '')}
                    </div>
                    <div class="detail-item">
                        <strong>Type:</strong> Official Concept Art
                    </div>
                    <div class="detail-item">
                        <strong>Source:</strong> Blizzard Entertainment
                    </div>
                </div>
                <div class="concept-modal-actions">
                    <button class="concept-action-btn like-concept">❤️ Add to Favorites</button>
                    <button class="concept-action-btn share-concept">🔗 Share Artwork</button>
                    <button class="concept-action-btn download-concept">⬇️ View Full Size</button>
                </div>
            </div>
        </div>
    `;
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        overflow-y: auto;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.concept-modal-close');
    const likeBtn = modal.querySelector('.like-concept');
    const shareBtn = modal.querySelector('.share-concept');
    const downloadBtn = modal.querySelector('.download-concept');
    
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    likeBtn.addEventListener('click', () => {
        toggleConceptFavorite(likeBtn, title);
    });
    
    shareBtn.addEventListener('click', () => {
        shareConceptArt(title, image.src);
    });
    
    downloadBtn.addEventListener('click', () => {
        viewFullSizeArt(image.src, title);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

function initializeDeveloperCommentary() {
    const commentaryCards = document.querySelectorAll('.commentary-card');
    
    commentaryCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const quote = card.querySelector('blockquote').textContent;
            const author = card.querySelector('cite').textContent;
            
            showDeveloperInsight(title, quote, author);
        });
        
        // Add interactive hover effects
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.commentary-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.filter = 'drop-shadow(0 0 20px var(--diablo-gold))';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.commentary-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.filter = 'drop-shadow(0 0 10px var(--diablo-gold))';
        });
    });
}

function initializeCommunityShowcase() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    showcaseItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h4').textContent;
            const description = item.querySelector('p').textContent;
            const artist = item.querySelector('.showcase-artist').textContent;
            const platform = item.querySelector('.showcase-platform').textContent;
            const image = item.querySelector('.showcase-image');
            
            showCommunityArtwork(title, description, artist, platform, image.src);
        });
        
        // Add ripple effect on click
        item.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = item.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            item.style.position = 'relative';
            item.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function toggleConceptFavorite(button, artTitle) {
    const isFavorited = button.classList.contains('favorited');
    
    if (isFavorited) {
        button.classList.remove('favorited');
        button.textContent = '❤️ Add to Favorites';
        button.style.background = 'linear-gradient(135deg, var(--diablo-dark-red), var(--diablo-red))';
        showNotification('Removed from favorites', 'info');
    } else {
        button.classList.add('favorited');
        button.textContent = '💖 Added to Favorites';
        button.style.background = 'linear-gradient(135deg, var(--diablo-red), var(--diablo-orange))';
        showNotification('Added to favorites!', 'success');
        
        // Store in localStorage (simple implementation)
        const favorites = JSON.parse(localStorage.getItem('diabloArtFavorites') || '[]');
        if (!favorites.includes(artTitle)) {
            favorites.push(artTitle);
            localStorage.setItem('diabloArtFavorites', JSON.stringify(favorites));
        }
    }
}

function shareConceptArt(title, imageUrl) {
    if (navigator.share) {
        navigator.share({
            title: `${title} - Diablo IV Concept Art`,
            text: `Check out this amazing Diablo IV concept art: ${title}`,
            url: window.location.href
        });
    } else {
        const shareText = `Check out this amazing Diablo IV concept art: ${title} - ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Artwork link copied to clipboard!', 'success');
        });
    }
}

function viewFullSizeArt(imageSrc, title) {
    const fullSizeModal = document.createElement('div');
    fullSizeModal.className = 'fullsize-art-modal';
    fullSizeModal.innerHTML = `
        <div class="fullsize-content">
            <span class="fullsize-close">&times;</span>
            <img src="${imageSrc}" alt="${title}" class="fullsize-image">
            <div class="fullsize-info">
                <h3>${title}</h3>
                <p>Click and drag to pan • Scroll to zoom</p>
            </div>
        </div>
    `;
    
    fullSizeModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.98);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(fullSizeModal);
    
    setTimeout(() => {
        fullSizeModal.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeBtn = fullSizeModal.querySelector('.fullsize-close');
    closeBtn.addEventListener('click', () => {
        fullSizeModal.style.opacity = '0';
        setTimeout(() => fullSizeModal.remove(), 300);
    });
    
    fullSizeModal.addEventListener('click', (e) => {
        if (e.target === fullSizeModal) {
            fullSizeModal.style.opacity = '0';
            setTimeout(() => fullSizeModal.remove(), 300);
        }
    });
}

function showDeveloperInsight(title, quote, author) {
    const insightModal = document.createElement('div');
    insightModal.className = 'developer-insight-modal';
    insightModal.innerHTML = `
        <div class="insight-modal-content">
            <span class="insight-modal-close">&times;</span>
            <h2>Developer Insight: ${title}</h2>
            <div class="insight-quote">
                <blockquote>"${quote}"</blockquote>
                <cite>${author}</cite>
            </div>
            <div class="insight-additional">
                <h3>Behind the Design</h3>
                <p>This insight represents the careful thought and consideration that goes into every aspect of Diablo IV's development. The team's commitment to creating an authentic dark fantasy experience is evident in every detail.</p>
                <div class="insight-actions">
                    <button class="insight-btn">Learn More About Development</button>
                    <button class="insight-btn">Share This Insight</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(insightModal);
    initializeGalleryModal(insightModal);
}

function showCommunityArtwork(title, description, artist, platform, imageSrc) {
    const communityModal = document.createElement('div');
    communityModal.className = 'community-artwork-modal';
    communityModal.innerHTML = `
        <div class="community-modal-content">
            <span class="community-modal-close">&times;</span>
            <div class="community-modal-layout">
                <div class="community-image-section">
                    <img src="${imageSrc}" alt="${title}" class="community-modal-image">
                </div>
                <div class="community-info-section">
                    <h2>${title}</h2>
                    <p class="community-description">${description}</p>
                    <div class="community-details">
                        <div class="detail-row">
                            <strong>Artist:</strong> ${artist.replace('By: ', '')}
                        </div>
                        <div class="detail-row">
                            <strong>Platform:</strong> ${platform.replace('Posted on: ', '')}
                        </div>
                        <div class="detail-row">
                            <strong>Type:</strong> Community Fan Art
                        </div>
                    </div>
                    <div class="community-actions">
                        <button class="community-action-btn">❤️ Like Artwork</button>
                        <button class="community-action-btn">🔗 Visit Original</button>
                        <button class="community-action-btn">💬 Leave Comment</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(communityModal);
    initializeGalleryModal(communityModal);
}