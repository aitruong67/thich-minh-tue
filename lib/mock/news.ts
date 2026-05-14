import type { NewsArticle } from '@/lib/types'

export const mockNews: NewsArticle[] = [
  {
    _id: 'n1',
    slug: 'bbc-dua-tin-hien-tuong-thich-minh-tue',
    title: 'BBC Đưa Tin Về Hiện Tượng Thích Minh Tuệ — Nhà Sư Truyền Cảm Hứng Cho Hàng Triệu Người',
    excerpt: 'Đài BBC (Anh) đã dành một bài viết dài giới thiệu về Thầy Thích Minh Tuệ, mô tả hành trình bộ hành của ông như một "hiện tượng tâm linh hiếm gặp trong thế kỷ 21".',
    body_vi: `Tháng 7 năm 2023, Đài BBC của Anh đã đăng tải một bài viết dài kỳ về hiện tượng Thích Minh Tuệ — nhà sư Theravāda đang thực hiện cuộc bộ hành xuyên suốt chiều dài Việt Nam.

Bài viết mô tả ông như "một trong những hiện tượng tâm linh hiếm gặp nhất trong thế kỷ 21" — một người dám từ bỏ hoàn toàn đời sống vật chất để sống theo đúng nghĩa đen những gì kinh điển Phật giáo dạy.

Phóng viên BBC đã theo chân Thầy trong hai ngày, ghi lại cảnh Thầy đi bộ từ bình minh đến hoàng hôn, ngủ dưới gốc cây, và tiếp nhận sự dâng cúng của người dân địa phương với nụ cười bình thản.

"Điều khiến tôi ngạc nhiên nhất," phóng viên viết, "không phải là những gì ông từ bỏ, mà là sự bình an tuyệt đối hiện diện trên khuôn mặt ông. Đây là người hạnh phúc nhất tôi từng gặp."`,
    body_en: `In July 2023, the BBC published an in-depth article about the phenomenon of Thích Minh Tuệ — the Theravāda monk performing a walking pilgrimage the full length of Vietnam.

The article described him as "one of the rarest spiritual phenomena of the 21st century" — a person who dares to completely abandon material life to literally live what Buddhist scriptures teach.

BBC journalists followed Thầy for two days, documenting how he walks from dawn to dusk, sleeps under trees, and receives offerings from local people with a serene smile.

"What surprised me most," the journalist wrote, "was not what he has renounced, but the absolute peace present on his face. This is the happiest person I have ever met."`,
    date: '2023-07-18',
    coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
    author: 'Redaksi Lưu Trữ',
    readingTime: 8,
    tags: ['BBC', 'quốc tế', 'truyền thông', '2023'],
  },
  {
    _id: 'n2',
    slug: 'hang-tram-ngan-nguoi-theo-doi-livestream',
    title: 'Hàng Trăm Ngàn Người Đồng Thời Xem Livestream Hành Trình Của Thầy',
    excerpt: 'Các livestream ghi lại hành trình bộ hành của Thầy Thích Minh Tuệ đã thu hút số lượng người xem đồng thời kỷ lục trên các nền tảng mạng xã hội Việt Nam.',
    body_vi: `Một điều chưa từng xảy ra trong lịch sử mạng xã hội Việt Nam: các video livestream ghi lại từng bước chân của một nhà sư trên con đường đất thu hút đến 300.000 người xem đồng thời.

Không có âm nhạc, không có kịch bản, không có hiệu ứng đặc biệt. Chỉ là một ông thầy đi bộ, đôi khi nói chuyện với người đi đường, đôi khi im lặng trong nhiều giờ liền.

Và người ta xem. Hàng giờ. Nhiều người nói rằng họ bắt đầu xem trong khi ăn cơm và không thể dừng lại cho đến tận khuya.

Hiện tượng này đặt ra câu hỏi thú vị cho các chuyên gia truyền thông xã hội: điều gì đã khiến nội dung "không có gì để xem" lại trở thành nội dung được xem nhiều nhất?`,
    body_en: `Something unprecedented in Vietnamese social media history: livestream videos recording every step of a monk on a dirt road attracted up to 300,000 simultaneous viewers.

No music, no script, no special effects. Just a monk walking, sometimes talking with passersby, sometimes silent for hours at a time.

And people watched. For hours. Many said they started watching during dinner and couldn't stop until late night.

This phenomenon poses an interesting question for social media experts: what made "nothing to see" content the most-watched content?`,
    date: '2023-05-28',
    coverImage: 'https://images.unsplash.com/photo-1519721086993-5e3c0d10c6f6?w=1200',
    author: 'Nguyễn Văn Minh',
    readingTime: 5,
    tags: ['mạng xã hội', 'livestream', 'kỷ lục', 'Việt Nam'],
  },
  {
    _id: 'n3',
    slug: 'chuyen-gia-phat-hoc-noi-gi',
    title: 'Các Chuyên Gia Phật Học Nói Gì Về Hành Trình Của Thầy Thích Minh Tuệ',
    excerpt: 'Các giáo sư Phật học từ Việt Nam, Thái Lan và Sri Lanka đều lên tiếng về ý nghĩa của hiện tượng Thích Minh Tuệ trong bối cảnh Phật giáo Theravāda đương đại.',
    body_vi: `Giáo sư Pháp Bảo từ Đại học Phật giáo Quốc tế tại Hà Nội nhận xét: "Thích Minh Tuệ đang thực hành Dhutanga — một trong 13 khổ hạnh được đức Phật cho phép nhưng rất ít người thực hành trong thời hiện đại."

Dhutanga bao gồm các quy tắc như chỉ ăn từ khất thực, không ăn sau giờ ngọ, ngủ ngoài trời, mặc y từ vải bỏ đi. Thầy Thích Minh Tuệ đang thực hành hầu hết những điều này.

"Điều đáng chú ý," giáo sư Pháp Bảo nói thêm, "là ông không tự nhận mình là thầy hay thiền sư. Ông chỉ đơn giản là đang cố gắng thực hành đúng với lời Phật dạy. Và đó chính xác là lý do khiến mọi người tin tưởng ông."`,
    body_en: `Professor Dhammarat from the International Buddhist University in Hà Nội commented: "Thích Minh Tuệ is practicing Dhutanga — one of the 13 ascetic practices permitted by the Buddha but rarely practiced in modern times."

Dhutanga includes rules such as eating only from alms, not eating after midday, sleeping outdoors, and wearing robes made from discarded cloth. Thầy Thích Minh Tuệ practices most of these.

"What is noteworthy," Professor Dhammarat added, "is that he does not claim to be a teacher or meditation master. He is simply trying to practice in accordance with the Buddha's teachings. And that is precisely why people trust him."`,
    date: '2023-08-12',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200',
    author: 'Trần Thị Hương',
    readingTime: 10,
    tags: ['Phật học', 'chuyên gia', 'Theravāda', 'phân tích'],
  },
  {
    _id: 'n4',
    slug: 'thay-2024-hanh-trinh-moi',
    title: 'Thầy Thích Minh Tuệ Bắt Đầu Hành Trình Mới Năm 2024',
    excerpt: 'Sau thời gian ở ẩn, Thầy Thích Minh Tuệ đã trở lại với hành trình bộ hành mới vào đầu năm 2024, một lần nữa thu hút sự quan tâm của hàng triệu người.',
    body_vi: `Đầu năm 2024, tin tức về việc Thầy Thích Minh Tuệ bắt đầu hành trình bộ hành mới đã lan truyền nhanh chóng trên mạng xã hội.

Khác với hành trình 2023 chủ yếu đi theo quốc lộ 1A, lần này Thầy chọn những con đường ít người qua hơn, tránh xa những đám đông lớn để có thể thực hành trong yên lặng hơn.

"Tôi không muốn trở thành một hiện tượng xã hội," Thầy chia sẻ với vài người may mắn được gặp ông. "Tôi chỉ muốn được đi bộ và thực hành như một người tu bình thường."

Nhưng dù muốn hay không, bước chân của Thầy vẫn thu hút hàng triệu ánh mắt theo dõi, như một lời nhắc nhở về những giá trị mà nhiều người đang tìm kiếm.`,
    body_en: `In early 2024, news of Thầy Thích Minh Tuệ beginning a new walking pilgrimage spread rapidly across social media.

Unlike the 2023 journey that mostly followed Highway 1A, this time Thầy chose less-traveled roads, avoiding large crowds to practice in greater silence.

"I do not want to become a social phenomenon," Thầy shared with the few fortunate enough to meet him. "I only want to walk and practice like an ordinary practitioner."

But whether he wills it or not, Thầy's steps continue to attract millions of watching eyes — a reminder of the values many people are searching for.`,
    date: '2024-02-10',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
    author: 'Lê Văn Đức',
    readingTime: 6,
    tags: ['2024', 'hành trình mới', 'tin tức'],
  },
  {
    _id: 'n5',
    slug: 'anh-huong-toan-cau-hien-tuong-thich-minh-tue',
    title: 'Từ Việt Nam Ra Thế Giới — Ảnh Hưởng Toàn Cầu Của Hiện Tượng Thích Minh Tuệ',
    excerpt: 'Câu chuyện về Thầy Thích Minh Tuệ đã vượt ra ngoài biên giới Việt Nam, truyền cảm hứng cho cộng đồng Phật tử và người tìm kiếm tâm linh trên toàn thế giới.',
    body_vi: `Khi các video về Thầy Thích Minh Tuệ lan truyền ra ngoài cộng đồng người Việt, phản ứng từ cộng đồng quốc tế không kém phần sâu sắc.

Tại Thái Lan — đất nước Theravāda — nhiều nhà sư và cư sĩ theo dõi hành trình của ông với sự tôn kính. "Đây là điều mà chúng tôi đọc trong kinh điển nhưng hiếm khi thấy trong thực tế," một vị sư người Thái nhận xét.

Tại phương Tây, các cộng đồng Phật tử người Mỹ và châu Âu chia sẻ rộng rãi video về Thầy. Trang Reddit r/buddhism ghi nhận nhiều cuộc thảo luận sôi nổi, với nhiều người bày tỏ sự ngưỡng mộ và đặt câu hỏi về cách áp dụng tinh thần đơn giản vào cuộc sống phương Tây.`,
    body_en: `As videos of Thầy Thích Minh Tuệ spread beyond the Vietnamese community, the response from international communities has been equally profound.

In Thailand — a Theravāda nation — many monks and lay practitioners followed his journey with reverence. "This is what we read in scriptures but rarely see in reality," a Thai monk remarked.

In the West, Buddhist communities in America and Europe widely shared videos of Thầy. The Reddit community r/buddhism saw many lively discussions, with many people expressing admiration and asking how to apply the spirit of simplicity to Western life.`,
    date: '2023-09-05',
    coverImage: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=1200',
    author: 'Redaksi Lưu Trữ',
    readingTime: 7,
    tags: ['quốc tế', 'toàn cầu', 'cộng đồng', 'Phật giáo'],
  },
  {
    _id: 'n6',
    slug: 'thich-minh-tue-va-giao-duc-the-he-tre',
    title: 'Thích Minh Tuệ Và Bài Học Lớn Cho Thế Hệ Trẻ Việt Nam',
    excerpt: 'Nhiều trường học và tổ chức giáo dục ở Việt Nam đã đưa câu chuyện về Thầy Thích Minh Tuệ vào chương trình giáo dục đạo đức, nhân cách cho học sinh.',
    body_vi: `Hiện tượng Thích Minh Tuệ không chỉ lan rộng trong cộng đồng Phật tử mà còn tác động mạnh đến lĩnh vực giáo dục.

Nhiều giáo viên đã sử dụng câu chuyện của ông như một ví dụ về lòng kiên trì, sự giản dị và từ bi trong các bài học đạo đức. Học sinh tiểu học và trung học được nghe kể về một người đã từ bỏ mọi thứ để theo đuổi điều mình tin là đúng.

"Điều tôi muốn học sinh hiểu," một giáo viên tiểu học ở Hà Nội chia sẻ, "không phải là ai cũng nên đi tu. Mà là mỗi người đều có thể sống với những giá trị thực sự quan trọng với mình, bất kể áp lực xã hội là gì."`,
    body_en: `The Thích Minh Tuệ phenomenon spread not only through Buddhist communities but also made a strong impact on education.

Many teachers have used his story as an example of perseverance, simplicity, and compassion in ethics lessons. Elementary and secondary school students hear about a person who gave up everything to pursue what he believed was right.

"What I want students to understand," an elementary school teacher in Hà Nội shared, "is not that everyone should become a monk. It is that each person can live by the values that are truly important to them, regardless of social pressure."`,
    date: '2023-10-15',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200',
    author: 'Phạm Thị Lan',
    readingTime: 5,
    tags: ['giáo dục', 'thế hệ trẻ', 'giá trị', 'Việt Nam'],
  },
]
