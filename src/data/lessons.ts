import { Lesson } from '@/types/lesson';

export const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'First Words',
    description: 'Your first steps into Korean — greetings, introductions, and saying goodbye.',
    theme: 'introductions',
    phase: 'speaking',
    order: 1,
    subLessons: [
      {
        id: 'sl-1-1',
        title: 'Hello',
        sentences: [
          { id: 's-1-1-1', korean: '안녕하세요.', romanization: 'annyeonghaseyo', english: 'Hello.', audioUrl: '' },
          { id: 's-1-1-2', korean: '안녕하세요, 만나서 반갑습니다.', romanization: 'annyeonghaseyo, mannaseo bangapseumnida', english: 'Hello, nice to meet you.', audioUrl: '' },
          { id: 's-1-1-3', korean: '안녕하세요, 잘 지내세요?', romanization: 'annyeonghaseyo, jal jinaeseyo?', english: 'Hello, how are you?', audioUrl: '' },
          { id: 's-1-1-4', korean: '네, 잘 지내요. 감사합니다.', romanization: 'ne, jal jinaeyo. gamsahamnida', english: 'Yes, I\'m doing well. Thank you.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-1-2',
        title: 'My Name Is...',
        sentences: [
          { id: 's-1-2-1', korean: '제 이름은 _입니다.', romanization: 'je ireumeun _imnida', english: 'My name is _.', audioUrl: '' },
          { id: 's-1-2-2', korean: '이름이 뭐예요?', romanization: 'ireumi mwoyeyo?', english: 'What is your name?', audioUrl: '' },
          { id: 's-1-2-3', korean: '만나서 반갑습니다.', romanization: 'mannaseo bangapseumnida', english: 'Nice to meet you.', audioUrl: '' },
          { id: 's-1-2-4', korean: '저는 학생입니다.', romanization: 'jeoneun haksaengimnida', english: 'I am a student.', audioUrl: '' },
          { id: 's-1-2-5', korean: '저는 한국어를 배우고 있어요.', romanization: 'jeoneun hangugeo-reul baeugo isseoyo', english: 'I am learning Korean.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-1-3',
        title: 'Goodbye',
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
    description: 'Essential polite expressions — showing gratitude and apologizing.',
    theme: 'politeness',
    phase: 'speaking',
    order: 2,
    subLessons: [
      {
        id: 'sl-2-1',
        title: 'Thank You',
        sentences: [
          { id: 's-2-1-1', korean: '감사합니다.', romanization: 'gamsahamnida', english: 'Thank you. (formal)', audioUrl: '' },
          { id: 's-2-1-2', korean: '고마워요.', romanization: 'gomawoyo', english: 'Thanks. (casual polite)', audioUrl: '' },
          { id: 's-2-1-3', korean: '정말 감사합니다.', romanization: 'jeongmal gamsahamnida', english: 'Thank you very much.', audioUrl: '' },
          { id: 's-2-1-4', korean: '도와주셔서 감사합니다.', romanization: 'dowajusyeoseo gamsahamnida', english: 'Thank you for helping me.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-2-2',
        title: 'Sorry & Excuse Me',
        sentences: [
          { id: 's-2-2-1', korean: '죄송합니다.', romanization: 'joesonghamnida', english: 'I\'m sorry. (formal)', audioUrl: '' },
          { id: 's-2-2-2', korean: '미안해요.', romanization: 'mianhaeyo', english: 'Sorry. (casual polite)', audioUrl: '' },
          { id: 's-2-2-3', korean: '실례합니다.', romanization: 'sillyehamnida', english: 'Excuse me.', audioUrl: '' },
          { id: 's-2-2-4', korean: '괜찮아요.', romanization: 'gwaenchanayo', english: 'It\'s okay. / No problem.', audioUrl: '' },
          { id: 's-2-2-5', korean: '괜찮아요, 걱정 마세요.', romanization: 'gwaenchanayo, geokjeong maseyo', english: 'It\'s okay, don\'t worry.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-2-3',
        title: 'You\'re Welcome',
        sentences: [
          { id: 's-2-3-1', korean: '아니에요.', romanization: 'anieyo', english: 'Not at all. / You\'re welcome.', audioUrl: '' },
          { id: 's-2-3-2', korean: '별말씀을요.', romanization: 'byeolmalsseumeulyo', english: 'Don\'t mention it.', audioUrl: '' },
          { id: 's-2-3-3', korean: '천만에요.', romanization: 'cheonmaneyo', english: 'You\'re welcome.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-3',
    title: 'At the Café',
    description: 'Order drinks, ask for the menu, and chat at a Korean café.',
    theme: 'café',
    phase: 'speaking',
    order: 3,
    subLessons: [
      {
        id: 'sl-3-1',
        title: 'Ordering',
        sentences: [
          { id: 's-3-1-1', korean: '메뉴 주세요.', romanization: 'menyu juseyo', english: 'Menu, please.', audioUrl: '' },
          { id: 's-3-1-2', korean: '커피 한 잔 주세요.', romanization: 'keopi han jan juseyo', english: 'One coffee, please.', audioUrl: '' },
          { id: 's-3-1-3', korean: '아이스 아메리카노 주세요.', romanization: 'aiseu amerikano juseyo', english: 'Iced americano, please.', audioUrl: '' },
          { id: 's-3-1-4', korean: '뜨거운 거요.', romanization: 'tteugeoun geoyo', english: 'Hot one, please.', audioUrl: '' },
          { id: 's-3-1-5', korean: '이거 얼마예요?', romanization: 'igeo eolmayeyo?', english: 'How much is this?', audioUrl: '' },
        ],
      },
      {
        id: 'sl-3-2',
        title: 'At the Table',
        sentences: [
          { id: 's-3-2-1', korean: '여기 앉아도 돼요?', romanization: 'yeogi anjado dwaeyo?', english: 'Can I sit here?', audioUrl: '' },
          { id: 's-3-2-2', korean: '물 좀 주세요.', romanization: 'mul jom juseyo', english: 'Water, please.', audioUrl: '' },
          { id: 's-3-2-3', korean: '화장실이 어디예요?', romanization: 'hwajangsiri eodiyeyo?', english: 'Where is the restroom?', audioUrl: '' },
          { id: 's-3-2-4', korean: '맛있어요!', romanization: 'masisseoyo!', english: 'It\'s delicious!', audioUrl: '' },
        ],
      },
      {
        id: 'sl-3-3',
        title: 'Paying',
        sentences: [
          { id: 's-3-3-1', korean: '계산해 주세요.', romanization: 'gyesanhae juseyo', english: 'Check, please.', audioUrl: '' },
          { id: 's-3-3-2', korean: '카드로 할게요.', romanization: 'kadeuro halgeyo', english: 'I\'ll pay by card.', audioUrl: '' },
          { id: 's-3-3-3', korean: '현금으로 할게요.', romanization: 'hyeongeumuro halgeyo', english: 'I\'ll pay with cash.', audioUrl: '' },
          { id: 's-3-3-4', korean: '영수증 주세요.', romanization: 'yeongsujeung juseyo', english: 'Receipt, please.', audioUrl: '' },
          { id: 's-3-3-5', korean: '잘 먹었습니다.', romanization: 'jal meogeosseumnida', english: 'Thank you for the meal. (lit: I ate well)', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-4',
    title: 'Numbers & Counting',
    description: 'Learn to count in Korean — for people, things, and time.',
    theme: 'numbers',
    phase: 'speaking',
    order: 4,
    subLessons: [
      {
        id: 'sl-4-1',
        title: 'Sino-Korean Numbers',
        sentences: [
          { id: 's-4-1-1', korean: '일, 이, 삼, 사, 오', romanization: 'il, i, sam, sa, o', english: 'One, two, three, four, five (Sino-Korean)', audioUrl: '' },
          { id: 's-4-1-2', korean: '전화번호가 뭐예요?', romanization: 'jeonhwabeonhoga mwoyeyo?', english: 'What is your phone number?', audioUrl: '' },
          { id: 's-4-1-3', korean: '삼천 원이에요.', romanization: 'samcheon wonieyo', english: 'It\'s 3,000 won.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-4-2',
        title: 'Native Korean Numbers',
        sentences: [
          { id: 's-4-2-1', korean: '하나, 둘, 셋, 넷, 다섯', romanization: 'hana, dul, set, net, daseot', english: 'One, two, three, four, five (Native Korean)', audioUrl: '' },
          { id: 's-4-2-2', korean: '사람 두 명이요.', romanization: 'saram du myeong-iyo', english: 'Two people, please.', audioUrl: '' },
          { id: 's-4-2-3', korean: '커피 세 잔 주세요.', romanization: 'keopi se jan juseyo', english: 'Three coffees, please.', audioUrl: '' },
          { id: 's-4-2-4', korean: '지금 몇 시예요?', romanization: 'jigeum myeot siyeyo?', english: 'What time is it now?', audioUrl: '' },
          { id: 's-4-2-5', korean: '세 시 삼십 분이에요.', romanization: 'se si samsip bunieyo', english: 'It\'s 3:30.', audioUrl: '' },
        ],
      },
    ],
  },
  {
    id: 'lesson-5',
    title: 'Getting Around',
    description: 'Asking for directions, taking taxis, and navigating the city.',
    theme: 'directions',
    phase: 'speaking',
    order: 5,
    subLessons: [
      {
        id: 'sl-5-1',
        title: 'Asking Directions',
        sentences: [
          { id: 's-5-1-1', korean: '길을 잃었어요.', romanization: 'gireul ilheosseoyo', english: 'I\'m lost.', audioUrl: '' },
          { id: 's-5-1-2', korean: '여기가 어디예요?', romanization: 'yeogiga eodiyeyo?', english: 'Where is this place?', audioUrl: '' },
          { id: 's-5-1-3', korean: '지하철역이 어디예요?', romanization: 'jihacheollyeogi eodiyeyo?', english: 'Where is the subway station?', audioUrl: '' },
          { id: 's-5-1-4', korean: '오른쪽으로 가세요.', romanization: 'oreunjjogeuro gaseyo', english: 'Go to the right.', audioUrl: '' },
          { id: 's-5-1-5', korean: '왼쪽으로 가세요.', romanization: 'oenjjogeuro gaseyo', english: 'Go to the left.', audioUrl: '' },
          { id: 's-5-1-6', korean: '직진하세요.', romanization: 'jikjinhaseyo', english: 'Go straight.', audioUrl: '' },
        ],
      },
      {
        id: 'sl-5-2',
        title: 'Taking a Taxi',
        sentences: [
          { id: 's-5-2-1', korean: '택시 타고 싶어요.', romanization: 'taeksi tago sipeoyo', english: 'I want to take a taxi.', audioUrl: '' },
          { id: 's-5-2-2', korean: '여기로 가 주세요.', romanization: 'yeogiro ga juseyo', english: 'Please go here.', audioUrl: '' },
          { id: 's-5-2-3', korean: '얼마나 걸려요?', romanization: 'eolmana geollyeoyo?', english: 'How long does it take?', audioUrl: '' },
          { id: 's-5-2-4', korean: '여기서 세워 주세요.', romanization: 'yeogiseo sewo juseyo', english: 'Please stop here.', audioUrl: '' },
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
