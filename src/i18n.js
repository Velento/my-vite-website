
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          footer: {
            contacts: "Contact Us",
            info: "Information",
            services: "Services",
            address: "Gdansk, Grunwaldzka Street 122",
            company: "LLC 'Ominor', NIP 233455678",
            privacyPolicy: "Privacy Policy",
            question: "Ask a question for free",
            rights: "All rights reserved."
          },
          header: {
            slogan: "Live legally in Poland",
            contacts: "Contacts"
          },
          modal: {
            title: "Choose a convenient contact method",
            call: "Call:"
          },
          section1: {
            title: "We will achieve results or refund your money!",
            content: "We work under a contract with a money-back guarantee. This means that if something goes wrong and if you do not receive the final result due to our fault, we will refund you the full amount for our services.",
            buttonText: "I WANT TO SIGN A CONTRACT"
          },
          section2: {
            title: "Contact us now to find out how to solve your issue as quickly as possible!",
            content: "Contact us right now! Feel free to ask our specialist a question. We will respond as quickly as possible.",
            buttonText: "I WANT A QUICK ANSWER"
          },
          section3: {
            title: "Participate in the raffle for lifelong free legal assistance. Raffle every month",
            content: "We want to provide as much benefit as possible. We often consult people for free. However, many need comprehensive legal assistance, which is not always affordable. So don't miss your chance! You can become the winner of the raffle in our Instagram group. Subscribe and play!",
            buttonText: "I WANT LIFELONG FREE LEGAL ASSISTANCE"
          },
          section4: {
            title: "I am Katya.",
            content: "I will help you obtain a temporary or permanent residence permit (czasowy pobyt, stały pobyt). I will oversee your case, help you prepare and submit missing documents to the Office, draft proper letters for the Office, appeals or complaints, and much more.",
            buttonText: "I WANT A CARD FROM 400 PLN"
          },
          section5: {
            title: "Get a personalized legalization plan in Poland.",
            content: "Write to us in one of three messengers. Describe your situation and indicate what kind of help you need. Our specialists will study your case and send a clear plan of action.",
            buttonText: "I WANT A PLAN"
          },
          "services": {
            "cost": "Cost",
            "terming": "Processing Time",
            "learnMore": "Learn More",
            "orderService": "Order Service",
            "getConsultation": "Get Consultation",
            "servicesTitle": "Services in Gdansk",
            "basicPackage": {
              title: "Basic package: 500 zl",
              content: "1) Consultation. 2) Analysis of current documents and compilation of a list of missing ones. 3) Checking the document package before submission. 4) Collecting and preparing a complete package of documents. 5) Filling in all forms. 6) Registration for personal submission.",
              button: "I WANT THE BASIC PACKAGE"
            },
            "allInclusivePackage": {
              title: 'All-Inclusive Package: 1500 zl',
              content: "1) Consultation. 2) Assistance in preparing documents from the employer. 3) Collecting and preparing a complete package of documents. 4) Filling in all forms. 5) Registration for personal submission. 6) Obtaining a stamp in the passport. 7) Fingerprint submission. 8) Case control, receiving correspondence, submitting all necessary documents. 9) Contact with the inspector handling your case. 10) Comprehensive support of your case until a decision is obtained. 11) Preparation of a PESEL number if necessary. 12) Registration of a trusted profile (profil zaufany) if necessary. 13) In the event of a negative decision due to our fault, assistance in preparing documents for appeal and full refund of funds.",
              button: "I WANT THE ALL-INCLUSIVE PACKAGE"
              },
              moreInfoService1: {
              title: "Temporary residence card",
              content: "A temporary residence card or residence permit is a document that confirms the identity of a foreigner during his stay in Poland, and also gives him the right to cross the border multiple times without obtaining a visa, officially work, purchase movable and immovable property in Poland."
              },
              moreInfoService2: {
              title: "Permanent residence card",
              content: "A permanent residence card or permanent residence permit is a permanent residence document that gives the right to cross the border without a visa and legally stay in Poland without restrictions, having all the rights of a Polish citizen."
              },
            "temporaryResidenceCard": "Temporary Residence Card",
            "permanentResidenceCard": "Permanent Residence Card",
            processingTime: {
              title: "Processing time",
              content: "The processing time for obtaining a residence card in Gdansk is on average 7 months."
            }
          }
        }  
      },
      pl: {
        translation: {
          footer: {
            contacts: "Kontakty",
            info: "Informacje",
            services: "Usługi",
            address: "Gdańsk, ul. Grunwaldzka 122",
            company: "Sp. z o.o. 'Ominor', NIP 233455678",
            privacyPolicy: "Polityka prywatności",
            question: "Zadaj pytanie za darmo",
            rights: "Wszelkie prawa zastrzeżone."
          },
          modal: {
            title: "Wybierz dogodną metodę kontaktu",
            call: "Zadzwoń:"
          },
          "header": {
            "slogan": "Żyj legalnie w Polsce",
            "contacts": "Kontakty"
          },
          section1: {
            title: "Doprowadzimy do rezultatu lub zwrócimy pieniądze!",
            content: "Pracujemy na umowie z gwarancją zwrotu pieniędzy. To oznacza, że jeśli coś pójdzie nie tak i jeśli z naszej winy nie uzyskasz końcowego rezultatu, zwrócimy ci całą kwotę za nasze usługi.",
            buttonText: "CHCĘ PODPISAĆ UMOWĘ"
          },
          section2: {
            title: "Skontaktuj się teraz i dowiedz się, jak szybko rozwiązać swój problem!",
            content: "Skontaktuj się z nami teraz! Śmiało zadawaj pytania naszemu specjaliście. Odpowiemy na nie jak najszybciej.",
            buttonText: "CHCĘ SZYBKĄ ODPOWIEDŹ"
          },
          section3: {
            title: "Weź udział w losowaniu dożywotniej bezpłatnej pomocy prawnej. Losowanie co miesiąc",
            content: "Chcemy dostarczyć jak najwięcej korzyści z naszej strony. Często konsultujemy ludzi za darmo. Jednak wielu potrzebuje kompleksowej pomocy prawnej, na którą nie zawsze znajdują się finanse. Dlatego nie przegap swojej szansy! Możesz zostać zwycięzcą losowania w naszej grupie na Instagramie. Subskrybuj i graj!",
            buttonText: "CHCĘ BEZPŁATNĄ POMOC PRAWNĄ NA CAŁE ŻYCIE"
          },
          section4: {
            title: "Jestem Katia.",
            content: "Pomogę ci uzyskać tymczasowe lub stałe pozwolenie na pobyt (czasowy pobyt, stały pobyt). Będę monitorować twoją sprawę, pomogę przygotować i dostarczyć brakujące dokumenty do Urzędu, napiszę dla ciebie odpowiednie pisma do Urzędu, odwołania lub skargi oraz wiele innych.",
            buttonText: "CHCĘ KARTĘ OD 400 PLN"
          },
          section5: {
            title: "Uzyskaj spersonalizowany plan legalizacji w Polsce.",
            content: "Napisz do nas w jednym z trzech komunikatorów. Opisz swoją sytuację i wskaż, jaka pomoc jest ci potrzebna. Nasi specjaliści przeanalizują twoją sytuację i wyślą jasny plan działania.",
            buttonText: "CHCĘ PLAN"
          },
            "services": {
              "cost": "Koszt",
              "terming": "Czas uzyskania karty",
              "learnMore": "Dowiedz się więcej o karcie",
              "orderService": "Zamów usługę",
              "getConsultation": "Uzyskaj konsultację",
              "servicesTitle": "Świadczymy następujące usługi w Gdańsku",
              "basicPackage": {
                "title": "Pakiet podstawowy: 500 zł",
                "content": "1) Konsultacja. 2) Analiza aktualnych dokumentów i sporządzenie listy brakujących. 3) Sprawdzenie pakietu dokumentów przed złożeniem. 4) Zebranie i przygotowanie pełnego pakietu dokumentów. 5) Wypełnienie wszystkich formularzy. 6) Rejestracja na osobiste złożenie wniosku.",
                "button": "CHCĘ PAKIET PODSTAWOWY"
              },
              "allInclusivePackage": {
                "title": "Pakiet 'Wszystko w cenie': 1500 zł",
                "content": "1) Konsultacja. 2) Pomoc w przygotowaniu dokumentów od pracodawcy. 3) Zebranie i przygotowanie pełnego pakietu dokumentów. 4) Wypełnienie wszystkich formularzy. 5) Rejestracja na osobiste złożenie wniosku. 6) Uzyskanie pieczęci w paszporcie. 7) Złożenie odcisków palców. 8) Kontrola sprawy, odbiór korespondencji, złożenie wszystkich niezbędnych dokumentów. 9) Kontakt z inspektorem prowadzącym twoją sprawę. 10) Kompleksowa obsługa twojej sprawy do uzyskania decyzji. 11) Przygotowanie numeru PESEL w razie potrzeby. 12) Rejestracja profilu zaufanego w razie potrzeby. 13) W przypadku negatywnej decyzji z naszej winy - pomoc w przygotowaniu dokumentów do odwołania i pełny zwrot kosztów.",
                "button": "CHCĘ PAKIET 'WSZYSTKO W CENIE'"
              },
              "moreInfoService1": {
                "title": "Karta czasowego pobytu",
                "content": "Karta czasowego pobytu lub zezwolenie na pobyt to dokument, który potwierdza tożsamość cudzoziemca podczas jego pobytu w Polsce, a także daje mu prawo do wielokrotnego przekraczania granicy bez konieczności uzyskania wizy, legalnej pracy, zakupu nieruchomości w Polsce."
              },
              "moreInfoService2": {
                "title": "Karta stałego pobytu",
                "content": "Karta stałego pobytu lub zezwolenie na pobyt stały to dokument na stały pobyt, który daje prawo do przekraczania granicy bez wizy i legalnego pobytu w Polsce bez ograniczeń, z wszystkimi prawami obywatela Polski."
              },
              "temporaryResidenceCard": "Karta czasowego pobytu",
              "permanentResidenceCard": "Karta stałego pobytu",
              "processingTime": {
                "title": "Czas uzyskania",
                "content": "Czas uzyskania karty pobytu w Gdańsku wynosi średnio 7 miesięcy."
              }
            }
        }
      },
      ua: {
        translation: {
          footer: {
            contacts: "Контакти",
            info: "Інформація",
            services: "Послуги",
            address: "Гданськ, вул. Грюнвальдська 122",
            company: "ТОВ 'Омінор', NIP 233455678",
            privacyPolicy: "Політика конфіденційності",
            question: "Задати питання безкоштовно",
            rights: "Всі права захищені."
          },
          modal: {
            title: "Виберіть зручний спосіб зв'язку",
            call: "Подзвонити:"
          },
          "header": {
            "slogan": "Живіть легально в Польщі",
            "contacts": "Контакти"
          },
          section1: {
            title: "Доведемо до результату або повернемо гроші!",
            content: "Ми працюємо за договором з гарантією повернення грошей. Це означає, що якщо щось піде не за планом і якщо з нашої вини ти не отримаєш кінцевого результату, ми повернемо тобі всю суму за наші послуги.",
            buttonText: "ХОЧУ УКЛАСТИ ДОГОВІР"
          },
          section2: {
            title: "Зв'яжись зараз і дізнайся як вирішити твоє питання максимально швидко!",
            content: "Зв'яжись з нами прямо зараз! Сміливо став питання нашому спеціалісту. Ми відповімо на нього максимально швидко.",
            buttonText: "ХОЧУ ШВИДКУ ВІДПОВІДЬ"
          },
          section3: {
            title: "Бери участь у розіграші довічної безкоштовної юридичної допомоги. Розіграш кожен місяць",
            content: "Ми хочемо дати максимальну користь з нашого боку. Ми часто консультуємо людей безкоштовно. Однак багато хто потребує комплексної юридичної допомоги, на яку не завжди є фінанси. Тому не втрачай свій шанс! Ти можеш стати переможцем розіграшу в нашій групі Instagram. Підписуйся та грай!",
            buttonText: "ХОЧУ БЕЗКОШТОВНУ ЮРИДИЧНУ ДОПОМОГУ НА ВСЕ ЖИТТЯ"
          },
          section4: {
            title: "Я Катя.",
            content: "Я допоможу тобі отримати тимчасовий або постійний вид на проживання (czasowy pobyt, stały pobyt). Я стежитиму за твоєю справою, допоможу підготувати та доставити відсутні документи в Ужонд, складу для тебе правильні листи до Ужонду, апеляції або скарги, а також багато іншого.",
            buttonText: "ХОЧУ КАРТУ ВІД 400 зл."
          },
          section5: {
            title: "Отримай персональний план по легалізації в Польщі.",
            content: "Напиши нам в один із трьох месенджерів. Опиши свою ситуацію та вкажи, яка допомога тобі потрібна. Наші спеціалісти вивчать твою ситуацію та надішлють чіткий план дій.",
            buttonText: "ХОЧУ ПЛАН"
          },
            "services": {
              "cost": "Вартість",
              "terming": "Термін отримання картки",
              "learnMore": "Дізнатися більше про картку",
              "orderService": "Замовити послугу",
              "getConsultation": "Отримати консультацію",
              "servicesTitle": "Ми надаємо наступні послуги в Гданську",
              "basicPackage": {
                "title": "Базовий пакет: 500 зл",
                "content": "1) Консультація. 2) Аналіз актуальних документів та складання списку відсутніх. 3) Перевірка пакету документів перед поданням. 4) Збір та підготовка повного пакету документів. 5) Заповнення всіх анкет. 6) Реєстрація на особисте подання заяви.",
                "button": "ХОЧУ БАЗОВИЙ ПАКЕТ"
              },
              "allInclusivePackage": {
                "title": "Пакет \"Все включено\": 1500 зл",
                "content": "1) Консультація. 2) Допомога в підготовці документів від роботодавця. 3) Збір та підготовка повного пакету документів. 4) Заповнення всіх анкет. 5) Реєстрація на особисте подання заяви. 6) Отримання штампа в паспорт. 7) Здача відбитків пальців. 8) Контроль справи, отримання кореспонденції, подання всіх необхідних документів. 9) Контакт з інспектором, який веде вашу справу. 10) Комплексний супровід вашої справи до отримання рішення. 11) Підготовка номера PESEL у разі потреби. 12) Реєстрація довіреного профілю (profil zaufany) у разі потреби. 13) У разі негативного рішення з нашої вини - допомога у підготовці документів на апеляцію та повне повернення коштів.",
                "button": "ХОЧУ ПАКЕТ \"ВСЕ ВКЛЮЧЕНО\""
              },
              "moreInfoService1": {
                "title": "Карта тимчасового перебування",
                "content": "Карта тимчасового перебування або дозвіл на проживання - це документ, що підтверджує особу іноземця під час його перебування в Польщі, а також дає право на багаторазове перетинання кордону без отримання візи, офіційну роботу, купівлю рухомого та нерухомого майна в Польщі."
              },
              "moreInfoService2": {
                "title": "Карта постійного перебування",
                "content": "Карта постійного перебування або постійний вид на проживання - це документ на постійне проживання, що дає право на перетин кордону без візи та легальне перебування в Польщі без обмежень, маючи всі права громадянина Польщі."
              },
              "temporaryResidenceCard": "Карта тимчасового перебування",
              "permanentResidenceCard": "Карта постійного перебування",
              "processingTime": {
                "title": "Термін отримання",
                "content": "Термін отримання карти перебування в Гданську становить в середньому 7 місяців."
              }
            }
          }
    },
    by: {
      translation: {
        footer: {
          contacts: "Кантакты",
          info: "Інфармацыя",
          services: "Паслугі",
          address: "Гданьск, вул. Грунвальдская 122",
          company: "ТАА 'Омінор', NIP 233455678",
          privacyPolicy: "Палітыка прыватнасці",
          question: "Задаць пытанне бясплатна",
          rights: "Усе правы абаронены."
        },
        header: {
          slogan: "Жывіце ў Польшчы легальна",
          contacts: "Кантакты"
        },
        "modal": {
          "title": "Выберыце зручны тып звароту",
          "call": "Патэлефанаваць:"
        },
         section1: {
      title: "Давядзем да выніку або вярнем грошы!",
      content: "Мы працуем па дагаворы з гарантыяй вяртання грошай. Гэта значыць, што калі што-небудзь пайдзе не па плану і з нашай віны ты не атрымаеш канчатковы вынік, мы вярнем табе ўсю суму за нашыя паслугі.",
      buttonText: "ХОЧУ ПАДПІСАЦЬ ДАГАВОР"
    },
    section2: {
      title: "Звяжыся цяпер і даведайся, як вырашыць твой пытанне максімальна хутка!",
      content: "Звяжыся з намі цяпер! Смела задавай пытанне нашаму спецыялісту. Мы адкажам на яго максімальна хутка.",
      buttonText: "ХОЧУ ХУТКІ АДКАЗ"
    },
    section3: {
      title: "Удзельнічай у латэрыі даўжаной бясплатнай юрыдычнай дапамогі. Латэрыя кожны месяц",
      content: "Мы хочам даць максімум карыснасці з нашага боку. Мы часта кансультуем людзей бясплатна. Аднак многія патрэбуюць камплекснай юрыдычнай дапамогі, на якую не заўсёды знаходзяцца фінансы. Таму не страта свайго шанцу! Ты можаш стаць пераможцам латэрыі ў нашай групе Instagram. Падпісвайся і гуляй!",
      buttonText: "ХОЧУ БЯСПЛАТНУЮ ЮРЫДЫЧНУЮ ДАПАМОГУ НА ВЁСТКУ ЖЫЦЦЯ"
    },
    section4: {
      title: "Я Каця.",
      content: "Я дапамагу табе атрымаць часовы або сталы статус замежнага грамадзянства (czasowy pobyt, stały pobyt). Я сачыць за тваёй справай, дапамагу падрыхтаваць і даслаць адсутнія дакументы ў Ужонд, складу табе правільныя лісты для Ужонда, апеляцыі ці скаргі, а таксама шмат іншага.",
      buttonText: "ХОЧУ КАРТУ АД 400 зл."
    },
    section5: {
      title: "Атрымай персаналізаваны план па легалізацыі ў Польшчы.",
      content: "Напішы нам у адзін з трох месанджараў. Апішы сваю сітуацыю і пакажы, якую дапамогу табе патрэбна. Нашы спецыялісты разгледзяць тваю сітуацыю і адправяць чаткі план дзеянняў.",
      buttonText: "ХОЧУ ПЛАН"
    },
      "services": {
        "cost": "Кошт",
        "terming": "Тэрмін атрымання карты",
        "learnMore": "Даведайцеся больш пра карту",
        "orderService": "Замовіць паслугу",
        "getConsultation": "Атрымаць кансультацыю",
        "servicesTitle": "Мы аказваем наступныя паслугі ў Гданьску",
        "basicPackage": {
          "title": "Базавы пакет: 500 зл",
          "content": "1) Кансультацыя. 2) Аналіз актуальных дакументаў і складанне спісу недастаючых. 3) Праверка пакета дакументаў перад падачай. 4) Збор і падрыхтоўка поўнага пакета дакументаў. 5) Запаўненне ўсіх анкет. 6) Рэгістрацыя на асабістую падачу.",
          "button": "ХАЧУ БАЗАВЫ ПАКЕТ"
        },
        "allInclusivePackage": {
          "title": "Пакет \"Усё ўключана\": 1500 зл",
          "content": "1) Кансультацыя. 2) Дапамога ў падрыхтоўцы дакументаў ад працадаўцы. 3) Збор і падрыхтоўка поўнага пакета дакументаў. 4) Запаўненне ўсіх анкет. 5) Рэгістрацыя на асабістую падачу. 6) Атрыманне штампа ў пашпарт. 7) Сдача адбіткаў пальцаў. 8) Кантроль справы, атрымання карэспандэнцыі, здача ўсіх неабходных дакументаў. 9) Кантакт з інспектарам, які вядзе вашу справу. 10) Комплекснае суправаджэнне вашай справы да атрымання рашэння. 11) Падрыхтоўка нумара PESEL пры неабходнасці. 12) Рэгістрацыя даверанага профілю (profil zaufany) пры неабходнасці. 13) У выпадку негатыўнага рашэння па нашай віне - дапамога ў падрыхтоўцы дакументаў на апеляцыю і поўны вяртанне сродкаў.",
          "button": "ХАЧУ ПАКЕТ \"УСЁ ЎКЛЮЧАНА\""
        },
        "moreInfoService1": {
          "title": "Карта часовай прабывання",
          "content": "Карта часовай прабывання або від на жыхарства - гэта дакумент, які пацвярджае асобу замежніка падчас яго знаходжання ў Польшчы, а таксама дае права шматразова перасякаць мяжу без атрымання візы, афіцыйна працаваць, набываць рухомую і нерухомую маёмасць у Польшчы."
        },
        "moreInfoService2": {
          "title": "Карта пастаяннага прабывання",
          "content": "Карта пастаяннага прабывання або пастаянны від на жыхарства - гэта дакумент на пастаяннае пражыванне, які дае права перасякаць мяжу без візы і легальна знаходзіцца ў Польшчы без абмежаванняў, валодаючы ўсімі правамі грамадзяніна Польшчы."
        },
        "temporaryResidenceCard": "Карта часовай прабывання",
        "permanentResidenceCard": "Карта пастаяннага прабывання",
        "processingTime": {
          "title": "Тэрмін атрымання",
          "content": "Тэрмін атрымання карты прабывання ў Гданьску складае ў сярэднім 7 месяцаў."
        }
      }
    }
  },    
     ru: {
                translation: {
                  footer: {
                    contacts: "Контакты",
                    info: "Информация",
                    services: "Услуги",
                    address: "Гданьск, ул. Грюнвальдская 122",
                    company: "ООО 'Оминор', NIP 233455678",
                    privacyPolicy: "Политика конфиденциальности",
                    question: "Задать вопрос бесплатно",
                    rights: "Все права защищены."
                  },
                  header: {
                    slogan: "Живите в Польше легально",
                    contacts: "Контакты"
                  },
                  modal: {
                    title: "Выберите удобный тип связи",
                    call: "Позвонить:"
                  },
                  section1: {
                    title: "Доведем до результата или вернем деньги!",
                    content: "Мы работаем по договору с гарантией возврата денег. Это значит, что если что-то пойдет не по плану и если по нашей вине ты не получишь конечного результата, то мы вернем тебе всю сумму за наши услуги.",
                    buttonText: "ХОЧУ ЗАКЛЮЧИТЬ ДОГОВОР"
                  },
                  section2: {
                    title: "Свяжись сейчас и узнай как решить твой вопрос максимально быстро!",
                    content: "Свяжись с нами прямо сейчас! Смело задавай вопрос нашему специалисту. Мы ответим на него максимально быстро.",
                    buttonText: "ХОЧУ БЫСТРЫЙ ОТВЕТ"
                  },
                  section3: {
                    title: "Участвуй в розыгрыше пожизненной бесплатной юридической помощи. Розыгрыш каждый месяц",
                    content: "Мы хотим дать максимально пользы с нашей стороны. Мы часто консультируем людей бесплатно. Однако многие нуждаются в оказании комплексной юридической помощи, на которую не всегда находятся финансы. Поэтому не упускай свой шанс! Ты можешь стать победителем розыгрыша в нашей группе Инстаграм. Подписывайся и играй!",
                    buttonText: "ХОЧУ БЕСПЛАТНУЮ ЮРИДИЧЕСКУЮ ПОМОЩЬ НА ВСЮ ЖИЗНЬ"
                  },
                  section4: {
                    title: "Я Катя.",
                    content: "Я помогу тебе получить временный либо постоянный вид на жительство (czasowy pobyt, stały pobyt). Я прослежу за твоим делом, помогу подготовить и донести недостающие документы в Ужонд, составлю тебе правильно письма для Ужонда, аппеляции или жалобы, а также многое другое.",
                    buttonText: "ХОЧУ КАРТУ ОТ 400 зл."
                  },
                  section5: {
                    title: "Получи персональный план по легализации в Польше.",
                    content: "Напиши нам в один из трех мессенджеров. Опиши свою ситуацию и укажи, какая помощь тебе нужна. Наши специалисты изучат твою ситуацию и отправят четкий план действий.",
                    buttonText: "ХОЧУ ПЛАН"
                  },   
                  services: {
                  cost: "Стоимость",
                  terming: "Срок получения карты",
                  learnMore: "Узнать больше о карте",
                  orderService: "Заказать услугу",
                  getConsultation: "Получить консультацию",
                  servicesTitle: "Мы оказываем следующие услуги в Гданьске",
                  basicPackage: {
                    title: "Базовый пакет: 500 зл",
                    content: "1) Консультация. 2) Анализ актуальных документов и составление списка недостающих. 3) Проверка пакета документов перед подачей. 4) Сбор и подготовка полного пакета документов. 5) Заполнение всех анкет. 6) Регистрация на личную подачу.",
                    button: "ХОЧУ БАЗОВЫЙ ПАКЕТ"
                  },
                  allInclusivePackage: {
                    title: 'Пакет "Всё включено": 1500 зл',
                    content: "1) Консультация. 2) Помощь в подготовке документов от работодателя. 3) Сбор и подготовка полного пакета документов. 4) Заполнение всех анкет. 5) Регистрация на личную подачу. 6) Получение штампа в паспорт. 7) Сдача отпечатков пальцев. 8) Контроль дела, получение корреспонденции, сдача всех необходимых документов. 9) Контакт с инспектором, который ведет твое дело. 10) Комплексное сопровождение твоего дела до получения решения. 11) Подготовка номера PESEL при необходимости. 12) Регистрация доверенного профиля (profil zaufany) при необходимости. 13) В случае негативного решения по нашей вине - помощь в подготовке документов на аппеляцию и полный возврат средств.",
                    button: "ХОЧУ ПАКЕТ \"ВСЁ ВКЛЮЧЕНО\""
                  },
                  moreInfoService1: {
                    title: "Карта временного пребывания",
                    content: "Карта временного пребывания или вид на жительство - это документ, который подтверждает личность иностранца во время его пребывания в Польше, а также дает право многократно пересекать границу без получения визы, официально работать, покупать движимое и недвижимое имущество в Польше."
                  },
                  moreInfoService2: {
                    title: "Карта постоянного пребывания",
                    content: "Карта постоянного пребывания или постоянный вид на жительство - это документ на постоянное проживание, который дает право пересекать границу без визы и легально находиться в Польше без ограничений, обладая всеми правами гражданина Польши."
                  },
                  temporaryResidenceCard: "Карта временного пребывания",
                  permanentResidenceCard: "Карта постоянного пребывания",
      
                  processingTime: {
                    title: "Срок получения",
                    content: "Срок получения карты пребывания в Гданьске составляет в среднем 7 месяцев."
                  }
                  }
                }
              }
            },
    lng: "ru", // Язык по умолчанию
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;



