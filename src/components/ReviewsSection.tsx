/**
 * @file ReviewsSection.tsx
 * @description Carousel review — 5 independent push-slide slots with alternating directions.
 */

import { useState, useRef, useEffect } from "react";
import { REVIEWS } from "../data";
import { SideWord } from "./SideWord";
import { TestimonialsGrid } from "./TestimonialsGrid";

// Directions when pressing ">" (dir="up"). Pressing "<" flips all.
const SLOT_DIRS: Array<"up" | "down"> = ["up", "down", "up", "down", "up"];

function getSlotCls(slotIdx: number, globalDir: "up" | "down", isAnim: boolean) {
	const base = SLOT_DIRS[slotIdx];
	const d = globalDir === "up" ? base : (base === "up" ? "down" : "up");
	return {
		exitCls: d === "up" ? " pc-exit-up" : " pc-exit-down",
		enterCls: isAnim ? (d === "up" ? " pc-enter-up" : " pc-enter-down") : "",
	};
}

function Slot({ exitNode, enterNode, exitCls, enterCls }: {
	exitNode: React.ReactNode;
	enterNode: React.ReactNode;
	exitCls: string;
	enterCls: string;
}) {
	return (
		<div className="rev-slot">
			{exitNode && <div className={`rev-slot-abs${exitCls}`}>{exitNode}</div>}
			<div className={enterCls || undefined}>{enterNode}</div>
		</div>
	);
}

export function ReviewsSection({ onCta: _onCta }: { onCta: () => void }) {
	const [renderIdx, setRenderIdx] = useState(0);
	const [exitIdx, setExitIdx] = useState<number | null>(null);
	const [dir, setDir] = useState<"up" | "down">("up");
	const [flash, setFlash] = useState<"prev" | "next" | null>(null);
	const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (exitIdx === null) return;
		const t = setTimeout(() => setExitIdx(null), 700);
		return () => clearTimeout(t);
	}, [exitIdx]);

	const handleNav = (navDir: "prev" | "next") => {
		if (exitIdx !== null) return;
		if (flashTimer.current) clearTimeout(flashTimer.current);
		setFlash(navDir);
		flashTimer.current = setTimeout(() => setFlash(null), 400);
		setDir(navDir === "next" ? "up" : "down");
		setExitIdx(renderIdx);
		setRenderIdx((i) =>
			navDir === "next"
				? (i + 1) % REVIEWS.length
				: (i - 1 + REVIEWS.length) % REVIEWS.length,
		);
	};

	const isAnim = exitIdx !== null;
	const eR = exitIdx !== null ? REVIEWS[exitIdx] : null;
	const nR = REVIEWS[renderIdx];

	const s = (i: number) => getSlotCls(i, dir, isAnim);

	return (
		<section className="section black" id="reviews">
			<div className="wrap">
				<div className="section-head">
					<div className="label-row"><span className="spark">✦✦✦✦✦✦</span></div>
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
							Khách Hàng Nói
						</p>
						<h2 className="headline reveal reveal-tilt-right" style={{ margin: 0 }}>
							<span className="muted">Niềm tin</span>
							<br />
							từ cộng đồng
						</h2>
						<p className="lead reveal reveal-tilt-left delay-1" style={{ marginTop: 24, maxWidth: 640 }}>
							Khách hàng không chỉ mua một lần — họ quay lại, giới thiệu bạn bè, và đồng
							hành cùng chúng tôi. Đây là tiếng nói thật từ những người đã chọn Con Đường
							Hữu Cơ.
						</p>
					</div>
				</div>
				<div className="grid-frame">
				<SideWord dark>/ KHÁCH HÀNG NÓI</SideWord>
				<div className="reviews-shell reveal">
					<div>
						<p style={{ fontWeight: 800, fontSize: 20 }}>
							Đây là tiếng nói thật
							<br />
							từ khách hàng!
						</p>
						<div className="review-controls">
							<button
								type="button"
								className={`square${flash === "prev" ? " flash" : ""}`}
								onClick={() => handleNav("prev")}
								aria-label="Previous review"
							>
								‹
							</button>
							<button
								type="button"
								className={`square${flash === "next" ? " flash" : ""}`}
								onClick={() => handleNav("next")}
								aria-label="Next review"
							>
								›
							</button>
						</div>
					</div>
					<div className="review-content">
						{/* Person row: img (slot 0) + stars (slot 1) + name (slot 2) */}
						<div className="review-person-grid">
							<Slot {...s(0)}
								exitNode={eR && <img src={eR.avatar} alt={eR.name} loading="lazy" decoding="async" />}
								enterNode={<img src={nR.avatar} alt={nR.name} loading="lazy" decoding="async" />}
							/>
							<div className="review-person-right">
								<Slot {...s(1)}
									exitNode={eR && <div className="stars">4.9 / 5 ★★★★★</div>}
									enterNode={<div className="stars">4.9 / 5 ★★★★★</div>}
								/>
								<Slot {...s(2)}
									exitNode={eR && <strong>{eR.name}</strong>}
									enterNode={<strong>{nR.name}</strong>}
								/>
							</div>
						</div>
						{/* Quote (slot 3) */}
						{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static data */}
						<Slot {...s(3)}
							exitNode={eR && <div className="quote" dangerouslySetInnerHTML={{ __html: eR.quote }} />}
							enterNode={<div className="quote" dangerouslySetInnerHTML={{ __html: nR.quote }} />}
						/>
						{/* Copy (slot 4) */}
						<Slot {...s(4)}
							exitNode={eR && <p className="review-copy">{eR.copy}</p>}
							enterNode={<p className="review-copy">{nR.copy}</p>}
						/>
					</div>
				</div>
				<TestimonialsGrid />
				</div>
			</div>
		</section>
	);
}
