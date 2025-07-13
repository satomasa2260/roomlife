/**
 * 快適室温の教科書 - FAQアコーディオン機能
 * モダンなJavaScript（ES6以降）で実装
 */

class FAQAccordion {
    constructor() {
        this.faqQuestions = document.querySelectorAll('.faq-question');
        this.init();
    }

    init() {
        // 各質問にイベントリスナーを追加
        this.faqQuestions.forEach(question => {
            question.addEventListener('click', (e) => this.toggleAnswer(e));
            question.addEventListener('keydown', (e) => this.handleKeydown(e));
        });

        // 初期状態で全ての回答を閉じる
        this.closeAllAnswers();
    }

    /**
     * 回答の開閉を切り替える
     * @param {Event} e - クリックイベント
     */
    toggleAnswer(e) {
        const question = e.currentTarget;
        const answer = this.getAnswerElement(question);
        const isExpanded = question.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            this.closeAnswer(question, answer);
        } else {
            this.openAnswer(question, answer);
        }
    }

    /**
     * 回答を開く
     * @param {HTMLElement} question - 質問要素
     * @param {HTMLElement} answer - 回答要素
     */
    openAnswer(question, answer) {
        // アクセシビリティ属性を更新
        question.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
        
        // アニメーション用のクラスを追加
        answer.classList.add('active');
        
        // フォーカスを回答に移動（スクリーンリーダー対応）
        setTimeout(() => {
            answer.focus();
        }, 300);
    }

    /**
     * 回答を閉じる
     * @param {HTMLElement} question - 質問要素
     * @param {HTMLElement} answer - 回答要素
     */
    closeAnswer(question, answer) {
        // アクセシビリティ属性を更新
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        
        // アニメーション用のクラスを削除
        answer.classList.remove('active');
    }

    /**
     * 全ての回答を閉じる
     */
    closeAllAnswers() {
        this.faqQuestions.forEach(question => {
            const answer = this.getAnswerElement(question);
            this.closeAnswer(question, answer);
        });
    }

    /**
     * 質問要素に対応する回答要素を取得
     * @param {HTMLElement} question - 質問要素
     * @returns {HTMLElement} 回答要素
     */
    getAnswerElement(question) {
        const answerId = question.getAttribute('aria-controls');
        return document.getElementById(answerId);
    }

    /**
     * キーボード操作を処理
     * @param {KeyboardEvent} e - キーダウンイベント
     */
    handleKeydown(e) {
        const key = e.key;
        
        switch (key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.toggleAnswer(e);
                break;
            case 'Escape':
                // ESCキーで開いている回答を閉じる
                const question = e.currentTarget;
                const answer = this.getAnswerElement(question);
                if (question.getAttribute('aria-expanded') === 'true') {
                    this.closeAnswer(question, answer);
                }
                break;
        }
    }
}

/**
 * ページ読み込み完了後にFAQアコーディオンを初期化
 */
document.addEventListener('DOMContentLoaded', () => {
    // FAQアコーディオン機能を初期化
    new FAQAccordion();
    
    console.log('快適室温の教科書 - FAQアコーディオン機能が初期化されました');
});

/**
 * スムーズスクロール機能（ページ内リンク用）
 */
document.addEventListener('DOMContentLoaded', () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/**
 * スクロール時のヘッダー背景変更
 */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#FFFFFF';
        header.style.backdropFilter = 'none';
    }
});

/**
 * 画像の遅延読み込み（パフォーマンス向上）
 */
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'translateY(20px)';
            img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            imageObserver.observe(img);
        });
    }
}); 