/* Travel with Wolves — app logic (vanilla JS, no dependencies) */
(function () {
    'use strict';

    /* =====================================================================
       PHOTOS — change pictures here.
       Put image files in the "images" folder (or use a full https:// link).
       A tour uses its own photo first; if it is missing, the country photo
       is used; if that is missing too, the drawn illustration is shown.
       ===================================================================== */
    var IMG = {
        countries: {
            uz: '', tr: '', ge: '', jp: '',
            is: '', it: '', ae: '', no: ''
        },
        tours: {
            s1: 'images/tours/s1.jpg', s2: 'images/tours/s2.jpg', s3: 'images/tours/s3.jpg', s4: 'images/tours/s4.jpg',
            f1: 'images/tours/f1.jpg', f2: 'images/tours/f2.jpg', f3: 'images/tours/f3.jpg', f4: 'images/tours/f4.jpg',
            p1: 'images/tours/p1.jpg', p2: 'images/tours/p2.jpg', p3: 'images/tours/p3.jpg', p4: 'images/tours/p4.jpg'
        },
        hotels: {
            h1: 'images/hotels/Samarkand.jpg', h2: 'images/hotels/h2.jpg', h3: 'images/hotels/h3.jpg', h4: 'images/hotels/h4.jpg',
            h5: 'images/hotels/h5.jpg', h6: 'images/hotels/h6.jpg', h7: 'images/hotels/h7.jpg', h8: 'images/hotels/h8.jpg'
        }
    };
    // tries the next picture in the list when one fails to load; removes the <img> when none are left
    window.phNext = function (img) {
        var rest = (img.getAttribute('data-n') || '').split('|').filter(Boolean);
        if (rest.length) { img.setAttribute('data-n', rest.slice(1).join('|')); img.src = rest[0]; }
        else img.remove();
    };
    function phTag(list) {
        var l = (list || []).filter(Boolean);
        if (!l.length) return '';
        return '<img class="ph" src="' + l[0] + '" data-n="' + l.slice(1).join('|') + '" alt="" loading="lazy" onerror="phNext(this)">';
    }

    /* ---------- translations ---------- */
    var LANGS = ['en', 'ru', 'uz'];
    var T = {
        en: {
            skip: 'Skip to content', home: 'Home', tours: 'Tours', countries: 'Countries', hotels: 'Hotels', flights: 'Flights', about: 'About us', contacts: 'Contacts',
            login: 'Log in', register: 'Sign up', logout: 'Log out', trips: 'My bookings',
            heroSub: 'Small groups, real routes, honest prices. Find your pack.', cta1: 'Browse tours', cta2: 'Find flights', findTour: 'Find a tour', anyType: 'Any type',
            season: ['Winter', 'Spring', 'Summer', 'Autumn'], offersT: 'Seasonal offers', offersS: 'Best discounts for travel in', popT: 'Popular tours',
            catT: 'Choose your way to travel', destT: 'Destinations', whyT: 'Why travel with wolves',
            solo: 'Solo', family: 'Family', friends: 'Friends',
            soloD: 'For those who walk alone. Flexible routes, safe stays.', familyD: 'Easy, safe routes for parents and kids.', friendsD: 'Shared adventures for a group of friends.',
            why: [['Small groups', 'Up to 12 people, so nobody gets lost in a crowd.'], ['Local guides', 'People who live where you travel and know the quiet places.'], ['Honest prices', 'The final price is shown before you book.']],
            viewAll: 'View all', details: 'View tour', from: 'from', pp: 'per person', daysU: 'days', groupUp: 'Group up to', ppl: 'people', rating: 'Rating',
            allCountries: 'All countries', sortBy: 'Sort', sortP1: 'Price: low to high', sortP2: 'Price: high to low', sortD: 'Duration', searchPh: 'Search tours or cities', none: 'Nothing found. Try other filters.', toursN: 'tours',
            overview: 'Overview', route: 'Route', day: 'Day', incl: 'Included', priceBook: 'Price and booking', month: 'Travel month', adults: 'Adults', kids: 'Children under 12 (30% off)',
            seasonDisc: 'Seasonal discounts', disc: 'Discount', basePrice: 'Base price', total: 'Total', book: 'Book now', findFl: 'Find flights', hotelsIn: 'Hotels in {c}', toursIn: 'Tours in {c}', back: 'Back', noDisc: 'No discount',
            arrive: 'Arrival and welcome dinner in {c}', depart: 'Breakfast and departure from {c}', explore: 'Guided day in {c}',
            inc: { hotel: 'Hotel', guide: 'Local guide', meals: 'Breakfast and dinner', transfer: 'Transfers', insurance: 'Insurance', tickets: 'Entrance tickets' },
            am: { wifi: 'Wi-Fi', pool: 'Pool', spa: 'Spa', breakfast: 'Breakfast', gym: 'Gym', parking: 'Parking' },
            nights: 'Nights', rooms: 'Rooms', perNight: 'per night', bookHotel: 'Book hotel', checkin: 'Check-in date',
            flFrom: 'From', flTo: 'To', flDate: 'Date', flPax: 'Passengers', flCls: 'Class', eco: 'Economy', biz: 'Business', flSearch: 'Search flights', direct: 'Direct', oneStop: '1 stop', buy: 'Buy ticket',
            demo: 'Prices and schedules are for demonstration only.', flRes: 'Available flights', sameC: 'Choose different cities.', flH: 'Flights', flSub: 'Search and buy tickets in a few clicks.',
            email: 'Email', pass: 'Password', name: 'Name', haveAcc: 'Already registered?', noAcc: 'No account yet?', errLogin: 'Wrong email or password.', errExists: 'This email is already registered.',
            errPass: 'Password must have at least 6 characters.', errFill: 'Please fill in all fields.', welcome: 'Welcome', needLogin: 'Log in to continue.', loggedOut: 'You are logged out.',
            myT: 'My bookings', empty: 'No bookings yet.', cancel: 'Cancel booking', code: 'Code', done: 'Booking confirmed', doneP: 'Your booking was saved. You can find it in My bookings.',
            close: 'Close', canceled: 'Booking canceled.', tTour: 'Tour', tHotel: 'Hotel', tFlight: 'Flight',
            aboutH: 'About Travel with Wolves', aboutP1: 'Wolves travel in packs: they look after each other, choose the path together and leave no one behind. That is how we plan our trips.',
            aboutP2: 'We run small groups, work with local guides and show the full price before you book.', valuesT: 'What we stand for',
            ab: [['We go together', 'Nobody is left alone in a group, and solo travelers find their place.'], ['We protect places', 'Small groups and local partners mean less pressure on nature.'], ['We speak plainly', 'Price, program and terms are clear in advance.']],
            conH: 'Contacts', conSub: 'Questions about a tour, flight or hotel? Write to us.', msg: 'Message', send: 'Send message', sent: 'Thank you! We will reply soon.',
            phone: 'Phone', addr: 'Address', hours: 'Working hours', hoursV: 'Mon–Sat, 9:00–18:00',
            rights: 'All rights reserved.', footTag: 'Find your pack.', theme: 'Toggle theme', langL: 'Language', menu: 'Menu', demoAuth: 'Demo: accounts are stored in this browser only.',
            cDesc: 'Explore', nf: 'Page not found', home2: 'Go home'
        },
        ru: {
            skip: 'Перейти к содержимому', home: 'Главная', tours: 'Туры', countries: 'Страны', hotels: 'Отели', flights: 'Авиабилеты', about: 'О нас', contacts: 'Контакты',
            login: 'Войти', register: 'Регистрация', logout: 'Выйти', trips: 'Мои бронирования',
            heroSub: 'Маленькие группы, настоящие маршруты, честные цены. Найдите свою стаю.', cta1: 'Смотреть туры', cta2: 'Найти авиабилеты', findTour: 'Найти тур', anyType: 'Любой тип',
            season: ['Зима', 'Весна', 'Лето', 'Осень'], offersT: 'Сезонные предложения', offersS: 'Лучшие скидки на поездки:', popT: 'Популярные туры',
            catT: 'Выберите, как путешествовать', destT: 'Направления', whyT: 'Почему путешествовать с волками',
            solo: 'Одиночный', family: 'Семейный', friends: 'Дружеский',
            soloD: 'Для тех, кто ходит один. Гибкие маршруты и безопасное жильё.', familyD: 'Лёгкие и безопасные маршруты для родителей и детей.', friendsD: 'Общие приключения для компании друзей.',
            why: [['Маленькие группы', 'До 12 человек: никто не потеряется в толпе.'], ['Местные гиды', 'Люди, которые живут там, куда вы едете, и знают тихие места.'], ['Честные цены', 'Итоговая цена видна до бронирования.']],
            viewAll: 'Смотреть все', details: 'Подробнее', from: 'от', pp: 'с человека', daysU: 'дн.', groupUp: 'Группа до', ppl: 'человек', rating: 'Рейтинг',
            allCountries: 'Все страны', sortBy: 'Сортировка', sortP1: 'Цена: по возрастанию', sortP2: 'Цена: по убыванию', sortD: 'Длительность', searchPh: 'Поиск тура или города', none: 'Ничего не найдено. Измените фильтры.', toursN: 'туров',
            overview: 'Описание', route: 'Маршрут', day: 'День', incl: 'Что включено', priceBook: 'Цена и бронирование', month: 'Месяц поездки', adults: 'Взрослые', kids: 'Дети до 12 лет (скидка 30%)',
            seasonDisc: 'Сезонные скидки', disc: 'Скидка', basePrice: 'Базовая цена', total: 'Итого', book: 'Забронировать', findFl: 'Найти авиабилеты', hotelsIn: 'Отели: {c}', toursIn: 'Туры: {c}', back: 'Назад', noDisc: 'Без скидки',
            arrive: 'Прибытие и ужин знакомства: {c}', depart: 'Завтрак и отъезд: {c}', explore: 'День с гидом: {c}',
            inc: { hotel: 'Отель', guide: 'Местный гид', meals: 'Завтраки и ужины', transfer: 'Трансферы', insurance: 'Страховка', tickets: 'Входные билеты' },
            am: { wifi: 'Wi-Fi', pool: 'Бассейн', spa: 'Спа', breakfast: 'Завтрак', gym: 'Спортзал', parking: 'Парковка' },
            nights: 'Ночей', rooms: 'Номеров', perNight: 'за ночь', bookHotel: 'Забронировать отель', checkin: 'Дата заезда',
            flFrom: 'Откуда', flTo: 'Куда', flDate: 'Дата', flPax: 'Пассажиры', flCls: 'Класс', eco: 'Эконом', biz: 'Бизнес', flSearch: 'Найти рейсы', direct: 'Прямой', oneStop: '1 пересадка', buy: 'Купить билет',
            demo: 'Цены и расписание показаны для демонстрации.', flRes: 'Доступные рейсы', sameC: 'Выберите разные города.', flH: 'Авиабилеты', flSub: 'Найдите и купите билет в несколько кликов.',
            email: 'Эл. почта', pass: 'Пароль', name: 'Имя', haveAcc: 'Уже есть аккаунт?', noAcc: 'Нет аккаунта?', errLogin: 'Неверная почта или пароль.', errExists: 'Эта почта уже зарегистрирована.',
            errPass: 'Пароль должен быть не короче 6 символов.', errFill: 'Заполните все поля.', welcome: 'Добро пожаловать', needLogin: 'Войдите, чтобы продолжить.', loggedOut: 'Вы вышли из аккаунта.',
            myT: 'Мои бронирования', empty: 'Пока нет бронирований.', cancel: 'Отменить бронь', code: 'Код', done: 'Бронирование подтверждено', doneP: 'Бронь сохранена. Её можно найти в разделе «Мои бронирования».',
            close: 'Закрыть', canceled: 'Бронь отменена.', tTour: 'Тур', tHotel: 'Отель', tFlight: 'Рейс',
            aboutH: 'О Travel with Wolves', aboutP1: 'Волки ходят стаей: присматривают друг за другом, выбирают путь вместе и никого не оставляют позади. Так мы строим путешествия.',
            aboutP2: 'Мы работаем с маленькими группами, сотрудничаем с местными гидами и показываем цену до бронирования.', valuesT: 'Во что мы верим',
            ab: [['Идём вместе', 'В группе никто не остаётся один, а одиночки находят своё место.'], ['Бережём места', 'Малые группы и местные партнёры — меньше нагрузки на природу.'], ['Говорим прямо', 'Цена, программа и условия понятны заранее.']],
            conH: 'Контакты', conSub: 'Вопрос о туре, рейсе или отеле? Напишите нам.', msg: 'Сообщение', send: 'Отправить', sent: 'Спасибо! Мы скоро ответим.',
            phone: 'Телефон', addr: 'Адрес', hours: 'Часы работы', hoursV: 'Пн–Сб, 9:00–18:00',
            rights: 'Все права защищены.', footTag: 'Найдите свою стаю.', theme: 'Сменить тему', langL: 'Язык', menu: 'Меню', demoAuth: 'Демо: аккаунты хранятся только в этом браузере.',
            cDesc: 'Смотреть', nf: 'Страница не найдена', home2: 'На главную'
        },
        uz: {
            skip: 'Asosiy qismga oʻtish', home: 'Bosh sahifa', tours: 'Turlar', countries: 'Davlatlar', hotels: 'Mehmonxonalar', flights: 'Aviachiptalar', about: 'Biz haqimizda', contacts: 'Aloqa',
            login: 'Kirish', register: 'Roʻyxatdan oʻtish', logout: 'Chiqish', trips: 'Buyurtmalarim',
            heroSub: 'Kichik guruhlar, haqiqiy yoʻnalishlar, halol narxlar. Oʻz toʻdangizni toping.', cta1: 'Turlarni koʻrish', cta2: 'Aviachipta qidirish', findTour: 'Tur qidirish', anyType: 'Barcha toifalar',
            season: ['Qish', 'Bahor', 'Yoz', 'Kuz'], offersT: 'Mavsumiy takliflar', offersS: 'Eng yaxshi chegirmalar mavsumi:', popT: 'Mashhur turlar',
            catT: 'Sayohat usulingizni tanlang', destT: 'Yoʻnalishlar', whyT: 'Nega boʻrilar bilan sayohat',
            solo: 'Yakka', family: 'Oilaviy', friends: 'Doʻstona',
            soloD: 'Yolgʻiz yuruvchilar uchun. Moslashuvchan yoʻnalishlar, xavfsiz turar joy.', familyD: 'Ota-onalar va bolalar uchun oson va xavfsiz yoʻnalishlar.', friendsD: 'Doʻstlar guruhi uchun birgalikdagi sarguzashtlar.',
            why: [['Kichik guruhlar', '12 kishigacha — hech kim olomonda yoʻqolmaydi.'], ['Mahalliy gidlar', 'Siz boradigan joyda yashaydigan va sokin joylarni biladigan odamlar.'], ['Halol narxlar', 'Yakuniy narx buyurtmadan oldin koʻrsatiladi.']],
            viewAll: 'Hammasini koʻrish', details: 'Turni koʻrish', from: 'dan', pp: 'bir kishi uchun', daysU: 'kun', groupUp: 'Guruh:', ppl: 'kishigacha', rating: 'Reyting',
            allCountries: 'Barcha davlatlar', sortBy: 'Saralash', sortP1: 'Narx: arzondan qimmatga', sortP2: 'Narx: qimmatdan arzonga', sortD: 'Davomiyligi', searchPh: 'Tur yoki shahar qidirish', none: 'Hech narsa topilmadi. Boshqa filtrlarni sinab koʻring.', toursN: 'ta tur',
            overview: 'Tavsif', route: 'Yoʻnalish', day: 'Kun', incl: 'Narxga kiradi', priceBook: 'Narx va buyurtma', month: 'Sayohat oyi', adults: 'Kattalar', kids: '12 yoshgacha bolalar (30% chegirma)',
            seasonDisc: 'Mavsumiy chegirmalar', disc: 'Chegirma', basePrice: 'Asosiy narx', total: 'Jami', book: 'Buyurtma berish', findFl: 'Aviachipta qidirish', hotelsIn: '{c}: mehmonxonalar', toursIn: '{c}: turlar', back: 'Orqaga', noDisc: 'Chegirma yoʻq',
            arrive: '{c}: kelish va tanishuv kechki ovqati', depart: '{c}: nonushta va joʻnab ketish', explore: '{c}: gid bilan kun',
            inc: { hotel: 'Mehmonxona', guide: 'Mahalliy gid', meals: 'Nonushta va kechki ovqat', transfer: 'Transfer', insurance: 'Sugʻurta', tickets: 'Kirish chiptalari' },
            am: { wifi: 'Wi-Fi', pool: 'Basseyn', spa: 'Spa', breakfast: 'Nonushta', gym: 'Sport zali', parking: 'Avtoturargoh' },
            nights: 'Tunlar', rooms: 'Xonalar', perNight: 'bir tun uchun', bookHotel: 'Mehmonxonani band qilish', checkin: 'Kelish sanasi',
            flFrom: 'Qayerdan', flTo: 'Qayerga', flDate: 'Sana', flPax: 'Yoʻlovchilar', flCls: 'Sinf', eco: 'Ekonom', biz: 'Biznes', flSearch: 'Reys qidirish', direct: 'Toʻgʻridan-toʻgʻri', oneStop: '1 ta toʻxtash', buy: 'Chipta sotib olish',
            demo: 'Narxlar va jadvallar faqat namoyish uchun.', flRes: 'Mavjud reyslar', sameC: 'Turli shaharlarni tanlang.', flH: 'Aviachiptalar', flSub: 'Chiptani bir necha bosishda qidiring va sotib oling.',
            email: 'Elektron pochta', pass: 'Parol', name: 'Ism', haveAcc: 'Allaqachon roʻyxatdan oʻtganmisiz?', noAcc: 'Akkauntingiz yoʻqmi?', errLogin: 'Pochta yoki parol notoʻgʻri.', errExists: 'Bu pochta allaqachon roʻyxatdan oʻtgan.',
            errPass: 'Parol kamida 6 belgidan iborat boʻlishi kerak.', errFill: 'Barcha maydonlarni toʻldiring.', welcome: 'Xush kelibsiz', needLogin: 'Davom etish uchun tizimga kiring.', loggedOut: 'Siz tizimdan chiqdingiz.',
            myT: 'Buyurtmalarim', empty: 'Hozircha buyurtmalar yoʻq.', cancel: 'Buyurtmani bekor qilish', code: 'Kod', done: 'Buyurtma tasdiqlandi', doneP: 'Buyurtmangiz saqlandi. Uni "Buyurtmalarim" boʻlimida topasiz.',
            close: 'Yopish', canceled: 'Buyurtma bekor qilindi.', tTour: 'Tur', tHotel: 'Mehmonxona', tFlight: 'Reys',
            aboutH: 'Travel with Wolves haqida', aboutP1: 'Boʻrilar toʻda boʻlib yuradi: bir-biriga qaraydi, yoʻlni birga tanlaydi va hech kimni ortda qoldirmaydi. Biz sayohatlarni shunday rejalashtiramiz.',
            aboutP2: 'Biz kichik guruhlar bilan ishlaymiz, mahalliy gidlar bilan hamkorlik qilamiz va narxni buyurtmadan oldin ochiq koʻrsatamiz.', valuesT: 'Biz nimaga ishonamiz',
            ab: [['Birga yuramiz', 'Guruhda hech kim yolgʻiz qolmaydi, yakka sayohatchilar ham oʻz oʻrnini topadi.'], ['Joylarni asraymiz', 'Kichik guruhlar va mahalliy hamkorlar — tabiatga yuk kamroq.'], ['Ochiq gaplashamiz', 'Narx, dastur va shartlar oldindan aniq.']],
            conH: 'Aloqa', conSub: 'Tur, reys yoki mehmonxona haqida savolingiz bormi? Bizga yozing.', msg: 'Xabar', send: 'Xabarni yuborish', sent: 'Rahmat! Tez orada javob beramiz.',
            phone: 'Telefon', addr: 'Manzil', hours: 'Ish vaqti', hoursV: 'Du–Sha, 9:00–18:00',
            rights: 'Barcha huquqlar himoyalangan.', footTag: 'Oʻz toʻdangizni toping.', theme: 'Mavzuni almashtirish', langL: 'Til', menu: 'Menyu', demoAuth: 'Demo: akkauntlar faqat shu brauzerda saqlanadi.',
            cDesc: 'Koʻrish', nf: 'Sahifa topilmadi', home2: 'Bosh sahifaga'
        }
    };

    /* ---------- storage helpers ---------- */
    var LS = {
        get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
        set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
    };

    /* ---------- state ---------- */
    var S = { lang: LS.get('tww_lang', null), theme: LS.get('tww_theme', null), user: LS.get('tww_session', null) };
    if (LANGS.indexOf(S.lang) < 0) {
        var nl = (navigator.language || 'en').slice(0, 2);
        S.lang = LANGS.indexOf(nl) > -1 ? nl : 'en';
    }
    if (S.theme !== 'light' && S.theme !== 'dark') {
        S.theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    var TF = { cat: 'all', co: 'all', sort: 'p1', q: '' };       // tour filters
    var FS = { from: 'TAS', to: 'IST', date: '', pax: 1, cls: 'e' }; // flight search
    var HF = 'all';                                               // hotel country filter
    var pending = null;                                           // action after login
    var FR = [];                                                  // flight results

    /* ---------- small utils ---------- */
    function $(s, r) { return (r || document).querySelector(s); }
    function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
    function esc(x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function t(k, v) {
        var s = T[S.lang][k];
        if (s === undefined) s = T.en[k];
        if (s === undefined) return k;
        if (typeof s === 'string' && v) s = s.replace(/\{(\w+)\}/g, function (m, n) { return v[n] != null ? v[n] : m; });
        return s;
    }
    function pick(s) { var p = s.split('|'); return p[LANGS.indexOf(S.lang)] || p[0]; }
    function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
    function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h; }
    function code() { return 'TWW-' + Math.random().toString(36).slice(2, 7).toUpperCase(); }
    function toast(msg) {
        var el = $('#toast'); el.textContent = msg; el.classList.add('on');
        clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove('on'); }, 3200);
    }
    var SM = [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 0]; // month -> season (0 winter .. 3 autumn)
    function curSeason() { return SM[new Date().getMonth()]; }
    function monthName(d) {
        var loc = { en: 'en', ru: 'ru', uz: 'uz-Latn' }[S.lang];
        try { return new Intl.DateTimeFormat(loc, { month: 'long' }).format(d); }
        catch (e) { return new Intl.DateTimeFormat('en', { month: 'long' }).format(d); }
    }

    /* ---------- data ---------- */
    var CITY = {
        TAS: 'Tashkent|Ташкент|Toshkent', SKD: 'Samarkand|Самарканд|Samarqand', BHK: 'Bukhara|Бухара|Buxoro', KHV: 'Khiva|Хива|Xiva', CHM: 'Chimgan|Чимган|Chimyon',
        TYO: 'Tokyo|Токио|Tokio', KYT: 'Kyoto|Киото|Kioto', OSA: 'Osaka|Осака|Osaka', KEF: 'Reykjavik|Рейкьявик|Reykyavik', VIK: 'Vik|Вик|Vik', AKU: 'Akureyri|Акюрейри|Akureyri',
        TBS: 'Tbilisi|Тбилиси|Tbilisi', KAZ: 'Kazbegi|Казбеги|Qozbegi', SIG: 'Sighnaghi|Сигнахи|Signaxi', TEL: 'Telavi|Телави|Telavi',
        IST: 'Istanbul|Стамбул|Istanbul', CAP: 'Cappadocia|Каппадокия|Kapadokiya', BOD: 'Bodrum|Бодрум|Bodrum', FET: 'Fethiye|Фетхие|Fetxiye',
        ROM: 'Rome|Рим|Rim', NAP: 'Naples|Неаполь|Neapol', AMF: 'Amalfi|Амальфи|Amalfi', DXB: 'Dubai|Дубай|Dubay', AUH: 'Abu Dhabi|Абу-Даби|Abu-Dabi',
        OSL: 'Oslo|Осло|Oslo', LOF: 'Lofoten|Лофотены|Lofoten', BGO: 'Bergen|Берген|Bergen', ALA: 'Almaty|Алматы|Almati', LON: 'London|Лондон|London'
    };
    var FL = { TAS: [41.3, 69.3], SKD: [39.65, 66.96], IST: [41.0, 28.97], TBS: [41.7, 44.8], TYO: [35.7, 139.7], KEF: [64.1, -21.9], ROM: [41.9, 12.5], DXB: [25.2, 55.3], OSL: [59.9, 10.75], ALA: [43.2, 76.9], LON: [51.5, -0.1] };
    var AIR = ['Northwind Air', 'Silk Road Air', 'Aurora Jet', 'Lunar Wings', 'Pack Airways'];

    var CO = {
        uz: { n: 'Uzbekistan|Узбекистан|Oʻzbekiston', d: 'Silk Road cities, blue domes and bazaars.|Города Шёлкового пути, синие купола и базары.|Ipak yoʻli shaharlari, moviy gumbazlar va bozorlar.', t: 'dome', c: ['#f2b66d', '#fde9c9'], city: 'TAS' },
        tr: { n: 'Turkey|Турция|Turkiya', d: 'Cappadocia balloons and the Aegean coast.|Шары Каппадокии и побережье Эгейского моря.|Kapadokiya sharlari va Egey sohili.', t: 'dune', c: ['#f0a08a', '#ffe2c6'], city: 'IST' },
        ge: { n: 'Georgia|Грузия|Gruziya', d: 'Mountain villages, wine and old Tbilisi.|Горные деревни, вино и старый Тбилиси.|Togʻ qishloqlari, sharob va qadimiy Tbilisi.', t: 'mount', c: ['#9cc3a3', '#eef3d9'], city: 'TBS' },
        jp: { n: 'Japan|Япония|Yaponiya', d: 'Temples, bullet trains and quiet gardens.|Храмы, скоростные поезда и тихие сады.|Ibodatxonalar, tezyurar poyezdlar va sokin bogʻlar.', t: 'pagoda', c: ['#f2b8c6', '#fdeff2'], city: 'TYO' },
        is: { n: 'Iceland|Исландия|Islandiya', d: 'Waterfalls, geysers and northern lights.|Водопады, гейзеры и северное сияние.|Sharsharalar, geyzerlar va shimol nuri.', t: 'mount', c: ['#7fb4d6', '#e9f3f7'], city: 'KEF' },
        it: { n: 'Italy|Италия|Italiya', d: 'Coastal towns, ancient Rome and slow food.|Прибрежные городки, древний Рим и неспешная кухня.|Sohil shaharchalari, qadimiy Rim va mazali taomlar.', t: 'wave', c: ['#6fc1d9', '#fff1c9'], city: 'ROM' },
        ae: { n: 'UAE|ОАЭ|BAA', d: 'Desert nights and glass skylines.|Ночи в пустыне и стеклянные небоскрёбы.|Choʻl kechalari va shisha osmonoʻpar binolar.', t: 'skyline', c: ['#e9a96a', '#ffe9c7'], city: 'DXB' },
        no: { n: 'Norway|Норвегия|Norvegiya', d: 'Fjords, fishing huts and the midnight sun.|Фьорды, рыбацкие домики и полярный день.|Fyordlar, baliqchi uylari va qutb kuni.', t: 'mount', c: ['#8ab6d8', '#eef5fa'], city: 'OSL' }
    };

    // d = seasonal discount % [winter, spring, summer, autumn]
    var TOURS = [
        {
            id: 's1', co: 'uz', cat: 'solo', days: 5, p: 520, g: 8, r: 4.8, d: [30, 10, 0, 15], inc: ['hotel', 'guide', 'transfer'], st: ['TAS', 'SKD', 'BHK'],
            n: 'Samarkand & Bukhara Solo Trail|Одиночный маршрут: Самарканд и Бухара|Yakka yoʻl: Samarqand va Buxoro',
            x: 'Walk through Samarkand and Bukhara at your own pace, with a guide on call.|Гуляйте по Самарканду и Бухаре в своём темпе, гид всегда на связи.|Samarqand va Buxoroda oʻz sur’atingizda yuring, gid doim aloqada.'
        },
        {
            id: 's2', co: 'jp', cat: 'solo', days: 8, p: 1480, g: 8, r: 4.9, d: [20, 0, 10, 0], inc: ['hotel', 'guide', 'tickets'], st: ['TYO', 'KYT', 'OSA'],
            n: 'Kyoto Lone Wolf Walk|Одинокий волк в Киото|Kiotoda yolgʻiz boʻri',
            x: 'Quiet temples, tea houses and early-morning gardens for one traveler.|Тихие храмы, чайные дома и сады на рассвете для одного путешественника.|Yolgʻiz sayohatchi uchun sokin ibodatxonalar, choyxonalar va tongdagi bogʻlar.'
        },
        {
            id: 's3', co: 'is', cat: 'solo', days: 7, p: 1390, g: 10, r: 4.7, d: [0, 15, 0, 25], inc: ['hotel', 'guide', 'transfer', 'insurance'], st: ['KEF', 'VIK', 'AKU'],
            n: 'Iceland Ring Road Solo|Исландия: кольцевая дорога в одиночку|Islandiya: yakka halqa yoʻli',
            x: 'Drive the ring road with waterfalls, black beaches and a glacier hike.|Проедьте по кольцевой дороге: водопады, чёрные пляжи и поход к леднику.|Sharsharalar, qora plyajlar va muzlikka piyoda yurish bilan halqa yoʻlidan oʻting.'
        },
        {
            id: 's4', co: 'ge', cat: 'solo', days: 6, p: 760, g: 10, r: 4.6, d: [25, 10, 0, 10], inc: ['hotel', 'guide', 'meals'], st: ['TBS', 'KAZ', 'SIG'],
            n: 'Caucasus Trails Solo|Кавказские тропы в одиночку|Kavkaz soʻqmoqlari: yakka sayohat',
            x: 'Mountain roads, stone villages and a night in old Tbilisi.|Горные дороги, каменные деревни и ночь в старом Тбилиси.|Togʻ yoʻllari, tosh qishloqlar va eski Tbilisida bir tun.'
        },
        {
            id: 'f1', co: 'uz', cat: 'family', days: 6, p: 640, g: 12, r: 4.8, d: [30, 10, 0, 15], inc: ['hotel', 'guide', 'meals', 'transfer'], st: ['TAS', 'SKD', 'CHM'],
            n: 'Family Heritage of Uzbekistan|Семейное наследие Узбекистана|Oʻzbekiston: oilaviy meros',
            x: 'Short drives, hands-on workshops and a day in the mountains for kids.|Короткие переезды, мастер-классы и день в горах для детей.|Qisqa yoʻllar, ustaxona mashgʻulotlari va bolalar uchun togʻda bir kun.'
        },
        {
            id: 'f2', co: 'tr', cat: 'family', days: 5, p: 780, g: 12, r: 4.7, d: [25, 5, 0, 20], inc: ['hotel', 'guide', 'meals', 'transfer'], st: ['IST', 'CAP'],
            n: 'Cappadocia Family Adventure|Семейное приключение в Каппадокии|Kapadokiyada oilaviy sarguzasht',
            x: 'A balloon flight at sunrise, cave houses and easy trails for all ages.|Полёт на шаре на рассвете, пещерные дома и лёгкие тропы для любого возраста.|Tongda sharda uchish, gʻor uylar va har yoshga mos oson yoʻllar.'
        },
        {
            id: 'f3', co: 'it', cat: 'family', days: 7, p: 1250, g: 12, r: 4.8, d: [30, 10, 0, 20], inc: ['hotel', 'meals', 'transfer', 'insurance'], st: ['ROM', 'NAP', 'AMF'],
            n: 'Amalfi Family Coast|Семейное побережье Амальфи|Amalfi: oilaviy sohil',
            x: 'Beach days, lemon groves and boat rides along the coast.|Дни на пляже, лимонные рощи и прогулки на лодке вдоль побережья.|Plyajda kunlar, limon bogʻlari va sohil boʻylab qayiq sayrlari.'
        },
        {
            id: 'f4', co: 'ae', cat: 'family', days: 5, p: 1100, g: 12, r: 4.6, d: [0, 20, 35, 10], inc: ['hotel', 'guide', 'transfer', 'tickets'], st: ['DXB', 'AUH'],
            n: 'Dubai Family Desert & Sea|Дубай: пустыня и море для всей семьи|Dubay: butun oila uchun choʻl va dengiz',
            x: 'A safe desert safari, a water park and a calm day in Abu Dhabi.|Безопасное сафари по пустыне, аквапарк и спокойный день в Абу-Даби.|Xavfsiz choʻl safarisi, akvapark va Abu-Dabida sokin kun.'
        },
        {
            id: 'p1', co: 'uz', cat: 'friends', days: 7, p: 690, g: 12, r: 4.9, d: [25, 10, 0, 15], inc: ['hotel', 'guide', 'meals', 'transfer'], st: ['TAS', 'SKD', 'BHK', 'KHV'],
            n: 'Silk Road Pack|Стая Шёлкового пути|Ipak yoʻli toʻdasi',
            x: 'Four Silk Road cities with a shared guide, train rides and long dinners.|Четыре города Шёлкового пути, общий гид, поездки на поезде и долгие ужины.|Ipak yoʻlining toʻrt shahri, umumiy gid, poyezd safarlari va uzoq kechki ovqatlar.'
        },
        {
            id: 'p2', co: 'no', cat: 'friends', days: 7, p: 1620, g: 10, r: 4.9, d: [10, 0, 0, 20], inc: ['hotel', 'guide', 'transfer'], st: ['OSL', 'LOF', 'BGO'],
            n: 'Lofoten Friends Expedition|Лофотены: экспедиция друзей|Lofoten: doʻstlar ekspeditsiyasi',
            x: 'Hiking, kayaking and fishing-hut stays on the Lofoten islands.|Походы, каяки и ночёвки в рыбацких домиках на Лофотенских островах.|Lofoten orollarida piyoda yurish, qayiqda suzish va baliqchi uylarida tunash.'
        },
        {
            id: 'p3', co: 'ge', cat: 'friends', days: 6, p: 740, g: 12, r: 4.7, d: [20, 10, 0, 15], inc: ['hotel', 'guide', 'meals', 'tickets'], st: ['TBS', 'TEL', 'KAZ'],
            n: 'Georgian Wine & Mountains|Грузия: вино и горы|Gruziya: sharob va togʻlar',
            x: 'Wine cellars in Kakheti and a mountain road to Kazbegi.|Винные погреба Кахетии и горная дорога в Казбеги.|Kaxetidagi sharob yertoʻlalari va Qozbegiga togʻ yoʻli.'
        },
        {
            id: 'p4', co: 'tr', cat: 'friends', days: 7, p: 980, g: 10, r: 4.8, d: [0, 10, 0, 25], inc: ['hotel', 'meals', 'transfer', 'insurance'], st: ['IST', 'BOD', 'FET'],
            n: 'Aegean Sailing Pack|Парусная стая Эгейского моря|Egey dengizi: yelkan toʻdasi',
            x: 'Sail between coves, swim and sleep on deck under the stars.|Плавайте между бухтами, купайтесь и спите на палубе под звёздами.|Qoʻltiqlar orasida suzing, choʻmiling va yulduzlar ostida kemada uxlang.'
        }
    ];

    var HOTELS = [
        {
            id: 'h1', co: 'uz', s: 4, p: 70, am: ['wifi', 'breakfast', 'spa'], n: 'Samarkand Courtyard House',
            x: 'Courtyard rooms near the old center, with a shaded garden.|Номера с двориком рядом со старым центром и тенистым садом.|Eski markaz yaqinidagi hovlili xonalar va soyali bogʻ.'
        },
        {
            id: 'h2', co: 'tr', s: 4, p: 95, am: ['wifi', 'breakfast', 'pool'], n: 'Cave Suites Cappadocia',
            x: 'Rooms carved into the rock, with a rooftop view of the valley.|Номера, вырезанные в скале, и вид на долину с крыши.|Toshga oʻyilgan xonalar va tomdan vodiyga manzara.'
        },
        {
            id: 'h3', co: 'ge', s: 3, p: 55, am: ['wifi', 'breakfast'], n: 'Old Town Tbilisi Inn',
            x: 'A friendly inn in a restored house, five minutes from the sulfur baths.|Уютный отель в восстановленном доме, пять минут до серных бань.|Tiklangan uydagi mehmondoʻst mehmonxona, oltingugurtli hammomlarga besh daqiqa.'
        },
        {
            id: 'h4', co: 'jp', s: 4, p: 160, am: ['wifi', 'breakfast', 'spa'], n: 'Kyoto Garden Ryokan',
            x: 'Tatami rooms, a quiet garden and a traditional breakfast.|Комнаты с татами, тихий сад и традиционный завтрак.|Tatami xonalar, sokin bogʻ va an’anaviy nonushta.'
        },
        {
            id: 'h5', co: 'is', s: 4, p: 190, am: ['wifi', 'parking', 'spa'], n: 'Aurora Fjord Lodge',
            x: 'A wooden lodge by the fjord, built for watching the northern lights.|Деревянный лодж у фьорда, где удобно смотреть северное сияние.|Fyord boʻyidagi yogʻoch uy, shimol nurini tomosha qilish uchun qulay.'
        },
        {
            id: 'h6', co: 'it', s: 5, p: 260, am: ['wifi', 'pool', 'breakfast', 'gym'], n: 'Amalfi Terrace Hotel',
            x: 'Sea-view terraces and a pool above the coastal road.|Террасы с видом на море и бассейн над прибрежной дорогой.|Dengizga qaragan teraslar va sohil yoʻli ustidagi basseyn.'
        },
        {
            id: 'h7', co: 'ae', s: 5, p: 240, am: ['wifi', 'pool', 'spa', 'gym'], n: 'Palm Dune Resort',
            x: 'Villas with private pools, a spa and a desert sunset deck.|Виллы с личными бассейнами, спа и террасой для заката в пустыне.|Shaxsiy basseynli villalar, spa va choʻlda quyosh botishi uchun maydoncha.'
        },
        {
            id: 'h8', co: 'no', s: 3, p: 170, am: ['wifi', 'parking'], n: 'Lofoten Harbor Cabins',
            x: 'Red fishing cabins on the water, with a shared sauna.|Красные рыбацкие домики на воде и общая сауна.|Suv ustidagi qizil baliqchi uylari va umumiy sauna.'
        }
    ];

    function byId(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }
    function cityName(c) { return pick(CITY[c] || c); }
    function coName(k) { return pick(CO[k].n); }

    /* ---------- graphics ---------- */
    function wolfShapes(fill) {
        return '<polygon points="40,18 78,58 122,58 160,18 172,96 138,168 100,192 62,168 28,96" fill="' + fill + '"/>' +
            '<polygon points="46,34 70,58 52,76" fill="#fff" fill-opacity=".16"/><polygon points="154,34 130,58 148,76" fill="#fff" fill-opacity=".16"/>' +
            '<polygon points="78,58 122,58 138,110 100,140 62,110" fill="#fff" fill-opacity=".1"/>' +
            '<polygon points="62,98 88,104 64,112" fill="#f0b43c"/><polygon points="138,98 112,104 136,112" fill="#f0b43c"/>' +
            '<polygon points="88,160 112,160 100,174" fill="#0b1218"/>';
    }
    function logo() { return '<svg viewBox="0 0 200 200" aria-hidden="true">' + wolfShapes('currentColor') + '</svg>'; }
    var gid = 0;
    function scene(c, srcs) {
        var id = 'sg' + (gid++), b = '';
        if (c.t === 'mount') b = '<polygon points="0,240 90,110 150,170 230,80 320,190 400,130 400,240" fill="#2f5d62"/><polygon points="0,240 70,170 140,210 240,150 330,215 400,180 400,240" fill="#1d3f44"/>';
        if (c.t === 'wave') b = '<rect x="40" y="95" width="60" height="45" fill="#fff"/><rect x="110" y="80" width="50" height="60" fill="#f6d9a8"/><rect x="170" y="105" width="55" height="35" fill="#fff"/><path d="M0 150 Q50 130 100 150 T200 150 T300 150 T400 150 V240 H0Z" fill="#2a8fb0"/><path d="M0 185 Q50 165 100 185 T200 185 T300 185 T400 185 V240 H0Z" fill="#1d6f90"/>';
        if (c.t === 'dune') b = '<path d="M0 170 Q100 100 200 160 T400 140 V240 H0Z" fill="#d9894a"/><path d="M0 210 Q120 150 240 200 T400 190 V240 H0Z" fill="#b8683a"/>';
        if (c.t === 'pagoda') b = '<path d="M0 200 Q100 150 200 190 T400 170 V240 H0Z" fill="#6f9a74"/><rect x="170" y="150" width="60" height="50" fill="#8a2f2f"/><path d="M150 152 L200 120 L250 152Z" fill="#2b2b2b"/><path d="M165 125 L200 98 L235 125Z" fill="#2b2b2b"/><rect x="185" y="165" width="30" height="35" fill="#c9a24a"/>';
        if (c.t === 'dome') b = '<rect x="60" y="150" width="290" height="90" fill="#d9a35c"/><path d="M80 150 A40 40 0 0 1 160 150Z" fill="#2a8fb0"/><path d="M215 150 A58 58 0 0 1 331 150Z" fill="#1f6f90"/><rect x="180" y="170" width="24" height="70" fill="#8f5f2a"/><rect x="100" y="95" width="8" height="55" fill="#c98f4a"/>';
        if (c.t === 'skyline') b = '<path d="M0 205 Q120 175 240 200 T400 190 V240 H0Z" fill="#c8793c"/><rect x="70" y="120" width="26" height="90" fill="#4b6275"/><rect x="104" y="90" width="22" height="120" fill="#3b5568"/><rect x="134" y="140" width="30" height="70" fill="#55708a"/><polygon points="190,210 202,60 214,210" fill="#3b5568"/><rect x="224" y="130" width="28" height="80" fill="#4b6275"/>';
        return '<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c.c[0] + '"/><stop offset="1" stop-color="' + c.c[1] + '"/></linearGradient></defs><rect width="400" height="240" fill="url(#' + id + ')"/><circle cx="318" cy="64" r="26" fill="#f4b400" opacity=".9"/>' + b + '</svg>' +
            phTag(srcs);
    }
    function heroArt() {
        var stars = '', i, xs = [60, 140, 230, 330, 420, 520, 610, 700, 780, 1040, 1120, 170, 480, 1080];
        for (i = 0; i < xs.length; i++) stars += '<circle cx="' + xs[i] + '" cy="' + (30 + (i * 37) % 200) + '" r="' + (1 + i % 2) + '" fill="#fff" opacity=".7"/>';
        return '<svg class="hero-art" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' + stars +
            '<circle cx="900" cy="190" r="165" fill="#dfeef3" opacity=".1"/><circle cx="900" cy="190" r="105" fill="#e9f2f5"/>' +
            '<g transform="translate(822 112) scale(.78)">' + wolfShapes('#0b1620') + '</g>' +
            '<polygon points="0,520 0,380 140,300 260,370 420,250 600,380 760,300 960,400 1100,320 1200,380 1200,520" fill="#14303a"/>' +
            '<polygon points="0,520 0,440 180,380 340,450 520,370 700,450 900,390 1100,460 1200,420 1200,520" fill="#0b1f28"/></svg>';
    }

    /* ---------- pricing helpers ---------- */
    function priceHtml(tr) {
        var d = tr.d[curSeason()];
        if (d > 0) return '<span class="price"><small>' + t('from') + '</small> <b>' + money(tr.p * (1 - d / 100)) + '</b> <s>' + money(tr.p) + '</s></span>';
        return '<span class="price"><small>' + t('from') + '</small> <b>' + money(tr.p) + '</b></span>';
    }
    function tourCard(tr) {
        var c = CO[tr.co], d = tr.d[curSeason()];
        return '<a class="card" href="#/tour/' + tr.id + '"><div class="thumb">' + scene(c, [IMG.tours[tr.id], IMG.countries[tr.co]]) + '<span class="badge cat">' + t(tr.cat) + '</span>' +
            (d > 0 ? '<span class="badge off">−' + d + '%</span>' : '') + '</div><div class="cbody"><div class="meta">' + esc(coName(tr.co)) + ' · ' + tr.days + ' ' + t('daysU') + ' · ★ ' + tr.r + '</div><h3>' + esc(pick(tr.n)) +
            '</h3><p>' + esc(pick(tr.x)) + '</p><div class="foot">' + priceHtml(tr) + '<span class="btn small">' + t('details') + '</span></div></div></a>';
    }
    function hotelCard(h) {
        var c = CO[h.co], am = h.am.map(function (a) { return '<li>' + t('am')[a] + '</li>'; }).join('');
        return '<article class="hotel"><div class="thumb">' + scene(c, [IMG.hotels[h.id], IMG.countries[h.co]]) + '</div><div class="cbody"><div class="meta">' + esc(coName(h.co)) + '</div><h3>' + esc(h.n) +
            '<span class="st" aria-label="' + h.s + ' stars">' + '★'.repeat(h.s) + '</span></h3><p>' + esc(pick(h.x)) + '</p><ul class="tags">' + am + '</ul><div class="foot"><span class="price"><b>' + money(h.p) +
            '</b> ' + t('perNight') + '</span><button class="btn small" data-act="hotel" data-id="' + h.id + '" type="button">' + t('bookHotel') + '</button></div></div></article>';
    }
    function catOptions(sel) {
        return ['all', 'solo', 'family', 'friends'].map(function (k) { return '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' + (k === 'all' ? t('anyType') : t(k)) + '</option>'; }).join('');
    }
    function countryOptions(sel) {
        var o = '<option value="all"' + (sel === 'all' ? ' selected' : '') + '>' + t('allCountries') + '</option>';
        for (var k in CO) o += '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' + esc(coName(k)) + '</option>';
        return o;
    }

    /* ---------- views ---------- */
    function viewHome() {
        var cs = curSeason();
        var offers = TOURS.filter(function (x) { return x.d[cs] > 0; }).sort(function (a, b) { return b.d[cs] - a.d[cs]; }).slice(0, 4);
        var pop = TOURS.slice().sort(function (a, b) { return b.r - a.r; }).slice(0, 4);
        var cats = ['solo', 'family', 'friends'].map(function (k) { return '<a class="cat-card" href="#/tours/' + k + '"><h3>' + t(k) + '</h3><p>' + t(k + 'D') + '</p></a>'; }).join('');
        var why = t('why').map(function (w) { return '<div><h3>' + w[0] + '</h3><p>' + w[1] + '</p></div>'; }).join('');
        var dests = Object.keys(CO).slice(0, 4).map(function (k) { return countryCard(k); }).join('');
        return '<section class="hero">' + heroArt() + '<div class="wrap hero-in"><div style="position:relative"><h1>Travel with Wolves</h1><p>' + t('heroSub') + '</p><div class="cta"><a class="btn eye" href="#/tours">' + t('cta1') + '</a><a class="btn ghost-l" href="#/flights">' + t('cta2') + '</a></div></div></div></section>' +
            '<div class="wrap"><form class="finder" data-form="finder"><div><label for="fc">' + t('anyType') + '</label><select id="fc">' + catOptions('all') + '</select></div><div><label for="fk">' + t('countries') + '</label><select id="fk">' + countryOptions('all') + '</select></div><div><label for="fq">' + t('tours') + '</label><input type="text" id="fq" placeholder="' + t('searchPh') + '"></div><button class="btn eye" type="submit">' + t('findTour') + '</button></form>' +
            '<section class="sec"><div class="sec-h"><div><h2>' + t('offersT') + '</h2><p>' + t('offersS') + ' ' + t('season')[cs] + '</p></div><a class="link" href="#/tours">' + t('viewAll') + '</a></div><div class="grid">' + offers.map(tourCard).join('') + '</div></section>' +
            '<section class="sec"><div class="sec-h"><h2>' + t('catT') + '</h2></div><div class="cats">' + cats + '</div></section>' +
            '<section class="sec"><div class="sec-h"><h2>' + t('popT') + '</h2><a class="link" href="#/tours">' + t('viewAll') + '</a></div><div class="grid">' + pop.map(tourCard).join('') + '</div></section>' +
            '<section class="sec"><div class="sec-h"><h2>' + t('destT') + '</h2><a class="link" href="#/countries">' + t('viewAll') + '</a></div><div class="grid">' + dests + '</div></section>' +
            '<section class="sec"><div class="sec-h"><h2>' + t('whyT') + '</h2></div><div class="why">' + why + '</div></section></div>';
    }
    function countryCard(k) {
        var c = CO[k], n = TOURS.filter(function (x) { return x.co === k; }).length;
        return '<a class="card" href="#/country/' + k + '"><div class="thumb">' + scene(c, [IMG.countries[k]]) + '</div><div class="cbody"><h3>' + esc(coName(k)) + '</h3><p>' + esc(pick(c.d)) + '</p><div class="foot"><span class="meta">' + n + ' ' + t('toursN') + '</span><span class="btn small">' + t('cDesc') + '</span></div></div></a>';
    }
    function filterTours() {
        var q = TF.q.trim().toLowerCase();
        var list = TOURS.filter(function (x) {
            if (TF.cat !== 'all' && x.cat !== TF.cat) return false;
            if (TF.co !== 'all' && x.co !== TF.co) return false;
            if (q) {
                var hay = (x.n + ' ' + CO[x.co].n + ' ' + x.st.map(function (c) { return CITY[c]; }).join(' ')).toLowerCase();
                if (hay.indexOf(q) < 0) return false;
            }
            return true;
        });
        list.sort(function (a, b) { return TF.sort === 'p2' ? b.p - a.p : TF.sort === 'd' ? a.days - b.days : a.p - b.p; });
        return list;
    }
    function toursGrid() {
        var l = filterTours();
        return l.length ? l.map(tourCard).join('') : '<p class="empty">' + t('none') + '</p>';
    }
    function viewTours() {
        var chips = ['all', 'solo', 'family', 'friends'].map(function (k) { return '<button class="chip" type="button" data-act="cat" data-v="' + k + '" aria-pressed="' + (TF.cat === k) + '">' + (k === 'all' ? t('anyType') : t(k)) + '</button>'; }).join('');
        return '<div class="wrap"><div class="page-h"><h1>' + t('tours') + '</h1></div><div class="chips" id="chips">' + chips + '</div>' +
            '<div class="filters"><div><label class="visually-hidden" for="tq">' + t('searchPh') + '</label><input type="text" id="tq" placeholder="' + t('searchPh') + '" value="' + esc(TF.q) + '"></div>' +
            '<select id="tk" aria-label="' + t('countries') + '">' + countryOptions(TF.co) + '</select>' +
            '<select id="ts" aria-label="' + t('sortBy') + '"><option value="p1"' + (TF.sort === 'p1' ? ' selected' : '') + '>' + t('sortP1') + '</option><option value="p2"' + (TF.sort === 'p2' ? ' selected' : '') + '>' + t('sortP2') + '</option><option value="d"' + (TF.sort === 'd' ? ' selected' : '') + '>' + t('sortD') + '</option></select></div>' +
            '<div class="grid" id="tgrid">' + toursGrid() + '</div></div>';
    }
    function viewTour(id) {
        var tr = byId(TOURS, id); if (!tr) return viewNF();
        var c = CO[tr.co], now = new Date(), mo = '', i;
        for (i = 0; i < 12; i++) {
            var d = new Date(now.getFullYear(), now.getMonth() + i, 1);
            mo += '<option value="' + d.getFullYear() + '-' + d.getMonth() + '">' + monthName(d) + ' ' + d.getFullYear() + '</option>';
        }
        var route = '';
        for (i = 1; i <= tr.days; i++) {
            var si = Math.min(tr.st.length - 1, Math.floor((i - 1) * tr.st.length / tr.days));
            var key = i === 1 ? 'arrive' : i === tr.days ? 'depart' : 'explore';
            route += '<li><b>' + t('day') + ' ' + i + '</b>' + esc(t(key, { c: cityName(i === tr.days ? tr.st[tr.st.length - 1] : tr.st[si]) })) + '</li>';
        }
        var inc = tr.inc.map(function (k) { return '<li>' + t('inc')[k] + '</li>'; }).join('');
        var seasons = t('season').map(function (n, k) { return '<div data-s="' + k + '"><b>' + (tr.d[k] ? '−' + tr.d[k] + '%' : '0%') + '</b>' + n + '</div>'; }).join('');
        var hs = HOTELS.filter(function (h) { return h.co === tr.co; }).map(hotelCard).join('');
        return '<div class="wrap detail"><a class="back" href="#/tours">← ' + t('back') + '</a><div class="banner">' + scene(c, [IMG.tours[tr.id], IMG.countries[tr.co]]) + '</div>' +
            '<div class="d-head"><span class="badge">' + t(tr.cat) + '</span><h1>' + esc(pick(tr.n)) + '</h1><p class="mute">' + esc(coName(tr.co)) + ' · ' + tr.days + ' ' + t('daysU') + ' · ' + t('groupUp') + ' ' + tr.g + ' ' + t('ppl') + ' · ★ ' + tr.r + '</p></div>' +
            '<div class="cols"><div><h2>' + t('overview') + '</h2><p>' + esc(pick(tr.x)) + ' ' + esc(pick(c.d)) + '</p><h2 style="margin-top:28px">' + t('route') + '</h2><ol class="route" style="margin-top:14px">' + route + '</ol>' +
            '<h2 style="margin-top:16px">' + t('incl') + '</h2><ul class="tags" style="margin-top:12px">' + inc + '</ul>' +
            (hs ? '<h2 style="margin-top:32px">' + t('hotelsIn', { c: coName(tr.co) }) + '</h2><div class="hotels">' + hs + '</div>' : '') + '</div>' +
            '<aside class="book" data-tour="' + tr.id + '"><h2>' + t('priceBook') + '</h2><div class="field"><label for="tb-m">' + t('month') + '</label><select id="tb-m">' + mo + '</select></div>' +
            '<div class="row2"><div class="field"><label for="tb-a">' + t('adults') + '</label><input type="number" id="tb-a" min="1" max="10" value="2"></div><div class="field"><label for="tb-c">' + t('kids') + '</label><input type="number" id="tb-c" min="0" max="8" value="0"></div></div>' +
            '<div class="meta" style="margin-bottom:6px">' + t('seasonDisc') + '</div><div class="seasons" id="tb-s">' + seasons + '</div><div class="result" id="tb-r" aria-live="polite"></div>' +
            '<button class="btn full eye" type="button" data-act="booktour" data-id="' + tr.id + '">' + t('book') + '</button><button class="btn full ghost" type="button" data-act="fl-to" data-v="' + c.city + '">' + t('findFl') + '</button></aside></div></div>';
    }
    function calcTour() {
        var box = $('.book[data-tour]'); if (!box) return null;
        var tr = byId(TOURS, box.getAttribute('data-tour'));
        var parts = $('#tb-m').value.split('-'), month = +parts[1], s = SM[month];
        var ad = Math.max(1, Math.min(10, +$('#tb-a').value || 1)), ch = Math.max(0, Math.min(8, +$('#tb-c').value || 0));
        var d = tr.d[s], base = tr.p * (ad + 0.7 * ch), total = base * (1 - d / 100);
        $$('#tb-s div').forEach(function (e) { e.classList.toggle('on', +e.getAttribute('data-s') === s); });
        $('#tb-r').innerHTML = '<div class="ln"><span>' + t('basePrice') + '</span><span>' + money(base) + '</span></div><div class="ln"><span>' + t('disc') + ' (' + t('season')[s] + ')</span><span>' + (d ? '−' + d + '% (−' + money(base - total) + ')' : t('noDisc')) + '</span></div><div class="tot">' + t('total') + ': ' + money(total) + '</div>';
        var d0 = new Date(+parts[0], month, 1);
        return { tr: tr, total: total, ad: ad, ch: ch, when: monthName(d0) + ' ' + d0.getFullYear() };
    }
    function viewCountries() {
        return '<div class="wrap"><div class="page-h"><h1>' + t('countries') + '</h1></div><div class="grid" style="margin-top:20px">' + Object.keys(CO).map(countryCard).join('') + '</div></div>';
    }
    function viewCountry(k) {
        var c = CO[k]; if (!c) return viewNF();
        var ts = TOURS.filter(function (x) { return x.co === k; }).map(tourCard).join('');
        var hs = HOTELS.filter(function (x) { return x.co === k; }).map(hotelCard).join('');
        return '<div class="wrap detail"><a class="back" href="#/countries">← ' + t('back') + '</a><div class="banner">' + scene(c, [IMG.countries[k]]) + '</div><div class="d-head"><h1>' + esc(coName(k)) + '</h1><p class="mute">' + esc(pick(c.d)) + '</p><div><button class="btn eye" type="button" data-act="fl-to" data-v="' + c.city + '">' + t('findFl') + '</button></div></div>' +
            (ts ? '<h2 style="margin:24px 0 16px">' + t('toursIn', { c: coName(k) }) + '</h2><div class="grid">' + ts + '</div>' : '') +
            (hs ? '<h2 style="margin:34px 0 0">' + t('hotelsIn', { c: coName(k) }) + '</h2><div class="hotels">' + hs + '</div>' : '') + '</div>';
    }
    function hotelsList() {
        var l = HOTELS.filter(function (h) { return HF === 'all' || h.co === HF; });
        return l.length ? l.map(hotelCard).join('') : '<p class="empty">' + t('none') + '</p>';
    }
    function viewHotels() {
        return '<div class="wrap"><div class="page-h"><h1>' + t('hotels') + '</h1></div><div style="max-width:320px;margin-top:14px"><select id="hk" aria-label="' + t('countries') + '">' + countryOptions(HF) + '</select></div><div class="hotels" id="hlist">' + hotelsList() + '</div></div>';
    }
    function cityOptions(sel) {
        return Object.keys(FL).map(function (k) { return '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' + cityName(k) + '</option>'; }).join('');
    }
    function viewFlights() {
        var today = new Date().toISOString().slice(0, 10);
        if (!FS.date) { var d = new Date(); d.setDate(d.getDate() + 14); FS.date = d.toISOString().slice(0, 10); }
        return '<div class="wrap"><div class="page-h"><h1>' + t('flH') + '</h1><p>' + t('flSub') + '</p></div>' +
            '<form class="sbar" data-form="flights"><div><label for="ff">' + t('flFrom') + '</label><select id="ff">' + cityOptions(FS.from) + '</select></div>' +
            '<div><label for="ft">' + t('flTo') + '</label><select id="ft">' + cityOptions(FS.to) + '</select></div>' +
            '<div><label for="fd">' + t('flDate') + '</label><input type="date" id="fd" min="' + today + '" value="' + FS.date + '"></div>' +
            '<div><label for="fp">' + t('flPax') + '</label><input type="number" id="fp" min="1" max="9" value="' + FS.pax + '"></div>' +
            '<div><label for="fcl">' + t('flCls') + '</label><select id="fcl"><option value="e"' + (FS.cls === 'e' ? ' selected' : '') + '>' + t('eco') + '</option><option value="b"' + (FS.cls === 'b' ? ' selected' : '') + '>' + t('biz') + '</option></select></div>' +
            '<button class="btn eye" type="submit">' + t('flSearch') + '</button></form><p class="mute small" style="margin-top:10px">' + t('demo') + '</p><div id="fres" aria-live="polite"></div></div>';
    }
    function dist(a, b) {
        var R = 6371, r = Math.PI / 180, dl = (b[0] - a[0]) * r, dn = (b[1] - a[1]) * r;
        var x = Math.sin(dl / 2) * Math.sin(dl / 2) + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dn / 2) * Math.sin(dn / 2);
        return 2 * R * Math.asin(Math.sqrt(x));
    }
    function hhmm(m) { m = ((Math.round(m) % 1440) + 1440) % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); }
    function searchFlights() {
        var out = $('#fres');
        if (FS.from === FS.to) { out.innerHTML = '<p class="empty">' + t('sameC') + '</p>'; return; }
        var km = dist(FL[FS.from], FL[FS.to]), seed = hash(FS.from + FS.to + FS.date);
        FR = [];
        for (var i = 0; i < 5; i++) {
            var stop = i % 3 === 2, dep = (300 + ((seed >>> (i * 3)) % 960)), dur = (km / 780 + 0.6 + (stop ? 2 : 0)) * 60;
            var base = (60 + km * 0.065) * (FS.cls === 'b' ? 2.6 : 1) * (0.9 + ((seed >>> (i + 2)) % 25) / 100) * (stop ? 0.85 : 1);
            FR.push({ air: AIR[(seed + i) % AIR.length], dep: dep, arr: dep + dur, dur: dur, stop: stop, price: Math.round(base), from: FS.from, to: FS.to, date: FS.date, pax: FS.pax, cls: FS.cls });
        }
        FR.sort(function (a, b) { return a.price - b.price; });
        out.innerHTML = '<h2 style="margin:26px 0 0;font-size:24px">' + t('flRes') + '</h2><div class="flights">' + FR.map(function (f, i) {
            return '<div class="fl"><div><b>' + f.air + '</b><div class="meta">' + f.date + ' · ' + t(f.cls === 'b' ? 'biz' : 'eco') + '</div></div>' +
                '<div class="times"><div>' + hhmm(f.dep) + '<small>' + f.from + '</small></div><div class="line">' + Math.floor(f.dur / 60) + 'h ' + Math.round(f.dur % 60) + 'm · ' + t(f.stop ? 'oneStop' : 'direct') + '</div><div>' + hhmm(f.arr) + '<small>' + f.to + '</small></div></div>' +
                '<div class="p">' + money(f.price * f.pax) + '<div class="meta">' + f.pax + ' × ' + money(f.price) + '</div></div><button class="btn eye" type="button" data-act="buyfl" data-i="' + i + '">' + t('buy') + '</button></div>';
        }).join('') + '</div>';
    }
    function viewAbout() {
        var ab = t('ab').map(function (w) { return '<div><h3>' + w[0] + '</h3><p>' + w[1] + '</p></div>'; }).join('');
        return '<div class="wrap"><div class="page-h"><h1>' + t('aboutH') + '</h1></div><div class="about-g"><div><p style="font-size:18px">' + t('aboutP1') + '</p><p class="mute">' + t('aboutP2') + '</p></div><div class="about-art">' + logo() + '</div></div>' +
            '<section class="sec"><div class="sec-h"><h2>' + t('valuesT') + '</h2></div><div class="why">' + ab + '</div></section></div>';
    }
    function viewContacts() {
        return '<div class="wrap"><div class="page-h"><h1>' + t('conH') + '</h1><p>' + t('conSub') + '</p></div><div class="contact-g">' +
            '<form class="panel form" data-form="contact" novalidate><div class="field"><label for="cn">' + t('name') + '</label><input type="text" id="cn" autocomplete="name"></div><div class="field"><label for="ce">' + t('email') + '</label><input type="email" id="ce" autocomplete="email"></div><div class="field"><label for="cm">' + t('msg') + '</label><textarea id="cm"></textarea></div><p class="err" id="cerr" role="alert"></p><button class="btn" type="submit">' + t('send') + '</button></form>' +
            '<div class="panel"><dl class="info" style="margin:0"><dt>' + t('phone') + '</dt><dd>+000 00 000 00 00</dd><dt>Email</dt><dd>info@travelwithwolves.example</dd><dt>' + t('addr') + '</dt><dd>Your city, Your street 1</dd><dt>' + t('hours') + '</dt><dd>' + t('hoursV') + '</dd></dl></div></div></div>';
    }
    function userBookings() { return S.user ? LS.get('tww_bk_' + S.user.email, []) : []; }
    function viewAccount() {
        if (!S.user) return '<div class="wrap"><div class="page-h"><h1>' + t('myT') + '</h1><p>' + t('needLogin') + '</p><button class="btn" type="button" data-act="auth" data-v="login">' + t('login') + '</button></div></div>';
        var l = userBookings();
        var rows = l.length ? l.map(function (b, i) {
            return '<div class="bk"><div><b>' + esc(b.title) + '</b><small>' + t(b.type === 'tour' ? 'tTour' : b.type === 'hotel' ? 'tHotel' : 'tFlight') + ' · ' + esc(b.info) + '</small><small>' + t('code') + ': ' + b.code + ' · ' + money(b.total) + '</small></div><button class="btn small ghost" type="button" data-act="cancel" data-i="' + i + '">' + t('cancel') + '</button></div>';
        }).join('') : '<p class="empty">' + t('empty') + '</p>';
        return '<div class="wrap"><div class="page-h"><h1>' + t('myT') + '</h1><p>' + esc(S.user.name) + ' · ' + esc(S.user.email) + '</p><button class="btn small ghost" type="button" data-act="logout">' + t('logout') + '</button></div><div class="panel" style="margin-top:18px">' + rows + '</div></div>';
    }
    function viewNF() { return '<div class="wrap"><div class="page-h"><h1>' + t('nf') + '</h1><p><a class="link" href="#/">' + t('home2') + '</a></p></div></div>'; }

    /* ---------- modal ---------- */
    function openModal(html) {
        $('#modalBody').innerHTML = html; $('#modal').hidden = false; document.body.style.overflow = 'hidden';
        var f = $('#modalBody input, #modalBody button, #modalBody select'); if (f) f.focus();
    }
    function closeModal() { $('#modal').hidden = true; document.body.style.overflow = ''; }
    function authModal(mode) {
        var reg = mode === 'register';
        openModal('<h2 id="mTitle">' + t(reg ? 'register' : 'login') + '</h2><form class="form" data-form="' + mode + '" novalidate>' +
            (reg ? '<div class="field"><label for="an">' + t('name') + '</label><input type="text" id="an" autocomplete="name"></div>' : '') +
            '<div class="field"><label for="ae">' + t('email') + '</label><input type="email" id="ae" autocomplete="email"></div>' +
            '<div class="field"><label for="ap">' + t('pass') + '</label><input type="password" id="ap" autocomplete="' + (reg ? 'new-password' : 'current-password') + '"></div>' +
            '<p class="err" id="aerr" role="alert"></p><button class="btn full" type="submit">' + t(reg ? 'register' : 'login') + '</button></form>' +
            '<p style="margin:14px 0 4px">' + t(reg ? 'haveAcc' : 'noAcc') + ' <button class="link" type="button" data-act="auth" data-v="' + (reg ? 'login' : 'register') + '">' + t(reg ? 'login' : 'register') + '</button></p><p class="mute small" style="margin:0">' + t('demoAuth') + '</p>');
    }
    function needAuth(fn) {
        if (S.user) { fn(); return; }
        pending = fn; toast(t('needLogin')); authModal('login');
    }
    function addBooking(rec) {
        rec.code = code();
        var l = userBookings(); l.unshift(rec); LS.set('tww_bk_' + S.user.email, l);
        openModal('<h2 id="mTitle">' + t('done') + '</h2><p><b>' + esc(rec.title) + '</b><br><span class="mute">' + esc(rec.info) + '</span></p><p>' + t('code') + ': <b>' + rec.code + '</b><br>' + t('total') + ': <b>' + money(rec.total) + '</b></p><p class="mute">' + t('doneP') + '</p><a class="btn full" href="#/account" data-act="close">' + t('myT') + '</a>');
    }
    function hotelModal(id) {
        var h = byId(HOTELS, id), today = new Date().toISOString().slice(0, 10);
        openModal('<h2 id="mTitle">' + esc(h.n) + '</h2><p class="mute">' + esc(pick(h.x)) + '</p><div class="form" data-hotel="' + h.id + '"><div class="field"><label for="hd">' + t('checkin') + '</label><input type="date" id="hd" min="' + today + '" value="' + today + '"></div><div class="row2"><div class="field"><label for="hn">' + t('nights') + '</label><input type="number" id="hn" min="1" max="30" value="3"></div><div class="field"><label for="hr">' + t('rooms') + '</label><input type="number" id="hr" min="1" max="5" value="1"></div></div><p style="font-size:22px;font-family:var(--hfont)" id="ht"></p><button class="btn full eye" type="button" data-act="hbook">' + t('bookHotel') + '</button></div>');
        calcHotel();
    }
    function calcHotel() {
        var box = $('[data-hotel]'); if (!box) return null;
        var h = byId(HOTELS, box.getAttribute('data-hotel')), n = Math.max(1, Math.min(30, +$('#hn').value || 1)), r = Math.max(1, Math.min(5, +$('#hr').value || 1)), tot = h.p * n * r;
        $('#ht').textContent = t('total') + ': ' + money(tot);
        return { h: h, n: n, r: r, total: tot, date: $('#hd').value };
    }

    /* ---------- router ---------- */
    function setNav(key) {
        $$('#nav a').forEach(function (a) { if (a.getAttribute('data-nav') === key) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    }
    function route() {
        var p = location.hash.replace(/^#\/?/, '').split('?')[0].split('/'), r = p[0] || 'home', html, nav = r, title = t(r) || 'Travel with Wolves';
        if (r === 'home') html = viewHome();
        else if (r === 'tours') { if (p[1] && ['all', 'solo', 'family', 'friends'].indexOf(p[1]) > -1) TF.cat = p[1]; html = viewTours(); }
        else if (r === 'tour') { html = viewTour(p[1]); nav = 'tours'; var tt = byId(TOURS, p[1]); if (tt) title = pick(tt.n); }
        else if (r === 'countries') html = viewCountries();
        else if (r === 'country') { html = viewCountry(p[1]); nav = 'countries'; if (CO[p[1]]) title = coName(p[1]); }
        else if (r === 'hotels') html = viewHotels();
        else if (r === 'flights') html = viewFlights();
        else if (r === 'about') html = viewAbout();
        else if (r === 'contacts') html = viewContacts();
        else if (r === 'account') { html = viewAccount(); nav = ''; title = t('myT'); }
        else { html = viewNF(); nav = ''; }
        $('#app').innerHTML = html;
        setNav(nav);
        document.title = (r === 'home' ? '' : title + ' — ') + 'Travel with Wolves';
        if (r === 'tour') calcTour();
        if (r === 'flights' && FS.from !== FS.to) searchFlights();
        window.scrollTo(0, 0);
    }
    function go(h) { if (location.hash === h) route(); else location.hash = h; }

    /* ---------- static UI ---------- */
    function applyStatic() {
        document.documentElement.lang = S.lang;
        document.documentElement.setAttribute('data-theme', S.theme);
        $$('[data-i18n]').forEach(function (e) { e.textContent = t(e.getAttribute('data-i18n')); });
        $('#langSel').value = S.lang;
        $('#themeBtn').setAttribute('aria-label', t('theme'));
        $('#burger').setAttribute('aria-label', t('menu'));
        $('#logo').innerHTML = logo(); $('#logo2').innerHTML = logo();
        $('#year').textContent = new Date().getFullYear();
        var acc = $('#accBtn'), lg = $('#loginBtn');
        if (S.user) { acc.hidden = false; acc.textContent = S.user.name.split(' ')[0]; lg.hidden = true; }
        else { acc.hidden = true; lg.hidden = false; }
    }

    /* ---------- events ---------- */
    document.addEventListener('click', function (e) {
        var el = e.target.closest('[data-act]');
        if (e.target.id === 'modal') { closeModal(); return; }
        if (!el) { $('#nav').classList.remove('open'); $('#burger').setAttribute('aria-expanded', 'false'); return; }
        var a = el.getAttribute('data-act'), v = el.getAttribute('data-v'), id = el.getAttribute('data-id');
        if (a === 'theme') { S.theme = S.theme === 'dark' ? 'light' : 'dark'; LS.set('tww_theme', S.theme); applyStatic(); }
        else if (a === 'burger') { var o = $('#nav').classList.toggle('open'); el.setAttribute('aria-expanded', o); e.stopPropagation(); }
        else if (a === 'close') closeModal();
        else if (a === 'auth') authModal(v);
        else if (a === 'logout') { S.user = null; LS.set('tww_session', null); applyStatic(); toast(t('loggedOut')); go('#/'); }
        else if (a === 'cat') { TF.cat = v; $$('#chips .chip').forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-v') === v); }); $('#tgrid').innerHTML = toursGrid(); }
        else if (a === 'fl-to') { FS.to = v; if (FS.from === v) FS.from = v === 'TAS' ? 'IST' : 'TAS'; go('#/flights'); }
        else if (a === 'booktour') {
            var c = calcTour();
            needAuth(function () { var q = calcTour() || c; addBooking({ type: 'tour', title: pick(q.tr.n), info: q.when + ' · ' + q.ad + ' + ' + q.ch, total: q.total }); });
        }
        else if (a === 'hotel') needAuthOpenHotel(id);
        else if (a === 'hbook') {
            var hb = calcHotel(); if (!hb) return;
            needAuth(function () { addBooking({ type: 'hotel', title: hb.h.n, info: hb.date + ' · ' + hb.n + ' ' + t('nights').toLowerCase() + ' · ' + hb.r + ' ' + t('rooms').toLowerCase(), total: hb.total }); });
        }
        else if (a === 'buyfl') {
            var f = FR[+el.getAttribute('data-i')];
            needAuth(function () { addBooking({ type: 'flight', title: cityName(f.from) + ' → ' + cityName(f.to) + ' · ' + f.air, info: f.date + ' · ' + hhmm(f.dep) + '–' + hhmm(f.arr) + ' · ' + f.pax + ' × ' + t(f.cls === 'b' ? 'biz' : 'eco'), total: f.price * f.pax }); });
        }
        else if (a === 'cancel') {
            var l = userBookings(); l.splice(+el.getAttribute('data-i'), 1); LS.set('tww_bk_' + S.user.email, l); toast(t('canceled')); route();
        }
    });
    function needAuthOpenHotel(id) { hotelModal(id); }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !$('#modal').hidden) closeModal(); });
    document.addEventListener('input', function (e) {
        var id = e.target.id;
        if (id === 'tb-m' || id === 'tb-a' || id === 'tb-c') calcTour();
        else if (id === 'hn' || id === 'hr' || id === 'hd') calcHotel();
        else if (id === 'tq') { TF.q = e.target.value; $('#tgrid').innerHTML = toursGrid(); }
        else if (id === 'tk') { TF.co = e.target.value; $('#tgrid').innerHTML = toursGrid(); }
        else if (id === 'ts') { TF.sort = e.target.value; $('#tgrid').innerHTML = toursGrid(); }
        else if (id === 'hk') { HF = e.target.value; $('#hlist').innerHTML = hotelsList(); }
        else if (id === 'langSel') { S.lang = e.target.value; LS.set('tww_lang', S.lang); applyStatic(); route(); }
    });
    document.addEventListener('submit', function (e) {
        var f = e.target, k = f.getAttribute('data-form'); if (!k) return;
        e.preventDefault();
        if (k === 'finder') { TF.cat = $('#fc').value; TF.co = $('#fk').value; TF.q = $('#fq').value; go('#/tours'); }
        else if (k === 'flights') { FS.from = $('#ff').value; FS.to = $('#ft').value; FS.date = $('#fd').value; FS.pax = Math.max(1, Math.min(9, +$('#fp').value || 1)); FS.cls = $('#fcl').value; searchFlights(); }
        else if (k === 'contact') {
            var n = $('#cn').value.trim(), m = $('#ce').value.trim(), x = $('#cm').value.trim();
            if (!n || !m || !x) { $('#cerr').textContent = t('errFill'); return; }
            var all = LS.get('tww_msgs', []); all.push({ n: n, m: m, x: x, at: Date.now() }); LS.set('tww_msgs', all);
            f.reset(); $('#cerr').textContent = ''; toast(t('sent'));
        }
        else if (k === 'login' || k === 'register') {
            var em = $('#ae').value.trim().toLowerCase(), pw = $('#ap').value, err = $('#aerr'), users = LS.get('tww_users', []), u;
            if (!em || !pw || (k === 'register' && !$('#an').value.trim())) { err.textContent = t('errFill'); return; }
            if (k === 'register') {
                if (pw.length < 6) { err.textContent = t('errPass'); return; }
                if (users.some(function (x) { return x.email === em; })) { err.textContent = t('errExists'); return; }
                u = { name: $('#an').value.trim(), email: em, h: hash(pw) }; users.push(u); LS.set('tww_users', users);
            } else {
                u = users.filter(function (x) { return x.email === em && x.h === hash(pw); })[0];
                if (!u) { err.textContent = t('errLogin'); return; }
            }
            S.user = { name: u.name, email: u.email }; LS.set('tww_session', S.user);
            closeModal(); applyStatic(); toast(t('welcome') + ', ' + u.name.split(' ')[0] + '!');
            var fn = pending; pending = null; if (fn) fn();
        }
    });
    window.addEventListener('hashchange', function () { $('#nav').classList.remove('open'); route(); });

    /* ---------- start ---------- */
    applyStatic();
    route();
})();