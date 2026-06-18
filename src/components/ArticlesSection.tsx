/**
 * @file ArticlesSection.tsx
 * @description Ba vị trí lãnh đạo cấp quốc gia — 1 featured + 2 cards grid.
 */

import { SideWord } from "./SideWord";
import { asset } from "../utils/asset";

const ARTICLES = [
	{
		img: asset("/landing/vapec-event.jpg"),
		read: "Vị thế Thể chế · 2026",
		title: "Phó Chủ tịch Thường trực kiêm Trưởng Ban Công nghệ",
		desc: "Hiệp hội Phát triển Doanh nghiệp Tư nhân & Kinh tế Tập thể Việt Nam (VAPEC) — Cơ quan chủ quản: Bộ Tài chính.",
		tags: ["VAPEC", "Bộ Tài chính", "Doanh nghiệp Tư nhân", "Kinh tế Tập thể"],
	},
	{
		img: asset("/landing/qsac-leader.jpg"),
		read: "Vị thế Thể chế · 2026",
		title: "Trưởng Ban Công nghệ — QSAC",
		desc: "Trung tâm Công nghệ Chống hàng giả QSAC, thuộc Hiệp hội Chống hàng giả & Bảo vệ Người tiêu dùng (VATAP).",
		tags: ["QSAC", "VATAP", "Chống hàng giả", "Bảo vệ NTD"],
	},
	{
		img: asset("/landing/vcida-signing.jpg"),
		read: "Vị thế Thể chế · 2026",
		title: "Trưởng Ban Công nghệ — VCIDA",
		desc: "Hiệp hội Công nghiệp Văn hóa VCIDA — định hướng chính sách công nghiệp văn hóa quốc gia.",
		tags: ["VCIDA", "Công nghiệp Văn hóa", "Chính sách Quốc gia"],
	},
] as const;

const ClockIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
		<path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/>
	</svg>
);

export function ArticlesSection() {
	return (
		<section className="section white" id="articles">
			<div className="wrap">
				<div className="section-head">
					<div className="label-row"><span className="spark">✦✦✦✦✦✦</span></div>
					<div>
						<h2 className="headline reveal reveal-tilt-right">
							<span className="muted">Ba vị trí</span> lãnh đạo cấp quốc gia
						</h2>
						<p className="lead reveal reveal-tilt-left delay-1">
							Không chỉ là chức danh — đây là nền móng thể chế cho phép<br />
							Con Đường Hữu Cơ tham gia định hình chính sách và<br />
							kết nối hàng nghìn doanh nghiệp thành viên.
						</p>
					</div>
					</div>
				<div className="grid-frame">
					<SideWord>/ VỊ THẾ THỂ CHẾ QUỐC GIA</SideWord>
					<div className="art-grid reveal">
						<div className="art-featured">
							<div className="art-img-wrap">
								<img src={ARTICLES[0].img} alt={ARTICLES[0].title} loading="lazy" decoding="async" className="art-img" />
							</div>
							<div className="art-content">
								<div className="art-meta"><ClockIcon />{ARTICLES[0].read}</div>
								<h3 className="art-title">{ARTICLES[0].title}</h3>
								<p className="art-desc">{ARTICLES[0].desc}</p>
								<div className="art-tags">{ARTICLES[0].tags.map(t => <span key={t} className="art-tag">{t}</span>)}</div>
							</div>
						</div>
						<div className="art-row">
							{ARTICLES.slice(1).map(a => (
								<div key={a.title} className="art-card">
									<div className="art-img-wrap">
										<img src={a.img} alt={a.title} loading="lazy" decoding="async" className="art-img" />
									</div>
									<div className="art-content">
										<div className="art-meta"><ClockIcon />{a.read}</div>
										<h3 className="art-title">{a.title}</h3>
										<p className="art-desc">{a.desc}</p>
										<div className="art-tags">{a.tags.map(t => <span key={t} className="art-tag">{t}</span>)}</div>
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
