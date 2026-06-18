/**
 * @file LandingPage.tsx
 * @description Public landing page tại "/" — port từ brandigo_international_mobile.html.
 *   Brand "Con Đường Hữu Cơ" (CDHC). User click CTA → /login.
 *   User đã login vẫn thấy landing (không gate auth, không auto-redirect).
 * @why CSS scope qua .landing-root wrapper để không leak sang các route khác khi unmount.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { ArticlesSection } from "../components/ArticlesSection";
import { PricingSection } from "../components/PricingSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { SideWord } from "../components/SideWord";
import { LANDING_CSS, LANDING_FONTS_HREF } from "../styles";
import { MOCK_ARTICLES } from "../data/articles";

const NEWS_ITEMS = MOCK_ARTICLES.slice(0, 6);

/* 3 slide — mỗi slide có ảnh + tập text riêng (kicker, num, headline A/B, blurb).
   Click thumb sẽ swap đồng bộ hero-bg + text + counter. */
const HERO_IMAGES = [
	{
		thumb: "/landing/hero-1.jpg",
		full: "/landing/hero-1.jpg",
		alt: "ceremony",
		kicker: "[Đạt Giải Thưởng]",
		num: "[01]",
		headlineA: "Cộng Đồng Bứt Phá",
		headlineB: "Cùng Con Đường Hữu Cơ",
		blurb:
			"Ở Con Đường Hữu Cơ, chúng tôi không chạy campaign cho có — chúng tôi tạo ra kết quả. Đồng hành với những thương hiệu dám nghĩ lớn và không chơi an toàn.",
	},
	{
		thumb: "/landing/hero-2.jpg",
		full: "/landing/hero-2.jpg",
		alt: "partnership",
		kicker: "[Tăng Trưởng Bền Vững]",
		num: "[02]",
		headlineA: "Lớn Lên Tự Nhiên.",
		headlineB: "Bứt Phá Thật Sự.",
		blurb:
			"Con Đường Hữu Cơ tin vào tăng trưởng từ gốc — không chiêu trò, không thổi phồng. Chúng tôi nuôi dưỡng thương hiệu của bạn để phát triển bền vững và chạm đúng người cần chạm.",
	},
	{
		thumb: "/landing/hero-3.jpg",
		full: "/landing/hero-3.jpg",
		alt: "handshake",
		kicker: "[Đối Tác Chiến Lược]",
		num: "[03]",
		headlineA: "Bắt Đầu Từ Con Đường Hữu Cơ",
		headlineB: "",
		blurb:
			"Chúng tôi không bán dịch vụ — chúng tôi xây dựng vị thế. Con Đường Hữu Cơ chọn lọc đồng hành cùng những thương hiệu sẵn sàng dẫn đầu, không chạy theo.",
	},
];


const PROCESS = [
	{
		num: "01",
		img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=70",
		kicker: "Supply Side",
		title: "Nguồn Cung — Nhà sản xuất hữu cơ đạt chuẩn",
		desc: "Doanh nghiệp sản xuất, hợp tác xã, hộ nông dân đạt chuẩn được kết nối, được chia sẻ tài nguyên khoa học, được hưởng quy trình kiểm định và bảo chứng pháp lý đầy đủ.",
	},
	{
		num: "02",
		img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=400&q=70",
		kicker: "Infrastructure",
		title: "Hạ Tầng — Nền tảng công nghệ tự phát triển",
		desc: "Hệ thống định danh người dùng, ví số đa lớp, giới thiệu hai chiều, chống gian lận (5 quy tắc anomaly detection real-time), thanh toán phân tách 3 bên, escrow bảo vệ T+14.",
	},
	{
		num: "03",
		img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=70",
		kicker: "Demand Side",
		title: "Cộng Đồng — Người tiêu dùng có ý thức & cấu trúc",
		desc: "Không phải khách hàng đơn lẻ — họ là stakeholder có ví, có lịch sử giao dịch, được giáo dục, được thưởng khi giới thiệu, được hoàn tiền minh bạch và trao quyền giám sát chất lượng.",
	},
];

