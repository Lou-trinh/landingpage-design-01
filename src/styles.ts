/**
 * @file landing/styles.ts
 * @description CSS string for the landing page — port từ brandigo_international_mobile.html.
 * @why Inline qua <style> tag trong LandingPage để mount/unmount cùng route — KHÔNG leak
 *      sang các page khác. Global selectors (body, *, a, button, img) chỉ áp dụng khi
 *      landing đang mount.
 */

export const LANDING_FONTS_HREF =
	"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Libre+Baskerville:wght@400;700&display=swap";

export const LANDING_CSS = String.raw`
:root{
  --black:#346739;--ink:#101010;--white:#ffffff;--paper:#F2EDC2;--soft:#dde4c4;
  --muted:#808080;--line:rgba(0,0,0,.12);--line-dark:rgba(255,255,255,.18);
  --pink:#79AE6F;--dark-card:#346739;--shadow:0 24px 90px rgba(0,0,0,.22);
  --ease:cubic-bezier(.16,1,.3,1);--max:1500px;--pad:clamp(18px,4vw,72px);
  --h1:clamp(58px,9.4vw,150px);--h2:clamp(42px,6.8vw,98px);--h3:clamp(28px,3.2vw,54px);
  --body:clamp(16px,1.3vw,20px);
}
.landing-root *{box-sizing:border-box}
.landing-root .brand{color:#346739}
/* Full-bleed escape — App.tsx bọc router trong phone-frame max-w-[430px], landing PHẢI
   phá ra 100vw để xem được cả desktop lẫn mobile. Trick: position:relative + left:50% +
   margin-left:-50vw kéo width về full viewport mà KHÔNG cần modify App.tsx (giữ scroll
   trên window, không break IntersectionObserver/scroll progress logic). */
/* overflow-x:clip bị bỏ — Chrome xử lý clip BFC như containing block cho position:fixed,
   làm nav fixed theo landing-root thay vì viewport. Hero dùng clip-path:inset(0) để chặn
   parallax overflow; các section dùng overflow:hidden riêng. */
.landing-root{position:relative;width:100vw;max-width:100vw;left:50%;margin-left:-50vw;background:var(--paper);color:var(--ink);font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;min-height:100vh;scroll-behavior:smooth}
.landing-root img{display:block;max-width:100%}
.landing-root a{color:inherit;text-decoration:none}
.landing-root button{font:inherit;color:inherit;border:0;background:none;cursor:pointer}
.landing-root ::selection{background:var(--pink);color:#fff}
.landing-root .progress{position:fixed;inset:0 auto auto 0;width:0;height:4px;background:var(--pink);z-index:9999}
/* Noise phải nằm DƯỚI nav (z 1000) — nếu đặt z 9998 sẽ phủ lên nav làm backdrop-blur nhìn lấm tấm hạt.
   Giảm opacity xuống .035 cho mượt hơn. */
.landing-root .noise{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
/* Nav + menu — class lp-* (không cần .landing-root prefix vì portal ra document.body). */
.lp-nav{position:fixed;top:0;left:0;right:0;height:76px;z-index:1000;display:flex;align-items:center;justify-content:center;padding:0 var(--pad);background:rgba(52,103,57,.30);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:height .35s var(--ease),background .35s var(--ease),backdrop-filter .35s var(--ease)}
.lp-nav-inner{width:100%;max-width:var(--max);display:flex;align-items:center;justify-content:space-between}
.lp-logo{font-weight:900;font-size:clamp(27px,2.2vw,38px);letter-spacing:-.08em;color:#fff;line-height:1;text-decoration:none}
.lp-dot{color:var(--pink);letter-spacing:0}
/* Hamburger 2-line — Framer style. */
.lp-hamb{width:44px;height:44px;position:relative;display:block;background:none;border:0;cursor:pointer}
.lp-hamb:before,.lp-hamb:after{content:"";position:absolute;left:50%;top:50%;width:26px;height:2px;background:#fff;transform-origin:50% 50%;transition:transform .35s var(--ease)}
.lp-hamb:before{transform:translate(-50%,-50%) translateY(-5px)}
.lp-hamb:after{transform:translate(-50%,-50%) translateY(5px)}
.lp-hamb:hover:before,.lp-hamb.active:before{transform:translate(-50%,-50%) rotate(-45deg)}
.lp-hamb:hover:after,.lp-hamb.active:after{transform:translate(-50%,-50%) rotate(45deg)}
.lp-menu{position:fixed;inset:0;background:rgba(52,103,57,.96);z-index:990;display:grid;place-items:center;opacity:0;visibility:hidden;transition:.35s var(--ease)}
.lp-menu.open{opacity:1;visibility:visible}
.lp-menu a{display:block;font-size:clamp(38px,8vw,92px);font-weight:900;letter-spacing:-.07em;color:#fff;margin:8px 0;text-align:center;text-decoration:none}
.lp-menu a:hover{color:var(--pink)}
.landing-root .btn{display:inline-flex;align-items:stretch;border:1.5px solid #346739;background:#fff;color:#000;font-weight:800;font-size:16px;line-height:1;border-radius:0;box-shadow:0 8px 30px rgba(0,0,0,.08);overflow:hidden;min-height:52px;position:relative;padding-left:52px;cursor:pointer;white-space:nowrap}
.landing-root .btn .label{padding:0 22px;display:flex;align-items:center}
.landing-root .btn .icon{position:absolute;left:0;top:0;bottom:0;width:52px;background:#346739;display:flex;align-items:center;justify-content:flex-end;overflow:hidden;transition:width .5s var(--ease)}
.landing-root .btn:hover .icon,.landing-root .btn:active .icon{width:100%}
.landing-root .btn .icon .text{position:absolute;left:20px;top:50%;transform:translateY(-50%) translateX(calc(-100% - 52px));color:#fff;font-weight:800;white-space:nowrap;font-size:inherit;transition:transform .5s var(--ease)}
.landing-root .btn:hover .icon .text,.landing-root .btn:active .icon .text{transform:translateY(-50%) translateX(0)}
.landing-root .btn .arrow{flex-shrink:0;width:52px;min-height:52px;display:grid;place-items:center;font-size:20px;color:#fff}.landing-root .btn.dark{background:#346739;color:#fff;border-color:#fff}
.landing-root .btn.dark .icon{background:#fff}
.landing-root .btn.dark .icon .text{color:#000}
.landing-root .btn.dark .arrow{color:#000}
.landing-root .btn.pink{background:#346739;color:#fff;border-color:#346739;border-radius:18px}
.landing-root .btn.pink .icon{background:#346739;border-radius:14px;margin:5px;width:46px}
.landing-root .btn.pink .arrow{width:46px}
.landing-root .label-row{display:flex;align-items:center;gap:14px;color:#cfcfcf;font-weight:800;font-size:20px}
.landing-root .section-head .label-row{align-self:start}
.landing-root .section-head .headline{margin-top:0}
.landing-root .spark{letter-spacing:calc(.12em + 2px);background:linear-gradient(to right,#bcbcbc 0%,rgba(188,188,188,0) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.landing-root .pink-dot{width:14px;height:14px;border-radius:50%;background:var(--pink);display:inline-block}
/* Hero z-1 stuck top, sections z-2 scroll over it. CTA z-4 is the curtain: scrolls up to reveal footer z-3 (stationary) beneath it. */
.landing-root .section,.landing-root .marquee{position:relative;z-index:2}
.landing-root .cta{position:relative;z-index:4}
.landing-root .section{padding:clamp(48px,7vw,110px) var(--pad);overflow:hidden}
.landing-root #reviews.section{overflow:visible}
.landing-root .tcard-section{padding:clamp(32px,4vw,64px) 0 0}
.landing-root .section.white{background:#F2EDC2}
.landing-root #projects.section,.landing-root #pricing.section{background:#eef3e6}
.landing-root #articles.section{background:#F2EDC2}
.landing-root #projects .headline,.landing-root #process .headline,.landing-root #pricing .headline,.landing-root #reviews .headline{font-size:clamp(22px,3vw,48px)}
.landing-root #pricing .headline .muted{color:#346739}
.landing-root #articles .headline .muted{color:#346739}
.landing-root #faq .headline{font-size:clamp(28px,3.5vw,52px)}
.landing-root #articles .headline{font-size:clamp(22px,3vw,48px)}
.landing-root #projects .section-head>div:nth-child(2),.landing-root #process .section-head>div:nth-child(2),.landing-root #pricing .section-head>div:nth-child(2),.landing-root #reviews .section-head>div:nth-child(2),.landing-root #faq .section-head>div:nth-child(2),.landing-root #articles .section-head>div:nth-child(2){margin-left:calc(clamp(0px,12vw,250px) - 190px - 32px)}
.landing-root #projects .btn{border:none;box-shadow:none;margin-top:16px}
.landing-root .project-nav{display:flex;gap:8px}
.landing-root .project-nav-btn{width:44px;height:44px;border:none;background:#fff;color:#346739;font-size:24px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,color .2s}
.landing-root .project-nav-btn:hover{background:#e0e0e0}
.landing-root .wrap{max-width:var(--max);margin:0 auto;position:relative;z-index:2}
.landing-root .headline{font-size:clamp(30px,4.8vw,72px);line-height:.96;font-weight:900;letter-spacing:-.075em;margin:12px 0 0}
.landing-root .headline .muted{color:#F2EDC2}
.landing-root .lead{font-size:clamp(14px,1.1vw,16px);line-height:1.5;font-weight:650;max-width:640px}
.landing-root .grid-frame{position:relative}
.landing-root .grid-label{position:absolute;top:0;left:0;margin:0}
.landing-root .side-word{position:absolute;left:clamp(0px,1vw,12px);top:0;bottom:0;overflow:hidden;padding:0 22px;pointer-events:none;user-select:none;-webkit-mask-image:linear-gradient(transparent 0%,#000 35%,#000 65%,transparent 100%);mask-image:linear-gradient(transparent 0%,#000 35%,#000 65%,transparent 100%)}
.landing-root .side-word-track{display:flex;flex-direction:column;gap:24px;padding-bottom:24px;animation:side-scroll 18s linear infinite}
.landing-root .side-word-track span{font-size:clamp(60px,8vw,130px);line-height:.85;font-weight:900;letter-spacing:-.08em;color:rgba(30,30,30,1);writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap}
.landing-root .side-word.dark .side-word-track span{color:rgba(255,255,255,.9)}
@keyframes side-scroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}
/* Hero sticky — đứng yên tại top:0 (compositor thread, không jank). Sections (z:2) tự cuộn lên
   đè qua; nền đen của services phủ hero từ dưới lên. overflow-x:clip trên parent đảm bảo sticky
   hoạt động đúng theo window scroll. */
.landing-root .hero{min-height:100svh;position:sticky;top:0;z-index:1;background:#346739;color:#fff;display:flex;align-items:flex-end;overflow:hidden;clip-path:inset(0);padding:116px var(--pad) 20px}
.landing-root .hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.58),rgba(0,0,0,.10) 55%,rgba(0,0,0,.66)),linear-gradient(0deg,rgba(0,0,0,.7) 0,rgba(0,0,0,0) 38%,rgba(0,0,0,.9) 100%);z-index:1}
/* ═══ ENTRANCE ANIMATIONS — chạy 1 lần khi page load qua class .is-loaded ═══
   Initial state (NO .is-loaded): element ở offset/scale/opacity 0.
   Sau requestAnimationFrame, React add .is-loaded → CSS transition kick.
   Static transform của element được combine trong cả 2 state để không vỡ position.
   Cascade timing (delays): hero 0s → kicker .8s → hero-left 1s → thumbs 1.3-1.7s → blurb 1.8s → CTA 2s. */

/* Hero bg multi-keyframe — per-keyframe timing function để 2 phase có cảm giác khác nhau:
   0%→40%: ease-out gradual (zoom up + tilt êm ái)
   40%→100%: cubic-bezier(.85,0,.15,1) ease-in-out sharp → dứt khoát snap về normal.
   Class --intro chỉ áp lần đầu, không re-run khi remount. */
.landing-root .hero .hero-bg--intro{animation:lpHeroIntro 3.5s linear both;transform-origin:center center}
@keyframes lpHeroIntro{
  0%{transform:scale(1.2) rotate(0);opacity:0;animation-timing-function:cubic-bezier(.33,1,.68,1)}
  40%{transform:scale(1.4) rotate(-9deg);opacity:1;animation-timing-function:cubic-bezier(.85,0,.15,1)}
  100%{transform:scale(1) rotate(0);opacity:.9}
}

/* Kicker [Award-Winning] — slide up từ +40px */
.landing-root .hero .kicker{transform:translateY(40px);opacity:0;transition:transform 1s cubic-bezier(.22,1,.36,1) .8s,opacity 1s ease-out .8s}
.landing-root .hero.is-loaded .kicker{transform:translateY(0);opacity:1}

/* hero-left ([01] + h1) — combine static translateX với rotate-tilt + slide up entrance */
.landing-root .hero .hero-left{transform:translateX(calc(10vw - var(--pad))) rotate(-7deg) translateY(36px);opacity:0;transform-origin:bottom left;transition:transform 1.3s cubic-bezier(.22,1,.36,1) 1s,opacity 1.3s ease-out 1s}
.landing-root .hero.is-loaded .hero-left{transform:translateX(calc(10vw - var(--pad))) rotate(0) translateY(0);opacity:1}

/* 3 thumbs button — fade-up staggered 0.35s khoảng cách, duration 1.1s từ từ. */
.landing-root .hero .thumbs button{opacity:0;transform:translateY(22px);transition:transform 1.1s cubic-bezier(.22,1,.36,1),opacity 1.1s ease-out}
.landing-root .hero .thumbs button:nth-child(1){transition-delay:1.3s}
.landing-root .hero .thumbs button:nth-child(2){transition-delay:1.65s}
.landing-root .hero .thumbs button:nth-child(3){transition-delay:2s}
.landing-root .hero.is-loaded .thumbs button{opacity:1;transform:translateY(0)}

/* Blurb p — combine static translate với slide from right (+80px X) */
.landing-root .hero .hero-copy p{transform:translate(calc(-10vw + var(--pad) + 80px),-240px);opacity:0;transition:transform 1.2s cubic-bezier(.22,1,.36,1) 1.8s,opacity 1.2s ease-out 1.8s}
.landing-root .hero.is-loaded .hero-copy p{transform:translate(calc(-10vw + var(--pad)),-240px);opacity:1}

/* CTA "Đăng ký thành viên" — combine static translateX với trôi từ dưới lên (+50px Y) */
.landing-root .hero .hero-cta-corner{transform:translate(calc(-10vw + var(--pad)),50px);opacity:0;transition:transform 1s cubic-bezier(.22,1,.36,1) 2s,opacity 1s ease-out 2s}
.landing-root .hero.is-loaded .hero-cta-corner{transform:translate(calc(-10vw + var(--pad)),0);opacity:1}

/* Slide-stack 2 hướng:
   data-dir="up"   → ảnh mới ngồi top:100% (dưới), cả 2 translateY 0 → -100% (lên).
   data-dir="down" → ảnh mới ngồi top:-100% (trên), cả 2 translateY 0 → 100% (xuống). */
.landing-root .hero-bg-stack{position:absolute;inset:0;will-change:transform}
.landing-root .hero-bg{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;opacity:.9;filter:saturate(.85)}
.landing-root .hero-bg-stack .hero-bg:nth-child(2){top:100%}
.landing-root .hero-bg-stack[data-dir="down"] .hero-bg:nth-child(2){top:-100%}
.landing-root .hero-bg-stack.is-animating{animation:lpHeroStackUp 1.6s cubic-bezier(.22,1,.36,1) forwards}
.landing-root .hero-bg-stack[data-dir="down"].is-animating{animation:lpHeroStackDown 1.6s cubic-bezier(.22,1,.36,1) forwards}
@keyframes lpHeroStackUp{from{transform:translateY(0)}to{transform:translateY(-100%)}}
@keyframes lpHeroStackDown{from{transform:translateY(0)}to{transform:translateY(100%)}}

/* text-slot — slot-machine: slot box (frame + overflow:hidden clip) ĐỨNG YÊN.
   Transform áp lên CON (text-slot-inner) chứ KHÔNG áp lên slot — vì transform slot sẽ kéo cả
   clip-mask di chuyển → text mới (ngồi ngoài clip cũ) bị crop, gây bug "bụp" sau animation.
   First child in-flow tại top:0 → slide lên thoát clip.
   Second child absolute tại top:100% (ngay dưới clip) → slide lên đúng chỗ first child cũ. */
.landing-root .text-slot{display:block;position:relative;overflow:hidden}
.landing-root .text-slot-inner{display:block}
.landing-root .text-slot .text-slot-inner:nth-child(2){position:absolute;top:100%;left:0;right:0}
.landing-root .text-slot[data-dir="down"] .text-slot-inner:nth-child(2){top:-100%}
.landing-root .text-slot.is-animating > .text-slot-inner{animation:lpTextStackUp 1.6s cubic-bezier(.22,1,.36,1) forwards}
.landing-root .text-slot[data-dir="down"].is-animating > .text-slot-inner{animation:lpTextStackDown 1.6s cubic-bezier(.22,1,.36,1) forwards}
@keyframes lpTextStackUp{from{transform:translateY(0)}to{transform:translateY(-100%)}}
@keyframes lpTextStackDown{from{transform:translateY(0)}to{transform:translateY(100%)}}
/* Gridlines 10 cột zebra: layer trên = 1px divider trắng, layer dưới = cột sáng/tối so le
   (cột lẻ tint trắng .05, cột chẵn tint đen .18). Bỏ mix-blend-mode:screen vì screen với đen
   không darken được — dùng normal blend để cả 2 hướng đều hiển thị. */
.landing-root .gridlines{position:absolute;inset:76px 0 0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.18) 0 1px,transparent 1px calc(100% / 10)),repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 10%,rgba(0,0,0,.01) 10% 20%);z-index:2}
.landing-root .hero-content{position:relative;z-index:3;max-width:var(--max);width:100%;margin:0 auto;display:grid;grid-template-columns:1.05fr .95fr;gap:28px;align-items:end}
/* Kicker bottom-anchored, left edge tại 10vw (boundary cột 2 của 10-col grid).
   Dùng left:10vw trực tiếp thay vì max-width centering → align chính xác mọi viewport. */
.landing-root .kicker{position:absolute;bottom:520px;top:auto;left:10vw;right:auto;margin:0;padding:0;z-index:3;font-size:clamp(13px,1.1vw,18px);font-weight:900;color:#fff}
/* hero-left (slide-count + h1) — translateX để left edge match 10vw cột 2 boundary.
   Same công thức như thumbs/blurb đối xứng. */
.landing-root .hero-left{transform:translateX(calc(10vw - var(--pad)))}
.landing-root .slide-count{font-size:clamp(11px,.85vw,14px);font-weight:900;margin:0 0 10px}
.landing-root .hero h1{font-family:"Libre Baskerville",serif;font-size:clamp(32px,4.8vw,72px);line-height:1.02;letter-spacing:-.06em;margin:0;text-shadow:0 8px 40px rgba(0,0,0,.35)}
.landing-root .hero h1 .arrow{font-family:Inter,sans-serif;font-weight:400}
.landing-root .hero-copy{align-self:center;justify-self:end;font-size:clamp(15px,1.2vw,18px);font-weight:700;line-height:1.4;max-width:560px}
/* Thumbs right edge align với boundary cột 9/10 = 90vw. Công thức:
   right edge gốc = 100vw - var(--pad) (hero padding ngang).
   shift X = 90vw - (100vw - var(--pad)) = -10vw + var(--pad). */
.landing-root .thumbs{display:flex;justify-content:flex-end;gap:10px;margin-bottom:12px;transform:translate(calc(-10vw + var(--pad)),-340px)}
/* Thumb wrap trong button — click chọn làm hero-bg. Default: overlay tối brightness(.55).
   Hover hoặc .active (ảnh đang chọn) → brightness:1 = bỏ overlay. */
.landing-root .thumbs button{padding:0;line-height:0;display:block;cursor:pointer}
.landing-root .thumbs img{width:84px;height:84px;object-fit:cover;border:1px solid rgba(255,255,255,.25);filter:brightness(.55)}
.landing-root .thumbs button:hover img,.landing-root .thumbs button.active img{filter:brightness(1)}
.landing-root .thumbs button.active img{border-color:rgba(255,255,255,.65)}
/* Paragraph riêng — translate same amount như thumbs để ngay dưới 3 ảnh. Right-align, max-width hẹp,
   margin-left:auto kéo về phải cho right edge match thumb cuối. */
.landing-root .hero-copy p{margin:0 0 0 auto;max-width:330px;text-align:right;font-size:clamp(14px,1.05vw,17px);font-weight:600;line-height:1.5;color:#dcdcdc;transform:translate(calc(-10vw + var(--pad)),-240px)}
.landing-root .hero-copy p .text-slot-inner{display:block}
.landing-root .floating-copy{margin-top:26px}
/* Pin CTA button vào góc phải-dưới hero. translateX(-10vw + pad) → right edge align với
   boundary cột 9/10 = 90vw (same công thức như thumbs + blurb). */
.landing-root .hero-cta-corner{position:absolute;right:var(--pad);bottom:26px;z-index:5;transform:translateX(calc(-10vw + var(--pad)))}
/* Scroll-driven parallax wrapper — img zoom+tilt khi scroll; z-index-neutral (không set) để
   gradient :after (z1) + gridlines (z2) + hero-content (z3) vẫn đè lên bình thường. */
.landing-root .hero-parallax{position:absolute;inset:0;will-change:transform}.landing-root .black{background:#346739;color:#fff}
.landing-root .white{background:#F2EDC2;color:#050505}
.landing-root .section-head{display:grid;grid-template-columns:190px 1fr auto;gap:32px;align-items:end;margin-bottom:clamp(32px,5vw,72px)}
.landing-root .section-head .lead{margin:16px 0 0}
.landing-root .services-headline{margin-left:calc(clamp(0px,12vw,250px) - 190px - 32px)}
.landing-root .news-grid{display:grid;grid-template-columns:repeat(3,1fr);column-gap:20px;row-gap:0;margin-left:clamp(0px,12vw,250px)}
.landing-root .news-card{background:#2a5530;border:1px solid rgba(255,255,255,.1);overflow:hidden;display:flex;flex-direction:column}
.landing-root .news-grid{align-items:start}
.landing-root .news-card:nth-child(n+4){margin-top:-20px}
.landing-root .news-card:nth-child(3n+2){margin-top:clamp(24px,4vw,60px);max-height:clamp(280px,32vw,400px);overflow:hidden}
.landing-root .news-card:nth-child(5){margin-top:25px}
.landing-root .news-card-img{position:relative;aspect-ratio:16/9;overflow:hidden;flex-shrink:0}
.landing-root .news-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s var(--ease)}
.landing-root .news-card:hover .news-card-img img{transform:scale(1.05)}
.landing-root .news-card-cat{position:absolute;top:12px;left:12px;background:#346739;color:#9FCB98;font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;padding:4px 10px}
.landing-root .news-card-body{padding:20px;display:flex;flex-direction:column;gap:10px;flex:1}
.landing-root .news-card-title{font-size:clamp(14px,1.2vw,17px);font-weight:800;line-height:1.35;color:#F2EDC2;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.landing-root .news-card-excerpt{font-size:13px;color:#9FCB98;line-height:1.55;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;flex:1}
.landing-root .news-card-meta{display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(242,237,194,.5);font-weight:600;flex-wrap:wrap;margin-top:auto;padding-top:12px;border-top:1px solid rgba(255,255,255,.1)}
.landing-root .news-card-dot{opacity:.5}
.landing-root .service-grid{display:grid;grid-template-columns:1.05fr 1fr 1.05fr;gap:20px;margin-left:clamp(0px,12vw,250px)}
.landing-root .service-card{position:relative;min-height:350px;border:4px solid rgba(255,255,255,.12);background:#346739;overflow:hidden;display:flex;align-items:flex-end;padding:24px;transition:.45s var(--ease)}
.landing-root .service-col{display:flex;flex-direction:column;gap:20px;will-change:transform;transition:transform .6s cubic-bezier(.25,.46,.45,.94)}
.landing-root .service-col:nth-child(2){margin-top:80px}
.landing-root .service-card.short{min-height:260px}
.landing-root .service-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.72;transition:.6s var(--ease)}
.landing-root .service-card:after{content:"";position:absolute;inset:40% 0 0;background:linear-gradient(transparent,rgba(0,0,0,.9))}
.landing-root .service-card .mini-icon{position:absolute;left:22px;top:22px;z-index:3;width:36px;height:36px;background:rgba(255,255,255,.22);display:grid;place-items:center;font-weight:900}
.landing-root .service-card .txt{position:relative;z-index:2}
.landing-root .service-card h3{margin:0 0 10px;font-size:22px}
.landing-root .service-card p{margin:0;font-size:18px;font-weight:750;color:#e4e4e4}
.landing-root .marquee{white-space:nowrap;overflow:hidden;background:#346739;color:#fff}
.landing-root .track{display:inline-flex;gap:20px;padding:10px 20px 10px 0;font-size:clamp(12px,1.8vw,26px);font-weight:900;letter-spacing:-.07em;color:#fff;will-change:transform}
.landing-root .track span:nth-child(even){color:rgba(255,255,255,.5)}
.landing-root .track b{color:var(--pink)}
@keyframes lpMarquee{to{transform:translateX(-50%)}}
.landing-root .about-layout{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start;margin-left:clamp(0px,12vw,250px);position:relative}
.landing-root .about-layout>.side-word{position:absolute;top:0;bottom:0;height:auto;left:clamp(-250px,-12vw,0px)}
.landing-root .about-main{font-size:clamp(20px,2.6vw,40px);line-height:1.15;font-weight:900;letter-spacing:-.05em}
.landing-root .about-head{grid-template-columns:190px 1fr;margin-bottom:clamp(16px,3vw,40px)}
.landing-root .about-headline{margin-left:calc(clamp(0px,12vw,250px) - 190px - 32px)}
.landing-root .about-headline .lead{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;max-width:400px}

.landing-root .about-proof-row{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:24px;margin-top:16px}
.landing-root .about-proof-row .lead{margin:0;max-width:340px}
.landing-root .proof-dot{width:12px;height:12px;border-radius:50%;background:var(--pink,#9FCB98);justify-self:center;flex-shrink:0}
.landing-root .proof-card{display:flex;overflow:visible;background:#eef3e6;width:100%;max-width:400px;min-height:140px;margin-left:auto;text-decoration:none;color:inherit;border:1px solid #e4e4e1;transition:background .2s}
.landing-root .proof-card:hover{background:rgba(255,255,255,.55)}
.landing-root .proof-card:hover .proof-thumb img{opacity:.55}
.landing-root .proof-card:hover .proof-quote{opacity:.55}
.landing-root .proof-thumb{position:relative;width:200px;flex-shrink:0;overflow:hidden}
.landing-root .proof-thumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;display:block;transition:opacity .2s}
.landing-root .proof-play{position:absolute;top:10px;left:10px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 1px 3px rgba(0,0,0,.18))}
.landing-root .proof-quote{flex:1;padding:24px 24px;font-size:clamp(15px,1.2vw,18px);line-height:1;color:#111;font-weight:700;display:flex;flex-direction:column;justify-content:center;gap:0;transition:opacity .2s}




.landing-root .campaign-tile{display:flex;flex-direction:column;gap:16px;overflow:visible;position:relative}
.landing-root .campaign-title{font-size:clamp(14px,1.2vw,17px);font-weight:800;margin:0;line-height:1.3;color:#111}
.landing-root .share-card{background:#fff;border-radius:10px;border:1px solid #c8dab8;padding:18px;display:flex;flex-direction:column;gap:14px;overflow:hidden;position:absolute;top:110px;left:24px;right:24px;bottom:30px}
.landing-root .share-back{display:flex;align-items:center}
.landing-root .share-main{display:flex;flex-direction:column;gap:7px}
.landing-root .share-bar{height:13px;background:#c8dab8;border-radius:0;width:100%}
.landing-root .share-bar.top{width:100%;height:13px;background:#c8dab8}
.landing-root .share-row:first-of-type .share-bar:first-child{background:#b0b0ae}
.landing-root .share-row:first-of-type .share-bar:last-child{background:#c8dab8}
.landing-root .share-row:last-of-type .share-bar:first-child{background:#c8dab8}
.landing-root .share-row:last-of-type .share-bar:last-child{background:#b0b0ae}
.landing-root .share-row{display:flex;gap:8px}
@keyframes share-float{0%,100%{transform:translateX(140px) translateY(0px) rotate(-10deg)}50%{transform:translateX(140px) translateY(0px) rotate(-5deg)}}
.landing-root .share-frame{position:relative;display:flex;align-items:center;gap:6px;background:#346739;border-radius:10px;padding:5px 8px;transform:translateX(140px) translateY(0px) rotate(-7.739deg);transform-origin:left center;width:fit-content;box-shadow:0 4px 16px rgba(0,0,0,.18);animation:share-float 3s ease-in-out infinite}
.landing-root .share-icons{display:flex;align-items:center}
.landing-root .share-icon+.share-icon{margin-left:-10px}
.landing-root .share-icon{position:relative;border-radius:50%;overflow:hidden;flex-shrink:0;border:3px solid #fff}
.landing-root .share-icon.lg{width:22px;height:22px}
.landing-root .share-icon.sm{width:20px;height:20px}
.landing-root .share-btn{font-size:9px;font-weight:600;color:#111;white-space:nowrap;padding:3px 7px;background:#fff;border-radius:6px}
.landing-root .campaign-tile .share-card,.landing-root .campaign-tile .share-frame,.landing-root .campaign-tile .share-btn{border-radius:0}

.landing-root .mosaic{display:grid;grid-template-columns:1fr 1fr 1.3fr;gap:18px;align-items:stretch;grid-column:1/-1;margin-top:56px}
.landing-root .mosaic-pair{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:stretch}
.landing-root .tile{background:#dde4c4;min-height:260px;position:relative;overflow:hidden;padding:24px}
.landing-root .tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.landing-root .tile.dark-grad:after{content:"";position:absolute;inset:40% 0 0;background:linear-gradient(transparent,rgba(0,0,0,.7))}
.landing-root .tile h3,.landing-root .tile p{position:relative;z-index:2;margin:0}
.landing-root .tile h3{font-size:22px;line-height:1.1}
.landing-root .tile p{font-size:19px;font-weight:750}
.landing-root .tile.big{min-height:180px}
.landing-root .tile.center{display:grid;place-items:center;text-align:left}
.landing-root .mosaic>.tile{align-self:start}
.landing-root .mosaic>.tile.big{min-height:unset}
.landing-root .content-wrap-tile{display:flex;flex-direction:column;justify-content:space-between;gap:16px;min-height:340px}
.landing-root .content-wrap-text{font-size:20px !important;color:#555;margin:0;line-height:1.5;max-width:320px}
.landing-root .content-wrap-stats{display:flex;gap:12px}
.landing-root .content-wrap-item{font-size:clamp(13px,1.1vw,16px);font-weight:800;color:#111;background:#fff;padding:8px 14px;border-radius:6px;border:1px solid #c8dab8}
.landing-root .gallery-phone{position:absolute;bottom:-10px;right:20px;width:400px;transform:scale(0.7);transform-origin:bottom right;pointer-events:none}
.landing-root .gallery-phone-bg{position:relative;width:100%;aspect-ratio:981/1177;border-radius:20px;overflow:hidden;mask:linear-gradient(355deg,rgba(0,0,0,0) 8%,rgb(0,0,0) 19%)}
@keyframes slide-track{0%,11.4%{transform:translateX(0)}14.3%,25.7%{transform:translateX(-100%)}28.6%,40%{transform:translateX(-200%)}42.9%,54.3%{transform:translateX(-300%)}57.1%,68.6%{transform:translateX(-400%)}71.4%,82.9%{transform:translateX(-500%)}85.7%,97.1%{transform:translateX(-600%)}97.15%{transform:translateX(-600%);animation-timing-function:step-end}100%{transform:translateX(0)}}
.landing-root .gallery-slide-wrap{position:absolute;left:121px;top:76px;width:156px;height:calc(100% - 150px);z-index:1;overflow:hidden;border-radius:18px;}
.landing-root .gallery-slide-track{display:flex;flex-direction:row;width:100%;height:100%;will-change:transform;animation:slide-track 14s linear infinite;}
.landing-root .gallery-slide-slot{flex-shrink:0;width:100%;height:100%;position:relative;}
.landing-root .gallery-slide-img{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;object-position:top center;}
.landing-root .social-proof-tile{background:#F2EDC2;display:flex;flex-direction:column;justify-content:space-between;gap:16px;overflow:hidden;}
.landing-root .sp-top{display:flex;flex-direction:column;gap:10px;}
.landing-root .sp-avatars{display:flex;align-items:center;}
.landing-root .sp-avatar{width:36px;height:36px;border-radius:50%;border:2px solid #F2EDC2;margin-left:-8px;overflow:hidden;background:#d4c4b0;flex-shrink:0;}
.landing-root .sp-avatar:first-child{margin-left:0;}
.landing-root .sp-avatar img{width:100%;height:100%;object-fit:cover;display:block;}
.landing-root .sp-avatar-count{width:36px;height:36px;border-radius:50%;border:2px solid #F2EDC2;margin-left:-8px;background:#346739;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.landing-root .sp-label{font-size:14px;font-weight:600;color:#222;margin:0;}
.landing-root .sp-bottom{display:flex;align-items:center;gap:20px;width:100%;}
.landing-root .sp-stat{font-size:52px;font-weight:800;color:#111;line-height:1;flex-shrink:0;}
.landing-root .sp-desc{font-size:13px;color:#888;line-height:1.55;margin:0;text-align:right;flex:1;}
@keyframes gg-grid-blink{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes gg-icon-pulse{0%,100%{transform:scale(1);box-shadow:0 4px 20px rgba(0,0,0,.12)}50%{transform:scale(1.08);box-shadow:0 8px 32px rgba(0,0,0,.22)}}
.landing-root .gg-grid-blink{animation:gg-grid-blink 2s ease-in-out infinite;}
.landing-root .gg-icon-pulse{animation:gg-icon-pulse 2s ease-in-out infinite;}
@keyframes dot-glow{0%{box-shadow:0 0 0 0 rgba(159,203,152,.7)}70%{box-shadow:0 0 0 8px rgba(159,203,152,0)}100%{box-shadow:0 0 0 0 rgba(159,203,152,0)}}
.landing-root .dot-blink{animation:dot-glow 0.9s ease-out infinite;}
.landing-root .growth-chart-tile{background:#dde4c4;padding:18px 24px;display:flex;flex-direction:column;gap:12px;}
.landing-root .growth-checks{display:flex;gap:20px;font-size:13px;font-weight:500;color:#346739;}
.landing-root .growth-bars{display:flex;align-items:flex-end;gap:7px;height:90px;}
.landing-root .growth-bar{flex:1;background:linear-gradient(to top,transparent 0%,#346739 60%);}
.landing-root .growth-bottom{display:flex;flex-direction:column;gap:14px;}
.landing-root .growth-icon{width:44px;height:44px;background:#346739;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#F2EDC2;box-shadow:0 1px 4px rgba(0,0,0,.15);}
.landing-root .growth-desc{font-size:17px;font-weight:700;color:#346739;line-height:1.45;margin:0;}
.landing-root .mosaic>.tile h3{font-size:20px}
.landing-root .mosaic>.tile p{font-size:15px}
.landing-root .trusted-tile{min-height:300px;}
.landing-root .trusted{display:flex;gap:10px;align-items:center;justify-content:center;height:100%;text-align:center;margin-top:80px}
@keyframes orbit-spin{from{transform:translateY(150px) rotate(0deg)}to{transform:translateY(150px) rotate(360deg)}}
.landing-root .logo-orbit{position:absolute;inset:0;opacity:.65;animation:orbit-spin 18s linear infinite;transform-origin:center center}
.landing-root .badge-logo{position:absolute;width:52px;height:52px;background:#fff;display:grid;place-items:center;box-shadow:0 4px 14px rgba(0,0,0,.08);font-weight:900;font-size:10px;left:50%;top:50%}
.landing-root .badge-logo:nth-child(1){margin-left:0px;margin-top:-230px;transform:translateX(-50%) translateY(-50%) rotate(0deg)}
.landing-root .badge-logo:nth-child(2){margin-left:115px;margin-top:-199px;transform:translateX(-50%) translateY(-50%) rotate(30deg)}
.landing-root .badge-logo:nth-child(3){margin-left:199px;margin-top:-115px;transform:translateX(-50%) translateY(-50%) rotate(60deg)}
.landing-root .badge-logo:nth-child(4){margin-left:230px;margin-top:0px;transform:translateX(-50%) translateY(-50%) rotate(90deg)}
.landing-root .badge-logo:nth-child(5){margin-left:199px;margin-top:115px;transform:translateX(-50%) translateY(-50%) rotate(120deg)}
.landing-root .badge-logo:nth-child(6){margin-left:115px;margin-top:199px;transform:translateX(-50%) translateY(-50%) rotate(150deg)}
.landing-root .badge-logo:nth-child(7){margin-left:0px;margin-top:230px;transform:translateX(-50%) translateY(-50%) rotate(180deg)}
.landing-root .badge-logo:nth-child(8){margin-left:-115px;margin-top:199px;transform:translateX(-50%) translateY(-50%) rotate(-150deg)}
.landing-root .badge-logo:nth-child(9){margin-left:-199px;margin-top:115px;transform:translateX(-50%) translateY(-50%) rotate(-120deg)}
.landing-root .badge-logo:nth-child(10){margin-left:-230px;margin-top:0px;transform:translateX(-50%) translateY(-50%) rotate(-90deg)}
.landing-root .badge-logo:nth-child(11){margin-left:-199px;margin-top:-115px;transform:translateX(-50%) translateY(-50%) rotate(-60deg)}
.landing-root .badge-logo:nth-child(12){margin-left:-115px;margin-top:-199px;transform:translateX(-50%) translateY(-50%) rotate(-30deg)}
.landing-root .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);margin-top:72px}
.landing-root .stat{background:#fff;padding:38px 30px}
.landing-root .stat strong{display:block;font-size:clamp(42px,5vw,74px);letter-spacing:-.07em}
.landing-root .stat span{font-weight:800;color:#696969}
.landing-root .proj-stats{display:flex;align-items:stretch;border:1.5px solid rgba(52,103,57,.18);background:rgba(242,237,194,.5)}
.landing-root .proj-stat{flex:1;text-align:center;padding:28px 16px;display:flex;flex-direction:column;gap:8px}
.landing-root .proj-stat-num{font-size:clamp(28px,4vw,52px);font-weight:900;letter-spacing:-.06em;color:#346739;line-height:1}
.landing-root .proj-stat-label{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#79AE6F}
.landing-root .proj-stat-divider{width:1px;background:rgba(52,103,57,.15);flex-shrink:0;align-self:stretch}
.landing-root .proj-partners{display:flex;align-items:center;justify-content:space-between;padding:18px 28px;border:1.5px solid rgba(52,103,57,.18);background:rgba(242,237,194,.5);gap:20px;flex-wrap:wrap}
.landing-root .proj-partners-label{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#79AE6F;flex-shrink:0}
.landing-root .proj-partners-list{display:flex;align-items:center;gap:16px}
.landing-root .proj-partners-list span{font-size:clamp(15px,1.8vw,20px);font-weight:900;letter-spacing:.06em;color:#346739}
.landing-root .proj-partners-dot{color:#9FCB98 !important;font-weight:400 !important}
.landing-root .projects-list{display:grid;gap:92px;margin-left:clamp(0px,12vw,250px)}
.landing-root .project{display:grid;grid-template-columns:.62fr 1.38fr;gap:48px;align-items:stretch}
.landing-root .project-meta{padding:20px 0 0;display:flex;flex-direction:column}
.landing-root .project-meta-slide{display:flex;flex-direction:column;gap:20px;flex:1}
.landing-root .proj-slot{position:relative;overflow:hidden}
.landing-root .proj-slot-abs{position:absolute;top:0;left:0;right:0}
.landing-root .proj-slot-item{position:relative}
.landing-root .project-nav{margin-top:auto}
.landing-root .project-num{font-size:24px;font-weight:800}
.landing-root .project-logo{font-size:clamp(38px,4vw,58px);font-weight:900;letter-spacing:-.08em;display:flex;flex-direction:column;gap:10px}
.landing-root .project p{font-size:18px;line-height:1.35;font-weight:650;color:#333;max-width:360px}
.landing-root .project-img{position:relative;min-height:520px;background:#ddd;overflow:hidden;box-shadow:var(--shadow)}
.landing-root .project-img img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover}
.landing-root .pixel{position:absolute;right:-1px;top:-1px;width:86px;height:86px;background:conic-gradient(#ddd 0 25%,transparent 0 50%,#ddd 0 75%,transparent 0);background-size:43px 43px;z-index:2}
@keyframes proj-exit-up{from{transform:translateY(0)}to{transform:translateY(-100%)}}
@keyframes proj-exit-down{from{transform:translateY(0)}to{transform:translateY(100%)}}
@keyframes proj-enter-up{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes proj-enter-down{from{transform:translateY(-100%)}to{transform:translateY(0)}}
.landing-root .proj-exit-up{animation:proj-exit-up .6s cubic-bezier(.4,0,.2,1) both}
.landing-root .proj-exit-down{animation:proj-exit-down .6s cubic-bezier(.4,0,.2,1) both}
.landing-root .proj-enter-up{animation:proj-enter-up .6s cubic-bezier(.4,0,.2,1) both}
.landing-root .proj-enter-down{animation:proj-enter-down .6s cubic-bezier(.4,0,.2,1) both}
.landing-root .proj-img-exit-up{animation:proj-exit-up .6s cubic-bezier(.4,0,.2,1) both}
.landing-root .proj-img-exit-down{animation:proj-exit-down .6s cubic-bezier(.4,0,.2,1) both}
.landing-root .proj-img-enter-up{animation:proj-enter-up .6s cubic-bezier(.4,0,.2,1) both}
.landing-root .proj-img-enter-down{animation:proj-enter-down .6s cubic-bezier(.4,0,.2,1) both}
.landing-root .project-img-inner{position:absolute;inset:0}
.landing-root .project-meta-overlay{position:absolute;bottom:0;right:0;width:260px;z-index:3;padding:0 20px}
.landing-root .project-meta-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-top:1px solid rgba(255,255,255,.12);font-size:13px;font-weight:600;color:rgba(255,255,255,.9);letter-spacing:.01em}
.landing-root .project-meta-row:first-child{border-top:none}
.landing-root .process-grid{position:relative;margin-left:calc(clamp(0px,12vw,250px) + 20px);display:grid;gap:28px}
.landing-root .process-grid::before{content:'';position:absolute;left:-20px;top:0;bottom:0;width:2px;background:rgba(255,255,255,.45)}
.landing-root .process-card{position:relative;display:grid;grid-template-columns:230px 1fr;align-items:center;border:3px solid rgba(52,103,57,.25);background:#F2EDC2;padding:38px 48px;min-height:168px;opacity:0;transform:translateY(36px);transition:opacity .5s ease,transform .5s ease}
.landing-root .process-card.in{opacity:1;transform:none}
.landing-root .process-card::after{content:'';position:absolute;left:-30px;top:-7px;width:16px;height:16px;border-radius:50%;background:#fff}
.landing-root .process-card .num{font-family:"Libre Baskerville",serif;font-size:84px;line-height:1;color:#346739}
.landing-root .process-card .num img{display:inline-block;width:96px;height:66px;object-fit:cover;margin-left:-22px;vertical-align:middle}
.landing-root .process-card h3{font-size:30px;margin:0 0 10px;color:#346739}
.landing-root .process-card p{margin:0;font-size:18px;color:#4a7a4e;font-weight:650}
.landing-root .pricing-panel{margin-left:clamp(0px,12vw,250px)}
.landing-root .tabs-row{display:flex;align-items:center;justify-content:space-between;gap:32px;margin-bottom:42px}
.landing-root .tabs-row .tabs{margin-bottom:0}
.landing-root .trusted-badge{display:flex;align-items:center;gap:14px;flex-shrink:0}
.landing-root .trusted-avatars{display:flex;align-items:center}
.landing-root .trusted-avatars img{width:48px;height:48px;border-radius:50%;object-fit:cover;border:2.5px solid #eef3e6;margin-left:-12px;flex-shrink:0}
.landing-root .trusted-avatars img:first-child{margin-left:0}
.landing-root .trusted-text{display:flex;flex-direction:column;gap:3px;line-height:1.2}
.landing-root .trusted-text span{font-size:15px;font-weight:700;color:#555}
.landing-root .trusted-text strong{font-size:16px;font-weight:900;color:#111;letter-spacing:-.02em}
.landing-root .trusted-star{color:var(--pink)}
.landing-root .tabs{position:relative;display:inline-grid;grid-template-columns:repeat(3,1fr);background:#fff;border:1.5px solid rgba(0,0,0,.1);padding:5px;gap:3px}
.landing-root .tab-slider{position:absolute;top:5px;left:5px;height:calc(100% - 10px);background:#c5dab8;box-shadow:0 1px 4px rgba(0,0,0,.08);pointer-events:none;z-index:0;transition:width 1s cubic-bezier(.4,0,.2,1),transform 1s cubic-bezier(.4,0,.2,1)}
.landing-root .tab{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 22px;font-weight:800;font-size:13px;letter-spacing:.07em;color:#999;transition:color .25s}
.landing-root .tab.active{color:#111}
@keyframes pc-exit-up{from{transform:translateY(0)}to{transform:translateY(-100%)}}
@keyframes pc-exit-down{from{transform:translateY(0)}to{transform:translateY(100%)}}
@keyframes pc-enter-up{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes pc-enter-down{from{transform:translateY(-100%)}to{transform:translateY(0)}}
.landing-root .price-card-wrap{position:relative;overflow:hidden;min-height:440px}
.landing-root .price-card{background:#fff;display:flex;flex-direction:column;min-height:420px;box-shadow:0 16px 60px rgba(0,0,0,.04)}
.landing-root .price-card-abs{position:absolute;inset:0}
.landing-root .pc-exit-up{animation:pc-exit-up .65s cubic-bezier(.4,0,.2,1) both}
.landing-root .pc-exit-down{animation:pc-exit-down .65s cubic-bezier(.4,0,.2,1) both}
.landing-root .pc-enter-up{animation:pc-enter-up .65s cubic-bezier(.4,0,.2,1) both}
.landing-root .pc-enter-down{animation:pc-enter-down .65s cubic-bezier(.4,0,.2,1) both}
.landing-root .price-card-body{display:grid;grid-template-columns:.4fr .6fr;flex:1}
.landing-root .price-main{display:flex;flex-direction:column;justify-content:space-between;padding:44px 36px 40px}
.landing-root .price-title{font-size:clamp(30px,3.5vw,48px);font-weight:900;letter-spacing:-.06em;margin:0;line-height:1}
.landing-root .price-title-suffix{color:var(--pink)}
.landing-root .price{font-size:clamp(26px,3.8vw,52px);font-weight:900;letter-spacing:-.06em;line-height:1;margin-top:12px}
.landing-root .price-main small{display:block;font-size:13px;color:#999;font-weight:600;margin-top:5px}
.landing-root .price-right{display:flex;flex-direction:column;padding:40px 44px 0 0}
.landing-root .price-included-head{font-size:14px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;margin-bottom:14px;color:#222}
.landing-root .price-pink{color:var(--pink)}
.landing-root .price-feat-grid{display:grid;grid-template-columns:1fr 1fr;flex:1;background:#F2EDC2;align-items:start}
.landing-root .feat{display:grid;grid-template-columns:28px 1fr;grid-template-rows:auto auto;column-gap:10px;row-gap:3px;padding:16px 18px}
.landing-root .feat-icon{grid-row:1/3;width:28px;height:28px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#555;align-self:start;margin-top:2px}
.landing-root .feat strong{display:block;font-size:12px;font-weight:800;line-height:1.2;color:#111;grid-column:2}
.landing-root .feat span{display:block;color:#999;font-size:11px;font-weight:600;line-height:1.4;grid-column:2}
.landing-root .price-footer{display:flex;align-items:center;justify-content:space-between;padding:44px 44px 20px 36px;position:relative;flex-shrink:0}
.landing-root .price-footer::before{content:'';position:absolute;top:20px;left:52px;right:60px;height:1px;background:#c8dab8}
.landing-root .price-delivery{font-size:13px;color:#aaa;font-weight:650}
.landing-root .price-delivery strong{color:#333;font-weight:800}
.landing-root .price-cta{background:#346739;color:#fff;padding:13px 28px;font-weight:800;font-size:13px;letter-spacing:.04em;border:none;cursor:pointer;transition:background .2s;white-space:nowrap}
.landing-root .price-cta:hover{background:#2a5530}
.landing-root .reviews-shell{margin-left:clamp(0px,12vw,250px);background:#2a5530;padding:48px 56px;height:460px;display:grid;grid-template-columns:.25fr .75fr;gap:36px;align-items:stretch}
.landing-root .reviews-shell>div:first-child{display:flex;flex-direction:column;justify-content:space-between}
.landing-root .review-content{display:flex;flex-direction:column;justify-content:space-between;height:100%}
.landing-root .featured-in{background:#346739;padding:26px 32px 26px 0;display:flex;align-items:center;gap:48px;overflow:hidden;margin-top:16px}
.landing-root .fi-label{font-size:15px;font-weight:800;color:#fff;white-space:nowrap;flex-shrink:0;letter-spacing:.04em}
.landing-root .fi-track-wrap{flex:1;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.landing-root .fi-track{display:inline-flex;align-items:center;gap:64px;white-space:nowrap;will-change:transform}
@keyframes fi-scroll{to{transform:translateX(-50%)}}
.landing-root .fi-logo{display:inline-flex;align-items:center;gap:8px;font-size:18px;font-weight:700;color:rgba(255,255,255,.85);letter-spacing:-.03em;white-space:nowrap}
.landing-root .fi-logo svg{flex-shrink:0;color:rgba(255,255,255,.85);width:22px;height:22px}
.landing-root .fi-dim{color:rgba(255,255,255,.35)}
.landing-root .fi-serif{font-family:"Libre Baskerville",serif;font-style:italic}
.landing-root .fi-caps{font-size:12px;letter-spacing:.12em;font-weight:900}
.landing-root .rev-slot{position:relative;overflow:hidden}
.landing-root .rev-slot-abs{position:absolute;inset:0}
.landing-root .review-person-grid{display:grid;grid-template-columns:auto 1fr;gap:0 16px;align-items:center}
.landing-root .review-person-grid>.rev-slot:first-child{grid-row:1/3;overflow:hidden;border-radius:50%}
.landing-root .review-person-grid>.rev-slot:first-child img{width:70px;height:70px;border-radius:50%;object-fit:cover;display:block}
.landing-root .review-person-right{display:flex;flex-direction:column;gap:2px}
.landing-root .review-person{display:flex;align-items:center;gap:16px}
.landing-root .review-person img{width:70px;height:70px;border-radius:50%;object-fit:cover}
.landing-root .stars{font-size:21px}
.landing-root .quote{font-family:"Libre Baskerville",serif;font-size:clamp(22px,2.8vw,42px);font-weight:400;line-height:1.2;letter-spacing:-.03em;font-style:italic;margin-top:32px}
.landing-root .quote span{color:var(--pink)}
.landing-root .review-copy{margin-top:0;font-size:14px;font-weight:600;color:#aaa;display:flex;align-items:flex-start;gap:12px}
.landing-root .review-copy::before{content:'';flex-shrink:0;width:52px;height:1px;background:rgba(255,255,255,.35);margin-top:9px}
.landing-root .review-controls{display:flex;gap:8px;margin-top:52px}
.landing-root .square{width:44px;height:44px;background:#fff;color:#000;display:grid;place-items:center;font-size:24px;transition:background .25s,color .25s;cursor:pointer}
.landing-root .square:hover{background:#c8dab8}
.landing-root .square.flash{background:var(--pink);color:#fff}
.landing-root .faq-layout{display:grid;grid-template-columns:.12fr .88fr;gap:48px;margin-left:clamp(0px,12vw,250px)}
.landing-root .faq-card{display:flex;flex-direction:column;gap:14px;align-items:flex-start}
.landing-root .faq-card h3{font-size:17px;font-weight:800;margin:0}
.landing-root .faq-card p{font-size:13px;color:#777;margin:0;line-height:1.5}
.landing-root .faq-card img{width:72px;height:72px;border-radius:50%;object-fit:cover}
.landing-root .accordion{display:grid;gap:10px}
.landing-root .faq-item{background:#eef3e6}
.landing-root .faq-q{width:100%;text-align:left;padding:16px 20px;display:flex;gap:16px;align-items:center;font-weight:850;font-size:15px}
.landing-root .faq-q .plus{font-size:22px;color:#111;display:inline-block;transition:transform .35s cubic-bezier(.4,0,.2,1),color .25s ease;transform-origin:center}
.landing-root .faq-item.open .faq-q .plus{transform:rotate(360deg);color:var(--pink)}
.landing-root .faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .22s cubic-bezier(.4,0,.2,1)}
.landing-root .faq-a-inner{overflow:hidden}
.landing-root .faq-a-inner p{padding:0 20px 16px 58px;margin:0;color:#666;font-weight:650;font-size:14px;line-height:1.45}
.landing-root .faq-item.open .faq-a{grid-template-rows:1fr}
.landing-root .cta{min-height:84svh;display:grid;align-items:start;padding-top:4svh;background:#346739;color:#fff;position:relative;overflow:hidden}
.landing-root .cta img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.45;filter:saturate(.75)}
.landing-root .cta:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.24),rgba(0,0,0,.72))}
.landing-root .cta-content{position:relative;z-index:2;max-width:var(--max);margin:0 auto;padding:var(--pad);width:100%;display:flex;flex-direction:column;align-items:center;gap:32px;text-align:center}
.landing-root .cta-spark{position:absolute;top:clamp(32px,5vw,64px);left:var(--pad);color:#cfcfcf;font-weight:800;font-size:20px}
.landing-root .cta h2{font-size:clamp(32px,4.5vw,72px);line-height:1;letter-spacing:-.075em;margin:0;max-width:1060px;text-align:center}
.landing-root .cta p{font-size:16px;font-weight:750;max-width:520px}
.landing-root .footer{background:#346739;color:#fff;padding:24px var(--pad) 28px;position:fixed;top:76px;bottom:0;left:0;right:0;z-index:3;overflow:hidden;will-change:transform;display:flex;flex-direction:column;justify-content:center}
.landing-root .footer-img-l,.landing-root .footer-img-r{position:absolute;top:0;bottom:0;width:18%;object-fit:cover;opacity:.36}
.landing-root .footer-img-l{left:0}
.landing-root .footer-img-r{right:0}
.landing-root .footer-inner{position:relative;z-index:2;max-width:1060px;margin:0 auto;text-align:center}
.landing-root .footer-links{display:flex;justify-content:center;gap:38px;flex-wrap:wrap;font-size:16px;font-weight:800;margin-bottom:20px}
.landing-root .footer-logo{font-size:clamp(56px,8vw,130px);font-weight:900;letter-spacing:-.1em;line-height:.85}
.landing-root .footer-logo .dot{color:var(--pink)}
.landing-root .contact{display:flex;justify-content:center;gap:42px;flex-wrap:wrap;margin:20px 0;color:#e7e7e7;font-weight:700}
.landing-root .copyright{display:flex;justify-content:space-between;gap:20px;border-top:1px solid rgba(255,255,255,.22);padding-top:16px;color:#ddd;font-weight:750}
.landing-root .reveal{opacity:0;transform:translateY(40px);transition:opacity 3s var(--ease),transform 3s var(--ease)}
.landing-root .reveal.from-left{transform:translateX(-50px)}
.landing-root .reveal.flip-up{transform:perspective(600px) rotateY(-60deg)}
.landing-root .reveal.flip-down{transform:perspective(600px) rotateY(60deg)}
.landing-root .reveal.fade-only{transform:none}
.landing-root .reveal.reveal-tilt-top{transform:translateY(-55px) rotate(-5deg);transition:opacity 2s ease,transform 2s ease}
.landing-root .reveal.reveal-right{transform:translateX(90px);transition:opacity .65s ease .15s,transform .65s ease .15s}
.landing-root .reveal.reveal-tilt-right{transform:rotate(15deg) translateY(20px);transition:opacity .9s ease,transform .9s ease}
.landing-root .reveal.reveal-tilt-left{transform:rotate(-15deg) translateY(20px);transition:opacity .9s ease,transform .9s ease}
.landing-root .reveal.reveal-up{transform:translateY(60px);transition:opacity .7s ease,transform .7s ease}
.landing-root .reveal.in{opacity:1;transform:none}
.landing-root .delay-1{transition-delay:.1s}
.landing-root .delay-2{transition-delay:.2s}
.landing-root .quote-headline .muted{color:currentColor;font-size:.6em;vertical-align:.15em}
.landing-root .quote-headline .wbw{display:inline-block;opacity:0;transform:translateX(-20px)}
.landing-root .quote-headline.words-in .wbw{animation:wbwIn .42s cubic-bezier(.25,.46,.45,.94) both;animation-delay:calc(var(--wbw-i) * 0.055s)}
@keyframes wbwIn{to{opacity:1;transform:none}}
.landing-root .delay-3{transition-delay:.3s}
.landing-root .growth-bar{transform-origin:bottom;transform:scaleY(0);transition:transform .7s ease-out}
.landing-root .growth-chart-tile.in .growth-bar{transform:scaleY(1)}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(1){transition-delay:.1s}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(2){transition-delay:.18s}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(3){transition-delay:.26s}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(4){transition-delay:.34s}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(5){transition-delay:.42s}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(6){transition-delay:.5s}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(7){transition-delay:.58s}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(8){transition-delay:.66s}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(9){transition-delay:.74s}
.landing-root .growth-chart-tile.in .growth-bar:nth-child(10){transition-delay:.82s}
@media (max-width:1100px){
  .landing-root .section-head{grid-template-columns:1fr auto}
  .landing-root .section-head .label-row{grid-column:1/-1}
  .landing-root .services-headline,.landing-root .about-headline,.landing-root #projects .headline{margin-left:0}
  .landing-root #projects .section-head>div:nth-child(2),.landing-root #process .section-head>div:nth-child(2),.landing-root #pricing .section-head>div:nth-child(2),.landing-root #reviews .section-head>div:nth-child(2),.landing-root #faq .section-head>div:nth-child(2),.landing-root #articles .section-head>div:nth-child(2){margin-left:0}
  .landing-root .about-proof-row{grid-template-columns:1fr;gap:16px}
  .landing-root .proof-dot{display:none}
  .landing-root .proof-card{max-width:360px}
  .landing-root .service-col{display:contents}
  .landing-root .service-grid,.landing-root .about-layout,.landing-root .projects-list,.landing-root .process-grid,.landing-root .pricing-panel,.landing-root .reviews-shell,.landing-root .faq-layout,.landing-root .featured-in,.landing-root .tcard-grid,.landing-root .art-grid{margin-left:0}
  .landing-root .art-featured,.landing-root .art-row{grid-template-columns:1fr}
  .landing-root .news-grid{grid-template-columns:1fr 1fr}
  .landing-root .news-card:nth-child(3n+2){margin-top:0;max-height:none}
  .landing-root .news-card:nth-child(n+4){margin-top:0}
  .landing-root .news-card:nth-child(5){margin-top:0}
  .landing-root .service-grid{grid-template-columns:1fr 1fr}
  .landing-root .service-card:nth-child(2){transform:none}
  .landing-root .mosaic{grid-template-columns:1fr 1fr}
  .landing-root .mosaic>.tile.big{grid-row:span 1}
  .landing-root .price-card-body,.landing-root .reviews-shell,.landing-root .faq-layout{grid-template-columns:1fr}
  .landing-root .price-right{padding:24px 24px 0}
  .landing-root .side-word{display:none}
  .landing-root .hero-content{grid-template-columns:1fr}
  .landing-root .hero-copy{justify-self:start;text-align:left;max-width:620px}
  .landing-root .thumbs{justify-content:flex-start;margin:32px 0 0}
  .landing-root .stats{grid-template-columns:repeat(2,1fr)}
}
@media (max-width:720px){
  .landing-root{--pad:20px}
  .lp-nav{height:64px}
  .lp-logo{font-size:29px}
  .lp-hamb{width:40px;height:40px}
  .lp-hamb:before,.lp-hamb:after{width:22px}
  .landing-root .hero{min-height:100svh;padding:92px 20px 32px}
  .landing-root .gridlines{inset:64px 0 0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.18) 0 1px,transparent 1px calc(100% / 5)),repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 20%,rgba(0,0,0,.01) 20% 40%)}
  .landing-root .hero h1{font-size:clamp(30px,9vw,48px);letter-spacing:-.06em}
  .landing-root .hero-copy{font-size:17px;margin-top:20px}
  .landing-root .thumbs{display:none}
  .landing-root .scroll-note{display:none}
  .landing-root .btn{min-height:48px;font-size:14px;padding-left:48px}
  .landing-root .btn .icon{width:48px}
  .landing-root .btn .arrow{width:48px;min-height:48px}
  .landing-root .btn .label{padding:0 16px}
  .landing-root .section{padding:74px 20px}
  .landing-root .section-head{display:block;margin-bottom:42px}
  .landing-root .section-head .btn{margin-top:24px}
  .landing-root .headline{font-size:clamp(42px,13vw,62px)}
  .landing-root .lead{font-size:17px}
  .landing-root .news-grid{grid-template-columns:1fr;margin-left:0;row-gap:16px}
  .landing-root .service-grid{display:flex;overflow:auto;gap:14px;margin:0 -20px;padding:0 20px 18px;scroll-snap-type:x mandatory}
  .landing-root .service-card{min-width:82vw;min-height:390px;scroll-snap-align:start;padding:20px}
  .landing-root .service-card.short{min-height:390px}
  .landing-root .service-card h3{font-size:23px}
  .landing-root .about-main{font-size:clamp(18px,6vw,32px)}
  .landing-root .gallery-phone{display:block;transform:scale(0.5);transform-origin:bottom right;right:-30px;bottom:-20px}
  .landing-root .proof-card{flex-direction:column;min-height:auto;max-width:100%}
  .landing-root .proof-thumb{width:100%;min-height:160px;flex-shrink:0}
  .landing-root .mosaic{display:flex;flex-direction:column;gap:18px;margin-top:32px}
  .landing-root .mosaic>.tile{align-self:stretch}
  .landing-root .content-wrap-stats{flex-direction:column;align-items:flex-start}
  .landing-root .mosaic-flex-row{flex-direction:column!important;flex-wrap:wrap}
  .landing-root .mosaic-flex-row>.tile{flex-basis:100%!important;min-width:0}
  .landing-root .mosaic>.tile h3{font-size:15px}
  .landing-root .mosaic>.tile p{font-size:13px}
  .landing-root .growth-desc{font-size:13px}
  .landing-root .content-wrap-text{font-size:14px!important}
  .landing-root .tile,.landing-root .tile.big{min-height:280px}
  .landing-root .stats{grid-template-columns:1fr}
  .landing-root .proj-stats{flex-wrap:wrap}
  .landing-root .proj-stat{min-width:40%;padding:20px 12px}
  .landing-root .proj-stat-divider{display:none}
  .landing-root .projects-list{gap:40px}
  .landing-root .project{grid-template-columns:1fr;gap:14px}
  .landing-root .project-num{margin-bottom:8px;font-size:18px}
  .landing-root .project-img{min-height:260px;order:-1}
  .landing-root .project-meta{padding:8px 0 0}
  .landing-root .project-meta-slide{gap:10px}
  .landing-root .project-logo{font-size:clamp(26px,8vw,40px);gap:6px}
  .landing-root .project p{font-size:14px}
  .landing-root .process-grid{gap:14px;margin-left:32px}
  .landing-root .process-card{grid-template-columns:1fr;gap:6px;padding:18px;min-height:auto}
  .landing-root .process-card .num{font-size:44px;display:flex;align-items:flex-start;justify-content:space-between}
  .landing-root .process-card .num img{margin-left:0;width:72px;height:50px;flex-shrink:0}
  .landing-root .process-card h3{font-size:16px;margin-bottom:4px}
  .landing-root .process-card p{font-size:13px}
  .landing-root .pricing-panel{margin-left:0}
  .landing-root .tabs-row{flex-direction:column;gap:14px;margin-bottom:24px}
  .landing-root .tabs{width:100%;display:grid}
  .landing-root .tab{padding:12px 8px;font-size:12px;gap:5px}
  .landing-root .trusted-badge{justify-content:center;padding:10px 0 4px}
  .landing-root .price-card-wrap{min-height:auto}
  .landing-root .price-card{min-height:auto}
  .landing-root .price-main{padding:20px 16px 14px}
  .landing-root .price-right{padding:0 16px 0}
  .landing-root .price-feat-grid{grid-template-columns:1fr 1fr}
  .landing-root .feat{padding:8px 10px}
  .landing-root .price-footer{padding:22px 16px 12px;border-top:none}
  .landing-root .price-footer::before{top:8px;left:24px;right:24px}
  .landing-root .reviews-shell{padding:28px 22px;height:auto}
  .landing-root .quote{font-size:clamp(18px,6vw,28px);margin-top:16px}
  .landing-root .review-copy{text-align:left;margin-top:16px}
  .landing-root .faq-q{padding:20px;font-size:16px}
  .landing-root .faq-a p{padding:0 20px 20px 58px}
  .landing-root .cta-content{grid-template-columns:1fr;align-items:center}
  .landing-root .cta h2{font-size:clamp(40px,13vw,72px)}
  .landing-root .cta-spark{position:static;text-align:center;order:-1}
  .landing-root .footer{padding:68px 20px}
  .landing-root .footer-img-l,.landing-root .footer-img-r{display:none}
  .landing-root .footer-logo{font-size:clamp(76px,22vw,112px)}
  .landing-root .footer-links{gap:18px}
  .landing-root .contact{gap:18px;font-size:14px}
  .landing-root .copyright{display:block;text-align:center}
  .landing-root .copyright div+div{margin-top:10px}
  .lp-menu a{font-size:clamp(42px,15vw,72px)}
}
.landing-root .art-grid{display:flex;flex-direction:column;gap:0;margin-left:clamp(0px,12vw,250px)}
.landing-root .art-featured{display:grid;grid-template-columns:1.15fr 1fr;background:#fff;padding:3px}
.landing-root .art-row{display:grid;grid-template-columns:1fr 1fr}
.landing-root .art-img-wrap{overflow:hidden;width:100%;height:260px}
.landing-root .art-featured .art-img-wrap{height:100%;min-height:300px}
.landing-root .art-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.4,0,.2,1),opacity .5s ease,filter .5s ease}
.landing-root .art-img-wrap:hover .art-img{transform:scale(1.25) rotate(5deg);opacity:.4;filter:blur(6px)}
.landing-root .art-content{padding:28px 32px;display:flex;flex-direction:column;gap:12px}
.landing-root .art-card{background:#fff;padding:3px}
.landing-root .art-card .art-content{padding:20px 20px 20px}
.landing-root .art-meta{display:flex;align-items:center;gap:6px;font-size:13px;color:#888}
.landing-root .art-title{font-size:clamp(16px,1.4vw,22px);font-weight:800;color:#111;line-height:1.3;margin:0}
.landing-root .art-desc{font-size:14px;color:#666;line-height:1.55;margin:0;flex:1}
.landing-root .art-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:16px}
.landing-root .art-tag{font-size:12px;font-weight:600;color:#444;background:#eef3e6;padding:4px 14px}
.landing-root .art-row{gap:24px;padding-top:24px}
@media (prefers-reduced-motion:reduce){
  .landing-root *,.landing-root *:before,.landing-root *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .landing-root .reveal,.landing-root .reveal.from-left,.landing-root .reveal.flip-up,.landing-root .reveal.flip-down,.landing-root .reveal.fade-only,.landing-root .reveal.reveal-tilt-top,.landing-root .reveal.reveal-right,.landing-root .reveal.reveal-tilt-right,.landing-root .reveal.reveal-tilt-left,.landing-root .reveal.reveal-up{opacity:1;transform:none}
  .landing-root .growth-bar{transform:scaleY(1)}
  .landing-root .process-card{opacity:1;transform:none}
}
@media (min-width:1101px){
  .landing-root .featured-in{margin-left:clamp(0px,12vw,250px)}
  .landing-root .tcard-grid{margin-left:clamp(0px,12vw,250px)}
  .landing-root .art-grid{margin-left:clamp(0px,12vw,250px)}
}
.landing-root .tcard-grid{display:flex;gap:14px;align-items:flex-start;margin-left:clamp(0px,12vw,250px)}
.landing-root .tcard-col{flex:1;display:flex;flex-direction:column;gap:14px}
.landing-root .tcard-col-mid{padding-top:0}
.landing-root .tcard{background:#2a5530;padding:12px 12px 14px;display:flex;flex-direction:column;gap:12px;min-height:300px;opacity:0;transform:translateY(60px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);overflow:hidden}
.landing-root .tcard-revealed .tcard{opacity:1;transform:translateY(0)}
.landing-root .tcard-revealed .tcard-col:nth-child(1) .tcard:nth-child(1){transition-delay:.0s}
.landing-root .tcard-revealed .tcard-col:nth-child(2) .tcard:nth-child(1){transition-delay:.1s}
.landing-root .tcard-revealed .tcard-col:nth-child(3) .tcard:nth-child(1){transition-delay:.2s}
.landing-root .tcard-revealed .tcard-col:nth-child(1) .tcard:nth-child(2){transition-delay:.3s}
.landing-root .tcard-revealed .tcard-col:nth-child(2) .tcard:nth-child(2){transition-delay:.4s}
.landing-root .tcard-revealed .tcard-col:nth-child(3) .tcard:nth-child(2){transition-delay:.5s}
.landing-root .tcard-inner{background:#1e3d22;padding:16px;display:flex;flex-direction:column;gap:14px;flex:1;border-radius:4px}
.landing-root .tcard-top{display:flex;justify-content:space-between;align-items:flex-start}
.landing-root .tcard-logo{width:44px;height:44px;background:#2a5530;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#9FCB98;flex-shrink:0}
.landing-root .tcard-rating{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:rgba(242,237,194,.75);white-space:nowrap}
.landing-root .tcard-star{color:#9FCB98}
.landing-root .tcard-quote{font-size:clamp(15px,1.3vw,19px);font-weight:700;color:#F2EDC2;line-height:1.45;flex:1}
.landing-root .tcard-person{display:flex;align-items:center;gap:12px;padding:0 4px}
.landing-root .tcard-avatar{width:40px;height:40px;border-radius:50%;object-fit:cover;flex-shrink:0}
.landing-root .tcard-name{font-size:14px;font-weight:700;color:#F2EDC2}
.landing-root .tcard-company{font-size:12px;color:#9FCB98;margin-top:2px}
@media (max-width:720px){
  .landing-root .tcard-grid{flex-direction:column;align-items:center;gap:10px;margin-left:0}
  .landing-root .tcard-col{flex:none;width:100%;gap:10px;transform:none!important;will-change:auto!important}
  .landing-root .tcard{flex-direction:row;min-height:auto;gap:8px;padding:8px;align-items:stretch}
  .landing-root .tcard-inner{padding:10px 12px;gap:6px;border-radius:4px}
  .landing-root .tcard-person{flex-direction:column;justify-content:center;padding:0 2px}
  .landing-root .tcard-quote{font-size:13px;line-height:1.4;flex:none}
  .landing-root .tcard-logo{width:36px;height:36px;border-radius:8px}
  .landing-root .tcard-rating{font-size:12px}
  .landing-root .tcard-person{flex-direction:column;justify-content:center;align-items:center;padding:12px 10px;min-width:82px;flex-shrink:0;gap:5px;border-left:1px solid rgba(242,237,194,.15);background:#2a5530}
  .landing-root .tcard-avatar{width:34px;height:34px}
  .landing-root .tcard-name{font-size:11px;text-align:center}
  .landing-root .tcard-company{font-size:10px;text-align:center;margin-top:1px}
  .landing-root .art-grid{gap:10px;margin-left:0}
  .landing-root .art-featured{display:flex;flex-direction:row;background:#fff;padding:3px}
  .landing-root .art-featured .art-img-wrap,.landing-root .art-card .art-img-wrap{width:110px;flex-shrink:0;height:90px;min-height:unset}
  .landing-root .art-row{display:flex;flex-direction:column;gap:10px;padding-top:10px}
  .landing-root .art-card{display:flex;flex-direction:row}
  .landing-root .art-content{padding:10px 12px;gap:5px}
  .landing-root .art-card .art-content{padding:10px 12px}
  .landing-root .art-title{font-size:13px;line-height:1.3}
  .landing-root .art-desc{display:none}
  .landing-root .art-tags{padding-top:6px;gap:4px;margin-top:0}
  .landing-root .art-tag{font-size:11px;padding:3px 8px}
}
`;
