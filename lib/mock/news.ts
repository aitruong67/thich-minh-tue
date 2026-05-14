import type { NewsArticle } from '@/lib/types'

export const mockNews: NewsArticle[] = [
  {
    _id: 'n7',
    slug: 'bbc-vietnamese-thich-minh-tue-2025',
    title: "BBC News: Phỏng vấn sư Minh Tuệ: 'Ái luyến sinh sợ hãi, con tu tập để không ái luyến nữa'",
    excerpt: 'Đài BBC Vietnamese tiếp tục theo dõi và đưa tin về hành trình của Thầy Thích Minh Tuệ — nhà sư Theravāda truyền cảm hứng cho hàng triệu người trong và ngoài nước.',
    body_vi: '',
    body_en: '',
    date: '2025-05-14',
    coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
    author: 'BBC Vietnamese',
    readingTime: 5,
    tags: ['BBC', 'quốc tế', 'truyền thông', '2025'],
    sourceUrl: 'https://www.bbc.com/vietnamese/articles/c0mvmkr744no',
  },
  {
    _id: 'n8',
    slug: 'rfa-pilgrimage-goes-viral-vietnam-2024',
    title: 'Radio Free Asia: Buddhist Pilgrimage by Unrecognized "Monk" Goes Viral in Vietnam',
    excerpt: 'Thích Minh Tuệ đã trở thành nhân vật viral tại Việt Nam nhờ thực hành lối sống khổ hạnh không được nhà nước công nhận, thu hút sự chú ý đến vấn đề tự do tôn giáo.',
    body_vi: `Tháng 5 năm 2024, Đài Á Châu Tự Do (RFA) đăng tải bài viết về cuộc hành hương của Thích Minh Tuệ — người đàn ông không được Giáo hội Phật giáo Nhà nước công nhận nhưng lại trở thành biểu tượng cho hàng triệu Phật tử Việt Nam.

Thích Minh Tuệ không tự xưng là nhà sư, nhưng ông thực hành những gì kinh điển dạy một cách nghiêm túc nhất: chỉ sở hữu ba bộ y phục, khất thực từng nhà, sống tối giản ngoài thiên nhiên. Chính sự đối lập này với các nhà sư được nhà nước bảo trợ đã khiến ông trở thành hiện tượng mạng xã hội.

Học giả Phật học Thanh Đô nhận xét: "Cốt lõi của Phật giáo đối với người tu hành là giới, định, tuệ." Những người theo dõi ông cho rằng ông là "một vị sư chân chính" vì không nhận cúng dường hay tìm kiếm danh lợi.`,
    body_en: `In May 2024, Radio Free Asia reported on Thích Minh Tuệ — a man not recognized by Vietnam's state-sanctioned Buddhist organization who nonetheless became a symbol for millions of Vietnamese Buddhists.

He does not formally claim monastic status but practices what the scriptures teach with the utmost sincerity: owning only three garments, collecting alms house to house, and living minimally in natural environments. This contrast with state-backed monks drew massive attention.

Buddhist scholar Thanh Do explained his appeal: "The core of Buddhism for a clergy person consists of precepts, determination, and wisdom." Followers described him as "an authentic monk" precisely because he sought neither donations nor recognition.

State-backed institutions responded negatively. A government religious agency issued warnings about Tue, claiming he disrupts social order, while one official publicly called him "a thug who wears ragged attire" — a statement that itself provoked widespread public backlash.`,
    date: '2024-05-17',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200',
    author: 'Radio Free Asia',
    readingTime: 5,
    tags: ['RFA', 'tự do tôn giáo', 'viral', '2024'],
    sourceUrl: 'https://www.rfa.org/english/news/vietnam/vietnam-unrecognized-monk-05172024015230.html',
  },
  {
    _id: 'n9',
    slug: 'buddhistdoor-wandering-ascetic-gains-following',
    title: 'Buddhistdoor Global: Thich Minh Tue, Wandering Buddhist Ascetic in Vietnam, Gains a Following',
    excerpt: 'Tạp chí Phật giáo quốc tế Buddhistdoor Global ghi lại hành trình của Thích Minh Tuệ — người đã đi bộ qua gần toàn bộ Việt Nam kể từ năm 2017, thu hút hàng trăm người ủng hộ.',
    body_vi: `Tháng 5 năm 2024, tạp chí Buddhistdoor Global đăng bài viết chi tiết về Thích Minh Tuệ (sinh tên Lê Anh Tú) — người đã lặng lẽ hành hương khắp Việt Nam từ năm 2017 mà không được truyền thông biết đến cho đến khi mạng xã hội bùng nổ.

Ông thực hành chế độ ăn uống một bữa mỗi ngày trước giờ Ngọ, tắm ở các nguồn nước tự nhiên, ngủ ven đường, và tự tay may y phục từ vải vụn nhặt được. Ông không dùng điện thoại hay mạng xã hội, không liên lạc với gia đình trong nhiều năm.

Cha của ông — dù đã lớn tuổi — vẫn bày tỏ sự ủng hộ cho con đường tu hành của con trai. "Tôi hiểu con trai tôi đang làm gì," ông nói. "Đó là con đường của nó."`,
    body_en: `In May 2024, Buddhistdoor Global published a detailed profile of Thích Minh Tuệ (born Lê Anh Tú) — a man who had quietly walked across nearly all of Vietnam since 2017, largely unknown until social media erupted.

He practices eating one meal daily before noon, bathes in natural water sources, sleeps by roadsides, and fashions clothing from collected rags. He carries no phone and has had no contact with his family for years.

His elderly father expressed support for his spiritual path. Buddhist scholar Thanh Do explained the appeal: "The core of Buddhism for a clergy person consists of precepts, determination, and wisdom." Followers join his journey with his blessing, though he encourages them to return home when ready and accepts only those with parental approval.

His clarification that he is not formally an ordained monk — and not affiliated with Vietnam's official Buddhist Sangha — only added to public fascination. He had visited nearly all of Vietnam during his ongoing pilgrimage, describing it as "a lifelong walk."`,
    date: '2024-05-28',
    coverImage: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=1200',
    author: 'Buddhistdoor Global',
    readingTime: 6,
    tags: ['Buddhistdoor', 'khổ hạnh', 'hành hương', '2024'],
    sourceUrl: 'https://www.buddhistdoor.net/news/thich-minh-tue-wandering-buddhist-ascetic-in-vietnam-gains-a-following/',
  },
  {
    _id: 'n10',
    slug: 'rfa-unofficial-monk-ends-pilgrimage-june-2024',
    title: 'Radio Free Asia: Unofficial Monk Who Became Internet Sensation in Vietnam Ends Pilgrimage',
    excerpt: 'Cuộc hành hương của Thích Minh Tuệ bị chấm dứt đột ngột giữa nhiều tranh cãi — trong khi chính quyền tuyên bố ông tự nguyện dừng lại, các sư đồng hành mô tả một cuộc đột kích lúc nửa đêm.',
    body_vi: `Ngày 3 tháng 6 năm 2024, RFA đưa tin cuộc hành hương của Thích Minh Tuệ đã chấm dứt sau khoảng ba tuần thu hút hàng nghìn người theo dõi.

Chính quyền lý giải việc dừng cuộc hành hương bằng các lo ngại về ổn định xã hội, sức khỏe người tham gia, và cái chết của một người hành hương vì say nắng. Tuy nhiên, các sư đi cùng Thầy kể lại một câu chuyện khác: khoảng 100 cán bộ đã đột kích trại vào lúc nửa đêm, còng tay người tham gia và phân tán họ đến các tỉnh khác nhau.

Chính quyền còn phạt tiền một YouTuber đã đưa tin về hành trình của Thầy và thông báo sẽ ra mắt ứng dụng giám sát người thực hành Phật giáo trên toàn quốc.`,
    body_en: `On June 3, 2024, RFA reported that Thích Minh Tuệ's pilgrimage had ended after approximately three weeks drawing massive crowds across Vietnam.

Authorities justified the end of the pilgrimage by citing concerns about social stability, health risks, and one participant's death from heatstroke. However, monks traveling with Tuệ told a starkly different story: approximately 100 officials conducted a coordinated midnight raid, handcuffing participants and scattering them across different provinces.

The incident exposed the ongoing tensions between independent religious practice and state oversight in Vietnam. Authorities fined a YouTuber who had documented the journey and announced plans for a new surveillance application to monitor Buddhist practitioners nationwide. The government's official statement — that he had "voluntarily retired" — was widely questioned by supporters and human rights observers alike.`,
    date: '2024-06-03',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200',
    author: 'Radio Free Asia',
    readingTime: 5,
    tags: ['RFA', 'chính quyền', 'tự do tôn giáo', '2024'],
    sourceUrl: 'https://www.rfa.org/english/news/vietnam/monk-ends-pilgrimage-06032024201943.html',
  },
  {
    _id: 'n11',
    slug: 'asianews-fate-wandering-monk-unknown-hanoi',
    title: 'AsiaNews: Fate of "Wandering Monk" Thich Minh Tue Unknown After Hanoi Intervention',
    excerpt: 'Sau khi chính quyền can thiệp và chấm dứt hành trình bộ hành, số phận của Thích Minh Tuệ trở thành chủ đề lo ngại quốc tế, với các nhà hoạt động nhân quyền kêu gọi điều tra.',
    body_vi: `Ngày 6 tháng 6 năm 2024, AsiaNews đăng bài phân tích về số phận bí ẩn của Thích Minh Tuệ sau khi chính quyền chấm dứt hành trình của ông.

Phiên bản chính thức cho rằng ông đã được "đưa đến nơi cần đến" — tức là địa chỉ đăng ký hộ khẩu tại Gia Lai. Nhưng Phil Robertson từ tổ chức Nhân quyền và Lao động châu Á gọi tuyên bố "tự nguyện rút lui" là "vô lý", phản ánh "nỗi sợ hãi của chính phủ đối với những công dân độc lập."

Nghị sĩ Mỹ Ta Duc Tri đã kêu gọi Ủy ban Tự do Tôn giáo Quốc tế Hoa Kỳ điều tra vụ việc. Lãnh đạo Phật giáo Thích Không Tánh nhận định Thầy có thể đang bị giam giữ hạn chế, tuy nhiên ông tin rằng Thầy sẽ không bị làm hại về thể chất.`,
    body_en: `On June 6, 2024, AsiaNews analyzed the mysterious fate of Thích Minh Tuệ following authorities' intervention to end his pilgrimage.

The official version stated he was "taken to the place where he was supposed to go" — his registered residence in Gia Lai province. Police were neither confirmed nor denied direct involvement, and an image circulated showing an officer collecting the monk's fingerprints.

Phil Robertson of Asia Human Rights and Labor called the "voluntary cessation" claim "ridiculous," arguing it reflects the government's paranoia about independent citizens. U.S. Congressman Ta Duc Tri appealed to the Commission on International Religious Freedom, requesting investigation into the "arbitrary" action.

Senior Buddhist leader Thích Không Tánh suggested Tuệ faced restrictions possibly involving solitary confinement, though he anticipated no physical harm. The case drew international scrutiny, highlighting the persistent tensions between Vietnam's communist government and independent religious communities.`,
    date: '2024-06-06',
    coverImage: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=1200',
    author: 'AsiaNews',
    readingTime: 6,
    tags: ['AsiaNews', 'nhân quyền', 'tự do tôn giáo', '2024'],
    sourceUrl: 'https://www.asianews.it/news-en/Fate-of-%27wandering-monk%27-Thich-Minh-Tue-unknown-after-Hanoi-intervention-60892.html',
  },
  {
    _id: 'n12',
    slug: 'rfa-barefoot-monk-enters-laos-december-2024',
    title: 'Radio Free Asia: Thich Minh Tue, Vietnam\'s "Barefoot Monk," Enters Laos on Pilgrimage to India',
    excerpt: 'Tháng 12 năm 2024, Thích Minh Tuệ bắt đầu cuộc hành hương quốc tế đến Ấn Độ, vượt cửa khẩu Bờ Y vào Lào cùng các sư đồng hành.',
    body_vi: `Ngày 13 tháng 12 năm 2024, RFA đưa tin Thích Minh Tuệ — nhà sư chân trần nổi tiếng trên internet của Việt Nam — đã bắt đầu cuộc hành hương đến Ấn Độ bằng cách vượt cửa khẩu quốc tế Bờ Y vào Lào.

Sự khởi hành này diễn ra sau nhiều tháng ông ở ẩn, sau khi chính quyền đã giải tán cuộc hành hương xuyên Việt của ông vào tháng 6. Một lá thư từ công ty của anh trai ông tiết lộ kế hoạch đi đến Ấn Độ.

Các nhà phân tích cho rằng việc cho phép ông rời đi phản ánh tính toán chiến lược của chính quyền: loại bỏ một "cái gai" trong nước trong khi tạo ra hình ảnh tích cực về tự do tôn giáo trước cộng đồng quốc tế.`,
    body_en: `On December 13, 2024, RFA reported that Thích Minh Tuệ — Vietnam's internet-famous "barefoot monk" — had begun his pilgrimage to India, crossing the Bờ Y International Border Gate into Laos with several fellow unofficial monks.

The departure came months after his cross-country pilgrimage was forcibly dispersed in June. A November letter from a company owned by his brother had disclosed the India plan. Supporters assisted with border procedures as the group crossed.

Analysts suggested the authorities' decision to allow his departure reflected a strategic calculation: removing a domestic "thorn in the side" while generating positive international optics regarding religious freedom. A Buddhist observer noted that his popularity had stemmed from appearing more authentic than state-sanctioned monks, thereby exposing moral failings in Vietnam's official Buddhist establishment.`,
    date: '2024-12-13',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
    author: 'Radio Free Asia',
    readingTime: 5,
    tags: ['RFA', 'hành hương', 'Lào', '2024'],
    sourceUrl: 'https://www.rfa.org/english/vietnam/2024/12/13/vietnam-thich-minh-tue-barefoot-monk-india-laos/',
  },
  {
    _id: 'n13',
    slug: 'buddhistdoor-embarks-pilgrimage-india-december-2024',
    title: 'Buddhistdoor Global: Renowned Vietnamese Buddhist Ascetic Thich Minh Tue Embarks on Pilgrimage to India',
    excerpt: 'Buddhistdoor Global ghi lại khoảnh khắc lịch sử khi Thích Minh Tuệ và năm sư đồng hành khởi hành từ Việt Nam, bắt đầu cuộc hành trình dài hàng nghìn kilômét đến các thánh địa Phật giáo ở Ấn Độ.',
    body_vi: `Ngày 16 tháng 12 năm 2024, Buddhistdoor Global đăng bài tường thuật về sự khởi hành của Thích Minh Tuệ và năm sư đồng hành từ Việt Nam, hướng đến các thánh địa Phật giáo tại Ấn Độ và Nepal.

Chuyến đi diễn ra sau khi chính quyền tỉnh Gia Lai đã hạn chế hoạt động khất thực công khai của ông do lo ngại an ninh và đám đông quá lớn. Tháng 7 năm 2024, ông thông báo tạm dừng, và tháng 11 gửi thư xác nhận quyết định.

Bài viết nhấn mạnh ảnh hưởng tích cực của Thích Minh Tuệ đối với Phật giáo Việt Nam: khuyến khích Phật tử tìm hiểu sâu hơn về kinh điển thay vì chỉ đến chùa lễ bái, đặc biệt trong bối cảnh nhiều vụ bê bối liên quan đến các tu sĩ được nhà nước công nhận.`,
    body_en: `On December 16, 2024, Buddhistdoor Global documented the historic departure of Thích Minh Tuệ and five fellow ascetic practitioners from Vietnam, beginning their pilgrimage to Buddhist sacred sites in India and Nepal.

The journey came after local Gia Lai Province authorities had restricted his public alms-round activities due to security concerns and overcrowding from admirers. In July 2024, Thich Minh Tue announced a suspension of activities; in November, he published a handwritten letter confirming this decision.

The article highlighted the positive influence Thích Minh Tuệ has had on Vietnamese Buddhism — encouraging practitioners to study canonical texts rather than merely making temple visits, standing as a counterpoint to recent scandals including the Ba Vang Pagoda fake hair relic controversy and monks with fabricated credentials. His departure marked the beginning of an extraordinary transnational pilgrimage across Laos, Thailand, Myanmar, Nepal, and beyond.`,
    date: '2024-12-16',
    coverImage: 'https://images.unsplash.com/photo-1544894079-e81a9eb97f48?w=1200',
    author: 'Buddhistdoor Global',
    readingTime: 6,
    tags: ['Buddhistdoor', 'Ấn Độ', 'hành hương quốc tế', '2024'],
    sourceUrl: 'https://www.buddhistdoor.net/news/renowned-vietnamese-buddhist-ascetic-thich-minh-tue-embarks-on-pilgrimage-to-india/',
  },
  {
    _id: 'n14',
    slug: 'rfa-explainer-monk-trek-india-2025',
    title: 'Radio Free Asia: Why Is an Internet-Famous Vietnamese Monk on a Trek to India?',
    excerpt: 'RFA giải thích toàn cảnh hành trình 2.700 km của Thích Minh Tuệ từ Việt Nam đến Ấn Độ — bao gồm cả những câu hỏi về áp lực chính trị đằng sau sự ra đi của ông.',
    body_vi: `Ngày 3 tháng 1 năm 2025, RFA đăng bài giải thích toàn diện về cuộc hành hương của Thích Minh Tuệ (tên thật Lê Anh Tú, sinh năm 1981) — người trở nên nổi tiếng khắp Việt Nam vào tháng 5 năm 2024 khi các nhà sáng tạo nội dung mạng xã hội ghi lại hành trình bộ hành chân trần của ông.

Bài viết đặt câu hỏi về sự kiện tháng 6 năm 2024 khi chính quyền đột kích trại của ông, giam giữ ông và những người theo dõi. Sau đó, những lá thư nhân danh ông tuyên bố ông sẽ từ bỏ khất thực để bảo vệ "an ninh, trật tự và an toàn chính trị xã hội" — điều mà những người ủng hộ nghi ngờ là bị ép buộc.

Điều đáng chú ý: người bạn đồng hành của ông trong chuyến đi này là Đoàn Văn Bảo — cựu quan chức an ninh chính phủ Việt Nam chuyên về chiến tranh tâm lý — gợi lên khả năng nhà nước có vai trò trong việc sắp xếp chuyến đi của ông.`,
    body_en: `On January 3, 2025, RFA published a comprehensive explainer on Thích Minh Tuệ's pilgrimage — a 2,700-kilometer barefoot journey from Vietnam through Thailand and Myanmar toward Buddhist sites in India.

The piece examined the contested June 2024 events when authorities raided his camp, prompting international calls for his release. Letters allegedly written by him afterward announced he would abandon alms-gathering to protect "security, order, and social and political safety" — claims supporters questioned as potentially coerced.

A notable detail: his companion on the journey is Doan Van Bau, a former Vietnamese government security official specializing in psychological operations, raising questions about possible state orchestration of his departure. Despite these murky circumstances, his pilgrimage continued to draw massive public attention, with Vietnamese social media still following his every step across international borders.`,
    date: '2025-01-03',
    coverImage: 'https://images.unsplash.com/photo-1519721086993-5e3c0d10c6f6?w=1200',
    author: 'Radio Free Asia',
    readingTime: 7,
    tags: ['RFA', 'Ấn Độ', 'phân tích', '2025'],
    sourceUrl: 'https://www.rfa.org/english/vietnam/2025/01/03/vietnam-monk-explainer/',
  },
  {
    _id: 'n15',
    slug: 'buddhistdoor-faces-challenges-pilgrimage-india',
    title: 'Buddhistdoor Global: Vietnamese Ascetic Thich Minh Tue Faces Challenges on Pilgrimage to India',
    excerpt: 'Sau hai tháng bộ hành qua Thái Lan, Thích Minh Tuệ đối mặt với hàng loạt thách thức: visa hết hạn, thời tiết khắc nghiệt, chấn thương và nguy cơ không thể vượt qua Myanmar.',
    body_vi: `Ngày 25 tháng 2 năm 2025, Buddhistdoor Global đăng bài cập nhật về những thử thách mà Thích Minh Tuệ đang đối mặt trên hành trình đến Ấn Độ, sau hơn hai tháng bộ hành qua Lào và Thái Lan.

Thầy và các sư đồng hành trung bình đi 20km mỗi ngày, mặc y vá nhiều màu và mang theo chiếc nồi cơm điện như bình bát. Visa Thái Lan sắp hết hạn mà chưa có phản hồi về gia hạn; mùa nóng đến cùng ô nhiễm không khí từ đốt đồng; một sư trong đoàn bị chấn thương đầu gối.

Thách thức lớn nhất: các chuyên gia an ninh ước tính chỉ có 1% cơ hội vượt qua Myanmar thành công do xung đột vũ trang liên tục sau đảo chính 2021. Thầy bình thản trước mọi trở ngại: "Hướng nào thuận lợi, con sẽ đi hướng đó."`,
    body_en: `On February 25, 2025, Buddhistdoor Global updated the challenges Thích Minh Tuệ faced on his pilgrimage to India after more than two months walking through Laos and Thailand.

The ascetic and companions averaged 20 kilometers daily. His Thai visa was expiring with no response to extension requests. The approaching hot season brought air pollution from agricultural burning, and one traveling monk sustained a knee injury. Most critically, security experts estimated only a 1 percent chance of successfully traversing Myanmar, where military conflict continued following the 2021 coup.

Describing his journey as "an act of gratitude to the Buddha," Thích Minh Tuệ stated: "I want to walk there to repay his gratitude and hope that all people in the world will be happy." Alternative routes were being considered, including flying to Sri Lanka or Bangladesh. Despite everything, his response to the obstacles was serene: "Whichever side is favorable, I'll walk there."`,
    date: '2025-02-25',
    coverImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200',
    author: 'Buddhistdoor Global',
    readingTime: 6,
    tags: ['Buddhistdoor', 'Thái Lan', 'thử thách', '2025'],
    sourceUrl: 'https://www.buddhistdoor.net/news/vietnamese-ascetic-thich-minh-tue-faces-challenges-on-pilgrimage-to-india/',
  },
  {
    _id: 'n16',
    slug: 'lionsroar-the-walking-monk-march-2025',
    title: "Lion's Roar: Thich Minh Tue — The Walking Monk",
    excerpt: 'Tạp chí Phật giáo uy tín Lion\'s Roar phân tích sâu về hiện tượng Thích Minh Tuệ trong bối cảnh Việt Nam hiện đại — từ căng thẳng tâm linh đến sự đối lập với chủ nghĩa vật chất.',
    body_vi: `Tháng 3 năm 2025, tạp chí Phật giáo Lion's Roar — một trong những tạp chí Phật giáo uy tín nhất thế giới — đăng bài phân tích toàn diện về Thích Minh Tuệ, do tác giả Nguyệt B. Hồ thực hiện.

Bài viết đặt hành trình của Thầy trong bối cảnh lịch sử rộng lớn hơn: Việt Nam sau nhiều thập kỷ phát triển kinh tế theo mô hình tư bản, vật chất phát triển nhưng đói khát tâm linh vẫn âm ỉ. Các vụ bê bối tham nhũng lớn càng tăng cường sự hoài nghi của công chúng đối với chủ nghĩa vật chất và giới tinh hoa.

Tác giả so sánh Thầy với các nhân vật Phật giáo kháng cự lịch sử như Thích Nhất Hạnh và Thích Quảng Đức — những người đã trở thành biểu tượng trong cuộc đấu tranh chống lại quyền lực nhà nước. Hành trình của Thích Minh Tuệ, theo bài viết, hiện thân cho sự căng thẳng dai dẳng của Việt Nam giữa nhu cầu vật chất và sự thỏa mãn tâm linh.`,
    body_en: `In March 2025, Lion's Roar — one of the world's most respected Buddhist publications — ran a comprehensive analysis of Thích Minh Tuệ by author Nguyet B. Ho.

The piece contextualizes his journey within modern Vietnam: despite decades of capitalist development and pervasive consumer culture following the Cold War, spiritual hunger persists. Recent major corruption scandals have intensified public skepticism toward materialism and the elite.

The article draws comparisons to historical Buddhist resistance figures: Thich Nhat Hanh and Thich Quang Duc, whose struggles against state authority became defining moments in Vietnamese history. The author explores how Minh Tue's emergence reflects these deeper tensions — a country officially communist yet enthralled by capitalism, officially Buddhist yet presiding over a state-sanctioned religious apparatus many find hollow.

The piece concludes with Buddhist symbolism — the lotus flower and the "middle path" — suggesting that Thích Minh Tuệ's journey embodies Vietnam's ongoing search for meaning between material necessity and spiritual fulfillment.`,
    date: '2025-03-06',
    coverImage: 'https://images.unsplash.com/photo-1570213489059-0aac6626cade?w=1200',
    author: "Lion's Roar",
    readingTime: 8,
    tags: ["Lion's Roar", 'phân tích', 'tâm linh', '2025'],
    sourceUrl: 'https://www.lionsroar.com/thich-minh-tue-the-walking-monk/',
  },
  {
    _id: 'n17',
    slug: 'buddhistdoor-adjusts-route-malaysia-march-2025',
    title: 'Buddhistdoor Global: Vietnamese Ascetic Thich Minh Tue Adjusts Pilgrimage Route Amid Challenges',
    excerpt: 'Không thể vượt Myanmar vì xung đột vũ trang, Thích Minh Tuệ và đoàn sư đã thay đổi lộ trình, vượt biên sang Malaysia vào đầu tháng 3 năm 2025.',
    body_vi: `Ngày 13 tháng 3 năm 2025, Buddhistdoor Global đưa tin Thích Minh Tuệ và đoàn đã phải điều chỉnh lộ trình hành hương sau khi không thể xin phép vượt qua Myanmar đang có xung đột vũ trang.

Đoàn đã rời miền bắc Thái Lan bằng xe buýt vào ngày 5 tháng 3, vượt biên sang Malaysia tại cửa khẩu Sadao. Một sư trong đoàn giải thích: "Chúng tôi sợ rằng nếu quay lại Lào, chúng tôi sẽ không thể nhập cảnh lại Thái Lan."

Lộ trình tiếp theo vẫn chưa chắc chắn, có thể đi đường biển đến Ấn Độ hoặc Sri Lanka, dù các chuyến phà không thường xuyên làm phức tạp thêm lựa chọn này. Hành trình của Thầy tiếp tục thu hút sự chú ý trên mạng xã hội Việt Nam, mặc dù truyền thông nhà nước trước đó đã chỉ trích việc đưa tin về ông.`,
    body_en: `On March 13, 2025, Buddhistdoor Global reported that Thích Minh Tuệ and his group had adjusted their pilgrimage route after failing to secure permission to cross Myanmar amid ongoing civil conflict following the 2021 coup.

The pilgrims departed northern Thailand by bus on March 5, crossing the border into Malaysia at Sadao. A traveling monk, Phuc Giac, explained the decision: "We were afraid that if we went to Laos, we would not be able to re-enter Thailand."

Their subsequent route remained uncertain — possibly involving sea passage to India or Sri Lanka, though irregular ferry services complicated this option. The journey continued to go viral on Vietnamese social media, even as the Vietnamese state media had previously criticized coverage of him and officials had claimed he "voluntarily retired" from monastic life.`,
    date: '2025-03-13',
    coverImage: 'https://images.unsplash.com/photo-1557939574-a2f28f4e3aa3?w=1200',
    author: 'Buddhistdoor Global',
    readingTime: 5,
    tags: ['Buddhistdoor', 'Malaysia', 'lộ trình', '2025'],
    sourceUrl: 'https://www.buddhistdoor.net/news/vietnamese-ascetic-thich-minh-tue-adjusts-pilgrimage-route-amid-challenges/',
  },
  {
    _id: 'n18',
    slug: 'economynext-sri-lanka-obstacles-april-2025',
    title: 'EconomyNext: Vietnam\'s Famed Walking Ascetic Minh Tuệ in Sri Lanka Amid Obstacles',
    excerpt: 'Thích Minh Tuệ đến Sri Lanka vào tháng 4 năm 2025, nhưng ngay lập tức gặp phải sự phản đối từ một số tu sĩ Phật giáo địa phương và vấn đề visa du lịch cho việc đi bộ trên đường.',
    body_vi: `Ngày 18 tháng 4 năm 2025, EconomyNext đưa tin về những khó khăn mà Thích Minh Tuệ gặp phải tại Sri Lanka, nơi ông đến vào ngày 12 tháng 4 cùng hơn 30 người theo dõi sau khi không thể vào Myanmar.

Một vị sư cao cấp từ chùa Ambarukkarama cho biết các chùa đã từ chối tiếp đón nhóm sau khi nhận được liên lạc từ một nhà sư Sri Lanka khác. Tuy nhiên, các sư hộ tống vẫn chọn ở lại với đoàn, mô tả họ là "vô hại, có trách nhiệm và hành xử với kỷ luật cao."

Mặc dù những khó khăn này, Thầy vẫn bình thản và tiếp tục hướng đến mục tiêu của mình. "Hành trình của con là cuộc đi bộ suốt đời," ông nói, nhấn mạnh việc thực hành chứ không phải giảng dạy.`,
    body_en: `On April 18, 2025, EconomyNext reported on difficulties Thích Minh Tuệ encountered in Sri Lanka, where he arrived on April 12 with over 30 followers after being unable to enter Myanmar.

A senior monk from Ambarukkarama Temple reported that temples had refused accommodations following communications from another Sri Lankan monk. Despite this, supporting monks chose to accompany the group, describing them as "harmless, responsible and act with much discipline."

Complications emerged around tourist visa regulations for walking on public roads and immigration inquiries initiated by Buddhist authorities. The group received temporary shelter at a temple northeast of Colombo but faced restrictions on movement.

Thích Minh Tuệ remained focused on his spiritual journey. "My journey is a lifelong walk," he stated — emphasizing practice over preaching, as he had done throughout his years of walking across Vietnam and beyond.`,
    date: '2025-04-18',
    coverImage: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200',
    author: 'EconomyNext',
    readingTime: 5,
    tags: ['Sri Lanka', 'hành hương', 'thử thách', '2025'],
    sourceUrl: 'https://economynext.com/vietnams-famed-walking-ascetic-minh-tue-in-sri-lanka-amid-obstacles-216441/',
  },
  {
    _id: 'n19',
    slug: 'rfa-sri-lanka-forced-cut-short-india-april-2025',
    title: 'Radio Free Asia: Vietnamese Monk Forced to Cut Short His Walk Through Sri Lanka, Heads to India',
    excerpt: 'Cảnh sát Sri Lanka đã ngăn Thích Minh Tuệ tiếp tục bộ hành, viện dẫn thư của Giáo hội Phật giáo Việt Nam mô tả ông là mối đe dọa an ninh. Ông quyết định tiến thẳng đến Ấn Độ.',
    body_vi: `Ngày 24 tháng 4 năm 2025, RFA đưa tin Thích Minh Tuệ đã bị cảnh sát Sri Lanka buộc phải dừng cuộc hành hương, sau khi nhà chức trách nước này nhận được thư từ Giáo hội Phật giáo Việt Nam mô tả ông là "mối đe dọa đối với trật tự công cộng."

Đoàn được tạm trú tại một ngôi chùa ở đông bắc Colombo nhưng bị hạn chế đi lại. Một người thân cận với Thầy cho biết: "Họ không cho phép chúng tôi tiếp tục đi bộ trên đường."

Thay vì chờ đợi, Thầy quyết định tiến thẳng đến Ấn Độ. Ông dự kiến đến New Delhi vào thứ Sáu và sau đó đến Bodh Gaya — nơi đức Phật đạt giác ngộ — để tiếp tục cuộc hành hương chân trần. Quyết định của Giáo hội Phật giáo Việt Nam trong việc cản trở ông ở nước ngoài đã gây ra làn sóng phẫn nộ trong cộng đồng mạng.`,
    body_en: `On April 24, 2025, RFA reported that Thích Minh Tuệ had been stopped by Sri Lankan police after authorities received a letter from Vietnam's state-sanctioned Buddhist sangha describing him as a threat to public order — an extraordinary intervention by a national religious body against a pilgrim abroad.

The group received temporary shelter at a temple northeast of Colombo but faced restrictions on movement. They could receive visitors and food donations but were barred from continuing on the road. A close associate stated: "They don't give us a green light to resume walking."

Rather than wait, the group decided to proceed immediately to India. Thích Minh Tuệ was expected to arrive in New Delhi within days and subsequently travel to Bodh Gaya — the site where the Buddha achieved enlightenment — to resume his barefoot walk. The Vietnamese Buddhist sangha's decision to intervene against him internationally sparked a fresh wave of criticism on social media.`,
    date: '2025-04-24',
    coverImage: 'https://images.unsplash.com/photo-1544894079-e81a9eb97f48?w=1200',
    author: 'Radio Free Asia',
    readingTime: 5,
    tags: ['RFA', 'Sri Lanka', 'Ấn Độ', 'Bodh Gaya', '2025'],
    sourceUrl: 'https://www.rfa.org/english/vietnam/2025/04/24/vietnam-buddhist-monk-india-barefoot-pilgrimage/',
  },
  {
    _id: 'n20',
    slug: 'thevietnamese-faith-and-control-2025',
    title: 'The Vietnamese Magazine: Monk Thích Minh Tuệ and the Boundaries Between Faith and Control',
    excerpt: 'Tạp chí The Vietnamese phân tích mối quan hệ phức tạp giữa hành trình tâm linh của Thích Minh Tuệ và sự kiểm soát của nhà nước Việt Nam đối với tự do tôn giáo.',
    body_vi: `Tháng 10 năm 2025, The Vietnamese Magazine — tạp chí độc lập chuyên về nhân quyền và xã hội dân sự Việt Nam — đăng bài phân tích của tác giả Hà Đăng về ranh giới giữa đức tin và kiểm soát trong trường hợp Thích Minh Tuệ.

Bài viết mô tả ông là người thực hành nghiêm túc 13 pháp khổ hạnh Dhuta — bao gồm khất thực, ăn một bữa trước giờ Ngọ, và ngủ ở những nơi hẻo lánh hoặc trong hoang dã. Từ ngày 12 tháng 12 năm 2024, ông và năm sư đồng hành đã bộ hành từ cửa khẩu Bờ Y hướng đến các thánh địa Phật giáo tại Ấn Độ.

Bài viết đặt hành trình này trong bối cảnh tự do tôn giáo và nhân quyền tại Việt Nam — nêu bật các giới hạn mà chính quyền đặt ra đối với hoạt động tôn giáo độc lập, ngay cả khi người thực hành không có ý định chính trị nào.`,
    body_en: `In October 2025, The Vietnamese Magazine — an independent publication focused on human rights and civil society in Vietnam — published Hà Đăng's analysis of the boundaries between faith and control in the case of Thích Minh Tuệ.

The article describes him as a rigorous practitioner of the thirteen dhuta disciplines — an austere monastic tradition including walking for alms, eating only one meal before noon, and sleeping in secluded or wilderness locations. On December 12, 2024, he and five fellow monks began a walking pilgrimage from the Bờ Y border gate toward Buddhist sacred sites in India.

The piece contextualizes his journey within Vietnam's record on religious freedom and human rights — highlighting the constraints authorities place on independent religious activity, even when the practitioner has no political intentions. The story of Thích Minh Tuệ, the article argues, reveals the fundamental tension at the heart of religious life in contemporary Vietnam.`,
    date: '2025-10-21',
    coverImage: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?w=1200',
    author: 'The Vietnamese Magazine',
    readingTime: 7,
    tags: ['nhân quyền', 'tự do tôn giáo', 'phân tích', '2025'],
    sourceUrl: 'https://thevietnamese.org/2025/10/monk-thich-minh-tue-and-the-boundaries-between-faith-and-control/',
  },
]