export default function LandingPage() {
	const navigate = useNavigate();
	const rootRef = useRef<HTMLDivElement>(null);
	const heroRef = useRef<HTMLElement>(null);
	const heroParallaxRef = useRef<HTMLDivElement>(null);
	const serviceGridRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const marqueeXRef = useRef(0);
	const lastScrollYRef = useRef(0);
	const marqueeDirectionRef = useRef<1 | -1>(-1); // -1 = trái, 1 = phải
	const ctaSectionRef = useRef<HTMLElement>(null);
	const ctaBgRef = useRef<HTMLImageElement>(null);
	const footerRef = useRef<HTMLElement>(null);
	const ctaExtenderRef = useRef<HTMLDivElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [progress, setProgress] = useState(0);
	const [, setStats] = useState({ s1: 0, s2: 0, s3: 0, s4: 0 });
	const [bgIdx, setBgIdx] = useState(0);
	const [nextBgIdx, setNextBgIdx] = useState<number | null>(null);
	const [direction, setDirection] = useState<"up" | "down">("up");
	const [animKey, setAnimKey] = useState(0);

	/* Click bất kỳ lúc nào. Mid-anim click → SNAP current animation tới đích đang chạy (bgIdx
	   = nextBgIdx) rồi remount qua animKey++ → animation MỚI chạy fresh từ frame 0, không flash
	   content. Hướng slide: idx cao hơn = up, idx thấp hơn = down. forceDir cho auto-advance
	   (wrap 2→0 luôn giữ direction='up' để feel continuous carousel). */
	const swapBg = (i: number, forceDir?: "up" | "down") => {
		if (i === bgIdx && nextBgIdx === null) return;
		if (i === nextBgIdx) return;

		const currentVisible = nextBgIdx ?? bgIdx;
		const dir: "up" | "down" = forceDir ?? (i > currentVisible ? "up" : "down");

		if (introActive) setIntroActive(false); // kill intro nếu đang chạy
		if (nextBgIdx !== null) setBgIdx(nextBgIdx); // snap to in-progress final
		setDirection(dir);
		setNextBgIdx(i);
		setAnimKey((k) => k + 1);
	};

	const onBgAnimEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
		if (e.target !== e.currentTarget) return; // chỉ handle event từ container, không từ img
		if (nextBgIdx !== null) {
			setBgIdx(nextBgIdx);
			setNextBgIdx(null);
		}
	};

	const current = HERO_IMAGES[bgIdx];
	const next = nextBgIdx !== null ? HERO_IMAGES[nextBgIdx] : null;


	/* heroLoaded gate cho cascade transitions (kicker/hero-left/thumbs/blurb/cta).
	   introActive gate cho hero-bg multi-keyframe animation (zoom-tilt-back). Tắt sau 3.5s
	   HOẶC khi user click thumb (kill intro early để không lặp lại trên remount). */
	const [heroLoaded, setHeroLoaded] = useState(false);
	const [introActive, setIntroActive] = useState(true);

	// Chặn horizontal scroll + touch-drag rubber-band trên landing.
	// overflow-x:hidden trên html/body → clamp viewport scroll. overscrollBehaviorX:none →
	// tắt elastic/rubber-band horizontal drag trên Chrome mobile + DevTools emulation.
	// Set cả html lẫn body vì Chrome cần cả 2 để chặn hoàn toàn.
	// KHÔNG set trên landing-root (hidden → overflow-y:auto → scroll container → phá sticky hero).
	useEffect(() => {
		const html = document.documentElement;
		const body = document.body;
		const ph = html.style.overflowX;
		const pb = body.style.overflowX;
		const pho = html.style.overscrollBehaviorX;
		const pbo = body.style.overscrollBehaviorX;
		html.style.overflowX = 'hidden';
		body.style.overflowX = 'hidden';
		html.style.overscrollBehaviorX = 'none';
		body.style.overscrollBehaviorX = 'none';
		return () => {
			html.style.overflowX = ph;
			body.style.overflowX = pb;
			html.style.overscrollBehaviorX = pho;
			body.style.overscrollBehaviorX = pbo;
		};
	}, []);

	useEffect(() => {
		const id = requestAnimationFrame(() => setHeroLoaded(true));
		const t = window.setTimeout(() => setIntroActive(false), 3500);
		return () => {
			cancelAnimationFrame(id);
			window.clearTimeout(t);
		};
	}, []);

	const goLogin = () => navigate("/login");
	const [showPhone, setShowPhone] = useState(false);
	const [spStat, setSpStat] = useState(0);

	/* Auto-advance carousel 5s/slot. Effect deps [bgIdx, nextBgIdx] → mỗi state change (click
	   tay hoặc auto fire) sẽ reset timer → khoảng cách giữa 2 lần đổi luôn đủ 5s. Wrap 2→0
	   force direction='up' để cảm giác carousel chạy liên tục cùng chiều. */
	useEffect(() => {
		if (introActive) return; // đợi intro xong rồi mới auto-rotate
		const id = window.setInterval(() => {
			const visible = nextBgIdx ?? bgIdx;
			const nextI = (visible + 1) % HERO_IMAGES.length;
			swapBg(nextI, "up");
		}, 3000);
		return () => window.clearInterval(id);
		// biome-ignore lint/correctness/useExhaustiveDependencies: swapBg là closure, đã capture bgIdx + nextBgIdx.
	}, [bgIdx, nextBgIdx, introActive]);

	// Inject Google Fonts (Inter + Libre Baskerville) — remove on unmount.
	useEffect(() => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = LANDING_FONTS_HREF;
		document.head.appendChild(link);
		return () => {
			link.remove();
		};
	}, []);


	// Scroll: RAF-throttled để sync với rendering cycle — tránh jank khi set DOM + state cùng lúc.
	useEffect(() => {
		let rafId: number | null = null;

		const update = () => {
			rafId = null;
			const y = window.scrollY;

			const h = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(h > 0 ? (y / h) * 100 : 0);

			// Parallax image: zoom + tilt theo scroll (hero sticky nên đứng yên, CSS compositor thread).
			const ratio = Math.min(1, y / window.innerHeight);
			if (heroParallaxRef.current) {
				heroParallaxRef.current.style.transform =
					`scale(${1 + ratio * 0.2}) rotate(${-ratio * 8}deg)`;
			}

			// News middle column parallax: cột giữa bắt đầu cao hơn, trượt xuống theo scroll.
			if (serviceGridRef.current) {
				const rect = serviceGridRef.current.getBoundingClientRect();
				const vh = window.innerHeight;
				// progress 0 khi section vừa vào viewport, 1 khi section top chạm giữa viewport
				const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)));
				const offset = -80 * (1 - progress); // -80px → 0px
						const midCards = serviceGridRef.current.querySelectorAll<HTMLElement>('.news-card:nth-child(3n+2)');
						if (window.innerWidth > 768) midCards.forEach(card => { card.style.transform = `translateY(${offset}px)`; });
						else midCards.forEach(card => { card.style.transform = ''; });
					}

			// Marquee: scroll xuống → chạy trái, scroll lên → chạy phải.
			const delta = y - lastScrollYRef.current;
			if (delta > 0) marqueeDirectionRef.current = -1;
			else if (delta < 0) marqueeDirectionRef.current = 1;
			lastScrollYRef.current = y;
		};

		const onScroll = () => {
			if (rafId !== null) return; // đã queue rồi, bỏ qua event thừa
			rafId = requestAnimationFrame(update);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		lastScrollYRef.current = window.scrollY;
		update(); // chạy ngay lần đầu
		return () => {
			window.removeEventListener("scroll", onScroll);
			if (rafId !== null) cancelAnimationFrame(rafId);
		};
	}, []);

	// Marquee auto-run: 0.8px/frame (~48px/s) + scroll delta từ scroll handler.
	useEffect(() => {
		let rafId: number;
		const tick = () => {
			if (trackRef.current) {
				marqueeXRef.current += marqueeDirectionRef.current * 0.8;
				const halfW = trackRef.current.scrollWidth / 2;
				if (marqueeXRef.current < -halfW) marqueeXRef.current += halfW;
				if (marqueeXRef.current > 0) marqueeXRef.current -= halfW;
				trackRef.current.style.transform = `translateX(${marqueeXRef.current}px)`;
			}
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, []);

	// IntersectionObserver — reveal animation cho mọi .reveal element + word-by-word quote.
	useEffect(() => {
		if (!rootRef.current) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						if (e.target.classList.contains("quote-headline")) {
							e.target.classList.add("words-in");
						} else {
							e.target.classList.add("in");
						}
						io.unobserve(e.target);
					}
				}
			},
			{ threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
		);
		for (const el of rootRef.current.querySelectorAll(".reveal")) io.observe(el);
		for (const el of rootRef.current.querySelectorAll(".quote-headline")) io.observe(el);
		return () => io.disconnect();
	}, []);

	// Counter 90% cho social-proof tile khi scroll vào view.
	useEffect(() => {
		if (!rootRef.current) return;
		const tile = rootRef.current.querySelector('.social-proof-tile');
		if (!tile) return;
		let timer: ReturnType<typeof setInterval> | null = null;
		const io = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				let c = 0;
				timer = setInterval(() => {
					c += 1;
					if (c >= 90) { c = 90; clearInterval(timer!); timer = null; }
					setSpStat(c);
				}, 22);
				io.disconnect();
			},
			{ threshold: 0.3 },
		);
		io.observe(tile);
		return () => { io.disconnect(); if (timer) clearInterval(timer); };
	}, []);

	// Counter animation cho stats khi scroll vào view.
	useEffect(() => {
		if (!rootRef.current) return;
		const target = rootRef.current.querySelector(".stats");
		if (!target) return;
		const TARGETS = { s1: 20, s2: 10, s3: 90, s4: 95 } as const;
		// CAUTION: interval tạo trong IO callback phải clear khi unmount — nếu user
		// rời trang giữa lúc đếm (~1s), setStats sẽ chạy trên component đã unmount.
		const timers: ReturnType<typeof setInterval>[] = [];
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (!e.isIntersecting) continue;
					(Object.keys(TARGETS) as Array<keyof typeof TARGETS>).forEach((k) => {
						const final = TARGETS[k];
						const step = Math.max(1, Math.ceil(final / 42));
						let c = 0;
						const t = setInterval(() => {
							c += step;
							if (c >= final) {
								c = final;
								clearInterval(t);
							}
							setStats((prev) => ({ ...prev, [k]: c }));
						}, 24);
						timers.push(t);
					});
					io.unobserve(e.target);
				}
			},
			{ threshold: 0.3 },
		);
		io.observe(target);
		return () => {
			for (const t of timers) clearInterval(t);
			io.disconnect();
		};
	}, []);

	// Process cards — bidirectional: thêm .in khi scroll xuống, xóa khi scroll lên.
	useEffect(() => {
		if (!rootRef.current) return;
		const cards = rootRef.current.querySelectorAll('.process-card');
		if (!cards.length) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) e.target.classList.add('in');
					else e.target.classList.remove('in');
				}
			},
			{ threshold: 0, rootMargin: '0px 0px -50% 0px' },
		);
		for (const card of cards) io.observe(card);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		let curScale = 1;
		let tgtScale = 1;
		let rafId = 0;
		const onScroll = () => {
			const sec = ctaSectionRef.current;
			if (!sec) return;
			const rect = sec.getBoundingClientRect();
			const vh = window.innerHeight;
			if (rect.bottom < 0 || rect.top > vh) return;
			const raw = (vh - rect.top) / (vh + rect.height);
			tgtScale = 1 + Math.min(Math.max(0, raw), 1) * 0.8;
		};
		const tick = () => {
			curScale += (tgtScale - curScale) * 0.06;
			if (ctaBgRef.current) ctaBgRef.current.style.transform = `scale(${curScale.toFixed(4)})`;
			rafId = requestAnimationFrame(tick);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		rafId = requestAnimationFrame(tick);
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(rafId);
		};
	}, []);

	// Curtain reveal: CTA (z-4) là rèm che footer (z-3). CTA scroll lên → lộ footer đứng yên phía sau.
	// Footer snap về vị trí fixed ngay khi CTA vào viewport (CTA đang che khuất nên không thấy jump).
	useEffect(() => {
		const footer = footerRef.current;
		const extender = ctaExtenderRef.current;
		if (!footer || !extender) return;
		let fh = 0;

		const init = () => {
			fh = footer.offsetHeight;
			extender.style.height = `${fh}px`;
			footer.style.transform = `translateY(${fh}px)`;
		};

		const onScroll = () => {
			if (!fh) return;
			const rect = extender.getBoundingClientRect();
			// Khi extender (= top của CTA bottom) vào viewport: CTA đang che footer → snap footer về vị trí.
			// Khi extender còn dưới viewport: footer ẩn bên dưới để không lộ ở các section trước.
			footer.style.transform = rect.top < window.innerHeight ? '' : `translateY(${fh}px)`;
		};

		const onResize = () => { fh = footer.offsetHeight; extender.style.height = `${fh}px`; onScroll(); };

		requestAnimationFrame(() => { init(); onScroll(); });
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
			footer.style.transform = '';
			extender.style.height = '0';
		};
	}, []);

	return (
		<>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: CSS string from source-controlled module */}
			<style dangerouslySetInnerHTML={{ __html: LANDING_CSS }} />
			<div ref={rootRef} className="landing-root">
				<div className="progress" style={{ width: `${progress}%` }} />
				<div className="noise" />

				{/* ── NAV + MENU — portal ra document.body để tránh phone-frame tạo containing block
				    cho position:fixed (App.tsx bọc router trong max-w-[430px] div).
				    Wrapper giữ className="landing-root" để CSS selector .landing-root .nav vẫn match,
				    inline style neutralize landing-root positioning (position:fixed nav không cần). ── */}
				{createPortal(
					<>
						<nav className="lp-nav">
							<div className="lp-nav-inner">
								<a href="#top" className="lp-logo">
									Con Đường Hữu Cơ<span className="lp-dot">.</span>
								</a>
								<button
									type="button"
									className={`lp-hamb${menuOpen ? " active" : ""}`}
									onClick={() => setMenuOpen((o) => !o)}
									aria-label={menuOpen ? "Close menu" : "Open menu"}
									aria-expanded={menuOpen}
								/>
							</div>
						</nav>
						<div
							className={`lp-menu${menuOpen ? " open" : ""}`}
							aria-hidden={!menuOpen}
							onClick={() => setMenuOpen(false)}
						>
							<div>
								<a href="#services" onClick={() => setMenuOpen(false)}>/ Services</a>
								<a href="#about" onClick={() => setMenuOpen(false)}>/ About</a>
								<a href="#projects" onClick={() => setMenuOpen(false)}>/ Projects</a>
								<a href="#pricing" onClick={() => setMenuOpen(false)}>/ Pricing</a>
								<a href="#faq" onClick={() => setMenuOpen(false)}>/ FAQ</a>
							</div>
						</div>
					</>,
					document.body
				)}

				{/* ── HERO ─────────────────────────────────────────────────── */}
				<header ref={heroRef} className={`hero${heroLoaded ? " is-loaded" : ""}`} id="top">
					{/* hero-parallax: scroll-driven zoom+tilt wrapper — independent từ slide animation. */}
					<div ref={heroParallaxRef} className="hero-parallax">
						{/* Slide-stack: animKey forces remount mỗi click → animation chạy fresh, không flash.
						    data-dir điều khiển hướng (up: ảnh mới ngồi top:100% trượt lên; down: top:-100% trượt xuống). */}
						<div
							key={animKey}
							className={`hero-bg-stack${nextBgIdx !== null ? " is-animating" : ""}`}
							data-dir={direction}
							onAnimationEnd={onBgAnimEnd}
						>
							<img
								className={`hero-bg${introActive ? " hero-bg--intro" : ""}`}
								src={HERO_IMAGES[bgIdx].full}
								alt={HERO_IMAGES[bgIdx].alt}
							/>
							{nextBgIdx !== null && (
								<img
									className="hero-bg"
									src={HERO_IMAGES[nextBgIdx].full}
									alt=""
									aria-hidden="true"
								/>
							)}
						</div>
					</div>
					<div className="gridlines" />
					{/* Kicker tách khỏi hero-content để pin top via position:absolute. */}
					<p className="kicker">
						<span key={animKey} className={`text-slot${next ? " is-animating" : ""}`} data-dir={direction}>
							<span className="text-slot-inner">{current.kicker}</span>
							{next && <span className="text-slot-inner">{next.kicker}</span>}
						</span>
					</p>
					<div className="hero-content">
						<div className="hero-left">
							<h1>
								<span key={animKey} className={`text-slot${next ? " is-animating" : ""}`} data-dir={direction}>
									<span className="text-slot-inner">
										{current.headlineA}
										{current.headlineB && (
											<>
												<br />
												<span className="arrow">→</span> {current.headlineB}
											</>
										)}
									</span>
									{next && (
										<span className="text-slot-inner">
											{next.headlineA}
											{next.headlineB && (
												<>
													<br />
													<span className="arrow">→</span> {next.headlineB}
												</>
											)}
										</span>
									)}
								</span>
							</h1>
						</div>
						<div className="hero-copy reveal delay-2">
							<div className="thumbs">
								{HERO_IMAGES.map((img, i) => {
									/* Khi đang animate: CHỈ ảnh đích (nextBgIdx) active.
									   Khi rảnh: ảnh đang chiếu (bgIdx) active. */
									const isActive = nextBgIdx !== null ? i === nextBgIdx : i === bgIdx;
									return (
									<button
										key={img.alt}
										type="button"
										className={isActive ? "active" : ""}
										onClick={() => swapBg(i)}
										aria-label={`Show ${img.alt} background`}
										aria-pressed={isActive}
									>
										<img src={img.thumb} alt={img.alt} />
									</button>
									);
								})}
							</div>
							<p>
								<span key={animKey} className={`text-slot${next ? " is-animating" : ""}`} data-dir={direction}>
									<span className="text-slot-inner">{current.blurb}</span>
									{next && <span className="text-slot-inner">{next.blurb}</span>}
								</span>
							</p>
						</div>
					</div>
					{/* Button góc phải-dưới hero — hiện sẵn (bỏ reveal), align với cột 9/10 như thumbs+text. */}
					<div className="hero-cta-corner">
						<button type="button" className="btn" onClick={goLogin}>
							<span className="icon" aria-hidden="true">
								<span className="text">Đăng ký thành viên</span>
								<span className="arrow">→</span>
							</span>
							<span className="label">Đăng ký thành viên</span>
						</button>
					</div>
					</header>

				{/* ── SERVICES ─────────────────────────────────────────────── */}
				<section className="section black" id="services">
					<div className="wrap">
						<div className="section-head">
							<div className="label-row reveal from-left">
								<span className="spark">✦✦✦✦✦✦</span>
							</div>
							<div className="services-headline">
								<p
									className="reveal fade-only"
									style={{
										margin: "0 0 18px",
										fontSize: 12,
										letterSpacing: "0.28em",
										textTransform: "uppercase",
										fontWeight: 700,
										color: "#cfcfcf",
									}}
								>
									Cập Nhật Mới Nhất
								</p>
								<h2 className="headline reveal reveal-tilt-right" style={{ margin: 0 }}>
									<span className="muted">Các tin tức</span>
									<br />
									nổi bật
								</h2>
								<div
									style={{
										marginTop: 28,
										display: "flex",
										flexDirection: "column",
										gap: 16,
										maxWidth: 640,
									}}
								>
									<p className="lead reveal reveal-tilt-left delay-1" style={{ margin: 0, maxWidth: "none" }}>
										Những cột mốc, sự kiện và câu chuyện đáng chú ý từ hành trình
										xây dựng hệ sinh thái nông sản hữu cơ cộng đồng — nơi mỗi
										tin tức là một bằng chứng cho sự lớn mạnh bền vững.
									</p>
									<p className="lead reveal reveal-tilt-left delay-2" style={{ margin: 0, maxWidth: "none" }}>
										Từ những giải thưởng uy tín, sự kiện kết nối cộng đồng, đến
										các bước tiến trong chính sách nông nghiệp hữu cơ Việt Nam —
										Con Đường Hữu Cơ luôn ở trung tâm của những chuyển động quan trọng nhất.
									</p>
								</div>
							</div>
						</div>
						<div className="grid-frame">
							<SideWord dark className="reveal">/ TIN TỨC NỔI BẬT</SideWord>
							<div className="news-grid" ref={serviceGridRef}>
								{NEWS_ITEMS.map((article, i) => (
									<article key={article.id} className={`news-card reveal${i % 3 === 1 ? " delay-1" : i % 3 === 2 ? " delay-2" : ""}`}>
										<div className="news-card-img">
											<img src={article.image} alt={article.title} loading="lazy" decoding="async" />
											<span className="news-card-cat">{article.category}</span>
										</div>
										<div className="news-card-body">
											<h3 className="news-card-title">{article.title}</h3>
											<p className="news-card-excerpt">{article.excerpt}</p>
											<div className="news-card-meta">
												<span>{article.author}</span>
												<span className="news-card-dot">·</span>
												<span>{article.date}</span>
												{article.readTime && <><span className="news-card-dot">·</span><span>{article.readTime}</span></>}
											</div>
										</div>
									</article>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* ── MARQUEE ──────────────────────────────────────────────── */}
				<div className="marquee">
					<div className="track" ref={trackRef}>
						{[0,1,2,3].flatMap(i => [
							<span key={`bs${i}`}>brand strategy</span>,<b key={`s1${i}`}>✦</b>,
							<span key={`cp${i}`}>creative performance</span>,<b key={`s2${i}`}>✦</b>,
							<span key={`gs${i}`}>growth systems</span>,<b key={`s3${i}`}>✦</b>,
						])}
					</div>
				</div>

				{/* ── ABOUT + STATS ────────────────────────────────────────── */}
				<section className="section white" id="about">
					<div className="wrap">
						<div className="grid-frame">
							<div className="section-head about-head">
								<div className="label-row about-label">
									<span className="spark">✦✦✦✦✦✦</span>
								</div>
								<div className="about-headline">
									<h2 className="about-main reveal">
										Điều gì khiến <span className="brand">Con Đường Hữu Cơ</span> khác biệt? Năm lợi thế
										không thể sao chép.
									</h2>
									<div className="about-proof-row">
										<p className="lead reveal reveal-tilt-top">
											Không phải công ty nông nghiệp "đang nghĩ đến chuyển đổi số". Không phải
											startup công nghệ "đang nghĩ đến nông sản". Chúng tôi vận hành cả ba — đồng
											thời — trong sáu năm.
										</p>
										<a className="proof-card reveal reveal-right" href="https://www.youtube.com/watch?v=fwOLZKyJ-Ik" target="_blank" rel="noopener">
											<div className="proof-thumb">
												<div style={{position:'absolute',inset:'4px'}}>
													<img
														decoding="async"
														loading="lazy"
														src="/landing/proof-msci.jpg"
														alt="Đội ngũ Con Đường Hữu Cơ trước màn hình demo M-SCI"
														style={{display:'block',width:'100%',height:'100%',objectPosition:'center top',objectFit:'cover'}}
													/>
												</div>
												<span className="proof-play" aria-hidden="true">
													<svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="#111"/></svg>
												</span>
											</div>
											<p className="proof-quote">
												<strong style={{color:'rgb(153,153,153)',fontWeight:'inherit'}}>Vận hành thực —</strong>
												<br />
												<strong>không phải lý thuyết suông.</strong>
											</p>
										</a>
									</div>
								</div>
							</div>
							<div className="about-layout">
								<SideWord>/ TIN TỨC SỰ KIỆN</SideWord>
								<div className="mosaic">
									<div className="mosaic-flex-row" style={{display:'flex',gap:'18px',gridColumn:'span 2'}}>
									<div className="tile big dark-grad reveal" style={{flex:1}}>
										<div style={{position:'absolute',borderRadius:'inherit',inset:0}}>
											<img
												decoding="auto"
												loading="lazy"
												src="/landing/about-team.jpg"
												alt="Đội ngũ Con Đường Hữu Cơ làm việc cùng nông dân trên đồng"
												style={{display:'block',width:'100%',height:'100%',borderRadius:'inherit',objectPosition:'center center',objectFit:'cover'}}
											/>
									</div>
										<h3 style={{ position: "absolute", left: 24, bottom: 24, color: "#fff" }}>
											Tích hợp ba trụ cột
											<br />
											— một cách thật sự.
										</h3>
									</div>
									<div className="tile campaign-tile reveal delay-1" style={{flex:1}}>
										<p className="campaign-title">Hậu thuẫn thể chế cấp quốc gia — VAPEC · QSAC · VCIDA.</p>
										<div className="share-card">
											<div className="share-back">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18" fill="rgb(102,102,102)"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"/></svg>
											</div>
											<div className="share-main">
												<div className="share-bar top" />
												<div className="share-row">
													<div className="share-bar" style={{width:"55%"}} />
													<div className="share-bar" style={{width:"35%"}} />
												</div>
												<div className="share-row">
													<div className="share-bar" style={{width:"65%"}} />
													<div className="share-bar" style={{width:"25%"}} />
												</div>
											</div>
										</div>
										<div className="share-frame">
											<div className="share-icons">
												<div className="share-icon lg">
													<div style={{position:"absolute",borderRadius:"inherit",inset:0}}>
														<img decoding="auto" loading="lazy" width={144} height={144} src="https://framerusercontent.com/images/n7MUp4OZdpiHn7QxG9Gc9Hv5XQ.png?width=144&height=144" alt="" style={{display:"block",width:"100%",height:"100%",borderRadius:"inherit",objectFit:"cover"}} />
													</div>
												</div>
												<div className="share-icon lg">
													<div style={{position:"absolute",borderRadius:"inherit",inset:0}}>
														<img decoding="auto" loading="lazy" width={48} height={48} src="https://framerusercontent.com/images/LX3wciAAXiAucmK1oc8jAYRQpo.png?width=48&height=48" alt="" style={{display:"block",width:"100%",height:"100%",borderRadius:"inherit",objectFit:"cover"}} />
													</div>
												</div>
												<div className="share-icon lg">
													<div style={{position:"absolute",borderRadius:"inherit",inset:0}}>
														<img decoding="auto" loading="lazy" width={144} height={144} src="https://framerusercontent.com/images/CTScQdvemFremhWLjksqe8ScgM.png?width=144&height=144" alt="" style={{display:"block",width:"100%",height:"100%",borderRadius:"inherit",objectFit:"cover"}} />
													</div>
												</div>
											</div>
											<div className="share-btn">Share</div>
										</div>
									</div>
									</div>
									<div style={{display:'flex',flexDirection:'column',gap:'18px',gridRow:'span 2'}}>
									<div className="tile trusted-tile reveal delay-2">
										<div className="logo-orbit">
											<span className="badge-logo">G</span>
											<span className="badge-logo">S</span>
											<span className="badge-logo">A</span>
											<span className="badge-logo">M</span>
											<span className="badge-logo">F</span>
											<span className="badge-logo">T</span>
											<span className="badge-logo">P</span>
											<span className="badge-logo">I</span>
											<span className="badge-logo">R</span>
											<span className="badge-logo">D</span>
											<span className="badge-logo">E</span>
											<span className="badge-logo">B</span>
										</div>
										<div className="trusted" style={{marginTop:'54px'}}>
											<div>
												<div style={{ fontSize: 28, color: "var(--pink)" }}>★</div>
												<h3>
													MSCILabs — Năng lực
													<br />
													kiểm chứng quốc tế
												</h3>
												<p>
													Blockchain, AI, Game đã có<br />khách hàng quốc tế thật sự.
												</p>
											</div>
										</div>
									</div>
									<div className="tile growth-chart-tile reveal delay-2" style={{flex:1}}>
										<div className="growth-checks">
											<span>✓ Ví số</span>
											<span>✓ Lịch sử GD</span>
											<span>✓ Thưởng &amp; giám sát</span>
										</div>
										<div className="growth-bars">
											{[18,26,34,44,56,68,82,96,112,130].map((h,i)=>(
												<div key={i} className="growth-bar" style={{height:`${h}px`}} />
											))}
										</div>
										<div className="growth-bottom">
											<div className="growth-icon">
												<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
													<polyline points="3 17 9 11 13 15 21 7"/>
													<polyline points="16 7 21 7 21 12"/>
												</svg>
											</div>
											<p className="growth-desc"><strong>Cộng đồng có cấu trúc — 20.000<br/>thành viên là stakeholder, không phải lead.</strong></p>
										</div>
									</div>
									</div>
									<div className="tile content-wrap-tile reveal delay-2" style={{gridColumn:'span 2'}}>
										<p className="content-wrap-text">Game nông trại hữu cơ<br />— gần gũi người dùng.</p>
										<div className="content-wrap-stats">
											<div className="content-wrap-item">Sáu năm thực chiến</div>
											<div className="content-wrap-item">Một lý luận nền</div>
										</div>
										<div className="gallery-phone">
											<div className="gallery-phone-bg">
												{/* slideshow behind phone frame */}
												<div className="gallery-slide-wrap">
													<div className="gallery-slide-track">
														{['/home.png','/battle_world_boss.jpg','/achievements.jpg','/shop_OGNmarket_seeds.jpg','/lobby_world_boss.jpg','/lobby_solo_bot.jpg','/invite_friends.jpg'].map((src)=>(
															<div key={src} className="gallery-slide-slot">
																<img src={src} alt="" loading="lazy" decoding="async" className="gallery-slide-img" style={{position:'absolute',left:'0',top:'0',width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center'}} />
															</div>
														))}
													</div>
												</div>
												{/* phone frame on top */}
												<div style={{position:'absolute',borderRadius:'inherit',inset:0,zIndex:1}}>
													<img decoding="auto" loading="lazy" width={981} height={1177}
														srcSet="https://framerusercontent.com/images/QinovNHSqCqdWH7Ndv74dPB3Xg.png?scale-down-to=1024&width=981&height=1177 853w,https://framerusercontent.com/images/QinovNHSqCqdWH7Ndv74dPB3Xg.png?width=981&height=1177 981w"
														src="https://framerusercontent.com/images/QinovNHSqCqdWH7Ndv74dPB3Xg.png?width=981&height=1177"
														style={{display:'block',width:'100%',height:'100%',objectFit:'cover',objectPosition:'center center',borderRadius:'inherit'}} alt="" />
												</div>
											</div>
										</div>
									</div>
									{/* Row 3 Col 1+2: Social proof */}
									<div className="tile social-proof-tile reveal" style={{gridColumn:'span 2',position:'relative'}}>
										{/* CSS perspective grid */}
										<div style={{position:'absolute',inset:0,overflow:'hidden',zIndex:0,borderRadius:'inherit'}}>
											<div style={{position:'absolute',inset:'-80%',backgroundImage:'repeating-linear-gradient(0deg,rgba(0,0,0,.08) 0,rgba(0,0,0,.08) 1px,transparent 1px,transparent 38px),repeating-linear-gradient(90deg,rgba(0,0,0,.08) 0,rgba(0,0,0,.08) 1px,transparent 1px,transparent 38px)',transform:'perspective(280px) rotateX(28deg) rotateY(-8deg)',transformOrigin:'center center'}} />
											<div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#f5f5f3 0%,#f5f5f3 15%,rgba(245,245,243,.5) 45%,transparent 70%)'}} />
											<div style={{position:'absolute',inset:0,background:'linear-gradient(to left,#f5f5f3 0%,rgba(245,245,243,.7) 25%,transparent 55%)'}} />
										</div>
										<div className="sp-top" style={{position:'relative',zIndex:1}}>
											<div style={{display:'flex',alignItems:'center'}}>
												{['https://i.pravatar.cc/72?img=11','https://i.pravatar.cc/72?img=22','https://i.pravatar.cc/72?img=33','https://i.pravatar.cc/72?img=44'].map((src,i)=>(
													<div key={i} style={{width:56,height:56,borderRadius:'50%',backgroundImage:`url(${src})`,backgroundSize:'cover',backgroundPosition:'center',border:'2px solid #f5f5f3',marginLeft:i===0?0:-16,flexShrink:0,position:'relative',zIndex:4-i}} />
												))}
												<div style={{width:56,height:56,borderRadius:'50%',background:'#15803d',border:'2px solid #f5f5f3',marginLeft:-16,flexShrink:0,position:'relative',zIndex:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,color:'#fff',letterSpacing:'-0.5px'}}>+99</div>
											</div>
											<p className="sp-label">Thành viên thật — không phải lead</p>
										</div>
										<div className="sp-bottom" style={{position:'relative',zIndex:1}}>
											<span className="sp-stat">{spStat}%</span>
											<p className="sp-desc">thành viên có ví, có lịch sử giao dịch,<br/>có hệ thống thưởng và giám sát chất lượng.</p>
										</div>
									</div>
									{/* Row 3 Col 3: Guaranteed Growth + Customer Support */}
									<div className="mosaic-flex-row" style={{display:'flex',gap:'18px'}}>
										<div className="tile reveal delay-1" style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'24px',background:'#f0f0ee',minHeight:'180px',position:'relative',overflow:'hidden'}}>
											{/* grid background */}
											<div className="gg-grid-blink" style={{position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(0deg,rgba(0,0,0,.07) 0,rgba(0,0,0,.07) 1px,transparent 1px,transparent 36px),repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0,rgba(0,0,0,.07) 1px,transparent 1px,transparent 36px)',zIndex:0}} />
											<div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,transparent 25%,#f0f0ee 75%)',zIndex:0}} />
											<p style={{fontSize:16,fontWeight:700,color:'#111',margin:0,position:'relative',zIndex:1,textAlign:'center'}}>Tăng trưởng có cơ sở</p>
											<div style={{display:'flex',justifyContent:'center',padding:'16px 0',position:'relative',zIndex:1}}>
												<div className="gg-icon-pulse" style={{width:54,height:54,borderRadius:14,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 20px rgba(0,0,0,.12)'}}>
													<svg viewBox="0 0 24 24" width="22" height="22" fill="none"><rect x="1" y="15" width="5" height="8" rx="1.2" fill="#1a1a1a"/><rect x="8" y="10" width="5" height="13" rx="1.2" fill="#1a1a1a"/><rect x="15" y="14" width="5" height="9" rx="1.2" fill="#1a1a1a"/><polyline points="2 13 9 7 16 11 23 3" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="19 3 23 3 23 7" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
												</div>
											</div>
											<p style={{fontSize:13,color:'#888',margin:0,textAlign:'center',position:'relative',zIndex:1}}>có lý luận làm nền.</p>
										</div>
										<div className="tile dark-grad reveal delay-2" style={{flex:1,position:'relative',overflow:'hidden',minHeight:'180px'}}>
											<div style={{position:'absolute',inset:0,zIndex:0}}>
												<img src="/landing/policy-team.jpg" alt="Đội ngũ Con Đường Hữu Cơ tại sự kiện Avalanche" loading="lazy" decoding="async" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}} />
											</div>
											<div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(0,0,0,.7) 0%,rgba(0,0,0,.3) 100%)',zIndex:1}} />
											<div style={{position:'absolute',inset:0,zIndex:2,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'24px'}}>
												<h3 style={{color:'#fff',fontSize:18,fontWeight:800,lineHeight:1.3,margin:0,alignSelf:'flex-start',textAlign:'left'}}>Tiếp cận chính sách,<br/>chỉ cách một cú gọi</h3>
													<div style={{display:'flex',flexDirection:'column',gap:12}}>
														<div style={{display:'inline-flex',alignItems:'center',gap:6}}>
															<span className="dot-blink" style={{width:8,height:8,borderRadius:'50%',background:'#34c759',display:'inline-block',flexShrink:0}}/>
															<span style={{color:'#fff',fontSize:12,fontWeight:600}}>Online</span>
														</div>
														<div style={{display:'flex',alignItems:'center',position:'relative',overflow:'hidden',height:38}}>
															<div onMouseEnter={()=>setShowPhone(true)} onMouseLeave={()=>setShowPhone(false)} onTouchStart={()=>setShowPhone(true)} onTouchEnd={()=>setShowPhone(false)} style={{width:38,height:38,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,cursor:'pointer',zIndex:2,position:'relative'}}>
																<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
															</div>
															<div style={{position:'absolute',left:38,top:0,height:38,display:'flex',alignItems:'center',paddingLeft:12,paddingRight:16,background:'#fff',borderRadius:'0 10px 10px 0',whiteSpace:'nowrap',fontSize:13,fontWeight:600,color:'#111',transition:'width .35s cubic-bezier(.16,1,.3,1),opacity .25s',width:showPhone?'calc(100% - 38px)':'0',opacity:showPhone?1:0,overflow:'hidden'}}>
																0909 123 456
															</div>
															<svg style={{marginLeft:'auto',flexShrink:0,opacity:showPhone?0:1,transition:'opacity .2s',position:'relative',zIndex:1}} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
						</div>
				</div>
			</div>
				</section>

				{/* ── PROJECTS ─────────────────────────────────────────────── */}
				<section className="section white" id="projects">
					<div className="wrap">
						<div className="section-head">
							<div className="label-row">
								<span className="spark">✦✦✦✦✦✦</span>
							</div>
							<div>
								<h2 className="headline quote-headline" style={{ margin: 0, fontStyle: "italic" }}>
									<span className="muted">&ldquo;</span>
									{"Một con đường đi xa nhất là con đường có nhiều người cùng đi.".split(" ").map((word, i, arr) => (
										<span key={i} className="wbw" style={{"--wbw-i": i} as CSSProperties}>
											{word}{i < arr.length - 1 ? " " : ""}
										</span>
									))}
									<span className="muted">&rdquo;</span>
								</h2>
								<p
									className={"lead reveal fade-only delay-1"}
									style={{
										marginTop: 20,
										fontSize: 13,
										letterSpacing: "0.22em",
										textTransform: "uppercase",
										fontWeight: 700,
										color: "#8d8d8d",
									}}
								>
									— Con Đường Hữu Cơ
								</p>
							</div>
							</div>
						<div className="grid-frame">
						<SideWord>/ CỘNG ĐỒNG HÀNG CHẤT</SideWord>
						<div className="projects-list reveal" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:24,padding:'24px 0'}}>
							<div className="proj-stats reveal" style={{width:'min(100%, 960px)'}}>
								<div className="proj-stat">
									<span className="proj-stat-num">20.000+</span>
									<span className="proj-stat-label">thành viên</span>
								</div>
								<div className="proj-stat-divider" />
								<div className="proj-stat">
									<span className="proj-stat-num">6</span>
									<span className="proj-stat-label">năm đồng hành</span>
								</div>
								<div className="proj-stat-divider" />
								<div className="proj-stat">
									<span className="proj-stat-num">3</span>
									<span className="proj-stat-label">trụ cột cốt lõi</span>
								</div>
								<div className="proj-stat-divider" />
								<div className="proj-stat">
									<span className="proj-stat-num">1</span>
									<span className="proj-stat-label">hệ sinh thái</span>
								</div>
							</div>
							<div style={{position:'relative',width:'min(100%, 960px)',aspectRatio:'16/9',background:'#000',borderRadius:12,overflow:'hidden',boxShadow:'0 24px 90px rgba(0,0,0,.22)',border:'4px solid #346739'}}>
								<iframe
									src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F705829127375671&show_text=false&t=0"
									style={{position:'absolute',inset:0,width:'100%',height:'100%',border:0}}
									scrolling="no"
									allowFullScreen
									allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
									title="Con Đường Hữu Cơ — Featured Work"
								/>
							</div>
							<div className="proj-partners reveal" style={{width:'min(100%, 960px)'}}>
								<span className="proj-partners-label">Hậu thuẫn thể chế</span>
								<div className="proj-partners-list">
									<span>VAPEC</span>
									<span className="proj-partners-dot">·</span>
									<span>QSAC</span>
									<span className="proj-partners-dot">·</span>
									<span>VCIDA</span>
								</div>
							</div>
						</div>
						</div>
					</div>
				</section>

				{/* ── PROCESS ──────────────────────────────────────────────── */}
				<section className="section black" id="process">
					<div className="wrap">
						<div className="section-head">
							<div className="label-row">
								<span className="spark">✦✦✦✦✦✦</span>
							</div>
							<div>
								<p
										 className="reveal fade-only"
									style={{
										margin: "0 0 18px",
										fontSize: 12,
										letterSpacing: "0.28em",
										textTransform: "uppercase",
										fontWeight: 700,
										color: "#cfcfcf",
									}}
								>
									Hệ Sinh Thái Vận Hành
								</p>
								<h2 className="headline reveal reveal-tilt-right" style={{ margin: 0 }}>
									<span className="muted">Ba lớp</span>
									<br />
									khép kín nhưng mở rộng
								</h2>
								<p className="lead reveal reveal-tilt-left delay-1" style={{ marginTop: 24, maxWidth: 640 }}>
									Cơ chế Trạm Cộng Đồng là điểm giao của ba lớp — vừa là điểm bán, vừa là
									điểm trải nghiệm, vừa là điểm tổ chức cộng đồng địa phương. Đây là moat
									thực sự — vì để sao chép, đối thủ không chỉ cần vốn và công nghệ, mà cần
									thời gian và niềm tin.
								</p>
							</div>
						</div>
						<div className="grid-frame">
						<SideWord dark>/ HỆ SINH THÁI</SideWord>
						<div className="process-grid">
							{PROCESS.map((p, i) => (
								<div
									key={p.num}
									className={`process-card reveal${i === 1 ? " delay-1" : i === 2 ? " delay-2" : ""}`}
								>
									<div className="num">
										{p.num} <img src={p.img} alt={p.title} loading="lazy" decoding="async" />
									</div>
									<div>
										<p
											style={{
												margin: "0 0 8px",
												fontSize: 11,
												letterSpacing: "0.24em",
												textTransform: "uppercase",
												fontWeight: 700,
												color: "#79AE6F",
												opacity: 1,
											}}
										>
											{p.kicker}
										</p>
										<h3>{p.title}</h3>
										<p>{p.desc}</p>
									</div>
								</div>
							))}
						</div>
						</div>
					</div>
				</section>

				{/* ── PRICING / REVIEWS — stateful sub-components ─── */}
				<PricingSection onCta={goLogin} />
				<ReviewsSection onCta={goLogin} />
				<ArticlesSection />

				{/* ── CTA ──────────────────────────────────────────────────── */}
				<section className="cta" ref={ctaSectionRef}>
					<img ref={ctaBgRef} src="/landing/cta-award.jpg" alt="Lễ biểu dương Thương hiệu mạnh phát triển quốc gia" loading="lazy" decoding="async" style={{ willChange: "transform" }} />
					<div className="cta-content">
						<div className="cta-spark"><span className="spark">✦✦✦✦✦✦</span></div>
						<h2 style={{ textAlign: "center", width: "100%" }}>Cây lớn không vì ai tưới ép, mà vì rễ cắm đủ sâu. Thương hiệu cũng vậy.</h2>
						<p style={{ marginTop: 140, textAlign: "left", alignSelf: "flex-start" }}>
							Quảng cáo mua được sự chú ý. Chỉ có thời gian mới mua được niềm tin.<br />
							Thứ gì lớn nhanh nhờ tiền, sẽ tàn nhanh khi hết tiền. Thứ gì lớn lên tự nhiên, sẽ ở lại.<br />
							Con đường hữu cơ không phải con đường chậm — nó là con đường không cần phải đi lại từ đầu.<br />
							Bạn không xây khách hàng. Bạn gieo lý do để họ tự tìm đến.
						</p>
					</div>
				</section>

				{/* Extender: giữ scroll space cho curtain reveal. position:relative;z-index:2
				    để stacking cao hơn hero (sticky z-index:1) — chặn hero xuyên qua. */}
				<div ref={ctaExtenderRef} style={{ height: 0, background: '#16a34a', position: 'relative', zIndex: 2 }} aria-hidden="true" />

				{/* ── FOOTER ───────────────────────────────────────────────── */}
				<footer className="footer" ref={footerRef}>
					<img
						className="footer-img-l"
						src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=70"
						alt="agency discussion"
						loading="lazy"
						decoding="async"
					/>
					<img
						className="footer-img-r"
						src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=70"
						alt="team smile"
						loading="lazy"
						decoding="async"
					/>
					<div className="footer-inner">
						<nav className="footer-links">
							<a href="#top">/ Home</a>
							<a href="#about">/ About</a>
							<a href="#projects">/ Projects</a>
							<a href="#services">/ Services</a>
							<a href="#pricing">/ Pricing</a>
							<a href="#faq">/ Legal</a>
						</nav>
						<div className="footer-logo">
							Con Đường Hữu Cơ<span className="dot">.</span>
						</div>
						<div className="contact">
							<span>sales@cdhc.vn</span>
							<span>742 Evergreen Terrace</span>
							<span>(555) 123-4567</span>
						</div>
						<div className="copyright">
							<div>© 2026 Con Đường Hữu Cơ | All Right Reserved</div>
							<div>Proudly Built for International Demo</div>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}
