import { Lesson } from '@/types/lesson';

export const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'First Words',
    description: 'Greetings, introductions, and saying goodbye.',
    theme: 'introductions',
    phase: 'speaking',
    order: 1,
    subLessons: [
      {
        id: 'sl-1-1', title: 'Hello',
        sentences: [
          { id: 's-1-1-1', korean: '안녕하세요.', romanization: 'annyeonghaseyo', english: 'Hello.', audioUrl: '' },
          { id: 's-1-1-2', korean: '안녕하세요, 만나서 반갑습니다.', romanization: 'annyeonghaseyo, mannaseo bangapseumnida', english: 'Hello, nice to meet you.', audioUrl: '' },
          { id: 's-1-1-3', korean: '안녕하세요, 잘 지내세요?', romanization: 'annyeonghaseyo, jal jinaeseyo?', english: 'Hello, how are you?', audioUrl: '' },
          { id: 's-1-1-4', korean: '네, 잘 지내요. 감사합니다.', romanization: 'ne, jal jinaeyo. gamsahamnida', english: "Yes, I'm doing well. Thank you.", audioUrl: '' },
        ],
      },
      {
        id: 'sl-1-2', title: 'My Name Is...',
        sentences: [
          { id: 's-1-2-1', korean: '제 이름은 _입니다.', romanization: 'je ireumeun _imnida', english: 'My name is _.', audioUrl: '' },
          { id: 's-1-2-2', korean: '이름이 뭐예요?', romanization: 'ireumi mwoyeyo?', english: 'What is your name?', audioUrl: '' },
          { id: 's-1-2-3', korean: '만나서 반갑습니다.', romanization: 'mannaseo bangapseumnida', english: 'Nice to meet you.', audioUrl: '' },
          { id: 's-1-2-4', korean: '저는 학생입니다.', romanization: 'jeoneun haksaengimnida', english: 'I am a student.', audioUrl: '' },
          { id: 's-1-2-5', korean: '저는 한국어를 배우고 있어요.', romanization: 'jeoneun hangugeo-reul baeugo isseoyo', english: 'I am learning Korean.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-1-3', title: 'Goodbye',
        sentences: [
          { id: 's-1-3-1', korean: '안녕히 가세요.', romanization: 'annyeonghi gaseyo', english: 'Goodbye. (to someone leaving)', audioUrl: '' },
          { id: 's-1-3-2', korean: '안녕히 계세요.', romanization: 'annyeonghi gyeseyo', english: 'Goodbye. (to someone staying)', audioUrl: '' },
          { id: 's-1-3-3', korean: '다음에 봐요.', romanization: 'daeume bwayo', english: 'See you next time.', audioUrl: '' },
          { id: 's-1-3-4', korean: '나중에 봐요.', romanization: 'najunge bwayo', english: 'See you later.', audioUrl: '' },
          { id: 's-1-3-5', korean: '잘 가요!', romanization: 'jal gayo!', english: 'Bye! (casual)', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-2',
    title: 'Thank You & Sorry',
    description: 'Essential polite expressions — gratitude and apologies.',
    theme: 'politeness',
    phase: 'speaking',
    order: 2,
    subLessons: [
      {
        id: 'sl-2-1', title: 'Thank You',
        sentences: [
          { id: 's-2-1-1', korean: '감사합니다.', romanization: 'gamsahamnida', english: 'Thank you. (formal)', audioUrl: '' },
          { id: 's-2-1-2', korean: '고마워요.', romanization: 'gomawoyo', english: 'Thanks. (casual polite)', audioUrl: '' },
          { id: 's-2-1-3', korean: '정말 감사합니다.', romanization: 'jeongmal gamsahamnida', english: 'Thank you very much.', audioUrl: '' },
          { id: 's-2-1-4', korean: '도와주셔서 감사합니다.', romanization: 'dowajusyeoseo gamsahamnida', english: 'Thank you for helping me.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-2-2', title: 'Sorry & Excuse Me',
        sentences: [
          { id: 's-2-2-1', korean: '죄송합니다.', romanization: 'joesonghamnida', english: "I'm sorry. (formal)", audioUrl: '' },
          { id: 's-2-2-2', korean: '미안해요.', romanization: 'mianhaeyo', english: 'Sorry. (casual polite)', audioUrl: '' },
          { id: 's-2-2-3', korean: '실례합니다.', romanization: 'sillyehamnida', english: 'Excuse me.', audioUrl: '' },
          { id: 's-2-2-4', korean: '괜찮아요.', romanization: 'gwaenchanayo', english: "It's okay. / No problem.", audioUrl: '' },
          { id: 's-2-2-5', korean: '괜찮아요, 걱정 마세요.', romanization: 'gwaenchanayo, geokjeong maseyo', english: "It's okay, don't worry.", audioUrl: '' },
        ],
      },
      {
        id: 'sl-2-3', title: "You're Welcome",
        sentences: [
          { id: 's-2-3-1', korean: '아니에요.', romanization: 'anieyo', english: "Not at all. / You're welcome.", audioUrl: '' },
          { id: 's-2-3-2', korean: '별말씀을요.', romanization: 'byeolmalsseumeulyo', english: "Don't mention it.", audioUrl: '' },
          { id: 's-2-3-3', korean: '천만에요.', romanization: 'cheonmaneyo', english: "You're welcome.", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-3',
    title: 'At the Café',
    description: 'Order drinks and chat at a Korean café.',
    theme: 'café',
    phase: 'speaking',
    order: 3,
    subLessons: [
      {
        id: 'sl-3-1', title: 'Ordering',
        sentences: [
          { id: 's-3-1-1', korean: '메뉴 주세요.', romanization: 'menyu juseyo', english: 'Menu, please.', audioUrl: '' },
          { id: 's-3-1-2', korean: '커피 한 잔 주세요.', romanization: 'keopi han jan juseyo', english: 'One coffee, please.', audioUrl: '' },
          { id: 's-3-1-3', korean: '아이스 아메리카노 주세요.', romanization: 'aiseu amerikano juseyo', english: 'Iced americano, please.', audioUrl: '' },
          { id: 's-3-1-4', korean: '뜨거운 거요.', romanization: 'tteugeoun geoyo', english: 'Hot one, please.', audioUrl: '' },
          { id: 's-3-1-5', korean: '이거 얼마예요?', romanization: 'igeo eolmayeyo?', english: 'How much is this?', audioUrl: '' },
        ],
      },
      {
        id: 'sl-3-2', title: 'At the Table',
        sentences: [
          { id: 's-3-2-1', korean: '여기 앉아도 돼요?', romanization: 'yeogi anjado dwaeyo?', english: 'Can I sit here?', audioUrl: '' },
          { id: 's-3-2-2', korean: '물 좀 주세요.', romanization: 'mul jom juseyo', english: 'Water, please.', audioUrl: '' },
          { id: 's-3-2-3', korean: '화장실이 어디예요?', romanization: 'hwajangsiri eodiyeyo?', english: 'Where is the restroom?', audioUrl: '' },
          { id: 's-3-2-4', korean: '맛있어요!', romanization: 'masisseoyo!', english: "It's delicious!", audioUrl: '' },
        ],
      },
      {
        id: 'sl-3-3', title: 'Paying',
        sentences: [
          { id: 's-3-3-1', korean: '계산해 주세요.', romanization: 'gyesanhae juseyo', english: 'Check, please.', audioUrl: '' },
          { id: 's-3-3-2', korean: '카드로 할게요.', romanization: 'kadeuro halgeyo', english: "I'll pay by card.", audioUrl: '' },
          { id: 's-3-3-3', korean: '현금으로 할게요.', romanization: 'hyeongeumuro halgeyo', english: "I'll pay with cash.", audioUrl: '' },
          { id: 's-3-3-4', korean: '영수증 주세요.', romanization: 'yeongsujeung juseyo', english: 'Receipt, please.', audioUrl: '' },
          { id: 's-3-3-5', korean: '잘 먹었습니다.', romanization: 'jal meogeosseumnida', english: 'Thank you for the meal.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-4',
    title: 'Numbers & Counting',
    description: 'Count in Korean — for people, things, and time.',
    theme: 'numbers',
    phase: 'speaking',
    order: 4,
    subLessons: [
      {
        id: 'sl-4-1', title: 'Sino-Korean Numbers',
        sentences: [
          { id: 's-4-1-1', korean: '일, 이, 삼, 사, 오', romanization: 'il, i, sam, sa, o', english: 'One, two, three, four, five', audioUrl: '' },
          { id: 's-4-1-2', korean: '전화번호가 뭐예요?', romanization: 'jeonhwabeonhoga mwoyeyo?', english: 'What is your phone number?', audioUrl: '' },
          { id: 's-4-1-3', korean: '삼천 원이에요.', romanization: 'samcheon wonieyo', english: "It's 3,000 won.", audioUrl: '' },
        ],
      },
      {
        id: 'sl-4-2', title: 'Native Korean Numbers',
        sentences: [
          { id: 's-4-2-1', korean: '하나, 둘, 셋, 넷, 다섯', romanization: 'hana, dul, set, net, daseot', english: 'One, two, three, four, five (Native)', audioUrl: '' },
          { id: 's-4-2-2', korean: '사람 두 명이요.', romanization: 'saram du myeong-iyo', english: 'Two people, please.', audioUrl: '' },
          { id: 's-4-2-3', korean: '커피 세 잔 주세요.', romanization: 'keopi se jan juseyo', english: 'Three coffees, please.', audioUrl: '' },
          { id: 's-4-2-4', korean: '지금 몇 시예요?', romanization: 'jigeum myeot siyeyo?', english: 'What time is it now?', audioUrl: '' },
          { id: 's-4-2-5', korean: '세 시 삼십 분이에요.', romanization: 'se si samsip bunieyo', english: "It's 3:30.", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-5',
    title: 'Getting Around',
    description: 'Directions, taxis, and navigating the city.',
    theme: 'directions',
    phase: 'speaking',
    order: 5,
    subLessons: [
      {
        id: 'sl-5-1', title: 'Asking Directions',
        sentences: [
          { id: 's-5-1-1', korean: '길을 잃었어요.', romanization: 'gireul ilheosseoyo', english: "I'm lost.", audioUrl: '' },
          { id: 's-5-1-2', korean: '여기가 어디예요?', romanization: 'yeogiga eodiyeyo?', english: 'Where is this place?', audioUrl: '' },
          { id: 's-5-1-3', korean: '지하철역이 어디예요?', romanization: 'jihacheollyeogi eodiyeyo?', english: 'Where is the subway station?', audioUrl: '' },
          { id: 's-5-1-4', korean: '오른쪽으로 가세요.', romanization: 'oreunjjogeuro gaseyo', english: 'Go to the right.', audioUrl: '' },
          { id: 's-5-1-5', korean: '왼쪽으로 가세요.', romanization: 'oenjjogeuro gaseyo', english: 'Go to the left.', audioUrl: '' },
          { id: 's-5-1-6', korean: '직진하세요.', romanization: 'jikjinhaseyo', english: 'Go straight.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-5-2', title: 'Taking a Taxi',
        sentences: [
          { id: 's-5-2-1', korean: '택시 타고 싶어요.', romanization: 'taeksi tago sipeoyo', english: 'I want to take a taxi.', audioUrl: '' },
          { id: 's-5-2-2', korean: '여기로 가 주세요.', romanization: 'yeogiro ga juseyo', english: 'Please go here.', audioUrl: '' },
          { id: 's-5-2-3', korean: '얼마나 걸려요?', romanization: 'eolmana geollyeoyo?', english: 'How long does it take?', audioUrl: '' },
          { id: 's-5-2-4', korean: '여기서 세워 주세요.', romanization: 'yeogiseo sewo juseyo', english: 'Please stop here.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-6',
    title: 'Family',
    description: 'Talking about your family and asking about others.',
    theme: 'family',
    phase: 'speaking',
    order: 6,
    subLessons: [
      {
        id: 'sl-6-1', title: 'Immediate Family',
        sentences: [
          { id: 's-6-1-1', korean: '가족이 몇 명이에요?', romanization: 'gajogi myeot myeong-ieyo?', english: 'How many people are in your family?', audioUrl: '' },
          { id: 's-6-1-2', korean: '저는 네 명이에요.', romanization: 'jeoneun ne myeong-ieyo', english: "There are four of us.", audioUrl: '' },
          { id: 's-6-1-3', korean: '어머니는 선생님이에요.', romanization: 'eomeonineun seonsaengnimieyo', english: 'My mother is a teacher.', audioUrl: '' },
          { id: 's-6-1-4', korean: '아버지는 회사원이에요.', romanization: 'abeojineun hoesawonieyo', english: 'My father is an office worker.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-6-2', title: 'Siblings',
        sentences: [
          { id: 's-6-2-1', korean: '형제가 있어요?', romanization: 'hyeongjega isseoyo?', english: 'Do you have siblings?', audioUrl: '' },
          { id: 's-6-2-2', korean: '언니가 한 명 있어요.', romanization: 'eonniga han myeong isseoyo', english: 'I have one older sister.', audioUrl: '' },
          { id: 's-6-2-3', korean: '동생이 두 명 있어요.', romanization: 'dongsaengi du myeong isseoyo', english: 'I have two younger siblings.', audioUrl: '' },
          { id: 's-6-2-4', korean: '저는 외동이에요.', romanization: 'jeoneun oedong-ieyo', english: "I'm an only child.", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-7',
    title: 'Food & Eating',
    description: 'Ordering food, expressing preferences, and restaurant basics.',
    theme: 'food',
    phase: 'speaking',
    order: 7,
    subLessons: [
      {
        id: 'sl-7-1', title: 'At the Restaurant',
        sentences: [
          { id: 's-7-1-1', korean: '배고파요.', romanization: 'baegopayo', english: "I'm hungry.", audioUrl: '' },
          { id: 's-7-1-2', korean: '뭐 먹을까요?', romanization: 'mwo meogeulkkayo?', english: 'What shall we eat?', audioUrl: '' },
          { id: 's-7-1-3', korean: '비빔밥 하나 주세요.', romanization: 'bibimbap hana juseyo', english: 'One bibimbap, please.', audioUrl: '' },
          { id: 's-7-1-4', korean: '매운 거 좋아해요.', romanization: 'maeun geo joahaeyo', english: 'I like spicy food.', audioUrl: '' },
          { id: 's-7-1-5', korean: '안 매운 거 있어요?', romanization: 'an maeun geo isseoyo?', english: 'Do you have something not spicy?', audioUrl: '' },
        ],
      },
      {
        id: 'sl-7-2', title: 'Taste & Opinions',
        sentences: [
          { id: 's-7-2-1', korean: '이거 정말 맛있어요.', romanization: 'igeo jeongmal masisseoyo', english: 'This is really delicious.', audioUrl: '' },
          { id: 's-7-2-2', korean: '좀 짜요.', romanization: 'jom jjayo', english: "It's a bit salty.", audioUrl: '' },
          { id: 's-7-2-3', korean: '배불러요.', romanization: 'baebulleoyo', english: "I'm full.", audioUrl: '' },
          { id: 's-7-2-4', korean: '잘 먹겠습니다.', romanization: 'jal meokgesseumnida', english: "I'll eat well. (said before eating)", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-8',
    title: 'Shopping',
    description: 'Buying things, asking prices, and sizes.',
    theme: 'shopping',
    phase: 'speaking',
    order: 8,
    subLessons: [
      {
        id: 'sl-8-1', title: 'Browsing',
        sentences: [
          { id: 's-8-1-1', korean: '이거 얼마예요?', romanization: 'igeo eolmayeyo?', english: 'How much is this?', audioUrl: '' },
          { id: 's-8-1-2', korean: '좀 비싸요.', romanization: 'jom bissayo', english: "It's a bit expensive.", audioUrl: '' },
          { id: 's-8-1-3', korean: '깎아 주세요.', romanization: 'kkakka juseyo', english: 'Please give me a discount.', audioUrl: '' },
          { id: 's-8-1-4', korean: '다른 색 있어요?', romanization: 'dareun saek isseoyo?', english: 'Do you have another color?', audioUrl: '' },
          { id: 's-8-1-5', korean: '이거 입어 봐도 돼요?', romanization: 'igeo ibeo bwado dwaeyo?', english: 'Can I try this on?', audioUrl: '' },
        ],
      },
      {
        id: 'sl-8-2', title: 'Buying',
        sentences: [
          { id: 's-8-2-1', korean: '이거 살게요.', romanization: 'igeo salgeyo', english: "I'll buy this.", audioUrl: '' },
          { id: 's-8-2-2', korean: '봉투 주세요.', romanization: 'bongtu juseyo', english: 'A bag, please.', audioUrl: '' },
          { id: 's-8-2-3', korean: '교환할 수 있어요?', romanization: 'gyohwanhal su isseoyo?', english: 'Can I exchange this?', audioUrl: '' },
          { id: 's-8-2-4', korean: '환불해 주세요.', romanization: 'hwanbulhae juseyo', english: 'Please give me a refund.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-9',
    title: 'Weather & Seasons',
    description: 'Talk about weather and seasons in Korean.',
    theme: 'weather',
    phase: 'speaking',
    order: 9,
    subLessons: [
      {
        id: 'sl-9-1', title: 'Weather Today',
        sentences: [
          { id: 's-9-1-1', korean: '오늘 날씨가 좋아요.', romanization: 'oneul nalssiga joayo', english: 'The weather is nice today.', audioUrl: '' },
          { id: 's-9-1-2', korean: '비가 와요.', romanization: 'biga wayo', english: "It's raining.", audioUrl: '' },
          { id: 's-9-1-3', korean: '눈이 와요.', romanization: 'nuni wayo', english: "It's snowing.", audioUrl: '' },
          { id: 's-9-1-4', korean: '오늘 너무 더워요.', romanization: 'oneul neomu deowoyo', english: "It's so hot today.", audioUrl: '' },
          { id: 's-9-1-5', korean: '오늘 너무 추워요.', romanization: 'oneul neomu chuwoyo', english: "It's so cold today.", audioUrl: '' },
        ],
      },
      {
        id: 'sl-9-2', title: 'Seasons',
        sentences: [
          { id: 's-9-2-1', korean: '봄이 좋아요.', romanization: 'bomi joayo', english: 'I like spring.', audioUrl: '' },
          { id: 's-9-2-2', korean: '여름에 바다에 가요.', romanization: 'yeoreume badae gayo', english: 'I go to the beach in summer.', audioUrl: '' },
          { id: 's-9-2-3', korean: '가을 단풍이 예뻐요.', romanization: 'gaeul danpungi yeppeoyo', english: 'The autumn leaves are beautiful.', audioUrl: '' },
          { id: 's-9-2-4', korean: '겨울에 스키 타요.', romanization: 'gyeoure seuki tayo', english: 'I ski in winter.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-10',
    title: 'Feelings & Emotions',
    description: 'Express how you feel in Korean.',
    theme: 'feelings',
    phase: 'speaking',
    order: 10,
    subLessons: [
      {
        id: 'sl-10-1', title: 'How Are You Feeling?',
        sentences: [
          { id: 's-10-1-1', korean: '기분이 좋아요.', romanization: 'gibuni joayo', english: 'I feel good.', audioUrl: '' },
          { id: 's-10-1-2', korean: '피곤해요.', romanization: 'pigonhaeyo', english: "I'm tired.", audioUrl: '' },
          { id: 's-10-1-3', korean: '슬퍼요.', romanization: 'seulpeoyo', english: "I'm sad.", audioUrl: '' },
          { id: 's-10-1-4', korean: '행복해요.', romanization: 'haengbokhaeyo', english: "I'm happy.", audioUrl: '' },
          { id: 's-10-1-5', korean: '화가 나요.', romanization: 'hwaga nayo', english: "I'm angry.", audioUrl: '' },
        ],
      },
      {
        id: 'sl-10-2', title: 'Asking About Others',
        sentences: [
          { id: 's-10-2-1', korean: '괜찮아요?', romanization: 'gwaenchanayo?', english: 'Are you okay?', audioUrl: '' },
          { id: 's-10-2-2', korean: '무슨 일 있어요?', romanization: 'museun il isseoyo?', english: 'Is something wrong?', audioUrl: '' },
          { id: 's-10-2-3', korean: '걱정하지 마세요.', romanization: 'geokjeonghaji maseyo', english: "Don't worry.", audioUrl: '' },
          { id: 's-10-2-4', korean: '힘내세요!', romanization: 'himnaeseyo!', english: 'Cheer up! / Stay strong!', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-11',
    title: 'Daily Routine',
    description: 'Talk about what you do every day.',
    theme: 'daily-routine',
    phase: 'speaking',
    order: 11,
    subLessons: [
      {
        id: 'sl-11-1', title: 'Morning',
        sentences: [
          { id: 's-11-1-1', korean: '아침에 일어나요.', romanization: 'achime ireonayo', english: 'I wake up in the morning.', audioUrl: '' },
          { id: 's-11-1-2', korean: '세수하고 이를 닦아요.', romanization: 'sesuhago ireul dakkayo', english: 'I wash my face and brush my teeth.', audioUrl: '' },
          { id: 's-11-1-3', korean: '아침 먹어요.', romanization: 'achim meogeoyo', english: 'I eat breakfast.', audioUrl: '' },
          { id: 's-11-1-4', korean: '회사에 가요.', romanization: 'hoesae gayo', english: 'I go to the office.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-11-2', title: 'Evening',
        sentences: [
          { id: 's-11-2-1', korean: '집에 와요.', romanization: 'jibe wayo', english: 'I come home.', audioUrl: '' },
          { id: 's-11-2-2', korean: '저녁 먹어요.', romanization: 'jeonyeok meogeoyo', english: 'I eat dinner.', audioUrl: '' },
          { id: 's-11-2-3', korean: '텔레비전을 봐요.', romanization: 'tellebijeon-eul bwayo', english: 'I watch TV.', audioUrl: '' },
          { id: 's-11-2-4', korean: '열한 시에 자요.', romanization: 'yeolhan sie jayo', english: 'I sleep at 11.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-12',
    title: 'Hobbies',
    description: 'Talk about hobbies and free time activities.',
    theme: 'hobbies',
    phase: 'speaking',
    order: 12,
    subLessons: [
      {
        id: 'sl-12-1', title: 'What Do You Like?',
        sentences: [
          { id: 's-12-1-1', korean: '취미가 뭐예요?', romanization: 'chwimiga mwoyeyo?', english: 'What is your hobby?', audioUrl: '' },
          { id: 's-12-1-2', korean: '운동을 좋아해요.', romanization: 'undongeul joahaeyo', english: 'I like exercising.', audioUrl: '' },
          { id: 's-12-1-3', korean: '음악 듣는 거 좋아해요.', romanization: 'eumak deutneun geo joahaeyo', english: 'I like listening to music.', audioUrl: '' },
          { id: 's-12-1-4', korean: '요리하는 거 좋아해요.', romanization: 'yorihaneun geo joahaeyo', english: 'I like cooking.', audioUrl: '' },
          { id: 's-12-1-5', korean: '영화 보는 거 좋아해요.', romanization: 'yeonghwa boneun geo joahaeyo', english: 'I like watching movies.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-12-2', title: 'Weekend Plans',
        sentences: [
          { id: 's-12-2-1', korean: '주말에 뭐 해요?', romanization: 'jumare mwo haeyo?', english: 'What do you do on weekends?', audioUrl: '' },
          { id: 's-12-2-2', korean: '친구 만나요.', romanization: 'chingu mannayo', english: 'I meet friends.', audioUrl: '' },
          { id: 's-12-2-3', korean: '쉬고 싶어요.', romanization: 'swigo sipeoyo', english: 'I want to rest.', audioUrl: '' },
          { id: 's-12-2-4', korean: '같이 갈래요?', romanization: 'gachi gallaeyo?', english: 'Do you want to go together?', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-13',
    title: 'Time & Days',
    description: 'Days of the week, months, and telling time.',
    theme: 'time',
    phase: 'speaking',
    order: 13,
    subLessons: [
      {
        id: 'sl-13-1', title: 'Days of the Week',
        sentences: [
          { id: 's-13-1-1', korean: '오늘 무슨 요일이에요?', romanization: 'oneul museun yoirieyo?', english: 'What day is it today?', audioUrl: '' },
          { id: 's-13-1-2', korean: '오늘 월요일이에요.', romanization: 'oneul woryoirieyo', english: "It's Monday today.", audioUrl: '' },
          { id: 's-13-1-3', korean: '금요일에 만날까요?', romanization: 'geumyoire mannalkkayo?', english: 'Shall we meet on Friday?', audioUrl: '' },
          { id: 's-13-1-4', korean: '주말에 시간 있어요?', romanization: 'jumare sigan isseoyo?', english: 'Do you have time on the weekend?', audioUrl: '' },
        ],
      },
      {
        id: 'sl-13-2', title: 'Telling Time',
        sentences: [
          { id: 's-13-2-1', korean: '지금 몇 시예요?', romanization: 'jigeum myeot siyeyo?', english: 'What time is it?', audioUrl: '' },
          { id: 's-13-2-2', korean: '아홉 시에 시작해요.', romanization: 'ahop sie sijakaeyo', english: 'It starts at 9 o\'clock.', audioUrl: '' },
          { id: 's-13-2-3', korean: '오후 세 시에 만나요.', romanization: 'ohu se sie mannayo', english: "Let's meet at 3 PM.", audioUrl: '' },
          { id: 's-13-2-4', korean: '늦었어요!', romanization: 'neujeosseoyo!', english: "I'm late!", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-14',
    title: 'Where I Live',
    description: 'Talk about your home and neighborhood.',
    theme: 'home',
    phase: 'speaking',
    order: 14,
    subLessons: [
      {
        id: 'sl-14-1', title: 'My Home',
        sentences: [
          { id: 's-14-1-1', korean: '어디에 살아요?', romanization: 'eodie sarayo?', english: 'Where do you live?', audioUrl: '' },
          { id: 's-14-1-2', korean: '서울에 살아요.', romanization: 'seoure sarayo', english: 'I live in Seoul.', audioUrl: '' },
          { id: 's-14-1-3', korean: '아파트에 살아요.', romanization: 'apateu-e sarayo', english: 'I live in an apartment.', audioUrl: '' },
          { id: 's-14-1-4', korean: '집이 학교에서 가까워요.', romanization: 'jibi hakgyoeseo gakkawayo', english: 'My home is close to school.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-14-2', title: 'Neighborhood',
        sentences: [
          { id: 's-14-2-1', korean: '근처에 편의점이 있어요.', romanization: 'geuncheo-e pyeonuijeomi isseoyo', english: 'There is a convenience store nearby.', audioUrl: '' },
          { id: 's-14-2-2', korean: '공원이 가까워요.', romanization: 'gongwoni gakkawayo', english: 'The park is close.', audioUrl: '' },
          { id: 's-14-2-3', korean: '동네가 조용해요.', romanization: 'dongnae-ga joyonghaeyo', english: 'The neighborhood is quiet.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-15',
    title: 'On the Phone',
    description: 'Making and receiving phone calls in Korean.',
    theme: 'phone',
    phase: 'speaking',
    order: 15,
    subLessons: [
      {
        id: 'sl-15-1', title: 'Phone Basics',
        sentences: [
          { id: 's-15-1-1', korean: '여보세요?', romanization: 'yeoboseyo?', english: 'Hello? (on the phone)', audioUrl: '' },
          { id: 's-15-1-2', korean: '지금 통화할 수 있어요?', romanization: 'jigeum tonghwahal su isseoyo?', english: 'Can you talk now?', audioUrl: '' },
          { id: 's-15-1-3', korean: '나중에 다시 전화할게요.', romanization: 'najunge dasi jeonhwahalgeyo', english: "I'll call back later.", audioUrl: '' },
          { id: 's-15-1-4', korean: '문자 보내 주세요.', romanization: 'munja bonae juseyo', english: 'Please send me a text.', audioUrl: '' },
          { id: 's-15-1-5', korean: '전화 잘못 거셨어요.', romanization: 'jeonhwa jalmot geosyeosseoyo', english: 'You have the wrong number.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-16',
    title: 'At School & Work',
    description: 'Useful sentences for school and the workplace.',
    theme: 'school-work',
    phase: 'speaking',
    order: 16,
    subLessons: [
      {
        id: 'sl-16-1', title: 'School',
        sentences: [
          { id: 's-16-1-1', korean: '무슨 과목을 좋아해요?', romanization: 'museun gwamogeul joahaeyo?', english: 'What subject do you like?', audioUrl: '' },
          { id: 's-16-1-2', korean: '숙제 다 했어요?', romanization: 'sukje da haesseoyo?', english: 'Did you finish your homework?', audioUrl: '' },
          { id: 's-16-1-3', korean: '시험이 언제예요?', romanization: 'siheomi eonjeyeyo?', english: 'When is the exam?', audioUrl: '' },
        ],
      },
      {
        id: 'sl-16-2', title: 'Work',
        sentences: [
          { id: 's-16-2-1', korean: '무슨 일 하세요?', romanization: 'museun il haseyo?', english: 'What do you do for work?', audioUrl: '' },
          { id: 's-16-2-2', korean: '회의가 있어요.', romanization: 'hoeui-ga isseoyo', english: 'I have a meeting.', audioUrl: '' },
          { id: 's-16-2-3', korean: '오늘 야근해야 돼요.', romanization: 'oneul yageunhaeya dwaeyo', english: 'I have to work overtime today.', audioUrl: '' },
          { id: 's-16-2-4', korean: '수고하셨습니다.', romanization: 'sugohasyeosseumnida', english: 'Good work today. (end of workday)', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-17',
    title: 'Health & Body',
    description: 'Describe symptoms and visit the doctor.',
    theme: 'health',
    phase: 'speaking',
    order: 17,
    subLessons: [
      {
        id: 'sl-17-1', title: 'Feeling Sick',
        sentences: [
          { id: 's-17-1-1', korean: '아파요.', romanization: 'apayo', english: "I'm sick. / It hurts.", audioUrl: '' },
          { id: 's-17-1-2', korean: '머리가 아파요.', romanization: 'meoriga apayo', english: 'I have a headache.', audioUrl: '' },
          { id: 's-17-1-3', korean: '배가 아파요.', romanization: 'baega apayo', english: 'I have a stomachache.', audioUrl: '' },
          { id: 's-17-1-4', korean: '감기에 걸렸어요.', romanization: 'gamgie geollyeosseoyo', english: 'I caught a cold.', audioUrl: '' },
          { id: 's-17-1-5', korean: '병원에 가야 돼요.', romanization: 'byeongwone gaya dwaeyo', english: 'I need to go to the hospital.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-17-2', title: 'At the Pharmacy',
        sentences: [
          { id: 's-17-2-1', korean: '약 주세요.', romanization: 'yak juseyo', english: 'Medicine, please.', audioUrl: '' },
          { id: 's-17-2-2', korean: '하루에 몇 번 먹어요?', romanization: 'harue myeot beon meogeoyo?', english: 'How many times a day do I take it?', audioUrl: '' },
          { id: 's-17-2-3', korean: '빨리 나으세요.', romanization: 'ppalli naeuseyo', english: 'Get well soon.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-18',
    title: 'Making Plans',
    description: 'Invite friends and make plans together.',
    theme: 'plans',
    phase: 'speaking',
    order: 18,
    subLessons: [
      {
        id: 'sl-18-1', title: 'Invitations',
        sentences: [
          { id: 's-18-1-1', korean: '내일 시간 있어요?', romanization: 'naeil sigan isseoyo?', english: 'Are you free tomorrow?', audioUrl: '' },
          { id: 's-18-1-2', korean: '같이 밥 먹을래요?', romanization: 'gachi bap meogeullaeyo?', english: 'Do you want to eat together?', audioUrl: '' },
          { id: 's-18-1-3', korean: '어디서 만날까요?', romanization: 'eodiseo mannalkkayo?', english: 'Where shall we meet?', audioUrl: '' },
          { id: 's-18-1-4', korean: '좋아요, 그렇게 해요.', romanization: 'joayo, geureoke haeyo', english: "Sounds good, let's do that.", audioUrl: '' },
        ],
      },
      {
        id: 'sl-18-2', title: 'Declining',
        sentences: [
          { id: 's-18-2-1', korean: '미안해요, 약속이 있어요.', romanization: 'mianhaeyo, yaksogi isseoyo', english: "Sorry, I have plans.", audioUrl: '' },
          { id: 's-18-2-2', korean: '다음에 같이 가요.', romanization: 'daeume gachi gayo', english: "Let's go together next time.", audioUrl: '' },
          { id: 's-18-2-3', korean: '오늘은 좀 바빠요.', romanization: 'oneureun jom bappayo', english: "I'm a bit busy today.", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-19',
    title: 'Korean Food Culture',
    description: 'Specific Korean dishes and food etiquette.',
    theme: 'korean-food',
    phase: 'speaking',
    order: 19,
    subLessons: [
      {
        id: 'sl-19-1', title: 'Ordering Korean Food',
        sentences: [
          { id: 's-19-1-1', korean: '김치찌개 주세요.', romanization: 'gimchijjigae juseyo', english: 'Kimchi stew, please.', audioUrl: '' },
          { id: 's-19-1-2', korean: '소주 한 병 주세요.', romanization: 'soju han byeong juseyo', english: 'One bottle of soju, please.', audioUrl: '' },
          { id: 's-19-1-3', korean: '반찬 더 주세요.', romanization: 'banchan deo juseyo', english: 'More side dishes, please.', audioUrl: '' },
          { id: 's-19-1-4', korean: '삼겹살 이인분 주세요.', romanization: 'samgyeopsal iinbun juseyo', english: 'Two servings of pork belly, please.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-19-2', title: 'Food Etiquette',
        sentences: [
          { id: 's-19-2-1', korean: '어른 먼저 드세요.', romanization: 'eoreun meonjeo deuseyo', english: 'Elders eat first.', audioUrl: '' },
          { id: 's-19-2-2', korean: '건배!', romanization: 'geonbae!', english: 'Cheers!', audioUrl: '' },
          { id: 's-19-2-3', korean: '한 잔 더 하실래요?', romanization: 'han jan deo hasillaeyo?', english: 'Would you like one more drink?', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-20',
    title: 'Travel & Airports',
    description: 'Navigate airports and travel situations.',
    theme: 'travel',
    phase: 'speaking',
    order: 20,
    subLessons: [
      {
        id: 'sl-20-1', title: 'At the Airport',
        sentences: [
          { id: 's-20-1-1', korean: '여권 여기 있어요.', romanization: 'yeogwon yeogi isseoyo', english: 'Here is my passport.', audioUrl: '' },
          { id: 's-20-1-2', korean: '탑승구가 어디예요?', romanization: 'tapseungguga eodiyeyo?', english: 'Where is the boarding gate?', audioUrl: '' },
          { id: 's-20-1-3', korean: '짐이 안 나왔어요.', romanization: 'jimi an nawasseoyo', english: "My luggage didn't come out.", audioUrl: '' },
          { id: 's-20-1-4', korean: '관광 왔어요.', romanization: 'gwangwang wasseoyo', english: "I'm here for sightseeing.", audioUrl: '' },
        ],
      },
      {
        id: 'sl-20-2', title: 'Hotel',
        sentences: [
          { id: 's-20-2-1', korean: '체크인 하고 싶어요.', romanization: 'chekeu-in hago sipeoyo', english: "I'd like to check in.", audioUrl: '' },
          { id: 's-20-2-2', korean: '방이 있어요?', romanization: 'bangi isseoyo?', english: 'Do you have a room?', audioUrl: '' },
          { id: 's-20-2-3', korean: '와이파이 비밀번호가 뭐예요?', romanization: 'waipai bimilbeonhoga mwoyeyo?', english: 'What is the Wi-Fi password?', audioUrl: '' },
          { id: 's-20-2-4', korean: '체크아웃은 몇 시예요?', romanization: 'chekeu-ausun myeot siyeyo?', english: 'What time is checkout?', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-21',
    title: 'Likes & Dislikes',
    description: 'Express what you like and dislike.',
    theme: 'preferences',
    phase: 'speaking',
    order: 21,
    subLessons: [
      {
        id: 'sl-21-1', title: 'I Like...',
        sentences: [
          { id: 's-21-1-1', korean: '한국 드라마 좋아해요.', romanization: 'hanguk deurama joahaeyo', english: 'I like Korean dramas.', audioUrl: '' },
          { id: 's-21-1-2', korean: '고양이를 좋아해요.', romanization: 'goyangi-reul joahaeyo', english: 'I like cats.', audioUrl: '' },
          { id: 's-21-1-3', korean: '한국 음식을 좋아해요.', romanization: 'hanguk eumsigeul joahaeyo', english: 'I like Korean food.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-21-2', title: "I Don't Like...",
        sentences: [
          { id: 's-21-2-1', korean: '매운 음식을 못 먹어요.', romanization: 'maeun eumsigeul mot meogeoyo', english: "I can't eat spicy food.", audioUrl: '' },
          { id: 's-21-2-2', korean: '운동을 안 좋아해요.', romanization: 'undongeul an joahaeyo', english: "I don't like exercising.", audioUrl: '' },
          { id: 's-21-2-3', korean: '아침에 일어나기 싫어요.', romanization: 'achime ireonagi sireoyo', english: "I don't want to wake up in the morning.", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-22',
    title: 'Describing People',
    description: 'Describe appearance and personality.',
    theme: 'descriptions',
    phase: 'speaking',
    order: 22,
    subLessons: [
      {
        id: 'sl-22-1', title: 'Appearance',
        sentences: [
          { id: 's-22-1-1', korean: '키가 커요.', romanization: 'kiga keoyo', english: "He/She is tall.", audioUrl: '' },
          { id: 's-22-1-2', korean: '머리가 길어요.', romanization: 'meoriga gireoyo', english: 'The hair is long.', audioUrl: '' },
          { id: 's-22-1-3', korean: '눈이 커요.', romanization: 'nuni keoyo', english: 'The eyes are big.', audioUrl: '' },
          { id: 's-22-1-4', korean: '안경을 쓰고 있어요.', romanization: 'angyeongeul sseugo isseoyo', english: 'Wearing glasses.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-22-2', title: 'Personality',
        sentences: [
          { id: 's-22-2-1', korean: '친절해요.', romanization: 'chinjeolhaeyo', english: "Kind.", audioUrl: '' },
          { id: 's-22-2-2', korean: '재미있어요.', romanization: 'jaemiisseoyo', english: 'Funny / Interesting.', audioUrl: '' },
          { id: 's-22-2-3', korean: '착해요.', romanization: 'chakaeyo', english: 'Nice / Good-natured.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-23',
    title: 'Public Transport',
    description: 'Take the bus, subway, and train.',
    theme: 'transport',
    phase: 'speaking',
    order: 23,
    subLessons: [
      {
        id: 'sl-23-1', title: 'Subway & Bus',
        sentences: [
          { id: 's-23-1-1', korean: '이 버스 명동 가요?', romanization: 'i beoseu myeongdong gayo?', english: 'Does this bus go to Myeongdong?', audioUrl: '' },
          { id: 's-23-1-2', korean: '몇 번 출구예요?', romanization: 'myeot beon chulguyeyo?', english: 'Which exit number?', audioUrl: '' },
          { id: 's-23-1-3', korean: '갈아타야 돼요?', romanization: 'garataya dwaeyo?', english: 'Do I need to transfer?', audioUrl: '' },
          { id: 's-23-1-4', korean: '다음 역에서 내려요.', romanization: 'daeum yeogeseo naeryeoyo', english: 'I get off at the next station.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-24',
    title: 'Asking for Help',
    description: 'Ask for help politely in various situations.',
    theme: 'help',
    phase: 'speaking',
    order: 24,
    subLessons: [
      {
        id: 'sl-24-1', title: 'Help Please',
        sentences: [
          { id: 's-24-1-1', korean: '도와주세요!', romanization: 'dowajuseyo!', english: 'Help me, please!', audioUrl: '' },
          { id: 's-24-1-2', korean: '한국어 못해요.', romanization: 'hangugeo mothaeyo', english: "I can't speak Korean.", audioUrl: '' },
          { id: 's-24-1-3', korean: '영어 할 수 있어요?', romanization: 'yeongeo hal su isseoyo?', english: 'Can you speak English?', audioUrl: '' },
          { id: 's-24-1-4', korean: '천천히 말해 주세요.', romanization: 'cheoncheonhi malhae juseyo', english: 'Please speak slowly.', audioUrl: '' },
          { id: 's-24-1-5', korean: '다시 말해 주세요.', romanization: 'dasi malhae juseyo', english: 'Please say that again.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-25',
    title: 'Colors & Clothes',
    description: 'Talk about colors and clothing items.',
    theme: 'colors-clothes',
    phase: 'speaking',
    order: 25,
    subLessons: [
      {
        id: 'sl-25-1', title: 'Colors',
        sentences: [
          { id: 's-25-1-1', korean: '무슨 색 좋아해요?', romanization: 'museun saek joahaeyo?', english: 'What color do you like?', audioUrl: '' },
          { id: 's-25-1-2', korean: '파란색 좋아해요.', romanization: 'paransaek joahaeyo', english: 'I like blue.', audioUrl: '' },
          { id: 's-25-1-3', korean: '빨간색으로 주세요.', romanization: 'ppalgansaegeuro juseyo', english: 'Give me the red one, please.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-25-2', title: 'Clothes',
        sentences: [
          { id: 's-25-2-1', korean: '이 옷 예뻐요.', romanization: 'i ot yeppeoyo', english: 'These clothes are pretty.', audioUrl: '' },
          { id: 's-25-2-2', korean: '큰 사이즈 있어요?', romanization: 'keun saijeu isseoyo?', english: 'Do you have a large size?', audioUrl: '' },
          { id: 's-25-2-3', korean: '잘 어울려요.', romanization: 'jal eoulleoyo', english: 'It suits you well.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-26',
    title: 'Dating & Relationships',
    description: 'Romantic expressions and relationship talk.',
    theme: 'dating',
    phase: 'speaking',
    order: 26,
    subLessons: [
      {
        id: 'sl-26-1', title: 'Romance',
        sentences: [
          { id: 's-26-1-1', korean: '좋아해요.', romanization: 'joahaeyo', english: 'I like you.', audioUrl: '' },
          { id: 's-26-1-2', korean: '사랑해요.', romanization: 'saranghaeyo', english: 'I love you.', audioUrl: '' },
          { id: 's-26-1-3', korean: '남자친구 있어요?', romanization: 'namjachingu isseoyo?', english: 'Do you have a boyfriend?', audioUrl: '' },
          { id: 's-26-1-4', korean: '우리 사귀어요.', romanization: 'uri sagwieoyo', english: "Let's date.", audioUrl: '' },
          { id: 's-26-1-5', korean: '보고 싶어요.', romanization: 'bogo sipeoyo', english: 'I miss you.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-27',
    title: 'At the Bank & Post Office',
    description: 'Handle banking and mail in Korean.',
    theme: 'bank-post',
    phase: 'speaking',
    order: 27,
    subLessons: [
      {
        id: 'sl-27-1', title: 'Banking',
        sentences: [
          { id: 's-27-1-1', korean: '계좌를 만들고 싶어요.', romanization: 'gyejwa-reul mandeulgo sipeoyo', english: 'I want to open an account.', audioUrl: '' },
          { id: 's-27-1-2', korean: '돈을 보내고 싶어요.', romanization: 'doneul bonaego sipeoyo', english: 'I want to send money.', audioUrl: '' },
          { id: 's-27-1-3', korean: '환전해 주세요.', romanization: 'hwanjeonhae juseyo', english: 'Please exchange money.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-27-2', title: 'Post Office',
        sentences: [
          { id: 's-27-2-1', korean: '이거 보내고 싶어요.', romanization: 'igeo bonaego sipeoyo', english: 'I want to send this.', audioUrl: '' },
          { id: 's-27-2-2', korean: '미국까지 얼마예요?', romanization: 'migukkkaji eolmayeyo?', english: 'How much to the US?', audioUrl: '' },
          { id: 's-27-2-3', korean: '빠른 우편으로 주세요.', romanization: 'ppareun upyeoneuro juseyo', english: 'Express mail, please.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-28',
    title: 'Celebrations & Holidays',
    description: 'Korean holidays and celebration phrases.',
    theme: 'celebrations',
    phase: 'speaking',
    order: 28,
    subLessons: [
      {
        id: 'sl-28-1', title: 'Celebrations',
        sentences: [
          { id: 's-28-1-1', korean: '생일 축하해요!', romanization: 'saengil chukahaeyo!', english: 'Happy birthday!', audioUrl: '' },
          { id: 's-28-1-2', korean: '새해 복 많이 받으세요.', romanization: 'saehae bok mani badeuseyo', english: 'Happy New Year.', audioUrl: '' },
          { id: 's-28-1-3', korean: '추석 잘 보내세요.', romanization: 'chuseok jal bonaeseyo', english: 'Have a good Chuseok.', audioUrl: '' },
          { id: 's-28-1-4', korean: '축하해요!', romanization: 'chukahaeyo!', english: 'Congratulations!', audioUrl: '' },
          { id: 's-28-1-5', korean: '선물이에요.', romanization: 'seonmurieyo', english: "It's a gift.", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-29',
    title: 'Internet & Social Media',
    description: 'Online slang and social media talk.',
    theme: 'internet',
    phase: 'speaking',
    order: 29,
    subLessons: [
      {
        id: 'sl-29-1', title: 'Online Talk',
        sentences: [
          { id: 's-29-1-1', korean: '인스타그램 해요?', romanization: 'inseutageuraem haeyo?', english: 'Are you on Instagram?', audioUrl: '' },
          { id: 's-29-1-2', korean: '팔로우 할게요.', romanization: 'pallou halgeyo', english: "I'll follow you.", audioUrl: '' },
          { id: 's-29-1-3', korean: '사진 찍어 주세요.', romanization: 'sajin jjigeo juseyo', english: 'Please take a photo.', audioUrl: '' },
          { id: 's-29-1-4', korean: '이거 올려도 돼요?', romanization: 'igeo ollyeodo dwaeyo?', english: 'Can I post this?', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-30',
    title: 'Emergencies',
    description: 'Handle emergency situations in Korean.',
    theme: 'emergency',
    phase: 'speaking',
    order: 30,
    subLessons: [
      {
        id: 'sl-30-1', title: 'Emergency Phrases',
        sentences: [
          { id: 's-30-1-1', korean: '도와주세요!', romanization: 'dowajuseyo!', english: 'Help!', audioUrl: '' },
          { id: 's-30-1-2', korean: '경찰을 불러 주세요.', romanization: 'gyeongchareul bulleo juseyo', english: 'Please call the police.', audioUrl: '' },
          { id: 's-30-1-3', korean: '구급차를 불러 주세요.', romanization: 'gugeupcha-reul bulleo juseyo', english: 'Please call an ambulance.', audioUrl: '' },
          { id: 's-30-1-4', korean: '불이야!', romanization: 'buriya!', english: 'Fire!', audioUrl: '' },
          { id: 's-30-1-5', korean: '지갑을 잃어버렸어요.', romanization: 'jigabeul ireobeoryeosseoyo', english: 'I lost my wallet.', audioUrl: '' },
          { id: 's-30-1-6', korean: '대사관이 어디예요?', romanization: 'daesagwani eodiyeyo?', english: 'Where is the embassy?', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-31',
    title: 'Sports & Exercise',
    description: 'Talk about sports and staying active.',
    theme: 'sports',
    phase: 'speaking',
    order: 31,
    subLessons: [
      {
        id: 'sl-31-1', title: 'Sports',
        sentences: [
          { id: 's-31-1-1', korean: '무슨 운동 좋아해요?', romanization: 'museun undong joahaeyo?', english: 'What sport do you like?', audioUrl: '' },
          { id: 's-31-1-2', korean: '축구를 좋아해요.', romanization: 'chukgu-reul joahaeyo', english: 'I like soccer.', audioUrl: '' },
          { id: 's-31-1-3', korean: '헬스장에 가요.', romanization: 'helseujanue gayo', english: 'I go to the gym.', audioUrl: '' },
          { id: 's-31-1-4', korean: '같이 운동할래요?', romanization: 'gachi undonghal-laeyo?', english: 'Do you want to exercise together?', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-32',
    title: 'K-Pop & Entertainment',
    description: 'Talk about music, dramas, and Korean pop culture.',
    theme: 'entertainment',
    phase: 'speaking',
    order: 32,
    subLessons: [
      {
        id: 'sl-32-1', title: 'K-Pop',
        sentences: [
          { id: 's-32-1-1', korean: '누구 팬이에요?', romanization: 'nugu paen-ieyo?', english: 'Whose fan are you?', audioUrl: '' },
          { id: 's-32-1-2', korean: '이 노래 좋아해요.', romanization: 'i norae joahaeyo', english: 'I like this song.', audioUrl: '' },
          { id: 's-32-1-3', korean: '콘서트에 가고 싶어요.', romanization: 'konseoteu-e gago sipeoyo', english: 'I want to go to a concert.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-32-2', title: 'Dramas',
        sentences: [
          { id: 's-32-2-1', korean: '이 드라마 봤어요?', romanization: 'i deurama bwasseoyo?', english: 'Have you seen this drama?', audioUrl: '' },
          { id: 's-32-2-2', korean: '정말 재미있어요.', romanization: 'jeongmal jaemiisseoyo', english: "It's really fun/interesting.", audioUrl: '' },
          { id: 's-32-2-3', korean: '추천해 주세요.', romanization: 'chucheonhae juseyo', english: 'Please recommend something.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-33',
    title: 'Opinions & Agreement',
    description: 'Agree, disagree, and share opinions.',
    theme: 'opinions',
    phase: 'speaking',
    order: 33,
    subLessons: [
      {
        id: 'sl-33-1', title: 'Agreeing & Disagreeing',
        sentences: [
          { id: 's-33-1-1', korean: '맞아요.', romanization: 'majayo', english: "That's right.", audioUrl: '' },
          { id: 's-33-1-2', korean: '저도 그렇게 생각해요.', romanization: 'jeodo geureoke saenggakaeyo', english: 'I think so too.', audioUrl: '' },
          { id: 's-33-1-3', korean: '글쎄요...', romanization: 'geulsseyo...', english: "Well... / I'm not sure.", audioUrl: '' },
          { id: 's-33-1-4', korean: '좀 다른 것 같아요.', romanization: 'jom dareun geot gatayo', english: 'I think differently.', audioUrl: '' },
          { id: 's-33-1-5', korean: '어떻게 생각해요?', romanization: 'eotteoke saenggakaeyo?', english: 'What do you think?', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-34',
    title: 'At the Convenience Store',
    description: 'Navigate a Korean convenience store.',
    theme: 'convenience-store',
    phase: 'speaking',
    order: 34,
    subLessons: [
      {
        id: 'sl-34-1', title: 'Shopping',
        sentences: [
          { id: 's-34-1-1', korean: '이거 데워 주세요.', romanization: 'igeo dewo juseyo', english: 'Please heat this up.', audioUrl: '' },
          { id: 's-34-1-2', korean: '충전해 주세요.', romanization: 'chungjeonhae juseyo', english: 'Please recharge (my card).', audioUrl: '' },
          { id: 's-34-1-3', korean: 'ATM이 어디예요?', romanization: 'ATM-i eodiyeyo?', english: 'Where is the ATM?', audioUrl: '' },
          { id: 's-34-1-4', korean: '봉투 괜찮아요.', romanization: 'bongtu gwaenchanayo', english: "No bag needed, thanks.", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-35',
    title: 'Apologies & Excuses',
    description: 'Apologize and explain yourself.',
    theme: 'apologies',
    phase: 'speaking',
    order: 35,
    subLessons: [
      {
        id: 'sl-35-1', title: 'Apologizing',
        sentences: [
          { id: 's-35-1-1', korean: '늦어서 죄송합니다.', romanization: 'neujeoseo joesonghamnida', english: "I'm sorry I'm late.", audioUrl: '' },
          { id: 's-35-1-2', korean: '실수했어요.', romanization: 'silsuhaesseoyo', english: 'I made a mistake.', audioUrl: '' },
          { id: 's-35-1-3', korean: '깜빡했어요.', romanization: 'kkamppakhaesseoyo', english: 'I forgot.', audioUrl: '' },
          { id: 's-35-1-4', korean: '다시는 안 그럴게요.', romanization: 'dasineun an geureolgeyo', english: "I won't do it again.", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-36',
    title: 'Compliments & Encouragement',
    description: 'Give compliments and encourage others.',
    theme: 'compliments',
    phase: 'speaking',
    order: 36,
    subLessons: [
      {
        id: 'sl-36-1', title: 'Compliments',
        sentences: [
          { id: 's-36-1-1', korean: '한국어 잘 하시네요!', romanization: 'hangugeo jal hasineyo!', english: 'Your Korean is great!', audioUrl: '' },
          { id: 's-36-1-2', korean: '오늘 멋있어요.', romanization: 'oneul meossisseoyo', english: 'You look cool today.', audioUrl: '' },
          { id: 's-36-1-3', korean: '잘했어요!', romanization: 'jalhaesseoyo!', english: 'Well done!', audioUrl: '' },
          { id: 's-36-1-4', korean: '대단해요.', romanization: 'daedanhaeyo', english: "That's amazing.", audioUrl: '' },
          { id: 's-36-1-5', korean: '화이팅!', romanization: 'hwaiting!', english: 'You can do it! / Fighting!', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-37',
    title: 'Renting & Housing',
    description: 'Find and rent a place to live.',
    theme: 'housing',
    phase: 'speaking',
    order: 37,
    subLessons: [
      {
        id: 'sl-37-1', title: 'Looking for a Place',
        sentences: [
          { id: 's-37-1-1', korean: '방 구하고 있어요.', romanization: 'bang guhago isseoyo', english: "I'm looking for a room.", audioUrl: '' },
          { id: 's-37-1-2', korean: '월세가 얼마예요?', romanization: 'wolsega eolmayeyo?', english: 'How much is the monthly rent?', audioUrl: '' },
          { id: 's-37-1-3', korean: '보증금이 있어요?', romanization: 'bojeunggeum-i isseoyo?', english: 'Is there a deposit?', audioUrl: '' },
          { id: 's-37-1-4', korean: '에어컨 있어요?', romanization: 'eeokon isseoyo?', english: 'Is there air conditioning?', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-38',
    title: 'Talking About the Past',
    description: 'Talk about what happened yesterday and before.',
    theme: 'past-events',
    phase: 'speaking',
    order: 38,
    subLessons: [
      {
        id: 'sl-38-1', title: 'Yesterday',
        sentences: [
          { id: 's-38-1-1', korean: '어제 뭐 했어요?', romanization: 'eoje mwo haesseoyo?', english: 'What did you do yesterday?', audioUrl: '' },
          { id: 's-38-1-2', korean: '영화를 봤어요.', romanization: 'yeonghwa-reul bwasseoyo', english: 'I watched a movie.', audioUrl: '' },
          { id: 's-38-1-3', korean: '친구를 만났어요.', romanization: 'chingu-reul mannasseoyo', english: 'I met a friend.', audioUrl: '' },
          { id: 's-38-1-4', korean: '정말 재미있었어요.', romanization: 'jeongmal jaemiisseosseoyo', english: 'It was really fun.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-38-2', title: 'Experiences',
        sentences: [
          { id: 's-38-2-1', korean: '한국에 가 본 적 있어요?', romanization: 'hanguge ga bon jeok isseoyo?', english: 'Have you been to Korea?', audioUrl: '' },
          { id: 's-38-2-2', korean: '네, 작년에 갔어요.', romanization: 'ne, jaknyeone gasseoyo', english: 'Yes, I went last year.', audioUrl: '' },
          { id: 's-38-2-3', korean: '아니요, 아직 못 갔어요.', romanization: 'aniyo, ajik mot gasseoyo', english: "No, I haven't been yet.", audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-39',
    title: 'Future Plans',
    description: 'Talk about what you will do and want to do.',
    theme: 'future',
    phase: 'speaking',
    order: 39,
    subLessons: [
      {
        id: 'sl-39-1', title: 'Plans',
        sentences: [
          { id: 's-39-1-1', korean: '이번 주말에 뭐 할 거예요?', romanization: 'ibeon jumare mwo hal geoyeyo?', english: 'What are you going to do this weekend?', audioUrl: '' },
          { id: 's-39-1-2', korean: '한국에 가고 싶어요.', romanization: 'hanguge gago sipeoyo', english: 'I want to go to Korea.', audioUrl: '' },
          { id: 's-39-1-3', korean: '내년에 결혼할 거예요.', romanization: 'naenyeone gyeolhonhal geoyeyo', english: "I'm going to get married next year.", audioUrl: '' },
          { id: 's-39-1-4', korean: '한국어를 열심히 공부할 거예요.', romanization: 'hangugeo-reul yeolsimhi gongbuhal geoyeyo', english: "I'm going to study Korean hard.", audioUrl: '' },
        ],
      },
      {
        id: 'sl-39-2', title: 'Dreams',
        sentences: [
          { id: 's-39-2-1', korean: '꿈이 뭐예요?', romanization: 'kkumi mwoyeyo?', english: 'What is your dream?', audioUrl: '' },
          { id: 's-39-2-2', korean: '가수가 되고 싶어요.', romanization: 'gasuga doego sipeoyo', english: 'I want to become a singer.', audioUrl: '' },
          { id: 's-39-2-3', korean: '세계 여행을 하고 싶어요.', romanization: 'segye yeohaengeul hago sipeoyo', english: 'I want to travel the world.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-40',
    title: 'Putting It All Together',
    description: 'Review and combine everything you have learned.',
    theme: 'review',
    phase: 'speaking',
    order: 40,
    subLessons: [
      {
        id: 'sl-40-1', title: 'Self Introduction',
        sentences: [
          { id: 's-40-1-1', korean: '안녕하세요, 제 이름은 _입니다.', romanization: 'annyeonghaseyo, je ireumeun _imnida', english: 'Hello, my name is _.', audioUrl: '' },
          { id: 's-40-1-2', korean: '저는 _에서 왔어요.', romanization: 'jeoneun _eseo wasseoyo', english: "I'm from _.", audioUrl: '' },
          { id: 's-40-1-3', korean: '한국어를 배우고 있어요.', romanization: 'hangugeo-reul baeugo isseoyo', english: "I'm learning Korean.", audioUrl: '' },
          { id: 's-40-1-4', korean: '한국 문화를 좋아해요.', romanization: 'hanguk munhwa-reul joahaeyo', english: 'I like Korean culture.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-40-2', title: 'Conversation Flow',
        sentences: [
          { id: 's-40-2-1', korean: '오늘 날씨가 좋아요. 밖에 나갈까요?', romanization: 'oneul nalssiga joayo. bakke nagalkkayo?', english: "The weather is nice today. Shall we go outside?", audioUrl: '' },
          { id: 's-40-2-2', korean: '좋아요! 어디 갈까요?', romanization: 'joayo! eodi galkkayo?', english: 'Sure! Where shall we go?', audioUrl: '' },
          { id: 's-40-2-3', korean: '카페에 가서 커피 마실까요?', romanization: 'kapee-e gaseo keopi masilkkayo?', english: "Shall we go to a café and have coffee?", audioUrl: '' },
          { id: 's-40-2-4', korean: '그래요, 가요!', romanization: 'geuraeyo, gayo!', english: "Okay, let's go!", audioUrl: '' },
        ],
      },
      {
        id: 'sl-40-3', title: 'Farewell',
        sentences: [
          { id: 's-40-3-1', korean: '오늘 정말 즐거웠어요.', romanization: 'oneul jeongmal jeulgeowosseoyo', english: 'Today was really fun.', audioUrl: '' },
          { id: 's-40-3-2', korean: '다음에 또 만나요.', romanization: 'daeume tto mannayo', english: "Let's meet again next time.", audioUrl: '' },
          { id: 's-40-3-3', korean: '잘 가요! 조심히 가세요.', romanization: 'jal gayo! josimhi gaseyo', english: 'Bye! Get home safe.', audioUrl: '' },
        ],
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id);
}

export function getAllSentencesForLesson(lesson: Lesson): { id: string; korean: string; english: string; romanization?: string }[] {
  return lesson.subLessons.flatMap(sl => sl.sentences);
}
