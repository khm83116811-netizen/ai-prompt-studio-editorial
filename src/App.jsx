import { useState, useCallback } from "react";

const CATEGORIES = [
  {
    id: "lens", icon: "◎", title: "카메라 렌즈", titleEn: "Camera Lens", desc: "화각과 왜곡을 결정하는 렌즈 선택",
    gradient: "radial-gradient(ellipse at 30% 50%, rgba(255,107,107,0.4) 0%, rgba(255,167,38,0.3) 30%, rgba(120,80,220,0.2) 60%, transparent 80%)",
    items: [
      { name: "광각 렌즈", en: "Wide Angle — 24mm", prompt: "shot on 24mm wide angle lens, expansive field of view, slight barrel distortion", desc: "넓은 공간감, 풍경이나 건축물에 적합" },
      { name: "표준 렌즈", en: "Standard — 50mm", prompt: "shot on 50mm lens, natural perspective, no distortion, true to human eye", desc: "인간 눈과 가장 유사한 자연스러운 화각" },
      { name: "인물 렌즈", en: "Portrait — 85mm", prompt: "shot on 85mm portrait lens, shallow depth of field, beautiful bokeh, flattering perspective", desc: "인물 촬영에 최적화, 아름다운 배경 흐림" },
      { name: "망원 렌즈", en: "Telephoto — 200mm", prompt: "shot on 200mm telephoto lens, compressed perspective, distant subject isolation", desc: "먼 피사체 압축 효과, 공간이 납작해지는 느낌" },
      { name: "매크로 렌즈", en: "Macro Lens", prompt: "macro lens extreme close-up, incredible detail, shallow depth of field, magnified texture", desc: "극단적 클로즈업, 미세한 디테일 강조" },
      { name: "어안 렌즈", en: "Fish-eye Lens", prompt: "fish-eye lens, 180 degree field of view, extreme barrel distortion, circular warping", desc: "180도 화각, 극단적 왜곡 효과" },
      { name: "아나모픽 렌즈", en: "Anamorphic Lens", prompt: "anamorphic lens, horizontal lens flare, oval bokeh, cinematic 2.39:1 widescreen look", desc: "영화적 수평 플레어와 타원형 보케" },
      { name: "틸트시프트 렌즈", en: "Tilt-Shift Lens", prompt: "tilt-shift lens, selective focus plane, miniature effect, toy-like perspective", desc: "미니어처 효과, 선택적 초점면 조절" },
      { name: "35mm 렌즈", en: "35mm Lens", prompt: "shot on 35mm lens, slight wide angle, street photography perspective, environmental portrait", desc: "스트릿 포토 느낌, 환경과 인물을 함께 담기 적합" },
      { name: "135mm 렌즈", en: "135mm Lens", prompt: "shot on 135mm lens, beautiful background compression, creamy bokeh, portrait telephoto", desc: "인물+배경 압축, 부드러운 보케의 망원 인물 렌즈" },
    ]
  },
  {
    id: "composition", icon: "⊞", title: "구도", titleEn: "Composition", desc: "프레임 안에서 피사체를 어떻게 배치할 것인가",
    gradient: "radial-gradient(ellipse at 70% 40%, rgba(72,219,251,0.35) 0%, rgba(100,120,255,0.25) 40%, transparent 70%)",
    items: [
      { name: "3분할 구도", en: "Rule of Thirds", prompt: "rule of thirds composition, subject placed at intersection point, balanced framing", desc: "화면을 9등분하여 교차점에 피사체 배치" },
      { name: "중앙 구도", en: "Center Composition", prompt: "centered composition, subject in the middle of frame, symmetrical balance, direct eye contact", desc: "피사체를 정중앙에 배치, 강한 시선 집중" },
      { name: "대칭 구도", en: "Symmetrical", prompt: "perfect symmetry composition, mirror-like balance, architectural precision", desc: "좌우 완벽 대칭, 안정감과 긴장감 동시 표현" },
      { name: "리딩 라인", en: "Leading Lines", prompt: "leading lines composition, converging lines guiding the eye toward subject, depth perspective", desc: "시선을 유도하는 선을 활용한 깊이감 있는 구도" },
      { name: "프레임 속 프레임", en: "Frame within Frame", prompt: "frame within a frame composition, natural framing through doorway, window, or arch", desc: "문, 창문, 아치 등으로 자연스러운 내부 프레임 생성" },
      { name: "더치 앵글", en: "Dutch Angle", prompt: "dutch angle, tilted camera 15-30 degrees, dynamic tension, uneasy feeling", desc: "카메라를 기울여 불안감과 역동성 표현" },
      { name: "오버헤드 샷", en: "Overhead / Top-down", prompt: "overhead shot, bird's eye view, looking straight down, flat lay perspective", desc: "바로 위에서 내려다보는 탑다운 뷰" },
      { name: "로우앵글", en: "Low Angle", prompt: "extreme low angle, worm's eye view, looking up at subject, towering perspective, dramatic power", desc: "바닥에서 올려다보는 시점, 대상의 위압감 강조" },
      { name: "네거티브 스페이스", en: "Negative Space", prompt: "negative space composition, subject small in vast empty space, minimalist, isolation", desc: "여백을 극대화하여 고독감이나 미니멀한 느낌 표현" },
      { name: "대각선 구도", en: "Diagonal", prompt: "diagonal composition, dynamic lines cutting across frame, energetic movement, visual tension", desc: "대각선 배치로 역동적 에너지와 움직임 표현" },
    ]
  },
  {
    id: "camera_movement", icon: "↻", title: "촬영기법", titleEn: "Camera Movement", desc: "카메라의 움직임과 촬영 방식",
    gradient: "radial-gradient(ellipse at 50% 60%, rgba(255,190,80,0.35) 0%, rgba(255,100,100,0.2) 40%, transparent 70%)",
    items: [
      { name: "팬", en: "Pan", prompt: "slow horizontal pan, camera rotating left to right, revealing the scene gradually", desc: "카메라가 좌우로 수평 회전하며 장면을 보여줌" },
      { name: "틸트", en: "Tilt", prompt: "vertical tilt movement, camera tilting upward from ground to sky, revealing height", desc: "카메라가 상하로 수직 회전" },
      { name: "달리 샷", en: "Dolly Shot", prompt: "smooth dolly shot, camera moving forward toward subject, increasing intimacy", desc: "카메라가 레일 위에서 앞뒤로 부드럽게 이동" },
      { name: "트래킹 샷", en: "Tracking Shot", prompt: "lateral tracking shot, camera following subject from the side, parallel movement", desc: "피사체를 옆에서 따라가며 촬영" },
      { name: "크레인 샷", en: "Crane Shot", prompt: "crane shot, camera rising upward revealing vast landscape, ascending perspective", desc: "카메라가 위로 상승하며 전체 풍경을 드러냄" },
      { name: "핸드헬드", en: "Handheld", prompt: "handheld camera, slight natural shake, raw documentary feel, urgent energy", desc: "손 떨림이 있는 다큐멘터리 느낌의 생생한 촬영" },
      { name: "스테디캠", en: "Steadicam", prompt: "steadicam shot, smooth floating movement, following subject through space, fluid motion", desc: "부드럽게 떠다니듯 피사체를 따라가는 안정적 이동 촬영" },
      { name: "드론 샷", en: "Drone / Aerial", prompt: "aerial drone shot, high altitude sweeping view, cinematic flyover, vast landscape", desc: "높은 고도에서의 항공 촬영, 웅장한 풍경" },
      { name: "줌 인/아웃", en: "Zoom In/Out", prompt: "slow zoom in on subject's face, increasing focus and tension, dolly zoom effect", desc: "줌을 통한 집중 또는 이완 효과" },
      { name: "오빗 샷", en: "Orbit / Arc Shot", prompt: "360 degree orbit shot, camera circling around subject, dynamic reveal, dramatic rotation", desc: "피사체 주위를 360도 회전하며 촬영" },
    ]
  },
  {
    id: "lighting", icon: "☀", title: "조명", titleEn: "Lighting", desc: "빛의 방향, 강도, 색온도로 분위기 결정",
    gradient: "radial-gradient(ellipse at 40% 30%, rgba(255,220,100,0.4) 0%, rgba(255,140,50,0.25) 35%, rgba(180,60,60,0.15) 60%, transparent 80%)",
    items: [
      { name: "소프트 라이팅", en: "Soft Lighting", prompt: "soft diffused lighting, gentle shadows, even illumination, flattering light", desc: "부드럽고 확산된 빛, 그림자가 연하고 자연스러움" },
      { name: "드라마틱 라이팅", en: "Dramatic Lighting", prompt: "dramatic lighting, strong contrast between light and shadow, chiaroscuro, moody", desc: "명암 대비가 강한 극적인 조명" },
      { name: "시네마틱 라이팅", en: "Cinematic Lighting", prompt: "cinematic lighting, professional film lighting setup, three-point lighting, rich shadows", desc: "영화 촬영에 사용되는 전문적 조명 셋업" },
      { name: "네온 라이팅", en: "Neon Lighting", prompt: "neon lighting, colorful neon glow, pink and blue neon signs, urban night atmosphere", desc: "네온 간판의 다채로운 빛이 반사되는 도시 야경" },
      { name: "백라이트", en: "Backlight", prompt: "strong backlight, subject silhouetted, rim of light around edges, halo effect", desc: "뒤에서 비추는 빛으로 실루엣과 헤일로 효과" },
      { name: "림라이트", en: "Rim Light", prompt: "rim light, thin line of light outlining subject, separating from dark background", desc: "피사체 윤곽을 따라 얇은 빛의 선이 생기는 효과" },
      { name: "로우키 라이팅", en: "Low-key Lighting", prompt: "low-key lighting, predominantly dark, deep shadows, minimal fill light, noir atmosphere", desc: "어둠이 지배적인 느와르 분위기의 조명" },
      { name: "골든아워", en: "Golden Hour", prompt: "golden hour lighting, warm sunset light, long soft shadows, orange golden glow on skin", desc: "일몰 직전의 따뜻한 황금빛 자연광" },
      { name: "볼류메트릭 라이트", en: "Volumetric Light", prompt: "volumetric light, god rays, light beams cutting through fog or dust, atmospheric depth", desc: "안개나 먼지 사이로 빛줄기가 보이는 입체적 조명" },
      { name: "하이키 라이팅", en: "High-key Lighting", prompt: "high-key lighting, bright even illumination, minimal shadows, clean and airy feel", desc: "밝고 균일한 조명, 그림자 최소화, 깨끗한 느낌" },
    ]
  },
  {
    id: "color_tone", icon: "◐", title: "색감과 톤", titleEn: "Color & Tone", desc: "전체 색채와 분위기를 결정하는 색보정 방향",
    gradient: "radial-gradient(ellipse at 60% 50%, rgba(160,80,255,0.35) 0%, rgba(255,100,150,0.25) 35%, rgba(80,200,200,0.15) 60%, transparent 80%)",
    items: [
      { name: "차가운 블루 톤", en: "Cold Blue", prompt: "cold blue color grading, desaturated cool tones, icy blue shadows, clinical atmosphere", desc: "차갑고 냉정한 분위기의 블루 계열 색보정" },
      { name: "따뜻한 오렌지 톤", en: "Warm Orange", prompt: "warm orange color grading, golden warm tones, amber highlights, nostalgic warmth", desc: "따뜻하고 향수를 자극하는 오렌지/앰버 톤" },
      { name: "흑백 느와르", en: "B&W Noir", prompt: "black and white, high contrast monochrome, film noir aesthetic, deep blacks and bright whites", desc: "강한 대비의 흑백, 필름 느와르 미학" },
      { name: "파스텔 톤", en: "Pastel", prompt: "soft pastel color palette, muted pink lavender mint, dreamy light colors, gentle saturation", desc: "부드러운 파스텔 컬러, 몽환적이고 가벼운 느낌" },
      { name: "고대비", en: "High Contrast", prompt: "high contrast color grading, deep blacks and vivid colors, punchy saturated look", desc: "검은색은 더 깊고 색은 더 선명한 강한 대비" },
      { name: "저채도", en: "Desaturated", prompt: "desaturated muted colors, low saturation, bleached look, subdued color palette", desc: "채도를 낮춘 절제된 색감, 담백하고 건조한 느낌" },
      { name: "필름 룩", en: "Film Look", prompt: "analog film look, slight grain, lifted blacks, faded highlights, Kodak Portra color science", desc: "필름 카메라 특유의 그레인과 색감 재현" },
      { name: "빈티지 컬러", en: "Vintage", prompt: "vintage color grading, faded retro palette, yellow-green tint, aged photograph feel", desc: "오래된 사진 느낌의 빈티지 색보정" },
      { name: "사이버펑크 네온", en: "Cyberpunk Neon", prompt: "cyberpunk neon color grading, electric pink and cyan, vivid neon against dark shadows", desc: "어두운 배경에 강렬한 핑크/시안 네온 컬러" },
      { name: "틸 앤 오렌지", en: "Teal & Orange", prompt: "teal and orange color grading, complementary color contrast, Hollywood blockbuster look", desc: "할리우드 블록버스터의 대표적 보색 대비 색보정" },
    ]
  },
  {
    id: "movement", icon: "≋", title: "움직임과 액션", titleEn: "Movement & Action", desc: "피사체의 동작을 구체적으로 지시",
    gradient: "radial-gradient(ellipse at 30% 70%, rgba(80,200,120,0.3) 0%, rgba(50,180,220,0.25) 40%, transparent 70%)",
    items: [
      { name: "천천히 걷기", en: "Slow Walk", prompt: "person walking slowly forward, gentle pace, each step deliberate, calm movement", desc: "인물이 천천히 앞으로 걸어가는 차분한 동작" },
      { name: "머리카락 흔들림", en: "Hair Flowing", prompt: "hair gently flowing in the wind, strands moving naturally, soft breeze", desc: "바람에 자연스럽게 흔들리는 머리카락" },
      { name: "안개 흐름", en: "Fog Flowing", prompt: "fog slowly drifting across the frame, low-lying mist moving gently, atmospheric haze", desc: "카메라 앞으로 안개가 천천히 흘러가는 효과" },
      { name: "옷자락 펄럭임", en: "Clothes Fluttering", prompt: "clothes fluttering in the wind, fabric rippling, coat tail billowing, dynamic textile movement", desc: "바람에 펄럭이는 옷자락과 천의 움직임" },
      { name: "물방울 흐름", en: "Water Drops", prompt: "water droplets slowly running down glass surface, rain drops on window, liquid trails", desc: "창문을 따라 흘러내리는 물방울" },
      { name: "불꽃/파티클", en: "Sparks / Particles", prompt: "floating particles in light beam, dust motes drifting, ember sparks rising slowly", desc: "빛 속에서 떠다니는 먼지나 불꽃 파티클" },
      { name: "고개 돌리기", en: "Head Turn", prompt: "person slowly turning head to look at camera, gradual reveal of face, eye contact moment", desc: "인물이 천천히 고개를 돌려 카메라를 바라봄" },
      { name: "눈 깜빡임", en: "Eye Blink", prompt: "subtle eye blink, natural micro-expression, intimate close-up, lifelike detail", desc: "자연스러운 눈 깜빡임과 미세 표정 변화" },
    ]
  },
  {
    id: "speed", icon: "⏱", title: "속도·타임 컨트롤", titleEn: "Speed & Time", desc: "움직임의 빠르기와 시간 표현 방식",
    gradient: "radial-gradient(ellipse at 70% 30%, rgba(255,80,120,0.35) 0%, rgba(200,60,200,0.2) 40%, transparent 70%)",
    items: [
      { name: "슬로우 모션", en: "Slow Motion", prompt: "slow motion, 120fps, graceful decelerated movement, every detail visible", desc: "느리게 재생되는 우아한 움직임, 디테일 강조" },
      { name: "울트라 슬로모션", en: "Ultra Slow Motion", prompt: "ultra slow motion, 1000fps, extreme time dilation, water splash frozen in time", desc: "극단적으로 느린 재생, 시간이 거의 멈춘 듯한 효과" },
      { name: "타임랩스", en: "Timelapse", prompt: "timelapse, accelerated time, clouds rushing, shadows moving, day to night transition", desc: "시간을 빠르게 압축, 구름/그림자의 빠른 이동" },
      { name: "하이퍼랩스", en: "Hyperlapse", prompt: "hyperlapse, moving timelapse through city streets, accelerated walking perspective, dynamic time compression", desc: "이동하면서 촬영한 타임랩스, 역동적 시간 압축" },
      { name: "스피드 램프", en: "Speed Ramp", prompt: "speed ramp, smooth transition from slow motion to normal speed, dramatic acceleration", desc: "슬로모션에서 정상 속도로 부드럽게 전환" },
      { name: "프리즈 프레임", en: "Freeze Frame", prompt: "freeze frame moment, action frozen in time, still photograph within motion, suspended animation", desc: "움직이다가 한 순간 정지, 사진처럼 멈추는 효과" },
      { name: "불릿 타임", en: "Bullet Time", prompt: "bullet time effect, camera rotating around frozen subject, Matrix-style time freeze with moving perspective", desc: "피사체는 멈추고 카메라만 주위를 도는 매트릭스 효과" },
    ]
  },
  {
    id: "mood", icon: "♡", title: "분위기와 감정", titleEn: "Mood & Emotion", desc: "영상의 심리적 톤과 감정선 설정",
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(180,100,255,0.3) 0%, rgba(100,80,200,0.2) 40%, rgba(255,80,150,0.15) 60%, transparent 80%)",
    items: [
      { name: "긴장감", en: "Tense", prompt: "tense atmosphere, suspenseful mood, uneasy stillness, something about to happen", desc: "무언가 일어날 것 같은 불안한 정적" },
      { name: "몽환적", en: "Dreamy", prompt: "dreamy ethereal atmosphere, soft hazy glow, surreal floating feeling, otherworldly", desc: "비현실적이고 부드러운 꿈속 같은 분위기" },
      { name: "외로운", en: "Lonely", prompt: "lonely isolated mood, solitary figure, vast empty space, melancholic solitude", desc: "고독하고 쓸쓸한 분위기, 넓은 공간 속 작은 인물" },
      { name: "웅장한", en: "Epic / Grand", prompt: "epic grand scale, majestic overwhelming presence, awe-inspiring magnitude, monumental", desc: "압도적인 규모감과 장엄한 분위기" },
      { name: "신비로운", en: "Mysterious", prompt: "mysterious enigmatic atmosphere, hidden secrets, obscured details, intriguing shadows", desc: "비밀스럽고 수수께끼 같은 분위기" },
      { name: "평화로운", en: "Peaceful", prompt: "peaceful serene atmosphere, calm tranquil setting, gentle harmony, soothing presence", desc: "고요하고 평온한 안정감 있는 분위기" },
      { name: "고급스러운", en: "Luxurious", prompt: "luxurious elegant atmosphere, refined sophistication, premium quality, opulent details", desc: "세련되고 고급스러운 프리미엄 분위기" },
      { name: "불안한", en: "Anxious", prompt: "anxious unsettling mood, creeping unease, disturbing undertone, psychological tension", desc: "심리적으로 불편하고 불안한 느낌" },
      { name: "향수", en: "Nostalgic", prompt: "nostalgic wistful mood, bittersweet memory, faded warmth, longing for the past", desc: "과거를 그리워하는 따뜻하면서 쓸쓸한 향수" },
      { name: "압도적인", en: "Overwhelming", prompt: "overwhelming powerful atmosphere, immense force, crushing magnitude, breathtaking intensity", desc: "숨 막히는 강렬함과 압도적 존재감" },
    ]
  },
  {
    id: "style", icon: "❖", title: "스타일 레퍼런스", titleEn: "Style Reference", desc: "실사, 애니메이션, 광고 등 전체 영상 스타일",
    gradient: "radial-gradient(ellipse at 40% 40%, rgba(255,170,60,0.35) 0%, rgba(220,80,80,0.2) 40%, rgba(160,60,200,0.15) 60%, transparent 80%)",
    items: [
      { name: "시네마틱 리얼리즘", en: "Cinematic Realism", prompt: "cinematic realism, photorealistic, shot on ARRI Alexa, film grain, professional cinematography", desc: "극장 영화 수준의 사실적 영상미" },
      { name: "다큐멘터리", en: "Documentary Style", prompt: "documentary style, raw authentic footage, natural lighting, observational camera, real-world feel", desc: "다큐멘터리 특유의 날것 같은 진정성" },
      { name: "패션 필름", en: "Fashion Film", prompt: "fashion film aesthetic, editorial style, high-end production, model-like poses, luxury fashion photography in motion", desc: "패션 화보가 움직이는 듯한 고급 영상미" },
      { name: "뮤직비디오", en: "Music Video", prompt: "music video aesthetic, stylized visuals, rhythmic editing, bold creative choices, performance energy", desc: "뮤직비디오 특유의 스타일리시한 영상 연출" },
      { name: "럭셔리 광고", en: "Luxury Commercial", prompt: "luxury commercial, premium product photography in motion, elegant slow reveal, aspirational lifestyle", desc: "프리미엄 브랜드 광고 느낌의 세련된 영상" },
      { name: "애니메이션", en: "Anime Style", prompt: "anime style animation, Japanese animation aesthetic, cel-shaded, vibrant colors, expressive characters", desc: "일본 애니메이션 스타일의 셀 셰이딩 영상" },
      { name: "3D 애니메이션", en: "3D Animation", prompt: "3D CGI animation, Pixar-quality rendering, smooth surfaces, stylized 3D characters, global illumination", desc: "고품질 3D 렌더링, 스타일라이즈드 캐릭터" },
      { name: "느와르 필름", en: "Noir Film", prompt: "film noir style, black and white, venetian blind shadows, femme fatale, detective atmosphere, 1940s aesthetic", desc: "1940년대 느와르 영화의 흑백 그림자 미학" },
      { name: "레트로 VHS", en: "Retro VHS", prompt: "retro VHS aesthetic, analog video distortion, scan lines, color bleeding, 80s home video feel, tracking artifacts", desc: "80년대 비디오테이프 특유의 아날로그 왜곡" },
      { name: "수채화 애니메이션", en: "Watercolor Animation", prompt: "watercolor animation style, painted textures, soft color bleeding, artistic brush strokes in motion", desc: "수채화 그림이 움직이는 듯한 아트 스타일" },
    ]
  },
  {
    id: "dof", icon: "◉", title: "피사계 심도", titleEn: "Depth of Field", desc: "초점 범위와 배경 흐림 정도",
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(120,200,255,0.3) 0%, rgba(80,100,200,0.2) 40%, transparent 70%)",
    items: [
      { name: "얕은 심도", en: "Shallow DOF", prompt: "shallow depth of field, f/1.4, extremely blurred background, sharp subject focus, creamy bokeh", desc: "배경이 극단적으로 흐려지고 피사체만 선명" },
      { name: "깊은 심도", en: "Deep Focus", prompt: "deep focus, everything in sharp focus from foreground to background, f/11, landscape clarity", desc: "전경부터 배경까지 모든 것이 선명" },
      { name: "보케 효과", en: "Bokeh", prompt: "beautiful circular bokeh, out-of-focus light points, dreamy background blur, light orbs", desc: "배경의 빛이 아름다운 원형으로 흐려지는 효과" },
      { name: "랙 포커스", en: "Rack Focus", prompt: "rack focus transition, focus shifting from foreground to background subject, smooth focus pull", desc: "초점이 전경에서 배경으로 부드럽게 이동" },
      { name: "피사체 분리", en: "Subject Isolation", prompt: "subject isolation, sharp subject against completely blurred environment, dramatic separation", desc: "주인공만 또렷하고 나머지는 완전히 흐릿하게 분리" },
      { name: "소프트 포커스", en: "Soft Focus", prompt: "soft focus, slightly diffused overall sharpness, romantic dreamy haze, glowing highlights", desc: "전체적으로 살짝 부드럽게 흐려진 로맨틱한 느낌" },
    ]
  },
  {
    id: "environment", icon: "☁", title: "시간대·날씨·계절", titleEn: "Time · Weather · Season", desc: "환경 조건으로 조명과 분위기를 한번에 설정",
    gradient: "radial-gradient(ellipse at 30% 40%, rgba(100,180,255,0.3) 0%, rgba(200,200,250,0.2) 40%, transparent 70%)",
    items: [
      { name: "새벽", en: "Dawn", prompt: "pre-dawn blue hour, first light on horizon, deep blue sky, quiet stillness before sunrise", desc: "해 뜨기 직전의 깊은 파란빛과 고요함" },
      { name: "골든아워 (일출)", en: "Golden Hour Sunrise", prompt: "golden hour sunrise, warm amber light from low sun, long shadows, dewy morning freshness", desc: "일출 직후 따뜻한 황금빛과 긴 그림자" },
      { name: "한낮", en: "Midday", prompt: "harsh midday sun, overhead lighting, strong defined shadows, bright even exposure", desc: "머리 위에서 내리쬐는 강한 한낮의 햇빛" },
      { name: "골든아워 (일몰)", en: "Golden Hour Sunset", prompt: "golden hour sunset, rich warm orange light, dramatic long shadows, glowing skin tones", desc: "일몰 직전의 풍부한 오렌지빛과 극적 그림자" },
      { name: "블루아워", en: "Blue Hour", prompt: "blue hour twilight, deep cobalt blue sky, city lights beginning to glow, magical transition", desc: "일몰 직후의 깊은 코발트 블루빛 하늘" },
      { name: "깊은 밤", en: "Deep Night", prompt: "deep night, darkness with selective artificial lighting, moonlit atmosphere, nocturnal quiet", desc: "달빛과 인공 조명만 있는 깊은 밤" },
      { name: "안개 낀 날", en: "Foggy", prompt: "dense fog, limited visibility, mysterious atmosphere, soft diffused light, objects fading into mist", desc: "짙은 안개 속 제한된 시야, 신비로운 분위기" },
      { name: "비 오는 날", en: "Rainy", prompt: "heavy rain, wet reflective surfaces, rain streaks, puddles, gloomy overcast sky", desc: "비에 젖은 반사 표면과 빗줄기" },
      { name: "눈 오는 날", en: "Snowy", prompt: "falling snow, white blanket covering everything, cold blue tint, quiet winter atmosphere, snowflakes", desc: "모든 것을 덮은 하얀 눈과 차가운 겨울 분위기" },
      { name: "가을 단풍", en: "Autumn Foliage", prompt: "autumn season, golden red orange fallen leaves, warm earthy tones, crisp autumn air, seasonal transition", desc: "붉고 노란 단풍잎, 따뜻한 가을 색감" },
    ]
  },
  {
    id: "texture", icon: "▤", title: "질감과 재질", titleEn: "Texture & Material", desc: "표면의 디테일과 재질감 표현",
    gradient: "radial-gradient(ellipse at 60% 60%, rgba(180,140,100,0.3) 0%, rgba(120,100,80,0.2) 40%, transparent 70%)",
    items: [
      { name: "젖은 아스팔트", en: "Wet Asphalt", prompt: "wet asphalt surface, rain-soaked road reflecting city lights, glossy dark pavement, puddle reflections", desc: "비에 젖어 도시 불빛을 반사하는 아스팔트" },
      { name: "금속 브러시드", en: "Brushed Metal", prompt: "brushed metal surface, fine linear scratches, industrial steel texture, metallic sheen", desc: "미세한 직선 스크래치가 있는 산업적 금속 표면" },
      { name: "가죽", en: "Worn Leather", prompt: "worn leather texture, aged patina, natural creases and grain, warm brown tones, tactile quality", desc: "세월이 묻은 가죽의 주름과 질감" },
      { name: "서리 낀 유리", en: "Frosted Glass", prompt: "frosted glass surface, translucent ice crystals, blurred shapes behind, cold winter texture", desc: "얼음 결정이 맺힌 반투명 유리 표면" },
      { name: "실크 원단", en: "Silk Fabric", prompt: "flowing silk fabric, smooth lustrous surface, light catching folds, elegant draping, luxurious sheen", desc: "빛을 받아 윤기 나는 부드러운 실크의 주름" },
      { name: "낡은 나무", en: "Aged Wood", prompt: "aged weathered wood grain, visible rings and knots, rough splintered texture, rustic character", desc: "풍화된 나무의 결과 옹이, 거친 소박한 질감" },
      { name: "녹슨 철", en: "Rusted Iron", prompt: "rusted iron surface, orange-brown oxidation, flaking corroded metal, industrial decay, gritty texture", desc: "산화되어 벗겨지는 녹슨 철의 거친 표면" },
      { name: "이슬 맺힌 꽃잎", en: "Dewy Petals", prompt: "morning dew on flower petals, tiny water droplets, macro detail, fresh delicate nature, glistening surface", desc: "꽃잎 위 작은 이슬 방울의 섬세한 디테일" },
    ]
  },
  {
    id: "character", icon: "♟", title: "캐릭터 디테일", titleEn: "Character Detail", desc: "인물 설정의 구체적 기술 항목",
    gradient: "radial-gradient(ellipse at 50% 40%, rgba(255,180,200,0.3) 0%, rgba(200,120,160,0.2) 40%, transparent 70%)",
    items: [
      { name: "나이/성별", en: "Age & Gender", prompt: "[age] year old [gender], [ethnicity], [specific facial features], natural skin texture", desc: "나이, 성별, 인종, 얼굴 특징을 구체적으로 기술" },
      { name: "헤어스타일", en: "Hairstyle", prompt: "[hair length] [hair color] hair, [style: slicked back / messy / braided / buzz cut], natural movement", desc: "길이, 색상, 스타일을 구체적으로 지정" },
      { name: "표정", en: "Expression", prompt: "[expression: subtle smile / stern gaze / tearful eyes / contemplative look], micro-expressions visible", desc: "감정을 전달하는 세밀한 표정 묘사" },
      { name: "의상", en: "Outfit", prompt: "wearing [top: black turtleneck], [bottom: tailored gray trousers], [shoes: white sneakers], [accessory: silver watch]", desc: "상의, 하의, 신발, 액세서리를 각각 지정" },
      { name: "자세", en: "Posture", prompt: "[posture: leaning against wall / arms crossed / hands in pockets / sitting cross-legged], relaxed body language", desc: "서 있는 방식, 팔의 위치, 전체 바디랭귀지" },
      { name: "시선 방향", en: "Gaze Direction", prompt: "looking [direction: directly at camera / off to the left / downward / into the distance], [emotion] in eyes", desc: "카메라, 좌측, 아래, 먼 곳 등 시선이 향하는 방향" },
    ]
  },
  {
    id: "space", icon: "▢", title: "환경·공간 디테일", titleEn: "Environment & Space", desc: "배경과 공간의 구체적 설정",
    gradient: "radial-gradient(ellipse at 40% 60%, rgba(60,180,160,0.3) 0%, rgba(40,120,180,0.2) 40%, transparent 70%)",
    items: [
      { name: "도시 골목", en: "Urban Alley", prompt: "narrow urban alley, old brick walls, neon signs overhead, wet ground, steam rising from grates", desc: "낡은 벽돌벽과 네온 간판이 있는 좁은 도시 골목" },
      { name: "넓은 광장", en: "Open Plaza", prompt: "vast open plaza, marble ground, geometric architecture, human figures scattered, sense of scale", desc: "탁 트인 광장, 건축적 규모감" },
      { name: "고층 옥상", en: "Rooftop", prompt: "high-rise rooftop, city skyline panorama, wind at height, urban landscape stretching to horizon", desc: "도시 스카이라인이 보이는 고층 건물 옥상" },
      { name: "숲 속", en: "Deep Forest", prompt: "dense forest interior, tall trees filtering sunlight, dappled light on forest floor, moss and ferns", desc: "키 큰 나무 사이로 빛이 스며드는 깊은 숲" },
      { name: "버려진 건물", en: "Abandoned Building", prompt: "abandoned derelict building, broken windows, peeling paint, overgrown vegetation, eerie emptiness", desc: "폐허가 된 건물의 으스스한 빈 공간" },
      { name: "실내 스튜디오", en: "Studio Interior", prompt: "clean studio interior, controlled lighting, neutral backdrop, professional photography setup", desc: "통제된 조명의 깨끗한 촬영 스튜디오" },
      { name: "해변", en: "Beach", prompt: "beach coastline, waves crashing on shore, wet sand reflections, ocean horizon, salt spray in air", desc: "파도가 치는 해변, 젖은 모래의 반사" },
      { name: "네온 거리", en: "Neon Street", prompt: "neon-lit city street at night, colorful reflections on wet pavement, bustling urban nightlife, signs glowing", desc: "네온 불빛이 반사되는 도시의 밤거리" },
    ]
  },
  {
    id: "format", icon: "▣", title: "해상도·화면비·FPS", titleEn: "Resolution & Format", desc: "출력 포맷과 기술 사양 설정",
    gradient: "radial-gradient(ellipse at 60% 30%, rgba(100,100,180,0.3) 0%, rgba(80,80,140,0.2) 40%, transparent 70%)",
    items: [
      { name: "16:9 와이드스크린", en: "16:9 Widescreen", prompt: "16:9 aspect ratio, widescreen cinematic format, standard HD/4K video", desc: "유튜브, TV, 영화 표준 와이드 포맷" },
      { name: "9:16 세로형", en: "9:16 Vertical", prompt: "9:16 vertical aspect ratio, portrait mode, mobile-first framing, TikTok/Reels format", desc: "숏폼 콘텐츠용 세로 모바일 포맷" },
      { name: "1:1 정사각형", en: "1:1 Square", prompt: "1:1 square aspect ratio, Instagram feed format, centered balanced composition", desc: "인스타그램 피드용 정사각 포맷" },
      { name: "21:9 울트라와이드", en: "21:9 Ultra-wide", prompt: "21:9 ultra-widescreen, anamorphic cinematic ratio, letterbox format, epic scope", desc: "시네마스코프 영화 비율의 울트라와이드" },
      { name: "24fps 영화", en: "24fps Film", prompt: "24 frames per second, cinematic film cadence, natural motion blur, movie-like motion", desc: "영화 표준 프레임레이트, 자연스러운 모션 블러" },
      { name: "60fps 부드러운", en: "60fps Smooth", prompt: "60 frames per second, ultra smooth motion, clear sharp movement, no motion blur", desc: "매끄럽고 선명한 움직임의 고프레임 영상" },
    ]
  },
  {
    id: "negative", icon: "⊘", title: "네거티브 프롬프트", titleEn: "Negative Prompt", desc: "피해야 할 요소를 명시하여 품질 향상",
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(255,60,60,0.25) 0%, rgba(180,40,40,0.15) 40%, transparent 70%)",
    items: [
      { name: "흐릿함 방지", en: "Anti-Blur", prompt: "Negative: blurry, out of focus, soft, unfocused, motion blur artifacts, hazy", desc: "의도치 않은 흐릿함과 초점 이탈 방지" },
      { name: "얼굴 왜곡 방지", en: "Anti-Face Distortion", prompt: "Negative: distorted face, asymmetric features, uncanny valley, melting face, morphing facial features", desc: "AI가 자주 만드는 얼굴 왜곡 현상 방지" },
      { name: "손가락 오류 방지", en: "Anti-Extra Fingers", prompt: "Negative: extra fingers, missing fingers, fused fingers, deformed hands, six fingers, mutated hands", desc: "AI 영상의 고질적 문제인 손가락 오류 방지" },
      { name: "모핑 방지", en: "Anti-Morphing", prompt: "Negative: morphing artifacts, shape shifting, unstable form, flickering geometry, inconsistent anatomy", desc: "형태가 불안정하게 변형되는 모핑 현상 방지" },
      { name: "워터마크 방지", en: "Anti-Watermark", prompt: "Negative: watermark, text overlay, logo, copyright stamp, signature, UI elements", desc: "워터마크나 텍스트가 나타나는 것을 방지" },
      { name: "과채도 방지", en: "Anti-Oversaturation", prompt: "Negative: oversaturated, neon colors, unrealistic vivid colors, HDR artifacts, blown out colors", desc: "비현실적으로 과도한 채도와 HDR 아티팩트 방지" },
    ]
  },
  {
    id: "reference", icon: "⊡", title: "참조 이미지·시드", titleEn: "Reference & Seed", desc: "일관된 결과를 위한 참조 관리",
    gradient: "radial-gradient(ellipse at 40% 50%, rgba(80,160,255,0.3) 0%, rgba(60,100,200,0.2) 40%, transparent 70%)",
    items: [
      { name: "무드보드 참조", en: "Mood Board Reference", prompt: "Style reference: [attach mood board image], match overall color palette and atmosphere", desc: "분위기를 맞추기 위한 참조 이미지 첨부" },
      { name: "시드 번호 기록", en: "Seed Number", prompt: "Seed: [number] — reuse this seed for consistent results with variations", desc: "마음에 드는 결과의 시드 번호를 기록하여 재현" },
      { name: "캐릭터 얼굴 고정", en: "Face Lock", prompt: "Use face reference image for character consistency, IP-Adapter face lock, maintain identity across shots", desc: "참조 이미지로 캐릭터 얼굴을 고정하여 일관성 유지" },
      { name: "이미지 투 비디오", en: "img2vid", prompt: "Generate video from this reference image, maintain composition and style, animate with subtle motion", desc: "정지 이미지를 기반으로 영상을 생성" },
    ]
  },
  {
    id: "transition", icon: "⇥", title: "전환 효과", titleEn: "Transition", desc: "컷과 컷 사이의 연결 방식",
    gradient: "radial-gradient(ellipse at 60% 40%, rgba(200,160,255,0.3) 0%, rgba(140,100,220,0.2) 40%, transparent 70%)",
    items: [
      { name: "하드 컷", en: "Hard Cut", prompt: "hard cut transition, instant scene change, abrupt shift, no blending between shots", desc: "즉각적인 장면 전환, 긴장감이나 리듬감 부여" },
      { name: "디졸브", en: "Dissolve", prompt: "dissolve transition, gradual cross-fade between scenes, one image melting into another", desc: "한 장면이 다음 장면으로 서서히 녹아드는 전환" },
      { name: "페이드 투 블랙", en: "Fade to Black", prompt: "fade to black, scene gradually darkening to complete black, ending or time skip", desc: "화면이 서서히 어두워지며 검은 화면으로 전환" },
      { name: "휩 팬 전환", en: "Whip Pan", prompt: "whip pan transition, fast camera swipe blurring between scenes, energetic scene change", desc: "빠르게 휘두르는 카메라로 장면을 연결" },
      { name: "매치 컷", en: "Match Cut", prompt: "match cut transition, visually similar shapes connecting two different scenes, graphic match", desc: "유사한 형태로 두 장면을 연결하는 편집 기법" },
      { name: "모프 전환", en: "Morph Transition", prompt: "morph transition, one shape smoothly transforming into another, seamless metamorphosis", desc: "한 형태가 다른 형태로 부드럽게 변형되는 전환" },
    ]
  },
  {
    id: "text_typo", icon: "A", title: "텍스트·타이포그래피", titleEn: "Text & Typography", desc: "자막, 타이틀, 로고 텍스트 설계",
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.12) 0%, rgba(180,180,200,0.08) 40%, transparent 70%)",
    items: [
      { name: "타이틀 카드", en: "Title Card", prompt: "bold title card, large centered text, [font style], [color] on [background], cinematic opening", desc: "영상 시작의 큰 타이틀 텍스트" },
      { name: "하단 자막", en: "Lower Third", prompt: "lower third text overlay, clean minimal design, name and title at bottom third of frame", desc: "화면 하단 3분의 1 위치의 정보 자막" },
      { name: "타이프라이터 효과", en: "Typewriter Effect", prompt: "typewriter text animation, letters appearing one by one, cursor blinking, mechanical typing rhythm", desc: "한 글자씩 타이핑되듯 나타나는 텍스트 효과" },
      { name: "글리치 텍스트", en: "Glitch Text", prompt: "glitch text effect, digital distortion, RGB split, corrupted typography, cyber aesthetic", desc: "디지털 오류처럼 깨지는 사이버 텍스트 효과" },
    ]
  },
  {
    id: "sound", icon: "♪", title: "사운드 디자인 방향", titleEn: "Sound Design", desc: "편집 시 활용할 음향 기획 메모",
    gradient: "radial-gradient(ellipse at 50% 60%, rgba(100,200,160,0.25) 0%, rgba(60,160,120,0.15) 40%, transparent 70%)",
    items: [
      { name: "앰비언트/환경음", en: "Ambient", prompt: "[Sound note] ambient environmental sounds, background atmosphere, room tone, natural soundscape", desc: "자연스러운 환경음과 공간감" },
      { name: "일렉트로닉 BGM", en: "Electronic BGM", prompt: "[Sound note] electronic music, synth pads, pulsing beat, modern digital atmosphere", desc: "신시사이저 기반의 현대적 전자 음악" },
      { name: "오케스트라", en: "Orchestral", prompt: "[Sound note] orchestral score, sweeping strings, dramatic brass, cinematic epic music", desc: "웅장한 오케스트라 사운드트랙" },
      { name: "무음 구간", en: "Silence", prompt: "[Sound note] complete silence, dramatic pause, no music, only ambient sound or nothing", desc: "극적 효과를 위한 완전한 정적" },
      { name: "ASMR/포일리", en: "ASMR / Foley", prompt: "[Sound note] detailed foley sounds, ASMR quality, crisp footsteps, fabric rustling, close-mic recording", desc: "섬세한 효과음, 발소리, 천 소리 등 근접 녹음" },
    ]
  },
  {
    id: "edit_structure", icon: "⊞", title: "편집 구조", titleEn: "Edit Structure", desc: "컷 순서, 리듬, 전체 흐름 설계",
    gradient: "radial-gradient(ellipse at 40% 50%, rgba(220,180,80,0.3) 0%, rgba(180,140,60,0.2) 40%, transparent 70%)",
    items: [
      { name: "오프닝→전개→클로징", en: "3-Act Structure", prompt: "Structure: Opening establishing shot → Development / action sequence → Closing resolution shot", desc: "기본 3단 구조 — 도입, 전개, 마무리" },
      { name: "와이드→미디엄→클로즈업", en: "Wide to Close-up", prompt: "Structure: Start with wide establishing shot → medium shot showing context → extreme close-up for detail", desc: "넓은 전경에서 점점 좁혀가는 컷 배치" },
      { name: "빠른 컷 리듬", en: "Fast Cut Rhythm", prompt: "fast-paced editing rhythm, quick cuts every 1-2 seconds, energetic montage, MTV-style editing", desc: "1~2초 단위의 빠른 컷 전환, 에너지 넘치는 리듬" },
      { name: "느린 롱테이크", en: "Slow Long Take", prompt: "long take, extended single shot over 10 seconds, no cuts, continuous unbroken movement, contemplative pace", desc: "10초 이상 끊김 없는 하나의 긴 샷" },
      { name: "몽타주 시퀀스", en: "Montage Sequence", prompt: "montage sequence, series of short clips conveying passage of time, thematic visual connections", desc: "시간의 흐름이나 주제를 전달하는 짧은 클립의 연속" },
    ]
  },
  {
    id: "consistency", icon: "⊜", title: "일관성 관리", titleEn: "Consistency", desc: "장면 간 통일성을 유지하기 위한 체크리스트",
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(160,160,180,0.25) 0%, rgba(120,120,140,0.15) 40%, transparent 70%)",
    items: [
      { name: "얼굴 일관성", en: "Face Consistency", prompt: "Consistency check: maintain same facial features, bone structure, skin tone across all shots", desc: "모든 컷에서 동일한 얼굴 특징 유지" },
      { name: "의상 일관성", en: "Outfit Consistency", prompt: "Consistency check: same clothing, accessories, shoes in continuous scene, no wardrobe changes", desc: "연속 장면에서 동일한 의상과 액세서리 유지" },
      { name: "배경 일관성", en: "Background Consistency", prompt: "Consistency check: maintain same background elements, architecture, props, spatial layout between cuts", desc: "컷 사이에서 배경 요소와 공간 배치 일관성 유지" },
      { name: "색감 일관성", en: "Color Consistency", prompt: "Consistency check: unified color grading across all shots, same white balance, matching color palette", desc: "모든 장면에서 동일한 색보정과 화이트밸런스 유지" },
      { name: "조명 일관성", en: "Lighting Consistency", prompt: "Consistency check: same light direction, intensity, color temperature, shadow direction across cuts", desc: "빛의 방향, 강도, 색온도, 그림자 방향 통일" },
      { name: "물체 위치 일관성", en: "Object Position", prompt: "Consistency check: props and objects maintain same position, no teleporting items between shots", desc: "소품과 오브젝트가 컷 사이에서 위치 변동 없이 유지" },
    ]
  },
  {
    id: "text_motion", icon: "✦", title: "텍스트 모션그래픽", titleEn: "Text Motion Graphics",
    desc: "글자와 타이포그래피의 움직임, 등장 방식, 리듬 설계",
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(120,160,255,0.12) 40%, transparent 70%)",
    items: [
      { name: "키네틱 타이포", en: "Kinetic Typography", prompt: "kinetic typography, bold text moving rhythmically with the beat, dynamic scaling and position shifts, energetic motion design", desc: "음악이나 내레이션 리듬에 맞춰 움직이는 강한 타이포그래피" },
      { name: "마스크 리빌", en: "Mask Reveal", prompt: "text revealed through animated mask, wipe reveal from left to right, smooth easing, clean modern motion graphic", desc: "마스크가 지나가며 글자가 부드럽게 나타나는 효과" },
      { name: "글자 분해", en: "Letter Disintegration", prompt: "letters breaking apart into tiny particles, typography disintegrating and reassembling, cinematic particle animation", desc: "글자가 입자로 흩어졌다가 다시 조립되는 효과" },
      { name: "3D 텍스트 회전", en: "3D Text Rotation", prompt: "extruded 3D typography rotating in space, glossy bevel edges, dramatic studio lighting, premium title design", desc: "입체감 있는 3D 타이틀이 공간에서 회전하는 그래픽" },
      { name: "리퀴드 타이포", en: "Liquid Typography", prompt: "liquid typography, letters melting and flowing like fluid, organic morphing motion, smooth glossy surface", desc: "글자가 액체처럼 녹고 흐르는 유기적 모션" },
      { name: "스크롤링 크레딧", en: "Scrolling Credits", prompt: "vertical scrolling credits, elegant cinematic end title sequence, slow upward movement, refined typography", desc: "영화 엔딩 크레딧 느낌의 텍스트 스크롤" },
      { name: "타이포 줌 인", en: "Typography Zoom In", prompt: "large typography rapidly zooming toward camera, impact frame, motion blur, energetic reveal, bold font", desc: "글자가 카메라 앞으로 강하게 확대되며 등장" },
      { name: "자막 바운스", en: "Bouncy Captions", prompt: "social media caption animation, words popping in with subtle bounce, bold readable subtitles, smooth elastic easing", desc: "숏폼 영상에 적합한 통통 튀는 자막 모션" },
    ]
  },
  {
    id: "graphic_overlay", icon: "⌁", title: "그래픽 오버레이", titleEn: "Graphic Overlay",
    desc: "라인, 도형, HUD, 인포그래픽 등 화면 위 그래픽 요소",
    gradient: "radial-gradient(ellipse at 60% 40%, rgba(80,220,255,0.25) 0%, rgba(100,120,255,0.16) 45%, transparent 75%)",
    items: [
      { name: "HUD 인터페이스", en: "HUD Interface", prompt: "futuristic HUD interface overlay, holographic blue graphics, scanning lines, circular data elements, sci-fi UI", desc: "SF 느낌의 홀로그램 인터페이스 오버레이" },
      { name: "라인 드로잉", en: "Line Drawing", prompt: "animated line drawing, thin elegant lines tracing the subject outline, clean white strokes, minimal motion graphic reveal", desc: "선이 피사체나 도형을 따라 그려지는 효과" },
      { name: "데이터 그래프", en: "Data Visualization", prompt: "animated data visualization, bars and graphs growing smoothly, clean infographic design, modern corporate motion graphics", desc: "숫자, 통계, 정보 전달용 그래프 애니메이션" },
      { name: "오디오 파형", en: "Audio Waveform", prompt: "audio waveform animation reacting to sound, pulsing lines, rhythmic visualizer, minimal black background", desc: "음악이나 목소리에 반응하는 파형 그래픽" },
      { name: "네온 라인", en: "Neon Lines", prompt: "neon glowing lines moving across the frame, abstract light trails, futuristic motion design, vibrant energy streaks", desc: "화면을 가로지르는 네온 라인과 빛 궤적" },
      { name: "아이콘 팝업", en: "Icon Pop-up", prompt: "minimal icons popping in with elastic motion, clean UI animation, soft shadows, modern app-style graphics", desc: "아이콘이 튀어나오듯 등장하는 UI 모션" },
      { name: "점선 경로", en: "Dotted Path", prompt: "dotted path animation, moving points following a curved route, map-style motion graphic, travel visualization", desc: "지도, 이동 경로, 여정을 표현하는 점선 모션" },
      { name: "원형 로딩", en: "Circular Loading", prompt: "circular loading animation, radial progress rings, minimal tech interface, clean geometric motion", desc: "앱이나 테크 영상에 쓰기 좋은 원형 진행 그래픽" },
    ]
  },
  {
    id: "image_detail", icon: "◆", title: "이미지 제작 디테일", titleEn: "Image Generation Detail",
    desc: "정지 이미지 생성에 필요한 품질, 디테일, 묘사 요소",
    gradient: "radial-gradient(ellipse at 45% 55%, rgba(255,180,120,0.28) 0%, rgba(255,100,180,0.16) 45%, transparent 75%)",
    items: [
      { name: "초고해상도 디테일", en: "Ultra Detail", prompt: "ultra-detailed, high resolution, intricate details, sharp focus, highly refined image quality, professional finish", desc: "전체 이미지의 세부 묘사와 선명도를 극대화" },
      { name: "제품 사진", en: "Product Photography", prompt: "premium product photography, clean studio background, controlled reflections, sharp commercial lighting, high-end advertising image", desc: "상세페이지나 광고에 적합한 제품 이미지" },
      { name: "피부 질감", en: "Skin Texture", prompt: "natural skin pores, realistic skin texture, subtle imperfections, lifelike complexion, soft professional portrait lighting", desc: "인물 이미지의 자연스러운 피부 표현" },
      { name: "배경 밀도", en: "Rich Background", prompt: "richly detailed background, layered environment, small props, atmospheric depth, believable worldbuilding details", desc: "배경을 더 풍부하고 설득력 있게 만드는 요소" },
      { name: "포스터 이미지", en: "Poster Composition", prompt: "movie poster composition, dramatic central subject, bold negative space for title, high impact visual hierarchy", desc: "포스터나 썸네일에 적합한 강한 구성" },
      { name: "컨셉아트", en: "Concept Art", prompt: "concept art style, polished visual development, detailed environment design, cinematic mood, professional artbook quality", desc: "세계관, 캐릭터, 공간 기획용 이미지 스타일" },
      { name: "에디토리얼", en: "Editorial Image", prompt: "editorial magazine photography, refined styling, sophisticated composition, premium visual direction, fashion editorial quality", desc: "잡지 화보 같은 고급 이미지 스타일" },
      { name: "초현실 이미지", en: "Surreal Image", prompt: "surreal image composition, impossible architecture, dream logic, symbolic visual elements, conceptual photography", desc: "비현실적이고 상징적인 이미지 제작" },
    ]
  },
  {
    id: "product_ad", icon: "▲", title: "제품·브랜드 광고", titleEn: "Product & Brand Ad",
    desc: "제품 촬영, 브랜드 필름, 광고 장르별 프롬프트",
    gradient: "radial-gradient(ellipse at 55% 45%, rgba(255,215,0,0.2) 0%, rgba(200,160,60,0.14) 40%, transparent 72%)",
    items: [
      { name: "제품 히어로샷", en: "Product Hero Shot", prompt: "hero shot of product, centered composition, dramatic lighting, premium commercial look, clean studio backdrop", desc: "제품을 가장 돋보이게 보여주는 대표 장면" },
      { name: "제품 360도 회전", en: "Product 360 Rotation", prompt: "product rotating 360 degrees on turntable, clean studio background, smooth reflective surface, seamless loop", desc: "제품이 턴테이블 위에서 회전하는 광고 장면" },
      { name: "패키지 클로즈업", en: "Packaging Close-up", prompt: "close-up of packaging details, embossed logo, premium material texture, sharp macro focus, tactile quality", desc: "로고, 질감, 패키지 디테일을 강조" },
      { name: "액체 스플래시", en: "Liquid Splash", prompt: "liquid splash around product, frozen motion, high-speed commercial photography, dynamic droplets", desc: "음료, 향수, 화장품 광고에 적합한 스플래시" },
      { name: "뷰티 광고", en: "Beauty Commercial", prompt: "beauty product commercial, glossy reflections, soft pastel background, elegant feminine styling, dewy finish", desc: "화장품, 스킨케어 브랜드 이미지" },
      { name: "테크 제품 광고", en: "Tech Product Ad", prompt: "minimal tech product advertisement, sleek device, dark background, precise rim lighting, floating perspective", desc: "스마트폰, 노트북 등 디지털 기기 광고" },
      { name: "향수 광고", en: "Perfume Commercial", prompt: "perfume bottle hero shot, mist and glass reflections, sensual lighting, luxury fragrance advertisement, ethereal atmosphere", desc: "향수 제품 광고용 무드" },
      { name: "패션 캠페인", en: "Fashion Campaign", prompt: "high fashion campaign, editorial model pose, luxury styling, dramatic studio lighting, bold creative direction", desc: "패션 브랜드 캠페인 이미지와 영상" },
      { name: "푸드 광고", en: "Food Commercial", prompt: "delicious food commercial, steam rising, glossy sauce texture, appetizing macro close-up, warm inviting lighting", desc: "음식 광고나 레시피 영상에 적합" },
      { name: "럭셔리 브랜드 필름", en: "Luxury Brand Film", prompt: "luxury brand film, elegant slow motion, premium lifestyle imagery, refined visual identity, aspirational mood", desc: "고급 브랜드 무드 영상" },
    ]
  },
  {
    id: "shortform", icon: "⚡", title: "소셜 숏폼 스타일", titleEn: "Social Short-form",
    desc: "TikTok, Reels, Shorts용 빠른 후킹과 모바일 최적화",
    gradient: "radial-gradient(ellipse at 65% 35%, rgba(255,60,100,0.28) 0%, rgba(255,120,60,0.16) 40%, transparent 72%)",
    items: [
      { name: "후킹 오프닝", en: "Hook Opening", prompt: "first 3 seconds hook, bold visual impact, attention-grabbing opening frame, fast social media pacing", desc: "첫 3초 안에 시선을 잡는 오프닝" },
      { name: "큰 자막 스타일", en: "Bold Captions", prompt: "large bold captions, high contrast text, centered mobile-readable subtitles, social media style, eye-catching typography", desc: "모바일에서 잘 보이는 큰 자막" },
      { name: "빠른 줌 컷", en: "Fast Zoom Cut", prompt: "fast zoom cuts, energetic punch-in transitions, dynamic short-form editing rhythm, rapid camera movement", desc: "숏폼 특유의 빠른 줌 인/아웃 컷" },
      { name: "밈 스타일 편집", en: "Meme Editing", prompt: "meme-style editing, exaggerated reaction zoom, playful timing, comedic visual emphasis, internet humor pacing", desc: "밈 영상 느낌의 과장된 편집" },
      { name: "세로형 제품 리뷰", en: "Vertical Product Review", prompt: "vertical product review shot, handheld close-up, quick feature highlights, creator-style presentation, 9:16 format", desc: "릴스/쇼츠 제품 리뷰에 적합" },
      { name: "비포/애프터 전환", en: "Before After Transition", prompt: "before and after transformation, split-screen reveal, satisfying transition, social media format, dramatic comparison", desc: "변화 과정을 보여주는 숏폼 전환" },
      { name: "캡션 하이라이트", en: "Caption Highlight", prompt: "important words highlighted in captions, animated emphasis, color pop on key phrases, attention-directing text", desc: "중요한 단어만 컬러나 모션으로 강조" },
      { name: "루프 엔딩", en: "Seamless Loop Ending", prompt: "seamless loop ending, final frame connects back to opening frame, perfect social media loop, infinite replay", desc: "반복 재생에 최적화된 루프형 엔딩" },
    ]
  },
  {
    id: "vfx", icon: "◈", title: "VFX·특수효과", titleEn: "VFX & Special Effects",
    desc: "홀로그램, 포털, 파티클 등 시각 특수효과",
    gradient: "radial-gradient(ellipse at 50% 50%, rgba(140,80,255,0.3) 0%, rgba(60,200,255,0.15) 45%, transparent 75%)",
    items: [
      { name: "홀로그램", en: "Hologram", prompt: "holographic projection, transparent blue light, flickering digital scan lines, sci-fi visual effect, floating display", desc: "반투명 홀로그램 프로젝션 효과" },
      { name: "포털 이펙트", en: "Portal Effect", prompt: "glowing portal opening in space, swirling energy ring, magical particles, dimensional gateway, bright rim light", desc: "차원문이나 마법적 공간 이동 효과" },
      { name: "에너지 오라", en: "Energy Aura", prompt: "glowing energy aura around subject, pulsing light, electric particles, supernatural power effect, dynamic glow", desc: "인물 주변에 에너지가 감도는 효과" },
      { name: "연기 폭발", en: "Smoke Burst", prompt: "sudden smoke burst, thick white smoke expanding outward, cinematic impact effect, dramatic reveal", desc: "연기가 순간적으로 퍼지는 효과" },
      { name: "유리 파편", en: "Glass Shatter", prompt: "glass shattering in slow motion, floating sharp fragments, refracted light reflections, dramatic impact", desc: "유리가 깨지는 슬로모션 장면" },
      { name: "디지털 디졸브", en: "Digital Dissolve", prompt: "subject dissolving into digital pixels, data particles floating away, sci-fi transformation, disintegration effect", desc: "피사체가 픽셀이나 데이터로 분해되는 효과" },
      { name: "마법 파티클", en: "Magic Particles", prompt: "sparkling magical particles, glowing dust, floating light orbs, fantasy atmosphere, enchanted sparkles", desc: "판타지 장면용 반짝이는 파티클" },
      { name: "전기 스파크", en: "Electric Sparks", prompt: "electric sparks, blue lightning arcs, crackling energy, high voltage visual effect, plasma discharge", desc: "전기, 사이버, SF 계열 효과" },
    ]
  },
  {
    id: "genre_preset", icon: "▶", title: "장르별 영상", titleEn: "Genre Presets",
    desc: "공포, SF, 판타지, 브이로그 등 장르 분위기 프리셋",
    gradient: "radial-gradient(ellipse at 35% 55%, rgba(220,60,60,0.22) 0%, rgba(160,100,220,0.14) 42%, transparent 74%)",
    items: [
      { name: "공포 영화", en: "Horror Film", prompt: "horror film atmosphere, low-key lighting, unsettling silence, creeping camera movement, eerie shadows, dread", desc: "공포 영화 특유의 불안하고 어두운 분위기" },
      { name: "SF 영화", en: "Sci-fi Film", prompt: "sci-fi cinematic scene, futuristic architecture, holographic interfaces, cold blue lighting, advanced technology", desc: "미래적 공간과 첨단 기술의 SF 이미지" },
      { name: "판타지", en: "Fantasy", prompt: "fantasy world, magical atmosphere, ancient ruins, glowing particles, epic mythical environment, enchanted landscape", desc: "마법과 신화적 세계관" },
      { name: "여행 브이로그", en: "Travel Vlog", prompt: "travel vlog style, handheld camera, natural sunlight, scenic location, spontaneous authentic moments, warm grading", desc: "여행 기록용 자연스러운 영상" },
      { name: "푸드 영상", en: "Food Video", prompt: "food video close-up, steam rising, glossy texture, appetizing lighting, slow motion detail shot, warm tones", desc: "음식 질감과 맛을 강조하는 영상" },
      { name: "스포츠 광고", en: "Sports Commercial", prompt: "sports commercial, athletic motion, sweat and intensity, dynamic camera angles, powerful editing rhythm, high energy", desc: "역동적인 스포츠 광고 스타일" },
      { name: "다큐멘터리", en: "Documentary", prompt: "documentary realism, natural lighting, observational camera, authentic human moments, raw unfiltered atmosphere", desc: "사실적이고 진정성 있는 다큐 스타일" },
      { name: "뮤직비디오", en: "Music Video", prompt: "music video aesthetic, stylized lighting, rhythmic editing, expressive performance, bold visual identity, concert energy", desc: "음악 리듬에 맞춘 스타일리시한 영상" },
      { name: "뷰티 필름", en: "Beauty Film", prompt: "beauty film, soft diffused lighting, flawless skin detail, elegant slow motion, refined commercial mood, dewy glow", desc: "화장품/뷰티 브랜드 영상" },
      { name: "건축 영상", en: "Architecture Film", prompt: "architectural film, clean lines, geometric composition, slow camera movement, natural light and shadow, spatial beauty", desc: "공간과 건축미를 강조하는 영상" },
    ]
  },
  {
    id: "post_production", icon: "⬡", title: "후반작업", titleEn: "Post Production",
    desc: "필름 그레인, 블룸, 렌즈 플레어 등 마감 효과",
    gradient: "radial-gradient(ellipse at 50% 45%, rgba(200,180,160,0.22) 0%, rgba(140,120,100,0.14) 42%, transparent 72%)",
    items: [
      { name: "필름 그레인", en: "Film Grain", prompt: "subtle film grain, analog texture, cinematic post-production, organic image noise, 35mm film emulation", desc: "필름 같은 입자감" },
      { name: "블룸 효과", en: "Bloom Effect", prompt: "soft bloom effect, glowing highlights, dreamy light diffusion, cinematic glow, halation around bright areas", desc: "밝은 부분이 부드럽게 번지는 효과" },
      { name: "렌즈 플레어", en: "Lens Flare", prompt: "cinematic lens flare, light streaks across the lens, realistic optical flare, anamorphic streak", desc: "렌즈에 빛이 반사되는 영화적 효과" },
      { name: "크로마틱 애버레이션", en: "Chromatic Aberration", prompt: "subtle chromatic aberration, RGB edge separation, analog lens imperfection, color fringing effect", desc: "가장자리에 색 분리가 생기는 렌즈 효과" },
      { name: "필름 번", en: "Film Burn", prompt: "film burn transition, orange light leak, analog film damage, vintage transition effect, chemical stain", desc: "필름이 타는 듯한 빈티지 전환" },
      { name: "스캔라인", en: "Scan Lines", prompt: "scan lines overlay, analog monitor texture, subtle video interference, CRT display effect, retro screen", desc: "오래된 모니터나 VHS 질감" },
      { name: "비네트", en: "Vignette", prompt: "subtle vignette, darker frame edges, focused central subject, cinematic framing, natural light falloff", desc: "화면 가장자리를 어둡게 해 중앙 집중" },
      { name: "샤픈 후처리", en: "Sharpened Post", prompt: "crisp sharpened post-processing, clear edges, enhanced detail, clean final render, polished output", desc: "최종 결과물을 더 선명하게 만드는 후처리" },
    ]
  },
];


