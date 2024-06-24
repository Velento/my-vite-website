// src/i18n.js
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
          services: "We provide the following services in Gdansk"
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
          services: "Мы оказываем следующие услуги в Гданьске"
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
          header: {
            slogan: "Żyj legalnie w Polsce",
            contacts: "Kontakty"
          },
          modal: {
            title: "Wybierz dogodną metodę kontaktu",
            call: "Zadzwoń:"
          },
          section1: {
            title: "Doprowadzimy do wyniku lub zwrócimy pieniądze!",
            content: "Pracujemy na podstawie umowy z gwarancją zwrotu pieniędzy. Oznacza to, że jeśli coś pójdzie nie tak i z naszej winy nie otrzymasz ostatecznego wyniku, zwrócimy Ci całą kwotę za nasze usługi.",
            buttonText: "CHCĘ PODPISAĆ UMOWĘ"
          },
          section2: {
            title: "Skontaktuj się z nami teraz, aby dowiedzieć się, jak najszybciej rozwiązać swój problem!",
            content: "Skontaktuj się z nami już teraz! Śmiało zadaj pytanie naszemu specjaliście. Odpowiemy tak szybko, jak to możliwe.",
            buttonText: "CHCĘ SZYBKĄ ODPOWIEDŹ"
          },
          section3: {
            title: "Weź udział w losowaniu dożywotniej darmowej pomocy prawnej. Losowanie co miesiąc",
            content: "Chcemy zapewnić jak najwięcej korzyści. Często konsultujemy ludzi za darmo. Jednak wielu potrzebuje kompleksowej pomocy prawnej, na którą nie zawsze są środki finansowe. Więc nie przegap swojej szansy! Możesz zostać zwycięzcą losowania w naszej grupie na Instagramie. Subskrybuj i graj!",
            buttonText: "CHCĘ DOŻYWOTNIEJ DARMOWEJ POMOCY PRAWNEJ"
          },
          section4: {
            title: "Jestem Katya.",
            content: "Pomogę Ci uzyskać czasowy lub stały pobyt (czasowy pobyt, stały pobyt). Będę nadzorować Twoją sprawę, pomogę przygotować i dostarczyć brakujące dokumenty do Urzędu, sporządzę dla Ciebie odpowiednie pisma do Urzędu, odwołania lub skargi, a także wiele więcej.",
            buttonText: "CHCĘ KARTĘ OD 400 PLN"
          },
          section5: {
            title: "Uzyskaj spersonalizowany plan legalizacji w Polsce.",
            content: "Napisz do nas w jednym z trzech komunikatorów. Opisz swoją sytuację i wskaż, jakiej pomocy potrzebujesz. Nasi specjaliści przeanalizują Twoją sprawę i przekażą jasny plan działania.",
            buttonText: "CHCĘ PLAN"
          },
          services: "Świadczymy następujące usługi w Gdańsku"
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
          header: {
            slogan: "Живіть в Польщі легально",
            contacts: "Контакти"
          },
              modal: {
                  title: "Виберіть зручний спосіб зв'язку",
                  call: "Подзвонити:"
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
                services: "Ми надаємо наступні послуги у Гданську"
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
          modal: {
            title:"Выберыце зручны тып звязку",
            call: "Патэлефанаваць:"
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
          services: "Мы прадстаўляем наступныя паслугі ў Гданьску"
        }
      },
    },
    lng: "ru", // Язык по умолчанию
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;


