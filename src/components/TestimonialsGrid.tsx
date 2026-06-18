/**
 * @file TestimonialsGrid.tsx
 * @description 6 testimonial cards — 3-col layout, parallax scroll effect.
 */

import { useRef, useEffect } from "react";

const CARDS = [
	{
		logo: <svg viewBox="0 0 40 40" width="26" height="26" fill="none" aria-hidden="true"><path d="M4 20c0-2 1.5-3.5 3-3.5s3 3 3 3.5-1.5 3.5-3 3.5S4 22 4 20ZM15 12c0-2 1.5-3.5 3-3.5s3 7 3 8-1.5 3.5-3 3.5-3-6-3-8ZM26 16c0-2 1.5-3.5 3-3.5s3 5 3 5.5-1.5 3.5-3 3.5-3-3.5-3-3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
		quote: "Đặt hàng nhanh, giao đúng hẹn. Sản phẩm đúng như quảng cáo, không phóng đại.",
		name: "Anh Tuấn",
		company: "Hà Nội",
		avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=70",
	},
	{
		logo: <svg viewBox="0 0 40 40" width="26" height="26" fill="none" aria-hidden="true"><path d="M14 28l6-8 6 4 5-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12h6l-3-5-3 5Z" fill="currentColor"/></svg>,
		quote: "Lần thứ ba mua rồi, lần nào cũng yên tâm. Sẽ còn quay lại.",
		name: "Chị Hương",
		company: "TP.HCM",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=70",
	},
	{
		logo: <svg viewBox="0 0 40 40" width="26" height="26" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.6"/><circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
		quote: "Tư vấn nhiệt tình, không ép mua. Mình thích cách họ làm việc.",
		name: "Anh Minh",
		company: "Đà Nẵng",
		avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=70",
	},
	{
		logo: <svg viewBox="0 0 40 40" width="26" height="26" fill="none" aria-hidden="true"><path d="M10 30V14l8-6 8 6v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 30v-8h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
		quote: "Giá hợp lý, chất lượng tốt hơn mong đợi. Đã giới thiệu cho bạn bè.",
		name: "Chị Lan",
		company: "Hải Phòng",
		avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&q=70",
	},
	{
		logo: <svg viewBox="0 0 40 40" width="26" height="26" fill="none" aria-hidden="true"><path d="M8 28V16l6-6h12l6 6v12l-6 6H14l-6-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M16 22h8M20 18v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
		quote: "Có vấn đề là được hỗ trợ ngay. Dịch vụ chăm sóc khách hàng đáng khen.",
		name: "Anh Đức",
		company: "Cần Thơ",
		avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=70",
	},
	{
		logo: <svg viewBox="0 0 40 40" width="26" height="26" fill="none" aria-hidden="true"><path d="M20 8l10 18H10L20 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="20" cy="28" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
		quote: "Trải nghiệm mượt từ lúc xem đến lúc nhận hàng. Rất hài lòng.",
		name: "Chị Trang",
		company: "Hà Nội",
		avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=80&q=70",
	},
] as const;

function TCard({ logo, quote, name, company, avatar }: typeof CARDS[number]) {
	return (
		<div className="tcard">
			<div className="tcard-inner">
				<div className="tcard-top">
					<div className="tcard-logo">{logo}</div>
					<div className="tcard-rating">
						<span className="tcard-star">★</span> 5 Star Rating
					</div>
				</div>
				<p className="tcard-quote">"{quote}"</p>
			</div>
			<div className="tcard-person">
				<img src={avatar} alt={name} className="tcard-avatar" loading="lazy" decoding="async" />
				<div>
					<div className="tcard-name">{name}</div>
					<div className="tcard-company">{company}</div>
				</div>
			</div>
		</div>
	);
}

export function TestimonialsGrid() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const colLeftRef = useRef<HTMLDivElement>(null);
	const colMidRef = useRef<HTMLDivElement>(null);
	const colRightRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add("tcard-revealed");
					io.disconnect();
				}
			},
			{ threshold: 0.12 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		let curMid = 0, curSide = 0;
		let tgtMid = 0, tgtSide = 0;
		let rafId = 0;

		const onScroll = () => {
			const sec = sectionRef.current;
			if (!sec) return;
			const rect = sec.getBoundingClientRect();
			const vh = window.innerHeight;
			if (rect.bottom < 0 || rect.top > vh) return;
			const raw = vh / 2 - rect.top;
			const offset = Math.min(Math.max(0, raw), 220);
			tgtMid = offset * 0.14;
			tgtSide = -offset * 0.1;
		};

		const tick = () => {
			curMid += (tgtMid - curMid) * 0.08;
			curSide += (tgtSide - curSide) * 0.08;
			if (colMidRef.current) colMidRef.current.style.transform = `translateY(${curMid.toFixed(2)}px)`;
			if (colLeftRef.current) colLeftRef.current.style.transform = `translateY(${curSide.toFixed(2)}px)`;
			if (colRightRef.current) colRightRef.current.style.transform = `translateY(${curSide.toFixed(2)}px)`;
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

	return (
		<div className="tcard-section" ref={sectionRef}>
			<div className="tcard-grid">
				<div className="tcard-col" ref={colLeftRef} style={{ willChange: "transform" }}>
					<TCard {...CARDS[0]} />
					<TCard {...CARDS[3]} />
				</div>
				<div className="tcard-col tcard-col-mid" ref={colMidRef} style={{ willChange: "transform" }}>
					<TCard {...CARDS[1]} />
					<TCard {...CARDS[4]} />
				</div>
				<div className="tcard-col" ref={colRightRef} style={{ willChange: "transform" }}>
					<TCard {...CARDS[2]} />
					<TCard {...CARDS[5]} />
				</div>
			</div>
		</div>
	);
}
