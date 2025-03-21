// ドキュメントの読み込みが完了したときに実行
document.addEventListener('DOMContentLoaded', function() {
    // スクロールトップボタンの要素を取得
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', function() {
        // スクロール位置が300px以上ならボタンを表示
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });
    
    // ボタンクリック時に最上部へスクロール
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // スムーズスクロール
        });
    });

    // 目次のリンクをスムーズスクロールに設定
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // クリックされたリンクの対象IDを取得
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // 対象の位置までスクロール
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });

    // スクロール時にアクティブな目次項目をハイライト
    function highlightTocOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        
        // 現在のスクロール位置を取得
        let scrollPosition = window.scrollY;
        
        // 各セクションの位置を確認
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // スクロール位置がセクション内ならハイライト
            if (scrollPosition >= sectionTop - 100 && 
                scrollPosition < sectionTop + sectionHeight - 100) {
                
                // 全てのactive状態を削除
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // 対応するリンクをアクティブに
                const activeLink = document.querySelector(`.toc-list a[href="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // スクロール時にハイライト処理を実行
    window.addEventListener('scroll', highlightTocOnScroll);
    
    // ページ読み込み時にも実行
    highlightTocOnScroll();
    
    // カードアニメーション
    const cards = document.querySelectorAll('.project-card, .skill-card, .step-card, .site-card, .tip-card');
    
    // InterectionObserverを使ってスクロールに応じた表示アニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // 各カードを監視
    cards.forEach(card => {
        // 初期スタイル
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // 要素が画面に入ったら表示
        observer.observe(card);
    });
    
    // fade-inクラスのCSSを動的に追加
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
