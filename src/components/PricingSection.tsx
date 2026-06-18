/**
 * @file PricingSection.tsx
 * @description Pricing tabs — switch giữa Starter / Growth / Scale, render features.
 */

import { useState, useRef, useLayoutEffect, useEffect, useMemo, type ReactElement } from "react";
import { PRICING_PLANS, type PricingPlan } from "../data";
import { SideWord } from "./SideWord";

const FEAT_ICONS: Record<string, ReactElement> = {
	"Ad Strategy Setup": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17V7l8-4 8 4v10"/><path d="M11 3v14"/><path d="M7 8v2M15 8v2M7 13v2M15 13v2"/></svg>,
	"Platform Management": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><circle cx="11" cy="11" r="3"/><path d="M11 3v2M11 17v2M3 11h2M17 11h2"/></svg>,
	"Monthly Reporting": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a9 9 0 1 0 9 9H11V2Z"/><path d="M15 2a9 9 0 0 1 4 9"/></svg>,
	"2 Creative Variants/mo": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2c0 5-5 7-5 11a5 5 0 0 0 10 0c0-4-5-6-5-11Z"/><path d="M8 17a3 3 0 0 0 6 0"/></svg>,
	"Full Funnel Strategy": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h16l-6 8v6l-4-2v-4L3 4Z"/></svg>,
	"Multi-Platform Ads": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="18" height="13" rx="2"/><path d="M8 21h6M11 16v5"/></svg>,
	"Weekly Optimization": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l4-8 4 5 3-3 4 6"/></svg>,
	"8 Creative Variants/mo": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2c0 5-5 7-5 11a5 5 0 0 0 10 0c0-4-5-6-5-11Z"/><path d="M8 17a3 3 0 0 0 6 0"/></svg>,
	"Growth Pod": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 19c0-3 2.5-5 6-5s6 2 6 5M14 14c2 0 6 1 6 5"/></svg>,
	"Advanced Tracking": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="9"/><path d="M11 2v4M11 16v4M2 11h4M16 11h4"/><circle cx="11" cy="11" r="2"/></svg>,
	"Creative Engine": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6L4 8h6l2-6Z"/></svg>,
	"Executive Reporting": <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="16" height="16" rx="2"/><path d="M7 8h8M7 12h5M7 16h3"/></svg>,
};

const DEFAULT_ICON = <svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="9"/><path d="M11 7v4l3 3"/></svg>;

