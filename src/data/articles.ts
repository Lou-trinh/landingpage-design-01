export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime?: string;
  href?: string;
}

export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Nông nghiệp hữu cơ Việt Nam đạt cột mốc 1 triệu hecta đất canh tác",
    excerpt:
      "Sau 10 năm phát triển bền vững, diện tích đất canh tác hữu cơ tại Việt Nam đã đạt mốc lịch sử, mở ra cơ hội xuất khẩu lớn sang thị trường châu Âu và Nhật Bản.",
    image: "https://picsum.photos/seed/farm1/800/600",
    category: "Nông nghiệp",
    author: "Nguyễn Thanh Hà",
    date: "3 thg 4",
    readTime: "4 phút đọc",
  },
  {
    id: "2",
    title: "Rau sạch VietGAP: Bước đột phá trong chuỗi cung ứng thực phẩm an toàn",
    excerpt:
      "Tiêu chuẩn VietGAP giờ đây không chỉ là giấy chứng nhận mà đã trở thành cầu nối tin cậy giữa nông dân và người tiêu dùng thành thị.",
    image: "https://picsum.photos/seed/veggie2/800/600",
    category: "Thực phẩm sạch",
    author: "Trần Minh Đức",
    date: "2 thg 4",
    readTime: "3 phút đọc",
  },
  {
    id: "3",
    title: "Mô hình trang trại kết hợp: Khi nông dân trở thành chủ doanh nghiệp",
    excerpt:
      "Nhiều hộ nông dân tại Đà Lạt và Mộc Châu đã chuyển đổi thành công sang mô hình trang trại du lịch kết hợp, tăng thu nhập gấp 3 lần.",
    image: "https://picsum.photos/seed/farm3/800/600",
    category: "Khởi nghiệp",
    author: "Lê Hoàng Nam",
    date: "1 thg 4",
    readTime: "5 phút đọc",
  },
  {
    id: "4",
    title: "Phân bón vi sinh: Giải pháp xanh cho đất nông nghiệp Việt Nam",
    excerpt:
      "Các chế phẩm vi sinh thay thế phân bón hóa học đang được ứng dụng rộng rãi, giúp phục hồi độ màu mỡ của đất và giảm chi phí sản xuất.",
    image: "https://picsum.photos/seed/soil4/800/600",
    category: "Công nghệ xanh",
    author: "Phạm Thị Lan",
    date: "31 thg 3",
    readTime: "3 phút đọc",
  },
  {
    id: "5",
    title: "Gạo ST25 — Hành trình từ đồng ruộng Sóc Trăng đến bàn ăn thế giới",
    excerpt:
      "Gạo ST25 đã giành giải nhất tại World's Best Rice 2023, khẳng định vị thế của nông sản Việt trên bản đồ ẩm thực quốc tế.",
    image: "https://picsum.photos/seed/rice5/800/600",
    category: "Đặc sản",
    author: "Võ Văn Tín",
    date: "30 thg 3",
    readTime: "6 phút đọc",
  },
  {
    id: "6",
    title: "Blockchain truy xuất nguồn gốc thực phẩm: Không còn lo hàng giả",
    excerpt:
      "Công nghệ blockchain giúp người tiêu dùng quét mã QR là biết ngay nguồn gốc, ngày thu hoạch, và quy trình canh tác của từng sản phẩm.",
    image: "https://picsum.photos/seed/tech6/800/600",
    category: "Công nghệ",
    author: "Nguyễn Quốc Bảo",
    date: "29 thg 3",
    readTime: "4 phút đọc",
  },
];
