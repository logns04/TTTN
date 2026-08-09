import type { IconName } from './icons';

export interface NewsSeed {
  title: string;
  summary: string;
  content: string;
  icon: IconName;
  daysAgo: number;
}

export const NEWS: NewsSeed[] = [
  {
    title: 'Chọn sofa cho phòng khách dưới 20m²',
    summary: 'Phòng nhỏ không có nghĩa là phải mua sofa nhỏ. Vấn đề nằm ở dáng và chiều cao tựa.',
    icon: 'sofa',
    daysAgo: 1,
    content: `<p>Sai lầm phổ biến nhất khi kê sofa cho phòng khách nhỏ là chọn sofa quá thấp hoặc quá sâu. Sofa sâu trên 95cm sẽ ăn hết lối đi, còn sofa tựa cao trên 90cm làm trần nhà trông thấp hẳn xuống.</p>
<h3>Ba con số nên nhớ</h3>
<ul>
  <li><strong>Chiều sâu 80–88cm</strong> — đủ ngồi thoải mái mà không chiếm lối đi.</li>
  <li><strong>Tựa cao 75–82cm</strong> — không cắt ngang tầm mắt khi đứng.</li>
  <li><strong>Chừa 75cm lối đi</strong> giữa sofa và bàn trà hoặc tường đối diện.</li>
</ul>
<p>Nếu phòng dài và hẹp, sofa băng đặt dọc theo cạnh dài luôn hợp hơn sofa góc. Sofa góc chỉ nên dùng khi phòng vuông và có ít nhất một góc trống thật.</p>`,
  },
  {
    title: 'Gỗ tự nhiên, MDF hay gỗ ghép: chọn theo món đồ, không chọn theo giá',
    summary: 'Mỗi loại cốt gỗ có chỗ dùng riêng. Đắt hơn không đồng nghĩa phù hợp hơn.',
    icon: 'wardrobe',
    daysAgo: 4,
    content: `<p>Người mua thường mặc định gỗ tự nhiên tốt nhất rồi MDF kém nhất. Thực tế phụ thuộc vào món đồ đặt ở đâu.</p>
<h3>Gỗ tự nhiên</h3>
<p>Phù hợp bàn ăn, giường, kệ chịu lực. Chịu tải tốt, sửa lại được khi xước. Nhược điểm là co ngót theo độ ẩm và giá cao.</p>
<h3>MDF chống ẩm (cốt xanh)</h3>
<p>Phù hợp tủ quần áo, tủ bếp, kệ TV — những món phẳng, nhiều mặt, cần độ thẳng cao. Không co ngót, giá hợp lý. Nhược điểm là hỏng thì không sửa được, và cốt thường sẽ phồng khi ngâm nước.</p>
<h3>Gỗ ghép thanh</h3>
<p>Trung gian giữa hai loại trên. Ổn định hơn gỗ nguyên tấm, rẻ hơn, nhưng bề mặt có đường ghép nên phù hợp đồ sơn màu hơn là để mộc.</p>`,
  },
  {
    title: 'Bàn nâng hạ có thật sự cần thiết?',
    summary: 'Câu trả lời phụ thuộc vào việc bạn ngồi máy tính bao nhiêu giờ mỗi ngày.',
    icon: 'desk',
    daysAgo: 8,
    content: `<p>Bàn nâng hạ đắt hơn bàn thường 2–3 lần. Nó đáng tiền với người ngồi trên 8 tiếng mỗi ngày, và gần như không cần thiết với người dùng máy tính 2–3 tiếng.</p>
<p>Điểm quan trọng ít ai nói: đứng làm việc cả ngày cũng hại như ngồi cả ngày. Lợi ích thật đến từ việc <em>đổi tư thế</em> mỗi 45–60 phút, nên tính năng nhớ chiều cao mới là thứ quyết định bạn có dùng lâu dài hay không. Bàn phải bấm giữ nút để nâng thì sau hai tuần đa số người sẽ để nguyên một mức.</p>`,
  },
  {
    title: 'Phối màu nội thất theo tỷ lệ 60-30-10',
    summary: 'Một quy tắc cũ nhưng vẫn là cách nhanh nhất để phòng không bị rối.',
    icon: 'picture',
    daysAgo: 12,
    content: `<p>60% màu nền (tường, sàn, tủ lớn), 30% màu phụ (sofa, giường, rèm), 10% màu nhấn (gối, tranh, đèn).</p>
<p>Với nội thất gỗ, hãy tính màu gỗ vào nhóm 30% chứ không phải nhóm nền — gỗ sồi sáng và gỗ óc chó tối cho ra hai cảm giác phòng hoàn toàn khác nhau dù tường cùng màu.</p>
<p>Nhóm 10% là nhóm nên đổi theo mùa. Đổi bốn cái vỏ gối và một tấm thảm rẻ hơn nhiều so với đổi sofa, mà cảm giác phòng thay đổi rõ.</p>`,
  },
  {
    title: 'Kích thước bàn ăn theo số người: bảng tra nhanh',
    summary: 'Thiếu 10cm mỗi suất là cả bàn ăn chật, dù trên giấy tờ vẫn đủ ghế.',
    icon: 'diningTable',
    daysAgo: 16,
    content: `<p>Mỗi người cần <strong>60cm chiều ngang</strong> và <strong>40cm chiều sâu</strong> mặt bàn để ăn thoải mái.</p>
<ul>
  <li>4 người: bàn chữ nhật 120 × 75 cm hoặc bàn tròn Ø100 cm</li>
  <li>6 người: bàn chữ nhật 160 × 90 cm hoặc bàn tròn Ø130 cm</li>
  <li>8 người: bàn chữ nhật 200 × 100 cm hoặc bàn tròn Ø150 cm</li>
</ul>
<p>Bàn tròn tiết kiệm diện tích hơn ở số lẻ người và dễ nói chuyện hơn, nhưng từ 8 người trở lên thì bàn tròn cần đường kính lớn tới mức khó với tay lấy đồ ăn giữa bàn — lúc đó nên có mâm xoay.</p>`,
  },
  {
    title: 'Bảo quản đồ gỗ trong mùa mưa',
    summary: 'Độ ẩm trên 80% là lúc đồ gỗ dễ hỏng nhất, và đa số hỏng do cách kê chứ không do gỗ.',
    icon: 'cabinet',
    daysAgo: 21,
    content: `<p>Ba việc nên làm khi độ ẩm lên cao:</p>
<ul>
  <li><strong>Kê cách tường 5cm.</strong> Tủ áp sát tường là chỗ đọng ẩm và nấm mốc nhiều nhất.</li>
  <li><strong>Không phơi nắng trực tiếp để hong khô.</strong> Gỗ khô nhanh một mặt sẽ nứt và cong.</li>
  <li><strong>Lau bằng khăn ẩm rồi khăn khô ngay.</strong> Không dùng nước xịt đa năng lên bề mặt sơn PU.</li>
</ul>
<p>Với tủ quần áo, một túi hút ẩm 100g cho mỗi buồng treo đủ cho khoảng 6 tuần mùa mưa.</p>`,
  },
  {
    title: 'Ánh sáng phòng ngủ: đừng chỉ dựa vào một đèn trần',
    summary: 'Một nguồn sáng duy nhất trên đầu là lý do phòng ngủ trông như phòng làm việc.',
    icon: 'lamp',
    daysAgo: 27,
    content: `<p>Phòng ngủ nên có ít nhất ba lớp sáng: đèn trần cho sáng chung, đèn đầu giường cho đọc sách, và một nguồn sáng gián tiếp thấp (đèn cây hoặc LED hắt sau đầu giường).</p>
<p>Về nhiệt độ màu, chọn <strong>2700–3000K</strong> cho phòng ngủ. Trên 4000K là ánh sáng trắng, tốt cho bếp và phòng làm việc nhưng làm khó ngủ.</p>`,
  },
  {
    title: 'Đặt hàng nội thất: những gì nên hỏi trước khi chuyển tiền',
    summary: 'Bốn câu hỏi giúp tránh phần lớn tranh chấp giao hàng.',
    icon: 'chair',
    daysAgo: 34,
    content: `<p>Trước khi chốt đơn, hỏi rõ bốn điều sau và yêu cầu ghi vào đơn hàng:</p>
<ol>
  <li><strong>Cốt gỗ là gì</strong>, không chỉ hỏi bề mặt. "Gỗ sồi" có thể là sồi nguyên tấm hoặc veneer sồi dán trên MDF.</li>
  <li><strong>Có vận chuyển lên tầng không</strong>, và nếu thang máy không vào được thì phụ phí bao nhiêu.</li>
  <li><strong>Lắp đặt có nằm trong giá</strong> hay tính riêng.</li>
  <li><strong>Bảo hành cụ thể cho cái gì</strong> — bản lề, ray kéo và bề mặt sơn thường có thời hạn khác nhau với kết cấu.</li>
</ol>
<p>Với đồ đóng theo kích thước riêng, nên có bản vẽ xác nhận kèm số đo trước khi sản xuất.</p>`,
  },
];
