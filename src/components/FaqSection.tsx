/**
 * @file FaqSection.tsx
 * @description Accordion FAQ — multi-open style (mỗi item toggle độc lập).
 */

import { useState } from "react";
import { FAQ_ITEMS } from "../data";
import { SideWord } from "./SideWord";

export function FaqSection() {
	const [open, setOpen] = useState<number | null>(0);

	const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

	return (
		<section className="section white" id="faq">
			<div className="wrap">
				<div className="section-head">
					<div className="label-row"><span className="spark">✦✦✦✦✦✦</span></div>
					<div>
						<h2 className="headline reveal reveal-tilt-right">
							<span className="muted">General</span> questions
						</h2>
						<p className="lead reveal reveal-tilt-left delay-1">
							We’ve got straight answers. From process to pricing, we cover
							everything you need to know before working with us.
						</p>
					</div>
				</div>
				<div className="grid-frame">
				<SideWord>/ QUESTIONS</SideWord>
				<div className="faq-layout">
					<div className="faq-card reveal">
						<img
							src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=70"
							alt="consultant"
							loading="lazy"
							decoding="async"
						/>
						<div>
							<h3>Short on time?</h3>
							<p>Let’s get started with<br />a brief intro call.</p>
						</div>
					</div>
					<div className="accordion reveal delay-1">
						{FAQ_ITEMS.map((item, i) => (
							<div key={item.q} className={`faq-item${open === i ? " open" : ""}`}>
								<button
									type="button"
									className="faq-q"
									onClick={() => toggle(i)}
									aria-expanded={open === i}
								>
									<span className="plus">＋</span>
									{item.q}
								</button>
								<div className="faq-a">
									<div className="faq-a-inner"><p>{item.a}</p></div>
								</div>
							</div>
						))}
					</div>
				</div>
				</div>
			</div>
		</section>
	);
}