const TOTAL = CATEGORIES.reduce((a, c) => a + c.items.length, 0);

/* ── Category Visual System ── */
const VISUAL_MAP = {
  lens: {
    bg: "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 40%, #050505 100%)",
    shape: "radial-gradient(circle at 50% 50%, rgba(255,255,255,.06) 0%, transparent 35%)",
    accent: "radial-gradient(ellipse at 48% 52%, rgba(180,170,160,.08) 0%, transparent 50%)",
    label: "OPTICAL",
  },
  composition: {
    bg: "linear-gradient(135deg, #0c0c0c 0%, #111 50%, #080808 100%)",
    shape: "linear-gradient(45deg, transparent 48%, rgba(255,255,255,.04) 49%, rgba(255,255,255,.04) 51%, transparent 52%)",
    accent: "linear-gradient(135deg, transparent 48%, rgba(255,255,255,.03) 49%, rgba(255,255,255,.03) 51%, transparent 52%)",
    label: "FRAME",
  },
  camera_movement: {
    bg: "linear-gradient(180deg, #0d0d0d 0%, #080808 100%)",
    shape: "repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,.015) 60px, rgba(255,255,255,.015) 61px)",
    accent: "radial-gradient(ellipse at 30% 70%, rgba(200,190,180,.06) 0%, transparent 40%)",
    label: "MOTION",
  },
  lighting: {
    bg: "radial-gradient(ellipse at 40% 30%, #1a1815 0%, #0a0a08 50%, #050505 100%)",
    shape: "radial-gradient(ellipse at 40% 30%, rgba(255,240,200,.08) 0%, transparent 45%)",
    accent: "linear-gradient(160deg, transparent 40%, rgba(255,220,150,.03) 50%, transparent 60%)",
    label: "LIGHT",
  },
  color_tone: {
    bg: "linear-gradient(135deg, #0a0a0c 0%, #0c0a0e 50%, #080808 100%)",
    shape: "radial-gradient(ellipse at 60% 40%, rgba(120,100,160,.06) 0%, transparent 40%)",
    accent: "radial-gradient(ellipse at 35% 65%, rgba(160,100,120,.04) 0%, transparent 35%)",
    label: "TONE",
  },
  movement: {
    bg: "linear-gradient(170deg, #0a0a0a 0%, #0d0d0d 100%)",
    shape: "linear-gradient(5deg, transparent 45%, rgba(255,255,255,.025) 50%, transparent 55%)",
    accent: "linear-gradient(-5deg, transparent 55%, rgba(255,255,255,.02) 58%, transparent 61%)",
    label: "KINETIC",
  },
  speed: {
    bg: "linear-gradient(0deg, #060606 0%, #0e0e0e 50%, #060606 100%)",
    shape: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,.012) 40px, rgba(255,255,255,.012) 41px)",
    accent: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.03) 0%, transparent 30%)",
    label: "TIME",
  },
  mood: {
    bg: "radial-gradient(ellipse at 50% 60%, #12101a 0%, #080808 60%, #050505 100%)",
    shape: "radial-gradient(ellipse at 50% 60%, rgba(140,120,180,.06) 0%, transparent 40%)",
    accent: "radial-gradient(ellipse at 55% 45%, rgba(100,80,140,.04) 0%, transparent 30%)",
    label: "PSYCHE",
  },
  style: {
    bg: "linear-gradient(135deg, #0b0b0b 0%, #0f0d0a 50%, #080808 100%)",
    shape: "radial-gradient(ellipse at 65% 35%, rgba(200,180,140,.05) 0%, transparent 40%)",
    accent: "linear-gradient(45deg, transparent 45%, rgba(180,160,120,.03) 48%, transparent 51%)",
    label: "STYLE",
  },
  dof: {
    bg: "radial-gradient(circle at 50% 50%, #0e0e0e 0%, #070707 100%)",
    shape: "radial-gradient(circle at 50% 50%, rgba(255,255,255,.04) 0%, rgba(255,255,255,.02) 20%, transparent 35%)",
    accent: "radial-gradient(circle at 50% 50%, transparent 30%, rgba(255,255,255,.01) 31%, transparent 50%)",
    label: "FOCUS",
  },
  environment: {
    bg: "linear-gradient(180deg, #0c0d10 0%, #08090b 100%)",
    shape: "linear-gradient(180deg, rgba(100,120,160,.04) 0%, transparent 30%)",
    accent: "radial-gradient(ellipse at 50% 90%, rgba(80,100,140,.04) 0%, transparent 35%)",
    label: "ATMOS",
  },
  texture: {
    bg: "radial-gradient(ellipse at 50% 50%, #100f0d 0%, #080808 100%)",
    shape: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E")`,
    accent: "radial-gradient(ellipse at 45% 55%, rgba(160,140,120,.04) 0%, transparent 40%)",
    label: "MATERIA",
  },
  character: {
    bg: "radial-gradient(ellipse at 45% 40%, #110f0f 0%, #080808 100%)",
    shape: "radial-gradient(ellipse at 45% 35%, rgba(200,180,170,.05) 0%, transparent 30%)",
    accent: "radial-gradient(ellipse at 50% 60%, rgba(180,160,150,.03) 0%, transparent 25%)",
    label: "FIGURE",
  },
  space: {
    bg: "linear-gradient(160deg, #0a0b0d 0%, #080808 100%)",
    shape: "linear-gradient(160deg, transparent 30%, rgba(100,110,130,.04) 45%, transparent 60%)",
    accent: "repeating-linear-gradient(160deg, transparent, transparent 80px, rgba(255,255,255,.008) 80px, rgba(255,255,255,.008) 81px)",
    label: "SPACE",
  },
  format: {
    bg: "linear-gradient(90deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)",
    shape: "linear-gradient(90deg, transparent 32%, rgba(255,255,255,.02) 33%, rgba(255,255,255,.02) 34%, transparent 35%, transparent 65%, rgba(255,255,255,.02) 66%, rgba(255,255,255,.02) 67%, transparent 68%)",
    accent: "linear-gradient(0deg, transparent 44%, rgba(255,255,255,.015) 45%, rgba(255,255,255,.015) 56%, transparent 57%)",
    label: "FORMAT",
  },
  negative: {
    bg: "radial-gradient(circle at 50% 50%, #0c0808 0%, #060505 100%)",
    shape: "radial-gradient(circle at 50% 50%, rgba(200,80,80,.04) 0%, transparent 30%)",
    accent: "repeating-conic-gradient(transparent 0deg, transparent 89deg, rgba(255,255,255,.008) 89deg, rgba(255,255,255,.008) 90deg)",
    label: "EXCLUDE",
  },
  reference: {
    bg: "linear-gradient(135deg, #0a0a0c 0%, #0c0c0e 100%)",
    shape: "linear-gradient(135deg, transparent 48%, rgba(100,120,200,.03) 50%, transparent 52%)",
    accent: "radial-gradient(ellipse at 50% 50%, rgba(80,100,180,.04) 0%, transparent 35%)",
    label: "REF",
  },
  transition: {
    bg: "linear-gradient(90deg, #0e0e0e 0%, #050505 50%, #0e0e0e 100%)",
    shape: "linear-gradient(90deg, rgba(255,255,255,.03) 0%, transparent 20%, transparent 80%, rgba(255,255,255,.03) 100%)",
    accent: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.02) 0%, transparent 25%)",
    label: "CUT",
  },
  text_typo: {
    bg: "linear-gradient(180deg, #0a0a0a 0%, #0c0c0c 100%)",
    shape: "linear-gradient(0deg, transparent 46%, rgba(255,255,255,.04) 49%, rgba(255,255,255,.04) 51%, transparent 54%)",
    accent: "none",
    label: "TYPE",
  },
  sound: {
    bg: "linear-gradient(0deg, #0a0c0a 0%, #080808 100%)",
    shape: "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,.01) 30px, rgba(255,255,255,.01) 31px)",
    accent: "radial-gradient(ellipse at 50% 80%, rgba(100,160,120,.04) 0%, transparent 30%)",
    label: "AUDIO",
  },
  edit_structure: {
    bg: "linear-gradient(90deg, #0b0b0b 0%, #080808 100%)",
    shape: "repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,.015) 50px, rgba(255,255,255,.015) 51px)",
    accent: "repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,.01) 100px, rgba(255,255,255,.01) 101px)",
    label: "EDIT",
  },
  consistency: {
    bg: "linear-gradient(135deg, #0a0a0a 0%, #0b0b0b 100%)",
    shape: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.01) 40px, rgba(255,255,255,.01) 41px)",
    accent: "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,.01) 40px, rgba(255,255,255,.01) 41px)",
    label: "SYNC",
  },
  text_motion: {
    bg: "linear-gradient(170deg, #0c0c0c 0%, #080808 100%)",
    shape: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.04) 0%, transparent 20%)",
    accent: "linear-gradient(170deg, transparent 40%, rgba(255,255,255,.02) 50%, transparent 60%)",
    label: "KINETYPE",
  },
  graphic_overlay: {
    bg: "radial-gradient(circle at 50% 50%, #0c0d10 0%, #070708 100%)",
    shape: "conic-gradient(transparent 0deg, rgba(80,150,220,.03) 90deg, transparent 180deg, rgba(80,150,220,.02) 270deg, transparent 360deg)",
    accent: "radial-gradient(circle at 50% 50%, transparent 25%, rgba(255,255,255,.015) 26%, transparent 40%)",
    label: "OVERLAY",
  },
  image_detail: {
    bg: "radial-gradient(ellipse at 50% 40%, #110f0d 0%, #080808 100%)",
    shape: "radial-gradient(ellipse at 50% 40%, rgba(220,180,140,.05) 0%, transparent 35%)",
    accent: "radial-gradient(ellipse at 55% 55%, rgba(200,160,120,.03) 0%, transparent 25%)",
    label: "IMAGE",
  },
  product_ad: {
    bg: "radial-gradient(ellipse at 50% 50%, #0e0d0a 0%, #080808 100%)",
    shape: "radial-gradient(ellipse at 50% 45%, rgba(200,180,100,.05) 0%, transparent 30%)",
    accent: "linear-gradient(180deg, transparent 60%, rgba(180,160,80,.02) 80%, transparent 100%)",
    label: "PRODUCT",
  },
  shortform: {
    bg: "linear-gradient(180deg, #0c0808 0%, #080808 100%)",
    shape: "linear-gradient(0deg, rgba(200,80,80,.03) 0%, transparent 20%)",
    accent: "radial-gradient(ellipse at 50% 90%, rgba(220,100,60,.04) 0%, transparent 25%)",
    label: "SHORT",
  },
  vfx: {
    bg: "radial-gradient(circle at 50% 50%, #0c0a12 0%, #070708 100%)",
    shape: "radial-gradient(circle at 50% 50%, rgba(120,80,220,.05) 0%, transparent 30%)",
    accent: "radial-gradient(circle at 45% 55%, rgba(60,140,220,.03) 0%, transparent 25%)",
    label: "VFX",
  },
  genre_preset: {
    bg: "linear-gradient(135deg, #0a0808 0%, #0c0a0a 50%, #080808 100%)",
    shape: "radial-gradient(ellipse at 40% 50%, rgba(180,60,60,.04) 0%, transparent 30%)",
    accent: "radial-gradient(ellipse at 60% 40%, rgba(120,80,160,.03) 0%, transparent 25%)",
    label: "GENRE",
  },
  post_production: {
    bg: "linear-gradient(180deg, #0b0a09 0%, #080808 100%)",
    shape: "radial-gradient(ellipse at 50% 50%, rgba(180,160,140,.04) 0%, transparent 35%)",
    accent: "linear-gradient(180deg, rgba(200,180,160,.02) 0%, transparent 15%)",
    label: "POST",
  },
};