function PriceCard({ plan, onCta: _onCta }: { plan: (typeof PRICING_PLANS)[0]; onCta: () => void }) {
	const titleBody = plan.title.slice(0, -2);
	const titleSuffix = plan.title.slice(-2);

	const numericPrice = useMemo(() => {
		const n = parseInt(plan.price.replace(/[^0-9]/g, ""), 10);
		return isNaN(n) ? null : n;
	}, [plan.price]);

	const [displayValue, setDisplayValue] = useState(0);
	const priceRef = useRef<HTMLDivElement>(null);
	const frameRef = useRef<number>(0);

	useEffect(() => {
		if (numericPrice === null) return;
		setDisplayValue(0);
		const el = priceRef.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				io.disconnect();
				const duration = 1400;
				const startTime = performance.now();
				const tick = (now: number) => {
					const t = Math.min((now - startTime) / duration, 1);
					const eased = 1 - (1 - t) ** 3;
					setDisplayValue(Math.round((numericPrice ?? 0) * eased));
					if (t < 1) frameRef.current = requestAnimationFrame(tick);
				};
				frameRef.current = requestAnimationFrame(tick);
			},
			{ threshold: 0.5 },
		);
		io.observe(el);
		return () => { io.disconnect(); cancelAnimationFrame(frameRef.current); };
	}, [numericPrice, plan.id]);

	const priceDisplay = numericPrice !== null
		? `$${displayValue.toLocaleString("en-US")}`
		: plan.price;

	return (
		<div className="price-card">
			<div className="price-card-body">
				<div className="price-main">
					<h3 className="price-title">{titleBody}<span className="price-title-suffix">{titleSuffix}</span></h3>
					<div>
						<div ref={priceRef} className="price">{priceDisplay}</div>
						<small>trụ cột chiến lược</small>
					</div>
				</div>
				<div className="price-right">
					<div className="price-included-head">Cấu phần <span className="price-pink">cốt lõi</span> ↳</div>
					<div className="price-feat-grid">
						{plan.features.map(([title, desc]) => (
							<div key={title} className="feat">
								<span className="feat-icon">{FEAT_ICONS[title] ?? DEFAULT_ICON}</span>
								<strong>{title}</strong>
								<span>{desc}</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="price-footer">
				<span className="price-delivery">Phạm vi <strong>({plan.delivery})</strong></span>
			</div>
		</div>
	);
}

export function PricingSection({ onCta }: { onCta: () => void }) {
	const [renderIdx, setRenderIdx] = useState(0);
	const [exitIdx, setExitIdx] = useState<number | null>(null);
	const [dir, setDir] = useState<"up" | "down">("up");
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({ width: 0, transform: "translateX(0)" });

	const activeId = PRICING_PLANS[renderIdx].id as PricingPlan["id"];

	useLayoutEffect(() => {
		const btn = tabRefs.current[renderIdx];
		if (!btn) return;
		setSliderStyle({ width: btn.offsetWidth, transform: `translateX(${btn.offsetLeft - 5}px)` });
	}, [renderIdx]);

	useEffect(() => {
		if (exitIdx === null) return;
		const t = setTimeout(() => setExitIdx(null), 700);
		return () => clearTimeout(t);
	}, [exitIdx]);

	const handleTab = (id: PricingPlan["id"]) => {
		if (id === activeId || exitIdx !== null) return;
		const newIdx = PRICING_PLANS.findIndex((p) => p.id === id);
		setDir(newIdx > renderIdx ? "up" : "down");
		setExitIdx(renderIdx);
		setRenderIdx(newIdx);
	};

	const p = PRICING_PLANS[renderIdx];
	const pExit = exitIdx !== null ? PRICING_PLANS[exitIdx] : null;
	const isAnim = exitIdx !== null;
	const exitCls = dir === "up" ? " pc-exit-up" : " pc-exit-down";
	const enterCls = isAnim ? (dir === "up" ? " pc-enter-up" : " pc-enter-down") : "";

	return (
		<section className="section white" id="pricing">
			<div className="wrap">
				<div className="section-head">
					<div className="label-row"><span className="spark">✦✦✦✦✦✦</span></div>
					<div>
						<h2 className="headline reveal reveal-tilt-right">
							<span className="muted">Ba trụ cột</span> năng lực cốt lõi
						</h2>
						<p className="lead reveal reveal-tilt-left delay-1">
							Những gì chúng tôi đã xây trong sáu năm —<br />
							chuẩn bị cho hành trình kế tiếp.
						</p>
					</div>
				</div>
				<div className="grid-frame">
				<SideWord>/ TRỤ CỘT NĂNG LỰC</SideWord>
				<div className="pricing-panel reveal">
					<div className="tabs-row">
						<div className="tabs">
							<div className="tab-slider" style={sliderStyle} />
							{PRICING_PLANS.map((plan, i) => (
								<button
									type="button"
									key={plan.id}
									ref={(el) => { tabRefs.current[i] = el; }}
									className={`tab${activeId === plan.id ? " active" : ""}`}
									onClick={() => handleTab(plan.id as PricingPlan["id"])}
								>
									{plan.id === "starter" ? (
										<svg viewBox="0 0 18 18" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M9 1 1 5.5 9 10l8-4.5L9 1Z"/><path d="M1 9l8 4.5L17 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
									) : plan.id === "growth" ? (
										<svg viewBox="0 0 18 18" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d="M9 1 1 5.5 9 10l8-4.5L9 1Z"/><path d="M1 9l8 4.5L17 9"/><path d="M1 13l8 4.5L17 13"/></svg>
									) : (
										<svg viewBox="0 0 18 18" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeDasharray="3 2" aria-hidden="true"><path d="M9 1 1 5.5 9 10l8-4.5L9 1Z"/><path d="M1 9l8 4.5L17 9"/><path d="M1 13l8 4.5L17 13"/></svg>
									)}
									{plan.title.toUpperCase()}
								</button>
							))}
						</div>
						<div className="trusted-badge reveal reveal-right delay-2">
							<div className="trusted-avatars">
								<img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=70" alt="" />
								<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=70" alt="" />
								<img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=70" alt="" />
							</div>
							<div className="trusted-text">
								<span><span className="trusted-star">★</span> Đồng hành cùng</span>
								<strong>20.000+ thành viên hiện hữu</strong>
							</div>
						</div>
					</div>
					<div className="price-card-wrap">
						{pExit && (
							<div className={`price-card-abs${exitCls}`}>
								<PriceCard plan={pExit} onCta={onCta} />
							</div>
						)}
						<div className={enterCls}>
							<PriceCard plan={p} onCta={onCta} />
						</div>
					</div>
				</div>
				</div>
			</div>
		</section>
	);
}
