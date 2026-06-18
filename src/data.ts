/**
 * @file landing/data.ts
 * @description Static content data — pricing plans + customer reviews.
 */

export type PricingPlan = {
	id: "starter" | "growth" | "scale";
	title: string;
	price: string;
	delivery: string;
	features: Array<[string, string]>;
};

export const PRICING_PLANS: PricingPlan[] = [
	{
		id: "starter",
		title: "Trụ Cột 01",
		price: "Hữu Cơ",
		delivery: "Khoa học nông nghiệp hữu cơ",
		features: [
			["Vật tư hữu cơ bảo hộ", "Nghiên cứu & sản xuất phân bón, thuốc BVTV hữu cơ dưới thương hiệu được bảo hộ."],
			["Canh tác tuần hoàn", "Quy trình hữu cơ bền vững cho doanh nghiệp và hợp tác xã."],
			["Tài sản trí tuệ mở", "Công trình nghiên cứu chia sẻ cho đối tác trong hệ sinh thái."],
		],
	},
	{
		id: "growth",
		title: "Trụ Cột 02",
		price: "MSCILabs",
		delivery: "Công nghệ cấp quốc tế",
		features: [
			["Game & Gamification", "Nền tảng giữ chân và giáo dục cộng đồng người tiêu dùng."],
			["Blockchain", "Truy xuất nguồn gốc, hợp đồng thông minh, ví số, chống hàng giả."],
			["Trí tuệ Nhân tạo", "Tự động hóa nội bộ và tư vấn triển khai cho khách hàng quốc tế."],
		],
	},
	{
		id: "scale",
		title: "Trụ Cột 03",
		price: "Cộng Đồng",
		delivery: "Kinh tế cộng đồng",
		features: [
			["Hai mươi nghìn → một triệu", "Hiện hữu 20.000 thành viên — mục tiêu 1.000.000 vào năm 2030."],
			["Trăm trạm → nghìn trạm", "Toàn quốc 100 Trạm Cộng Đồng — 1.000 trạm năm 2030, mở rộng ASEAN."],
			["Chia sẻ doanh thu 3 bên", "Escrow bảo vệ giao dịch, cashback & hoa hồng tự động."],
		],
	},
];

export type Review = {
	name: string;
	avatar: string;
	quote: string;
	copy: string;
};

export const REVIEWS: Review[] = [
	{
		name: "Anh Quân — Bình Dương",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
		quote:
			"<span>“Chất lượng đúng như cam kết, không thổi phồng”</span><br>Mua nhiều lần, lần nào rau củ cũng tươi, mùi vị tự nhiên, nhãn truy xuất rõ ràng.",
		copy: "“Lần đầu tôi cảm thấy thực sự biết mình đang ăn gì — vì mọi thông tin nguồn gốc đều minh bạch, kiểm định đầy đủ.”",
	},
	{
		name: "Chị Linh — Nha Trang",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
		quote:
			"<span>“Đặt là yên tâm, giao đúng hẹn”</span><br>Đóng gói cẩn thận, hàng đến tận tay vẫn giữ độ tươi, không bao giờ phải đôi co với shop.",
		copy: "“Hệ thống escrow giữ tiền trước khi mình xác nhận chất lượng — đó là cách một sàn TMĐT thực sự bảo vệ khách hàng.”",
	},
	{
		name: "Anh Phong — Huế",
		avatar:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
		quote:
			"<span>“Dịch vụ tận tâm, hậu mãi chu đáo”</span><br>Có vấn đề là được hỗ trợ ngay trong ngày, hoàn tiền minh bạch không cần năn nỉ.",
		copy: "“Giá hợp lý, chất lượng tốt hơn mong đợi. Tôi đã giới thiệu cho cả nhà và bạn bè — ai dùng cũng giữ lại.”",
	},
];

export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
	{
		q: "What’s included in your monthly pricing?",
		a: "Each plan includes strategy, campaign management, creative production, testing, reporting, and support. No hidden fees — just results.",
	},
	{
		q: "How long before we see results?",
		a: "Most brands see useful signal within 30 days, with stronger optimization trends after 60–90 days depending on traffic volume.",
	},
	{
		q: "Do you offer custom plans?",
		a: "Yes. We build custom scopes for brands that need multi-market rollouts, large creative volume, or full funnel support.",
	},
	{
		q: "Can I cancel anytime?",
		a: "Yes. The demo structure keeps pricing simple and flexible. For real projects, terms should be finalized in your service agreement.",
	},
	{
		q: "What kind of brands do you work with?",
		a: "We work with DTC brands, SaaS companies, and growth-stage startups across e-commerce, fintech, and consumer apps.",
	},
	{
		q: "Do you offer performance guarantees?",
		a: "We don't guarantee specific ROAS numbers — no honest agency does. What we guarantee is a rigorous process, full transparency, and iteration until we find what works.",
	},
];