const fallbackVisual = { bg: "#080808", shape: "none", accent: "none", label: "—" };
const getVisual = (id) => VISUAL_MAP[id] || fallbackVisual;
const pad = (n) => String(n).padStart(2, "0");

export default function App() {
  const [view, setView] = useState("home");
  const [cat, setCat] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [builder, setBuilder] = useState([]);
  const [showB, setShowB] = useState(false);
  const [search, setSearch] = useState("");
  const [bCopied, setBCopied] = useState(false);
  const [entered, setEntered] = useState(false);
  const [hoverCat, setHoverCat] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const [detailReady, setDetailReady] = useState(false);

  const cp = useCallback((t, id) => { navigator.clipboard.writeText(t); setCopiedId(id); setTimeout(() => setCopiedId(null), 1800); }, []);
  const addTo = useCallback((item, ct) => { setBuilder(p => p.find(x => x.prompt === item.prompt) ? p : [...p, { ...item, category: ct }]); }, []);
  const rmFrom = useCallback((pr) => { setBuilder(p => p.filter(x => x.prompt !== pr)); }, []);
  const ft = builder.map(i => i.prompt).join(", ");
  const openCat = (c) => { setDetailReady(false); setCat(c); setView("detail"); setHoverItem(null); setTimeout(() => setDetailReady(true), 80); };
  const goHome = () => { setView("home"); setCat(null); setHoverItem(null); };
  const fil = search ? CATEGORIES.filter(c => c.title.includes(search) || c.titleEn.toLowerCase().includes(search.toLowerCase()) || c.items.some(i => i.name.includes(search) || i.en.toLowerCase().includes(search.toLowerCase()))) : CATEGORIES;

  useState(() => { setTimeout(() => setEntered(true), 100); });

  const activeVisual = hoverCat ? getVisual(hoverCat) : (fil[0] ? getVisual(fil[0].id) : fallbackVisual);
  const detailVisual = cat ? getVisual(cat.id) : fallbackVisual;

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#f4f4f0", fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#050505;overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes drift{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.02) translate(5px,-3px)}}
        @keyframes grain{0%,100%{transform:translate(0,0)}25%{transform:translate(-1%,1%)}50%{transform:translate(1%,-1%)}75%{transform:translate(-1%,-1%)}}
        @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}

        .visual-box{position:relative;overflow:hidden;background:#080808;transition:all 1.2s cubic-bezier(.16,1,.3,1)}
        .visual-layer{position:absolute;inset:0;transition:opacity 1s cubic-bezier(.16,1,.3,1)}
        .visual-label{position:absolute;bottom:20px;left:24px;font-size:10px;font-weight:300;letter-spacing:.2em;color:rgba(255,255,255,.15);transition:all .8s cubic-bezier(.16,1,.3,1)}
        .visual-grain{position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E");background-size:128px;animation:grain 6s steps(8) infinite;opacity:.4}

        .idx-row{display:flex;align-items:baseline;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05);cursor:pointer;transition:all .5s cubic-bezier(.16,1,.3,1);position:relative}
        .idx-row:hover{padding-left:6px;background:rgba(255,255,255,.015)}
        .idx-row:hover .idx-n{opacity:.7}
        .idx-row:hover .idx-t{color:rgba(255,255,255,.9);letter-spacing:.09em}
        .idx-row:hover .idx-e{opacity:.4}
        .idx-row:hover .idx-c{opacity:.4}
        .idx-n{font-size:10px;font-weight:300;color:rgba(255,255,255,.2);min-width:22px;transition:all .5s cubic-bezier(.16,1,.3,1);font-variant-numeric:tabular-nums}
        .idx-t{font-size:11px;font-weight:400;color:rgba(255,255,255,.6);letter-spacing:.06em;text-transform:uppercase;transition:all .5s cubic-bezier(.16,1,.3,1);flex:1}
        .idx-e{font-size:9px;font-weight:300;color:rgba(255,255,255,.15);letter-spacing:.03em;transition:all .5s cubic-bezier(.16,1,.3,1)}
        .idx-c{font-size:9px;font-weight:300;color:rgba(255,255,255,.12);min-width:28px;text-align:right;transition:all .5s cubic-bezier(.16,1,.3,1);font-variant-numeric:tabular-nums}

        .itm-row{display:grid;grid-template-columns:1fr;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.04);transition:all .4s cubic-bezier(.16,1,.3,1);cursor:default;position:relative}
        .itm-row:hover{background:rgba(255,255,255,.015)}
        .itm-row:hover .itm-act{opacity:1}
        .itm-row:hover .itm-nm{color:rgba(255,255,255,.9)}
        .itm-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
        .itm-nm{font-size:11px;font-weight:400;color:rgba(255,255,255,.6);letter-spacing:.03em;transition:color .3s}
        .itm-en{font-size:9px;font-weight:300;color:rgba(255,255,255,.18);margin-top:2px}
        .itm-desc{font-size:10px;font-weight:300;color:rgba(255,255,255,.2);line-height:1.5;margin-top:6px}
        .itm-pr{font-size:9px;font-weight:300;color:rgba(255,255,255,.15);font-family:'SF Mono',Menlo,Monaco,monospace;line-height:1.6;margin-top:8px;word-break:break-all}
        .itm-act{display:flex;gap:12px;opacity:0;transition:opacity .3s;flex-shrink:0}

        .tbtn{font-size:9px;font-weight:400;color:rgba(255,255,255,.3);letter-spacing:.1em;text-transform:uppercase;background:none;border:none;cursor:pointer;font-family:inherit;padding:4px 0;transition:color .25s}
        .tbtn:hover{color:rgba(255,255,255,.8)}
        .tbtn.on{color:rgba(255,255,255,.8)}
        .tbtn.pri{color:rgba(255,255,255,.5);border-bottom:1px solid rgba(255,255,255,.15)}
        .tbtn.pri:hover{color:#f4f4f0;border-color:rgba(255,255,255,.4)}

        .srch{background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,.08);color:#f4f4f0;font-size:11px;font-weight:300;font-family:inherit;padding:8px 0;outline:none;width:100%;letter-spacing:.05em;transition:border-color .3s}
        .srch:focus{border-color:rgba(255,255,255,.25)}
        .srch::placeholder{color:rgba(255,255,255,.12)}

        .bpanel{position:fixed;bottom:0;left:0;right:0;z-index:200;background:rgba(5,5,5,.94);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border-top:1px solid rgba(255,255,255,.06);animation:slideUp .7s cubic-bezier(.16,1,.3,1) both;max-height:45vh;overflow-y:auto}

        @media(max-width:900px){
          .home-split{flex-direction:column!important}
          .home-visual{height:35vh!important;min-height:200px!important;width:100%!important;position:relative!important}
          .home-index{padding:24px 20px 100px!important}
          .detail-split{flex-direction:column!important}
          .detail-visual{height:30vh!important;min-height:180px!important;width:100%!important;position:relative!important}
          .detail-list{padding:24px 20px 120px!important}
          .idx-e{display:none}
        }
      `}</style>

      {/* ═══════ HOME ═══════ */}
      {view === "home" && (
        <div className="home-split" style={{ display: "flex", minHeight: "100vh" }}>

          {/* ── Left: Visual Preview ── */}
          <div className="home-visual visual-box" style={{
            width: "45%", position: "sticky", top: 0, height: "100vh", flexShrink: 0,
          }}>
            {/* Background */}
            <div className="visual-layer" style={{ background: activeVisual.bg, animation: "drift 30s ease-in-out infinite" }} />
            <div className="visual-layer" style={{ background: activeVisual.shape, opacity: .9 }} />
            <div className="visual-layer" style={{ background: activeVisual.accent, opacity: .8 }} />
            <div className="visual-grain" />

            {/* Vignette */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,5,5,.3) 100%)" }} />

            {/* Corner text */}
            <div style={{ position: "absolute", top: 28, left: 28, animation: entered ? "fadeUp .8s .2s cubic-bezier(.16,1,.3,1) both" : "none" }}>
              <div style={{ fontSize: 9, fontWeight: 400, letterSpacing: ".18em", color: "rgba(255,255,255,.35)", textTransform: "uppercase" }}>AI PROMPT STUDIO EDITORIAL</div>
              <div style={{ fontSize: 9, fontWeight: 300, letterSpacing: ".08em", color: "rgba(255,255,255,.12)", marginTop: 4 }}>VIDEO · IMAGE · AD PROMPT BUILDER</div>
            </div>

            <div style={{ position: "absolute", top: 28, right: 28, textAlign: "right", animation: entered ? "fadeUp .8s .4s cubic-bezier(.16,1,.3,1) both" : "none" }}>
              <div style={{ fontSize: 9, fontWeight: 300, color: "rgba(255,255,255,.12)", letterSpacing: ".08em" }}>{TOTAL} ENTRIES</div>
            </div>

            {/* Active label */}
            <div className="visual-label" style={{ fontSize: 11, letterSpacing: ".25em" }}>
              {activeVisual.label}
            </div>

            {/* Floating coord */}
            <div style={{ position: "absolute", bottom: 22, right: 28, fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,.08)", fontVariantNumeric: "tabular-nums" }}>
              {hoverCat ? pad(CATEGORIES.findIndex(c => c.id === hoverCat) + 1) : pad(CATEGORIES.length)}
            </div>
          </div>

          {/* ── Right: Category Index ── */}
          <div className="home-index" style={{ flex: 1, padding: "100px 40px 100px 48px", minWidth: 0 }}>

            {/* Header */}
            <div style={{ marginBottom: 40, animation: entered ? "fadeUp .7s .3s cubic-bezier(.16,1,.3,1) both" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <span style={{ fontSize: 9, fontWeight: 300, letterSpacing: ".15em", color: "rgba(255,255,255,.15)", textTransform: "uppercase" }}>INDEX</span>
                <button onClick={() => setShowB(!showB)} className="tbtn" style={{ position: "relative" }}>
                  BUILDER{builder.length > 0 && <span style={{ marginLeft: 4, color: "rgba(255,255,255,.4)" }}>({builder.length})</span>}
                </button>
              </div>
              <input type="text" placeholder="Search prompt categories..." value={search} onChange={e => setSearch(e.target.value)} className="srch" />
            </div>

            {/* Category list */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 0, fontSize: 9, fontWeight: 300, color: "rgba(255,255,255,.1)", letterSpacing: ".1em" }}>
                <span>#</span>
                <span>{fil.length} CATEGORIES</span>
              </div>
              {fil.map((c, idx) => (
                <div key={c.id} className="idx-row"
                  onClick={() => openCat(c)}
                  onMouseEnter={() => setHoverCat(c.id)}
                  onMouseLeave={() => setHoverCat(null)}
                  style={{ animation: entered ? `fadeUp .5s ${.5 + idx * .035}s cubic-bezier(.16,1,.3,1) both` : "none" }}>
                  <span className="idx-n">{pad(idx + 1)}</span>
                  <span className="idx-t">{c.title}</span>
                  <span className="idx-e">{c.titleEn}</span>
                  <span className="idx-c">{c.items.length}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ marginTop: 60, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.04)", fontSize: 9, fontWeight: 300, color: "rgba(255,255,255,.06)", letterSpacing: ".08em" }}>
              EDITORIAL PROMPT STUDIO — {CATEGORIES.length} CATEGORIES · {TOTAL} PRESETS
            </div>
            <div style={{ height: showB ? 200 : 40 }} />
          </div>
        </div>
      )}

      {/* ═══════ DETAIL ═══════ */}
      {view === "detail" && cat && (
        <div className="detail-split" style={{ display: "flex", minHeight: "100vh" }}>

          {/* ── Left: Visual ── */}
          <div className="detail-visual visual-box" style={{
            width: "38%", position: "sticky", top: 0, height: "100vh", flexShrink: 0,
          }}>
            <div className="visual-layer" style={{ background: detailVisual.bg, animation: "drift 35s ease-in-out infinite" }} />
            <div className="visual-layer" style={{ background: detailVisual.shape }} />
            <div className="visual-layer" style={{ background: detailVisual.accent }} />
            {/* If hovering an item, show subtle shift */}
            {hoverItem !== null && (
              <div className="visual-layer" style={{
                background: `radial-gradient(ellipse at ${40 + (hoverItem % 5) * 8}% ${35 + (hoverItem % 3) * 12}%, rgba(255,255,255,.03) 0%, transparent 30%)`,
                opacity: 1,
              }} />
            )}
            <div className="visual-grain" />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5,5,5,.25) 100%)" }} />

            {/* Nav */}
            <div style={{ position: "absolute", top: 28, left: 28 }}>
              <button onClick={goHome} className="tbtn" style={{ fontSize: 10, letterSpacing: ".08em" }}>← INDEX</button>
            </div>
            <div style={{ position: "absolute", top: 28, right: 28, textAlign: "right" }}>
              <button onClick={() => setShowB(!showB)} className="tbtn">
                BUILDER{builder.length > 0 && <span style={{ marginLeft: 4, color: "rgba(255,255,255,.4)" }}>({builder.length})</span>}
              </button>
            </div>

            {/* Category label */}
            <div style={{ position: "absolute", bottom: 28, left: 28 }}>
              <div style={{ fontSize: 9, fontWeight: 300, letterSpacing: ".15em", color: "rgba(255,255,255,.15)", textTransform: "uppercase", marginBottom: 6 }}>{cat.titleEn}</div>
              <div style={{ fontSize: 13, fontWeight: 400, letterSpacing: ".1em", color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>{cat.title}</div>
              <div style={{ fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,.15)", marginTop: 6, maxWidth: 260, lineHeight: 1.5 }}>{cat.desc}</div>
            </div>
            <div className="visual-label" style={{ bottom: 28, left: "auto", right: 28, fontSize: 10 }}>
              {detailVisual.label}
            </div>
          </div>

          {/* ── Right: Prompt List ── */}
          <div className="detail-list" style={{ flex: 1, padding: "80px 40px 120px 48px", minWidth: 0 }}>

            {/* Table header */}
            <div style={{
              display: "flex", justifyContent: "space-between", paddingBottom: 8,
              borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 0,
              animation: detailReady ? "fadeIn .5s both" : "none",
            }}>
              <span style={{ fontSize: 9, fontWeight: 300, color: "rgba(255,255,255,.1)", letterSpacing: ".1em" }}>PROMPTS</span>
              <span style={{ fontSize: 9, fontWeight: 300, color: "rgba(255,255,255,.08)", letterSpacing: ".08em" }}>{cat.items.length} ENTRIES</span>
            </div>

            {/* Items */}
            {cat.items.map((item, idx) => {
              const iid = `${cat.id}-${idx}`;
              const inB = builder.some(p => p.prompt === item.prompt);
              return (
                <div key={iid} className="itm-row"
                  onMouseEnter={() => setHoverItem(idx)}
                  onMouseLeave={() => setHoverItem(null)}
                  style={{ animation: detailReady ? `fadeUp .45s ${.1 + idx * .035}s cubic-bezier(.16,1,.3,1) both` : "none" }}>
                  <div className="itm-head">
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                        <span style={{ fontSize: 9, fontWeight: 300, color: "rgba(255,255,255,.12)", fontVariantNumeric: "tabular-nums" }}>{pad(idx + 1)}</span>
                        <span className="itm-nm">{item.name}</span>
                      </div>
                      <div className="itm-en">{item.en}</div>
                    </div>
                    <div className="itm-act">
                      <button className={`tbtn${copiedId === iid ? " on" : ""}`} onClick={() => cp(item.prompt, iid)}>
                        {copiedId === iid ? "COPIED" : "COPY"}
                      </button>
                      <button className={`tbtn${inB ? " on" : ""}`} onClick={() => inB ? rmFrom(item.prompt) : addTo(item, cat.title)}>
                        {inB ? "ADDED" : "ADD"}
                      </button>
                    </div>
                  </div>
                  <div className="itm-desc">{item.desc}</div>
                  <div className="itm-pr">{item.prompt}</div>
                </div>
              );
            })}

            {/* Other categories */}
            <div style={{ marginTop: 48, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ fontSize: 9, fontWeight: 300, letterSpacing: ".1em", color: "rgba(255,255,255,.08)", textTransform: "uppercase", marginBottom: 12 }}>OTHER</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                {CATEGORIES.filter(c => c.id !== cat.id).map(c => (
                  <button key={c.id} className="tbtn"
                    onClick={() => { setDetailReady(false); setCat(c); setHoverItem(null); setTimeout(() => setDetailReady(true), 80); window.scrollTo(0, 0); }}
                    style={{ padding: "6px 14px 6px 0", fontSize: 10 }}>
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ height: showB ? 200 : 40 }} />
          </div>
        </div>
      )}

      {/* ═══════ BUILDER ═══════ */}
      {showB && (
        <div className="bpanel">
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: 9, fontWeight: 400, letterSpacing: ".12em", color: "rgba(255,255,255,.25)", textTransform: "uppercase" }}>BUILDER</span>
                <span style={{ fontSize: 9, fontWeight: 300, color: "rgba(255,255,255,.1)", marginLeft: 10 }}>{builder.length} {builder.length === 1 ? "ENTRY" : "ENTRIES"}</span>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                {builder.length > 0 && (<>
                  <button onClick={() => setBuilder([])} className="tbtn">CLEAR</button>
                  <button onClick={() => { navigator.clipboard.writeText(ft); setBCopied(true); setTimeout(() => setBCopied(false), 1800); }} className="tbtn pri">{bCopied ? "COPIED" : "COPY ALL"}</button>
                </>)}
                <button onClick={() => setShowB(false)} className="tbtn">CLOSE</button>
              </div>
            </div>
            {builder.length === 0 ? (
              <p style={{ fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,.1)", fontStyle: "italic" }}>Add prompts to build your combination.</p>
            ) : (<>
              <div style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}>
                {builder.map((it, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.03)" }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                      <span style={{ fontSize: 9, fontWeight: 300, color: "rgba(255,255,255,.1)", fontVariantNumeric: "tabular-nums" }}>{pad(i + 1)}</span>
                      <span style={{ fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,.45)", letterSpacing: ".02em" }}>{it.name}</span>
                      <span style={{ fontSize: 8, fontWeight: 300, color: "rgba(255,255,255,.1)" }}>{it.category}</span>
                    </div>
                    <button onClick={() => rmFrom(it.prompt)} className="tbtn" style={{ fontSize: 8 }}>REMOVE</button>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,.05)" }}>
                <div style={{ fontSize: 8, fontWeight: 300, letterSpacing: ".1em", color: "rgba(255,255,255,.08)", marginBottom: 6, textTransform: "uppercase" }}>OUTPUT</div>
                <p style={{ fontSize: 9, fontWeight: 300, color: "rgba(255,255,255,.2)", fontFamily: "'SF Mono',Menlo,Monaco,monospace", lineHeight: 1.7, wordBreak: "break-all", maxHeight: 70, overflow: "auto" }}>{ft}</p>
              </div>
            </>)}
          </div>
        </div>
      )}
    </div>
  );
}
