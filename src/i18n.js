
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "menu.pricelist" : "Price List",
          "menu.advantages": "Advantages",
          "menu.promotions": "Promotions",
          "menu.services": "Services",
          "menu.about": "About Us",
          "menu.contact": "Information",

          "servicespromo.0.title": "PROMOTIONS",
          "servicespromo.0.points.0":  "Residence card for 400 PLN. Get the Basic package for 400 PLN. To take advantage of the promotion, tell our customer service specialist the promo code: Start24. The promotion is valid only until the end of September 2024.",
          "servicespromo.0.points.1":  "Residence card for 750 PLN. Get the 'All inclusive' package for 750 PLN. To take advantage of the promotion, tell our customer service specialist the promo code 'Start24'. The promotion is valid only until the end of September 2024.",
          "servicespromo.0.points.2": "Citizenship documents for 1500 PLN. 'All inclusive' package. To take advantage of the promotion, tell our customer service specialist the promo code 'Start24'. The promotion is valid only until the end of September 2024.",

          "pricelistservices.0.title": "Comprehensive assistance with documents for residence card application",
          "pricelistservices.0.points.0": "Based on employment",
          "pricelistservices.0.points.1": "Based on business",
          "pricelistservices.0.points.2": "Based on family residence",
          "pricelistservices.0.points.3": "Based on marriage with a Polish citizen",
          "pricelistservices.0.price": "From 500 to 1500 PLN",

          "pricelistservices.1.title": "Assistance with citizenship application documents",
          "pricelistservices.1.price": "From 750 to 1500 PLN (Price until 30.09.2024)",

          "pricelistservices.2.title": "Labor disputes: From 'Umowy zlecenia' to 'Umowy o pracę'",
          "pricelistservices.2.points.0": "Achieve transition from 'Umowy zlecenia' to 'Umowy o pracę'",
          "pricelistservices.2.points.1": "Submit complaints to employer",
          "pricelistservices.2.points.2": "File lawsuits",
          "pricelistservices.2.points.3": "Demand compensation for illegal employment",
          "pricelistservices.2.price": "From 2500 to 3500 PLN",

          "pricelistservices.3.title": "Preparation of documents for marriage registration",
          "pricelistservices.3.price": "From 500 to 1500 PLN",

          "pricelistservices.4.title": "Driver's license replacement",
          "pricelistservices.4.price": "From 500 to 1500 PLN",

          "pricelistservices.5.title": "Legal consultation",
          "pricelistservices.5.points.0": "Consultation duration up to 60 minutes",
          "pricelistservices.5.points.1": "Online or by phone",
          "pricelistservices.5.price": "From 200 PLN",

          "pricelistservices.6.title": "Resume (CV) preparation",
          "pricelistservices.6.points.0": "With cover letter",
          "pricelistservices.6.points.1": "Without cover letter",
          "pricelistservices.6.price": "From 150 to 250 PLN",

          "consult_button": "Get consultation",

          "reason_texts.reason1": "We ensure price accessibility! Price is key!",
          "reason_texts.reason2": "If we don't call you back within 45 minutes after you submit a request on the site, we will give you a 250 PLN discount on the purchase of a service.",
          "reason_texts.reason3": "1. Payment after the service is completed! You are not taking any risks. 2. If you do not achieve the result, we will refund your money within 7 days. We work under contract!",

          "modal.feedbackButton": "Leave a request", 
          feedbackForm: {
            title: "Leave a Request",
            name: "Your Name",
            phone: "Mobile Number",
            submit: "Submit",
            cancel: "Cancel"
          },
           "messageAlert": "Thank you for your request! Our specialists are already fighting to see who will call you first:)",
          "actionToCall": "Call now",
          "cookieMessage": "We use cookies! This site uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will only be set after consent.",
                "allowMeToChoose": "Allow me to choose",
                "acceptAll": "Accept All",
                "decline": "Decline",
                "cookieSettings": "Cookie Settings",
                "cookieUsageDescription": "We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details about cookies and other sensitive data.",
                "essentialCookies": "Essential Cookies",
                "analyticsCookies": "Performance and Analytics Cookies",
                "marketingCookies": "Marketing and Targeting Cookies",
                "acceptSelected": "Accept Selected",
                "necessaryCookies": "Necessary cookies",
          footer: {
            contacts: "Contact Us",
            info: "Information",
            services: "Services",
            address: "80-369 Gdańsk, al. Rzeczypospolitej 4/152",
            company: "Sp. z o.o. \"Ominor\", NIP: 5842805362",
            timework: "Daily from 9:00 AM to 5:00 PM, closed on Sat-Sun",
            privacyPolicy: "Privacy Policy",
            question: "Ask a question for free",
            rights: "All rights reserved."
          },
          header: {
            slogan: "Legalization in Poland at an affordable price",
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
              "temporaryResidenceCard": "Temporary Residence Card (Karta czasowego pobytu)",
              "permanentResidenceCard": "Permanent Residence Card (Karta stałego pobytu)",
              "marriageAgreement": "Marriage Agreement (Małżeństwo)",
              "businessVisa": "Business Visa. From 'Umowy zlecenia' to 'Umowy o pracę'",
              "familyReunion": "Driving License Replacement",
              "konsultation": "Consultation",
              "resume": "Resume (CV) Writing",
              "civilDocs": "Citizenship Documents",
          
              "Service1.cost": "Cost",
              "Service1.terming": "Card Processing Time",
              "Service1.learnMore": "Learn More About the Card",
              "Service1.orderService": "Order Service",
              "Service1.getConsultation": "Get a Consultation",
              "servicesTitle": "We Provide the Following Services in Gdańsk",
              "Service1.basicPackage": {
                "title": "Basic Package: 500 PLN",
                "content": "1) Consultation. 2) Document analysis and missing document checklist. 3) Document package review before submission. 4) Collection and preparation of the complete document package. 5) Filling out all forms. 6) Registration for personal submission.",
                "button": "I WANT THE BASIC PACKAGE"
              },
              "Service1.allInclusivePackage": {
                "title": 'All-Inclusive Package: 1500 PLN',
                "content": "1) Consultation. 2) Assistance in preparing employer documents. 3) Collection and preparation of the complete document package. 4) Filling out all forms. 5) Registration for personal submission. 6) Passport stamping. 7) Fingerprint submission. 8) Case monitoring, correspondence reception, submission of all necessary documents. 9) Contact with the inspector handling your case. 10) Comprehensive support until a decision is made. 11) PESEL number preparation if needed. 12) Trusted profile registration (profil zaufany) if needed. 13) In case of a negative decision due to our fault - assistance in preparing appeal documents and full refund.",
                "button": "I WANT THE ALL-INCLUSIVE PACKAGE"
              },
              "Service1.moreInfoService": {
                "title": "Temporary Residence Card",
                "content": "The temporary residence card or residence permit is a document that confirms the identity of a foreigner during their stay in Poland and allows for multiple border crossings without a visa, official work, and the purchase of movable and immovable property in Poland."
              },
              "Service1.processingTime": {
                "title": "Processing Time",
                "content": "The processing time for a residence card in Gdańsk is on average 7 months."
              },
              "Service2.cost": "Cost",
              "Service2.terming": "Card Processing Time",
              "Service2.learnMore": "Learn More About the Card",
              "Service2.orderService": "Order Service",
              "Service2.getConsultation": "Get a Consultation",
              "Service2.basicPackage": {
                "title": "Basic Package: 500 PLN",
                "content": "1) Consultation. 2) Document analysis and missing document checklist. 3) Document package review before submission. 4) Collection and preparation of the complete document package. 5) Filling out all forms. 6) Registration for personal submission.",
                "button": "I WANT THE BASIC PACKAGE"
              },
              "Service2.allInclusivePackage": {
                "title": 'All-Inclusive Package: 1500 PLN',
                "content": "1) Consultation. 2) Assistance in preparing employer documents. 3) Collection and preparation of the complete document package. 4) Filling out all forms. 5) Registration for personal submission. 6) Passport stamping. 7) Fingerprint submission. 8) Case monitoring, correspondence reception, submission of all necessary documents. 9) Contact with the inspector handling your case. 10) Comprehensive support until a decision is made. 11) PESEL number preparation if needed. 12) Trusted profile registration (profil zaufany) if needed. 13) In case of a negative decision due to our fault - assistance in preparing appeal documents and full refund.",
                "button": "I WANT THE ALL-INCLUSIVE PACKAGE"
              },
              "Service2.moreInfoService": {
                "title": "Temporary Residence Card",
                "content": "The temporary residence card or residence permit is a document that confirms the identity of a foreigner during their stay in Poland and allows for multiple border crossings without a visa, official work, and the purchase of movable and immovable property in Poland."
              },
              "Service2.processingTime": {
                "title": "Processing Time",
                "content": "The processing time for a residence card in Gdańsk is on average 7 months."
              },
              "Service3.cost": "Cost",
              "Service3.terming": "Processing Time",
              "Service3.learnMore": "Learn More",
              "Service3.orderService": "Order Service",
              "Service3.getConsultation": "Get a Consultation",
              "Service3.basicPackage": {
                "title": "Basic Package: 500 PLN",
                "content": "1) Consultation. 2) Document analysis and missing document checklist. 3) Document package review before submission. 4) Collection and preparation of the complete document package.",
                "button": "I WANT THE BASIC PACKAGE"
              },
              "Service3.allInclusivePackage": {
                "title": 'All-Inclusive Package: 1500 PLN',
                "content": "1) Consultation. 2) Assistance in preparing documents. 3) Assistance in organizing the online wedding ceremony. 4) Preparation of documents for marriage in the USA while physically in Poland. 5) Full support for marriage in Poland. 6) Filling out all forms. 7) Case monitoring, correspondence reception, submission of all necessary documents. 8) Contact with the institution issuing the marriage permit. 9) Comprehensive support until the marriage decision is obtained. 10) PESEL number preparation if needed. 11) Trusted profile registration (profil zaufany) if needed. 12) In case of a negative decision due to our fault - full refund.",
                "button": "I WANT THE ALL-INCLUSIVE PACKAGE"
              },
              "Service3.moreInfoService": {
                "title": "Marriage Agreement",
                "content": "Getting married in Poland is not as easy as it seems. The complexity lies in the fact that document processing can take up to 10-12 months. We will help you quickly prepare all the documents and obtain a marriage permit from the appropriate authorities."
              },
              "Service3.processingTime": {
                "title": "Marriage Document Processing Time",
                "content": "The processing time for marriage documents in Gdańsk is on average 7 months. For marriage in the USA while physically in Poland, document preparation times average 2 months."
              },
              "Service4.cost": "Cost",
              "Service4.terming": "Processing Time",
              "Service4.learnMore": "Learn More",
              "Service4.orderService": "Order Service",
              "Service4.getConsultation": "Get a Consultation",
              "Service4.basicPackage": {
                "title": "Basic Package: 1500 PLN",
                "content": "1) Consultation. 2) Negotiations with your employer. 3) Preparation of claims and pre-trial lawsuits. 4) Collection and preparation of the complete document package for court submission.",
                "button": "I WANT THE BASIC PACKAGE"
              },
              "Service4.allInclusivePackage": {
                "title": 'All-Inclusive Package: 3000 PLN',
                "content": "1) Consultation. 2) Negotiations with your employer. 3) Preparation of claims and pre-trial lawsuits. 4) Collection and preparation of the complete document package for court submission. 5) Full support in labor disputes both pre-trial and in court. 6) Case monitoring, correspondence reception, submission of all necessary documents. 7) Contact with the court and the employer. 8) Preparation of documents for financial compensation claims for labor law violations. 9) PESEL number preparation if needed. 10) Trusted profile registration (profil zaufany) if needed. 11) In case of a negative decision due to our fault - full refund.",
                "button": "I WANT THE ALL-INCLUSIVE PACKAGE"
              },
              "Service4.moreInfoService": {
                "title": "Labor Disputes",
                "content": "If you work or have worked in harmful or difficult working conditions, pay attention to possible violations by your employer. Polish employers often sign Umowy zlecenia instead of Umowy o pracę with employees. This is usually done to save money, allowing them to fire employees at any time and not pay compensation in case of health problems. Note that if you work or have worked in a factory, construction, auto repair shop, etc., under an Umowa zlecenia, you have the right to demand an Umowy o pracę contract from your employer. You also have the right to receive substantial financial compensation for labor law violations and harmful working conditions. We will help you get a full social package, prepare claims and complaints both pre-trial and in court. Even if you are fired, you still have the right to compensation from your former employer."
              },
              "Service4.processingTime": {
                "title": "Complaint and Lawsuit Processing Time",
                "content": "The processing time for complaints and lawsuits is individual. If the employer does not want to go to court, the average processing time for pre-trial lawsuits is 6 months. The average processing time for court cases is 10-12 months."
              },
              "Service5.cost": "Cost",
              "Service5.terming": "Processing Time",
              "Service5.learnMore": "Learn More",
              "Service5.orderService": "Order Service",
              "Service5.getConsultation": "Get a Consultation",
              "Service5.basicPackage": {
                "title": "Basic Package: 500 PLN",
                "content": "1) Consultation. 2) Document analysis and missing document checklist. 3) Document package review before submission. 4) Collection and preparation of the complete document package.",
                "button": "I WANT THE BASIC PACKAGE"
              },
              "Service5.allInclusivePackage": {
                "title": 'All-Inclusive Package: 1500 PLN',
                "content": "1) Consultation. 2) Preparation of documents for the replacement of foreign driving licenses with Polish ones. 3) Collection and preparation of the complete document package. 4) Case monitoring, correspondence reception, submission of all necessary documents. 5) Contact with the inspector handling your case. 6) Comprehensive support until the decision is obtained. 7) PESEL number preparation if needed. 8) Trusted profile registration (profil zaufany) if needed. 9) In case of a negative decision due to our fault - full refund.",
                "button": "I WANT THE ALL-INCLUSIVE PACKAGE"
              },
              "Service5.moreInfoService": {
                "title": "Driving License Replacement",
                "content": "If you have a driving license from a non-EU country and plan to stay in Poland for more than six months, you need to exchange your foreign driving license for a Polish one. We will help you quickly and accurately prepare a complete package of documents for a successful exchange."
              },
              "Service5.processingTime": {
                "title": "Driving License Replacement Processing Time",
                "content": "The processing time for the exchange of foreign driving licenses for Polish ones in Gdańsk is on average 3 months."
              },
              "Service6.cost": "Cost",
"Service6.terming": "Processing Time",
"Service6.learnMore": "Learn More",
"Service6.orderService": "Order Service",
"Service6.getConsultation": "Get Consultation",
"Service6.basicPackage": {
  "title": "Price: 0 PLN",
  "content": "When ordering any service, we offer free consultation!",
  "button": "I WANT A CONSULTATION FOR 0 PLN"
},
"Service6.allInclusivePackage": {
  "title": "Price: 350 PLN",
  "content": "If you want to manage your case yourself, and you have the time and experience in document processing, but you are unsure about legal issues, then order a consultation with our lawyer.",
  "button": "I WANT A CONSULTATION FOR 350 PLN"
},
"Service6.moreInfoService": {
  "title": "Consultation",
  "content": "Maybe you want to handle your case yourself and you have the time for it. Therefore, a consultation is most suitable for you. Clarify contentious issues and control your case yourself."
},
"Service6.processingTime": {
  "title": "Consultation Time",
  "content": "On average, a consultation takes about 60 minutes"
},
              "Service7.cost": "Cost",
              "Service7.terming": "Processing Time",
              "Service7.learnMore": "Learn More",
              "Service7.orderService": "Order Service",
              "Service7.getConsultation": "Get a Consultation",
              "Service7.basicPackage": {
                "title": "Basic Package: 500 PLN",
                "content": "1) Consultation. 2) Comprehensive analysis of documents. 3) Resume (CV) and cover letter review. 4) Provision of sample resumes (CV) and cover letters.",
                "button": "I WANT THE BASIC PACKAGE"
              },
              "Service7.allInclusivePackage": {
                "title": 'All-Inclusive Package: 1500 PLN',
                "content": "1) Consultation. 2) Comprehensive analysis of documents. 3) Resume (CV) and cover letter writing and preparation. 4) Provision of sample resumes (CV) and cover letters. 5) Writing a letter of recommendation and reference. 6) Detailed job search instructions. 7) PESEL number preparation if needed. 8) Trusted profile registration (profil zaufany) if needed. 9) In case of a negative decision due to our fault - full refund.",
                "button": "I WANT THE ALL-INCLUSIVE PACKAGE"
              },
              "Service7.moreInfoService": {
                "title": "Resume (CV) Writing",
                "content": "Our team of professional HR specialists will help you prepare a perfect resume (CV) and cover letter, as well as provide detailed job search instructions. With our help, you will significantly increase your chances of finding a job in Poland or another country."
              },
              "Service7.processingTime": {
                "title": "Resume (CV) Writing Processing Time",
                "content": "The processing time for resume (CV) and cover letter preparation in Gdańsk is on average 2 weeks."
              },
              "Service8.cost": "Cost",
              "Service8.terming": "Processing Time",
              "Service8.learnMore": "Learn More",
              "Service8.orderService": "Order Service",
              "Service8.getConsultation": "Get a Consultation",
              "Service8.basicPackage": {
                "title": "Basic Package: 750 PLN",
                "content": "1) Consultation. 2) Comprehensive analysis of documents. 3) Civil document review. 4) Provision of sample civil documents.",
                "button": "I WANT THE BASIC PACKAGE"
              },
              "Service8.allInclusivePackage": {
                "title": 'All-Inclusive Package: 1500 PLN',
                "content": "1) Consultation. 2) Comprehensive analysis of documents. 3) Civil document preparation. 4) Collection and preparation of the complete document package. 5) PESEL number preparation if needed. 6) Trusted profile registration (profil zaufany) if needed. 7) In case of a negative decision due to our fault - full refund.",
                "button": "I WANT THE ALL-INCLUSIVE PACKAGE"
              },
              "Service8.moreInfoService": {
                "title": "Civil Document Preparation",
                "content": "We provide professional assistance in the preparation of civil documents, including applications, petitions, and other necessary documents for various civil procedures in Poland and other countries."
              },
              "Service8.processingTime": {
                "title": "Civil Document Preparation Processing Time",
                "content": "The processing time for the preparation of civil documents in Gdańsk is on average 10 months."          
          },
          pricelistservices: [
            {
              title: "Comprehensive assistance with documents for residence card application",
              points: [
                "Based on employment",
                "Based on business",
                "Based on family residence",
                "Based on marriage with a Polish citizen"
              ],
              price: "From 500 to 1500 PLN"
            },
            {
              title: "Assistance with citizenship application documents",
              points: [],
              price: "From 750 to 1500 PLN (Price until 30.09.2024)"
            },
            {
              title: "Labor disputes: From 'Umowy zlecenia' to 'Umowy o pracę'",
              points: [
                "Achieve transition from 'Umowy zlecenia' to 'Umowy o pracę'",
                "Submit complaints to employer",
                "File lawsuits",
                "Demand compensation for illegal employment"
              ],
              price: "From 2500 to 3500 PLN"
            },
            {
              title: "Preparation of documents for marriage registration",
              points: [],
              price: "From 500 to 1500 PLN"
            },
            {
              title: "Driver's license replacement",
              points: [],
              price: "From 500 to 1500 PLN"
            },
            {
              title: "Legal consultation",
              points: [
                "Consultation duration up to 60 minutes",
                "Online or by phone"
              ],
              price: "From 200 PLN"
            },
            {
              title: "Resume (CV) preparation",
              points: [
                "With cover letter",
                "Without cover letter"
              ],
              price: "From 150 to 250 PLN"
            }
          ],
        }
        }
      },
      pl: {
        translation: {
          "menu.pricelist" : "Cennik",
          "menu.advantages": "Zalety",
          "menu.promotions": "Promocje",
          "menu.services": "Usługi",
          "menu.about": "O nas",
          "menu.contact": "Informacje",
          "servicespromo.0.title": "PROMOCJE",
          "servicespromo.0.points.0": "Karta pobytu za 400 zł. Uzyskaj pakiet \"Podstawowy\" za 400 zł. Aby skorzystać z promocji, podaj naszemu specjaliście ds. obsługi klienta kod promocyjny \"Start24\". Promocja obowiązuje tylko do końca września 2024 roku.",
           "servicespromo.0.points.1": "Karta pobytu za 750 zł. Uzyskaj pakiet \"Wszystko w cenie\" za 750 zł. Aby skorzystać z promocji, podaj naszemu specjaliście ds. obsługi klienta kod promocyjny \"Start24\". Promocja obowiązuje tylko do końca września 2024 roku.",
           "servicespromo.0.points.2": "Dokumenty obywatelstwa za 1500 zł. Pakiet \"Wszystko w cenie\". Aby skorzystać z promocji, podaj naszemu specjaliście ds. obsługi klienta kod promocyjny \"Start24\". Promocja obowiązuje tylko do końca września 2024 roku.",     
   
"pricelistservices.0.title": "Kompleksowa pomoc w przygotowaniu dokumentów do złożenia wniosku o kartę pobytu",
"pricelistservices.0.points.0": "Na podstawie zatrudnienia",
"pricelistservices.0.points.1": "Na podstawie działalności gospodarczej",
"pricelistservices.0.points.2": "Na podstawie pobytu rodzinnego",
"pricelistservices.0.points.3": "Na podstawie małżeństwa z obywatelem Polski",
"pricelistservices.0.price": "Od 500 do 1500 PLN",

"pricelistservices.1.title": "Pomoc w przygotowaniu dokumentów do złożenia wniosku o obywatelstwo",
"pricelistservices.1.price": "Od 750 do 1500 PLN (Cena do 30.09.2024)",

"pricelistservices.2.title": "Spory pracownicze: Od 'Umowy zlecenia' do 'Umowy o pracę'",
"pricelistservices.2.points.0": "Przejście z 'Umowy zlecenia' do 'Umowy o pracę'",
"pricelistservices.2.points.1": "Złożenie skarg do pracodawcy",
"pricelistservices.2.points.2": "Złożenie pozwów",
"pricelistservices.2.points.3": "Żądanie odszkodowania za nielegalne zatrudnienie",
"pricelistservices.2.price": "Od 2500 do 3500 PLN",

"pricelistservices.3.title": "Przygotowanie dokumentów do rejestracji małżeństwa",
"pricelistservices.3.price": "Od 500 do 1500 PLN",

"pricelistservices.4.title": "Wymiana prawa jazdy",
"pricelistservices.4.price": "Od 500 do 1500 PLN",

"pricelistservices.5.title": "Konsultacja prawna",
"pricelistservices.5.points.0": "Czas trwania konsultacji do 60 minut",
"pricelistservices.5.points.1": "Online lub telefonicznie",
"pricelistservices.5.price": "Od 200 PLN",

"pricelistservices.6.title": "Przygotowanie CV",
"pricelistservices.6.points.0": "Z listem motywacyjnym",
"pricelistservices.6.points.1": "Bez listu motywacyjnego",
"pricelistservices.6.price": "Od 150 do 250 PLN",

"consult_button": "Uzyskaj konsultację",

"reason_texts.reason1": "Zapewniamy dostępność cenową! Cena ma znaczenie!",
"reason_texts.reason2": "Jeśli nie oddzwonimy do Ciebie w ciągu 45 minut od wysłania zapytania na stronie, otrzymasz 250 PLN zniżki na zakup usługi.",
"reason_texts.reason3": "1.Płatność po wykonaniu usługi! Nie ryzykujesz niczym. 2.Jeśli nie osiągniesz rezultatu, zwrócimy Ci pieniądze w ciągu 7 dni. Pracujemy na podstawie umowy!",
          "modal.feedbackButton": "Zostaw zapytanie", 
          feedbackForm: {
            title: "Zostaw zapytanie",
            name: "Twoje imię",
            phone: "Numer telefonu komórkowego",
            submit: "Zatwierdź",
            cancel: "Anuluj"
          },
          "messageAlert": "Dziękujemy za zgłoszenie! Nasi specjaliści już walczą o to, kto pierwszy do ciebie zadzwoni:)",
          "actionToCall": "Zadzwoń",
          "cookieMessage": "Używamy pliki cookie! Ta strona używa niezbędnych plików cookie, aby zapewnić jej prawidłowe działanie i śledzących plików cookie, aby zrozumieć, w jaki sposób wchodzisz z nią w interakcję. Te ostatnie zostaną ustawione dopiero po wyrażeniu zgody.",
          "allowMeToChoose": "Pozwól mi wybrać",
          "acceptAll": "Akceptuj wszystkie",
          "decline": "Odrzuć",
          "cookieSettings": "Ustawienia plików cookie",
          "cookieUsageDescription": "Używamy plików cookie, aby zapewnić podstawowe funkcje strony internetowej i poprawić Twoje doświadczenia online. Możesz wybrać wyrazić zgodę/zrezygnować dla każdej kategorii w dowolnym momencie. Więcej szczegółów dotyczących plików cookie i innych danych wrażliwych.",
          "essentialCookies": "Niezbędne pliki cookie",
          "analyticsCookies": "Pliki cookie wydajności i analityki",
          "marketingCookies": "Marketingowe oraz targetowe pliki cookies",
          "acceptSelected": "Akceptuj wybrane",
          "necessaryCookies": "Niezbędne pliki cookie",
          footer: {
            contacts: "Kontakty",
            info: "Informacje",
            services: "Usługi",
            address: "80-369 Gdańsk, al. Rzeczypospolitej 4/152",
            company: "Sp. z o.o. \"Ominor\", NIP: 5842805362",
            timework: "Codziennie od 9:00 do 17:00, sobota-niedziela - nieczynne",
            privacyPolicy: "Polityka prywatności",
            question: "Zadaj pytanie za darmo",
            rights: "Wszelkie prawa zastrzeżone."
          },
          modal: {
            title: "Wybierz dogodną metodę kontaktu",
            call: "Zadzwoń:"
          },
          "header": {
            "slogan": " Legalizacja w Polsce w przystępnej cenie",
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
              "temporaryResidenceCard": "Karta czasowego pobytu",
              "permanentResidenceCard": "Karta stałego pobytu",
              "marriageAgreement": "Małżeństwo",
              "businessVisa": "Spory pracownicze. Z \"Umowy zlecenia\" do \"Umowy o pracę\"",
              "familyReunion": "Wymiana prawa jazdy",
              "konsultation": "Konsultacja",
              "resume": "Przygotowanie CV",
              "civilDocs": "Dokumenty do obywatelstwa",
              "Service1.cost": "Koszt",
              "Service1.terming": "Czas oczekiwania na kartę",
              "Service1.learnMore": "Dowiedz się więcej o karcie",
              "Service1.orderService": "Zamów usługę",
              "Service1.getConsultation": "Uzyskaj konsultację",
              "servicesTitle": "Świadczymy następujące usługi w Gdańsku",
              "Service1.basicPackage": {
                "title": "Pakiet podstawowy: 500 zł",
                "content": "1) Konsultacja. 2) Analiza aktualnych dokumentów i sporządzenie listy brakujących. 3) Sprawdzenie pakietu dokumentów przed złożeniem. 4) Zbieranie i przygotowanie pełnego pakietu dokumentów. 5) Wypełnianie wszystkich formularzy. 6) Rejestracja na osobiste złożenie wniosku.",
                "button": "CHCĘ PAKIET PODSTAWOWY"
              },
              "Service1.allInclusivePackage": {
                "title": 'Pakiet "Wszystko w cenie": 1500 zł',
                "content": "1) Konsultacja. 2) Pomoc w przygotowaniu dokumentów od pracodawcy. 3) Zbieranie i przygotowanie pełnego pakietu dokumentów. 4) Wypełnianie wszystkich formularzy. 5) Rejestracja na osobiste złożenie wniosku. 6) Uzyskanie pieczęci w paszporcie. 7) Oddanie odcisków palców. 8) Monitorowanie sprawy, odbieranie korespondencji, składanie wszystkich niezbędnych dokumentów. 9) Kontakt z inspektorem prowadzącym twoją sprawę. 10) Kompleksowe wsparcie w twojej sprawie aż do uzyskania decyzji. 11) Przygotowanie numeru PESEL w razie potrzeby. 12) Rejestracja zaufanego profilu (profil zaufany) w razie potrzeby. 13) W przypadku negatywnej decyzji z naszej winy - pomoc w przygotowaniu dokumentów na odwołanie i pełny zwrot kosztów.",
                "button": "CHCĘ PAKIET \"WSZYSTKO W CENIE\""
              },
              "Service1.moreInfoService": {
                "title": "Karta czasowego pobytu",
                "content": "Karta czasowego pobytu lub zezwolenie na pobyt to dokument, który potwierdza tożsamość cudzoziemca podczas jego pobytu w Polsce, a także daje prawo do wielokrotnego przekraczania granicy bez uzyskania wizy, legalnej pracy, zakupu nieruchomości i ruchomości w Polsce."
              },
              "Service1.processingTime": {
                "title": "Czas oczekiwania",
                "content": "Czas oczekiwania na kartę pobytu w Gdańsku wynosi średnio 7 miesięcy."
              },
              "Service2.cost": "Koszt",
              "Service2.terming": "Czas oczekiwania na kartę",
              "Service2.learnMore": "Dowiedz się więcej o karcie",
              "Service2.orderService": "Zamów usługę",
              "Service2.getConsultation": "Uzyskaj konsultację",
              "Service2.basicPackage": {
                "title": "Pakiet podstawowy: 500 zł",
                "content": "1) Konsultacja. 2) Analiza aktualnych dokumentów i sporządzenie listy brakujących. 3) Sprawdzenie pakietu dokumentów przed złożeniem. 4) Zbieranie i przygotowanie pełnego pakietu dokumentów. 5) Wypełnianie wszystkich formularzy. 6) Rejestracja na osobiste złożenie wniosku.",
                "button": "CHCĘ PAKIET PODSTAWOWY"
              },
              "Service2.allInclusivePackage": {
                "title": 'Pakiet "Wszystko w cenie": 1500 zł',
                "content": "1) Konsultacja. 2) Pomoc w przygotowaniu dokumentów od pracodawcy. 3) Zbieranie i przygotowanie pełnego pakietu dokumentów. 4) Wypełnianie wszystkich formularzy. 5) Rejestracja na osobiste złożenie wniosku. 6) Uzyskanie pieczęci w paszporcie. 7) Oddanie odcisków palców. 8) Monitorowanie sprawy, odbieranie korespondencji, składanie wszystkich niezbędnych dokumentów. 9) Kontakt z inspektorem prowadzącym twoją sprawę. 10) Kompleksowe wsparcie w twojej sprawie aż do uzyskania decyzji. 11) Przygotowanie numeru PESEL w razie potrzeby. 12) Rejestracja zaufanego profilu (profil zaufany) w razie potrzeby. 13) W przypadku negatywnej decyzji z naszej winy - pomoc w przygotowaniu dokumentów na odwołanie i pełny zwrot kosztów.",
                "button": "CHCĘ PAKIET \"WSZYSTKO W CENIE\""
              },
              "Service2.moreInfoService": {
                "title": "Karta czasowego pobytu",
                "content": "Karta czasowego pobytu lub zezwolenie na pobyt to dokument, który potwierdza tożsamość cudzoziemca podczas jego pobytu w Polsce, a także daje prawo do wielokrotnego przekraczania granicy bez uzyskania wizy, legalnej pracy, zakupu nieruchomości i ruchomości w Polsce."
              },
              "Service2.processingTime": {
                "title": "Czas oczekiwania",
                "content": "Czas oczekiwania na kartę pobytu w Gdańsku wynosi średnio 7 miesięcy."
              },
              "Service3.cost": "Koszt",
              "Service3.terming": "Czas oczekiwania",
              "Service3.learnMore": "Dowiedz się więcej",
              "Service3.orderService": "Zamów usługę",
              "Service3.getConsultation": "Uzyskaj konsultację",
              "Service3.basicPackage": {
                "title": "Pakiet podstawowy: 500 zł",
                "content": "1) Konsultacja. 2) Analiza aktualnych dokumentów i sporządzenie listy brakujących. 3) Sprawdzenie pakietu dokumentów przed złożeniem. 4) Zbieranie i przygotowanie pełnego pakietu dokumentów.",
                "button": "CHCĘ PAKIET PODSTAWOWY"
              },
              "Service3.allInclusivePackage": {
                "title": 'Pakiet "Wszystko w cenie": 1500 zł',
                "content": "1) Konsultacja. 2) Pomoc w przygotowaniu dokumentów. 3) Pomoc w organizacji ceremonii ślubnej online. 4) Przygotowanie dokumentów do zawarcia małżeństwa w USA, będąc fizycznie w Polsce. 5) Pełne wsparcie przy zawarciu małżeństwa na terenie Polski. 6) Wypełnianie wszystkich formularzy. 7) Monitorowanie sprawy, odbieranie korespondencji, składanie wszystkich niezbędnych dokumentów. 8) Kontakt z instytucją wydającą zezwolenie na zawarcie małżeństwa. 9) Kompleksowe wsparcie w twojej sprawie aż do uzyskania decyzji o zawarciu małżeństwa. 10) Przygotowanie numeru PESEL w razie potrzeby. 11) Rejestracja zaufanego profilu (profil zaufany) w razie potrzeby. 12) W przypadku negatywnej decyzji z naszej winy - pełny zwrot kosztów.",
                "button": "CHCĘ PAKIET \"WSZYSTKO W CENIE\""
              },
              "Service3.moreInfoService": {
                "title": "Małżeństwo",
                "content": "Zawarcie małżeństwa w Polsce nie jest tak proste, jak się wydaje. Trudność polega na tym, że rozpatrywanie dokumentów może trwać od 10 do 12 miesięcy. Pomożemy maksymalnie szybko przygotować wszystkie dokumenty i uzyskać zezwolenie na zawarcie małżeństwa w specjalnych instkontrolnych placówkach."
                              },
                              "Service3.processingTime": {
                                "title": "Czas oczekiwania na dokumenty do zawarcia małżeństwa",
                                "content": "Czas oczekiwania na dokumenty do zawarcia małżeństwa w Gdańsku wynosi średnio 7 miesięcy. Przy zawarciu małżeństwa w USA, będąc fizycznie w Polsce, czas przygotowania dokumentów wynosi średnio 2 miesiące."
                              },
                              "Service4.cost": "Koszt",
                              "Service4.terming": "Czas oczekiwania",
                              "Service4.learnMore": "Dowiedz się więcej",
                              "Service4.orderService": "Zamów usługę",
                              "Service4.getConsultation": "Uzyskaj konsultację",
                              "Service4.basicPackage": {
                                "title": "Pakiet podstawowy: 1500 zł",
                                "content": "1) Konsultacja. 2) Prowadzenie negocjacji z twoim pracodawcą. 3) Sporządzanie roszczeń i wniosków przedsądowych. 4) Zbieranie i przygotowanie pełnego pakietu dokumentów do sądu.",
                                "button": "CHCĘ PAKIET PODSTAWOWY"
                              },
                              "Service4.allInclusivePackage": {
                                "title": 'Pakiet "Wszystko w cenie": 3000 zł',
                                "content": "1) Konsultacja. 2) Prowadzenie negocjacji z twoim pracodawcą. 3) Sporządzanie roszczeń i wniosków przedsądowych. 4) Zbieranie i przygotowanie pełnego pakietu dokumentów do sądu. 5) Pełne wsparcie w sporach pracowniczych zarówno w postępowaniu przedsądowym, jak i sądowym. 6) Monitorowanie sprawy, odbieranie korespondencji, składanie wszystkich niezbędnych dokumentów. 7) Kontakt z sądem i pracodawcą. 8) Przygotowanie dokumentów do dochodzenia odszkodowania za naruszenie praw pracowniczych. 9) Przygotowanie numeru PESEL w razie potrzeby. 10) Rejestracja zaufanego profilu (profil zaufany) w razie potrzeby. 11) W przypadku negatywnej decyzji z naszej winy - pełny zwrot kosztów.",
                                "button": "CHCĘ PAKIET \"WSZYSTKO W CENIE\""
                              },
                              "Service4.moreInfoService": {
                                "title": "Spory pracownicze",
                                "content": "Jeśli pracujesz lub skończyłeś pracę w zakładach z szkodliwymi lub ciężkimi warunkami pracy, zwróć uwagę na możliwe naruszenia ze strony pracodawcy. Często polscy pracodawcy zawierają z pracownikami Umowy zlecenia zamiast Umowy o pracę. Zazwyczaj robi się to, aby oszczędzać swoje środki, zwolnić pracownika w dowolnym momencie i nie wypłacać żadnych odszkodowań w przypadku problemów zdrowotnych. Zwróć uwagę, że jeśli pracujesz lub pracowałeś wcześniej w fabryce, na budowie, w warsztacie samochodowym itp. na podstawie Umowy zlecenia, masz prawo żądać od pracodawcy zawarcia Umowy o pracę. Ponadto masz prawo do znacznego odszkodowania za naruszenie praw pracowniczych i stworzenie szkodliwych warunków pracy. Pomożemy ci uzyskać pełny pakiet socjalny, przygotować pozwy i skargi zarówno w postępowaniu przedsądowym, jak i sądowym. Nawet jeśli zostałeś zwolniony, nadal masz prawo do odszkodowania od swojego byłego pracodawcy."
                              },
                              "Service4.processingTime": {
                                "title": "Czas rozpatrzenia skarg i pozwów sądowych",
                                "content": "Czas rozpatrzenia skarg i pozwów sądowych jest indywidualny. Jeśli pracodawca nie chce doprowadzić sprawy do sądu, można rozwiązać spór w ciągu miesiąca."
                              },
                                "Service5.cost": "Koszt",
                                "Service5.terming": "Czas oczekiwania",
                                "Service5.learnMore": "Dowiedz się więcej",
                                "Service5.orderService": "Zamów usługę",
                                "Service5.getConsultation": "Uzyskaj konsultację",
                                "Service5.basicPackage": {
                                  "title": "Pakiet podstawowy: 500 zł",
                                  "content": "1) Konsultacja. 2) Analiza aktualnych dokumentów i sporządzenie listy brakujących. 3) Sprawdzenie pakietu dokumentów przed złożeniem. 4) Zbieranie i przygotowanie pełnego pakietu dokumentów.",
                                  "button": "CHCĘ PAKIET PODSTAWOWY"
                                },
                                "Service5.allInclusivePackage": {
                                  "title": "Pakiet \"Wszystko w cenie\": 1500 zł",
                                  "content": "1) Konsultacja. 2) Pomoc w przygotowaniu dokumentów. 3) Zbieranie i przygotowanie pełnego pakietu dokumentów. 4) Wypełnianie wszystkich formularzy. 5) Rejestracja na osobiste złożenie dokumentów. Monitorowanie sprawy, odbieranie korespondencji, składanie wszystkich niezbędnych dokumentów. 6) Kontakt z instytucjami. 7) Kompleksowe wsparcie w Twojej sprawie aż do uzyskania decyzji. 8) Przygotowanie numeru PESEL w razie potrzeby. 9) Rejestracja zaufanego profilu (profil zaufany) w razie potrzeby. 10) W przypadku negatywnej decyzji z naszej winy - pomoc w przygotowaniu dokumentów na odwołanie i pełny zwrot kosztów.",
                                  "button": "CHCĘ PAKIET \"WSZYSTKO W CENIE\""
                                },
                                "Service5.moreInfoService": {
                                  "title": "Wymiana prawa jazdy na polskie",
                                  "content": "Po pół roku pobytu w Polsce należy wymienić prawo jazdy swojego kraju na polskie. Oczywiste jest, że jeśli nie chcesz wymieniać prawa jazdy, nawet jeśli przebywasz w Polsce przez długi czas, grozi Ci kara administracyjna."
                                },
                                "Service5.processingTime": {
                                  "title": "Czas trwania procedury administracyjnej",
                                  "content": "Wymiana prawa jazdy trwa średnio około 2 miesięcy."
                                },
                                "Service6.cost": "Koszt",
                                "Service6.terming": "Czas oczekiwania",
                                "Service6.learnMore": "Dowiedz się więcej",
                                "Service6.orderService": "Zamów usługę",
                                "Service6.getConsultation": "Uzyskaj konsultację",
                                "Service6.basicPackage": {
                                  "title": "Cena: 0 zł",
                                  "content": "Przy zamówieniu dowolnej usługi, konsultacja jest bezpłatna!",
                                  "button": "CHCĘ KONSULTACJĘ ZA 0 zł"
                                },
                                "Service6.allInclusivePackage": {
                                  "title": "Cena: 350 zł",
                                  "content": "Jeśli chcesz samodzielnie monitorować swoją sprawę, a także masz czas i doświadczenie w przygotowywaniu dokumentów, ale masz wątpliwości co do kwestii prawnych, zamów konsultację u naszego prawnika.",
                                  "button": "CHCĘ KONSULTACJĘ ZA 350 zł"
                                },
                                "Service6.moreInfoService": {
                                  "title": "Konsultacja",
                                  "content": "Może chcesz samodzielnie zajmować się swoją sprawą i masz na to czas. W takim przypadku konsultacja jest dla Ciebie najbardziej odpowiednia. Wyjaśnij wątpliwe kwestie i sam monitoruj swoją sprawę."
                                },
                                "Service6.processingTime": {
                                  "title": "Czas konsultacji",
                                  "content": "Średnio konsultacja trwa około 60 minut."
                                },
                                "Service7.cost": "Koszt",
                                "Service7.terming": "Czas oczekiwania",
                                "Service7.learnMore": "Dowiedz się więcej",
                                "Service7.orderService": "Zamów usługę",
                                "Service7.getConsultation": "Uzyskaj konsultację",
                                "Service7.basicPackage": {
                                  "title": "Cena: 250 zł",
                                  "content": "Pisanie CV z listem motywacyjnym",
                                  "button": "ZAMÓWIĆ"
                                },
                                "Service7.allInclusivePackage": {
                                  "title": "Cena: 150 zł",
                                  "content": "Pisanie CV bez listu motywacyjnego",
                                  "button": "ZAMÓWIĆ"
                                },
                                "Service7.moreInfoService": {
                                  "title": "Sporządzenie CV (CV)",
                                  "content": "Aby Twoja kandydatura wyglądała atrakcyjnie, należy odpowiednio sporządzić CV. To znacznie zwiększy szanse na zaakceptowanie Cię jako wykwalifikowanego pracownika dla firmy."
                                },
                                "Service7.processingTime": {
                                  "title": "Czas oczekiwania",
                                  "content": "1-2 dni"
                                },
                                "Service8.cost": "Koszt",
                                "Service8.terming": "Czas oczekiwania",
                                "Service8.learnMore": "Dowiedz się więcej",
                                "Service8.orderService": "Zamów usługę",
                                "Service8.getConsultation": "Uzyskaj konsultację",
                                "Service8.basicPackage": {
                                  "title": "Pakiet podstawowy 750 zł",
                                  "content": "1) Konsultacja. 2) Analiza aktualnych dokumentów i sporządzenie listy brakujących. 3) Sprawdzenie pakietu dokumentów przed złożeniem. 4) Zbieranie i przygotowanie pełnego pakietu dokumentów. 5) Wypełnianie wszystkich formularzy.",
                                  "button": "ZAMÓWIĆ"
                                },
                                "Service8.allInclusivePackage": {
                                  "title": "Pakiet \"Wszystko w cenie\": 1500 zł",
                                  "content": "1) Konsultacja. 2) Pomoc w przygotowaniu dokumentów. 3) Zbieranie i przygotowanie pełnego pakietu dokumentów. 4) Wypełnianie wszystkich formularzy. 5) Monitorowanie sprawy, odbieranie korespondencji, składanie wszystkich niezbędnych dokumentów. 6) Kompleksowe wsparcie w Twojej sprawie aż do uzyskania decyzji. 7) W przypadku negatywnej decyzji z naszej winy - pomoc w przygotowaniu dokumentów na odwołanie i pełny zwrot kosztów.",
                                  "button": "ZAMÓWIĆ"
                                },
                                "Service8.moreInfoService": {
                                  "title": "Paszport obywatela Polski",
                                  "content": "Obywatelstwo Polski daje prawo do nieograniczonego pobytu, legalnego zatrudnienia, uzyskiwania usług medycznych oraz gwarantowanej ochrony przez państwo. Jednym z wymagań do uzyskania paszportu jest zdanie specjalnego testu sprawdzającego znajomość języka, a także kultury i historii kraju."
                                },
                                "Service8.processingTime": {
                                  "title": "Czas oczekiwania",
                                  "content": "Średnio oczekiwanie na obywatelstwo wynosi 10 miesięcy."
                                }  
            }
        }
      },
      ua: {
        translation: {
          "menu.pricelist" : "Прайс-лист",
          "menu.advantages": "Переваги",
          "menu.promotions": "Акції",
          "menu.services": "Послуги",
          "menu.about": "Про нас",
          "menu.contact": "Інформація",

          "servicespromo.0.title": "АКЦІЇ",
          "servicespromo.0.points.0": "Карта побиту за 400 зл. Встигніть придбати пакет \"Базовий\" за 400 зл. Щоб скористатися акцією, назвіть нашому спеціалісту по роботі з клієнтами промокод \"Старт24\". Акція діє тільки до кінця вересня 2024 року.",
          "servicespromo.0.points.1": "Карта побиту за 750 зл. Встигніть придбати пакет \"Все включено\" за 750 зл. Щоб скористатися акцією, назвіть нашому спеціалісту по роботі з клієнтами промокод \"Старт24\". Акція діє тільки до кінця вересня 2024 року.",
          "servicespromo.0.points.2": "Документи на громадянство за 1500 зл. Пакет \"Все включено\". Щоб скористатися акцією, назвіть нашому спеціалісту по роботі з клієнтами промокод \"Старт24\". Акція діє тільки до кінця вересня 2024 року.",
     
          "pricelistservices.0.title": "Комплексна допомога в підготовці документів для подачі на карту проживання",
"pricelistservices.0.points.0": "На основі зайнятості",
"pricelistservices.0.points.1": "На основі бізнесу",
"pricelistservices.0.points.2": "На основі сімейного проживання",
"pricelistservices.0.points.3": "На основі шлюбу з громадянином Польщі",
"pricelistservices.0.price": "Від 500 до 1500 PLN",

"pricelistservices.1.title": "Допомога в підготовці документів для подачі на громадянство",
"pricelistservices.1.price": "Від 750 до 1500 PLN (Ціна до 30.09.2024)",

"pricelistservices.2.title": "Трудові спори: Від 'Umowy zlecenia' до 'Umowy o pracę'",
"pricelistservices.2.points.0": "Перехід від 'Umowy zlecenia' до 'Umowy o pracę'",
"pricelistservices.2.points.1": "Подати скарги роботодавцю",
"pricelistservices.2.points.2": "Подати позови",
"pricelistservices.2.points.3": "Вимагати компенсацію за незаконне працевлаштування",
"pricelistservices.2.price": "Від 2500 до 3500 PLN",

"pricelistservices.3.title": "Підготовка документів для реєстрації шлюбу",
"pricelistservices.3.price": "Від 500 до 1500 PLN",

"pricelistservices.4.title": "Заміна водійського посвідчення",
"pricelistservices.4.price": "Від 500 до 1500 PLN",

"pricelistservices.5.title": "Юридична консультація",
"pricelistservices.5.points.0": "Тривалість консультації до 60 хвилин",
"pricelistservices.5.points.1": "Онлайн або по телефону",
"pricelistservices.5.price": "Від 200 PLN",

"pricelistservices.6.title": "Підготовка резюме (CV)",
"pricelistservices.6.points.0": "З супровідним листом",
"pricelistservices.6.points.1": "Без супровідного листа",
"pricelistservices.6.price": "Від 150 до 250 PLN",

"consult_button": "Отримати консультацію",

"reason_texts.reason1": "Ми забезпечуємо доступність цін! Ціна — це ключ!",
"reason_texts.reason2": "Якщо ми не передзвонимо вам протягом 45 хвилин після відправки запиту на сайті, ми надамо вам знижку 250 PLN на покупку послуги.",
"reason_texts.reason3": "1. Оплата після виконання послуги! Ви нічим не ризикуєте. 2. Якщо ви не досягнете результату, ми повернемо ваші гроші протягом 7 днів. Ми працюємо за договором!",

          "modal.feedbackButton": "Залишити запит", 
          feedbackForm: {
            title: "Залишити запит",
            name: "Ваше ім'я",
            phone: "Мобільний номер",
            submit: "Відправити",
            cancel: "Скасувати"
          },
          "messageAlert": "Дякуємо за запит! Наші спеціалісти вже змагаються за те, хто швидше до вас зателефонує:)",
          "actionToCall": "Зателефонувати",
          "cookieMessage": "Ми використовуємо файли cookie! Цей сайт використовує необхідні файли cookie для забезпечення його правильної роботи і файли cookie для відстеження, щоб зрозуміти, як ви взаємодієте з ним. Останні будуть встановлені лише після згоди.",
          "allowMeToChoose": "Дозвольте мені вибрати",
          "acceptAll": "Прийняти всі",
          "decline": "Відхилити",
          "cookieSettings": "Налаштування файлів cookie",
          "cookieUsageDescription": "Ми використовуємо файли cookie, щоб забезпечити основні функції веб-сайту і покращити ваш онлайн-досвід. Ви можете вибрати для кожної категорії, дати згоду або відмовитися в будь-який час. Докладніше про файли cookie та інші конфіденційні дані.",
          "essentialCookies": "Необхідні файли cookie",
          "analyticsCookies": "Файли cookie продуктивності та аналітики",
          "marketingCookies": "Маркетингові та таргетингові файли cookie",
          "acceptSelected": "Прийняти вибрані",
          "necessaryCookies": "Необхідні файли cookie",
         
          footer: {
            contacts: "Контакти",
            info: "Інформація",
            services: "Послуги",
            address: "80-369 Gdańsk, al. Rzeczypospolitej 4/152",
            company: "Sp. z o.o. \"Ominor\", NIP: 5842805362",
            timework: "Щодня з 9:00 до 17:00, сб-нд вихідний",
            privacyPolicy: "Політика конфіденційності",
            question: "Задати питання безкоштовно",
            rights: "Всі права захищені."
          },
          modal: {
            title: "Виберіть зручний спосіб зв'язку",
            call: "Подзвонити:"
          },
          "header": {
            "slogan": "Легалізація в Польщі за доступною ціною",
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
           "temporaryResidenceCard": "Карта тимчасового перебування (Karta czasowego pobytu)",
            "permanentResidenceCard": "Карта постійного перебування (Karta stałego pobytu)",
            "marriageAgreement": "Укладення шлюбу (Małżeństwo)",
            "businessVisa": "Трудові суперечки. З \"Umowy zlecenia\" в \"Umowy o pracę\"",
            "familyReunion": "Заміна водійських прав",
            "konsultation": "Консультація",
            "resume": "Складання резюме (CV)",
            "civilDocs": "Документи на громадянство",
          
            "Service1.cost": "Вартість",
            "Service1.terming": "Термін отримання карти",
            "Service1.learnMore": "Дізнатися більше про карту",
            "Service1.orderService": "Замовити послугу",
            "Service1.getConsultation": "Отримати консультацію",
            "servicesTitle": "Ми надаємо наступні послуги в Гданську",
            "Service1.basicPackage": {
              "title": "Базовий пакет: 500 зл",
              "content": "1) Консультація. 2) Аналіз актуальних документів і складання списку відсутніх. 3) Перевірка пакету документів перед подачею. 4) Збір і підготовка повного пакету документів. 5) Заповнення всіх анкет. 6) Реєстрація на особисту подачу.",
              "button": "ХОЧУ БАЗОВИЙ ПАКЕТ"
            },
            "Service1.allInclusivePackage": {
              "title": 'Пакет "Все включено": 1500 зл',
              "content": "1) Консультація. 2) Допомога у підготовці документів від роботодавця. 3) Збір і підготовка повного пакету документів. 4) Заповнення всіх анкет. 5) Реєстрація на особисту подачу. 6) Отримання штампу в паспорт. 7) Здача відбитків пальців. 8) Контроль справи, отримання кореспонденції, здача всіх необхідних документів. 9) Контакт з інспектором, який веде вашу справу. 10) Комплексний супровід вашої справи до отримання рішення. 11) Підготовка номера PESEL за необхідністю. 12) Реєстрація довіреного профілю (profil zaufany) за необхідністю. 13) У разі негативного рішення з нашої вини - допомога у підготовці документів на апеляцію та повне повернення коштів.",
              "button": "ХОЧУ ПАКЕТ \"ВСЕ ВКЛЮЧЕНО\""
            },
            "Service1.moreInfoService": {
              "title": "Карта тимчасового перебування",
              "content": "Карта тимчасового перебування або вид на проживання - це документ, який підтверджує особу іноземця під час його перебування в Польщі, а також дає право багаторазово перетинати кордон без отримання візи, офіційно працювати, купувати рухоме та нерухоме майно в Польщі."
            },
            "Service1.processingTime": {
              "title": "Термін отримання",
              "content": "Термін отримання карти перебування в Гданську складає в середньому 7 місяців."
            },
            "Service2.cost": "Вартість",
            "Service2.terming": "Термін отримання карти",
            "Service2.learnMore": "Дізнатися більше про карту",
            "Service2.orderService": "Замовити послугу",
            "Service2.getConsultation": "Отримати консультацію",
            "Service2.basicPackage": {
              "title": "Базовий пакет: 500 зл",
              "content": "1) Консультація. 2) Аналіз актуальних документів і складання списку відсутніх. 3) Перевірка пакету документів перед подачею. 4) Збір і підготовка повного пакету документів. 5) Заповнення всіх анкет. 6) Реєстрація на особисту подачу.",
              "button": "ХОЧУ БАЗОВИЙ ПАКЕТ"
            },
            "Service2.allInclusivePackage": {
              "title": 'Пакет "Все включено": 1500 зл',
              "content": "1) Консультація. 2) Допомога у підготовці документів від роботодавця. 3) Збір і підготовка повного пакету документів. 4) Заповнення всіх анкет. 5) Реєстрація на особисту подачу. 6) Отримання штампу в паспорт. 7) Здача відбитків пальців. 8) Контроль справи, отримання кореспонденції, здача всіх необхідних документів. 9) Контакт з інспектором, який веде вашу справу. 10) Комплексний супровід вашої справи до отримання рішення. 11) Підготовка номера PESEL за необхідністю. 12) Реєстрація довіреного профілю (profil zaufany) за необхідністю. 13) У разі негативного рішення з нашої вини - допомога у підготовці документів на апеляцію та повне повернення коштів.",
              "button": "ХОЧУ ПАКЕТ \"ВСЕ ВКЛЮЧЕНО\""
            },
            "Service2.moreInfoService": {
              "title": "Карта тимчасового перебування",
              "content": "Карта тимчасового перебування або вид на проживання - це документ, який підтверджує особу іноземця під час його перебування в Польщі, а також дає право багаторазово перетинати кордон без отримання візи, офіційно працювати, купувати рухоме та нерухоме майно в Польщі."
            },
            "Service2.processingTime": {
              "title": "Термін отримання",
              "content": "Термін отримання карти перебування в Гданську складає в середньому 7 місяців."
            },
            "Service3.cost": "Вартість",
            "Service3.terming": "Час очікування",
            "Service3.learnMore": "Дізнатися більше",
            "Service3.orderService": "Замовити послугу",
            "Service3.getConsultation": "Отримати консультацію",
            "Service3.basicPackage": {
              "title": "Базовий пакет: 500 зл",
              "content": "1) Консультація. 2) Аналіз актуальних документів і складання списку відсутніх. 3) Перевірка пакету документів перед подачею. 4) Збір і підготовка повного пакету документів.",
              "button": "ХОЧУ БАЗОВИЙ ПАКЕТ"
            },
            "Service3.allInclusivePackage": {
              "title": 'Пакет "Все включено": 1500 зл',
              "content": "1) Консультація. 2) Допомога у підготовці документів. 3) Допомога в організації церемонії одруження онлайн. 4) Підготовка документів для укладення шлюбу в США, фізично перебуваючи в Польщі. 5) Повний супровід для укладення шлюбу на території Польщі. 6) Заповнення всіх анкет. 7) Контроль справи, отримання кореспонденції, здача всіх необхідних документів. 8) Контакт з установою, яка видає дозвіл на укладення шлюбу. 9) Комплексний супровід вашої справи до отримання рішення на укладення шлюбу. 10) Підготовка номера PESEL за необхідністю. 11) Реєстрація довіреного профілю (profil zaufany) за необхідністю. 12) У разі негативного рішення з нашої вини - повне повернення коштів.",
              "button": "ХОЧУ ПАКЕТ \"ВСЕ ВКЛЮЧЕНО\""
            },
            "Service3.moreInfoService": {
              "title": "Укладення шлюбу",
              "content": "Укласти шлюб у Польщі не так просто, як здається. Складність полягає в тому, що розгляд документів може тривати до 10-12 місяців. Ми допоможемо максимально швидко оформити всі документи та отримати дозвіл на укладення шлюбу в спеціальних відомчих установах."
            },
              "Service3.processingTime": {
                "title": "Термін отримання документів для одруження",
                "content": "Термін отримання документів для укладення шлюбу в Гданську складає в середньому 7 місяців. При укладенні шлюбу в США, фізично перебуваючи в Польщі, терміни підготовки документів в середньому складають 2 місяці."
              },
              "Service4.cost": "Вартість",
              "Service4.terming": "Час очікування",
              "Service4.learnMore": "Дізнатися більше",
              "Service4.orderService": "Замовити послугу",
              "Service4.getConsultation": "Отримати консультацію",
              "Service4.basicPackage": {
                "title": "Базовий пакет: 1500 зл",
                "content": "1) Консультація. 2) Ведення переговорів з вашим роботодавцем. 3) Складання претензій і передсудових позовів. 4) Збір і підготовка повного пакету документів для подання до суду.",
                "button": "ХОЧУ БАЗОВИЙ ПАКЕТ"
              },
              "Service4.allInclusivePackage": {
                "title": 'Пакет "Все включено": 3000 зл',
                "content": "1) Консультація. 2) Ведення переговорів з вашим роботодавцем. 3) Складання претензій і передсудових позовів. 4) Збір і підготовка повного пакету документів для подання до суду. 5) Повний супровід по трудових спорах як в процесі досудового, так і судового розгляду. 6) Контроль справи, отримання кореспонденції, здача всіх необхідних документів. 7) Контакт з судом і роботодавцем. 8) Підготовка документів на стягнення грошової компенсації за порушення трудових прав. 9) Підготовка номера PESEL за необхідністю. 10) Реєстрація довіреного профілю (profil zaufany) за необхідністю. 11) У разі негативного рішення з нашої вини - повне повернення коштів.",
                "button": "ХОЧУ ПАКЕТ \"ВСЕ ВКЛЮЧЕНО\""
              },
              "Service4.moreInfoService": {
                "title": "Трудові спори",
                "content": "Якщо ви працюєте або закінчили роботу на підприємствах з шкідливими або важкими умовами праці, зверніть увагу на можливі порушення з боку роботодавця. Часто польські роботодавці укладають з працівниками Umowy zlecenia, а не Umowy o pracę. Зазвичай це робиться для того, щоб заощадити свої кошти, щоб можна було звільнити співробітника в будь-який момент і не виплачувати ніяких компенсацій у разі проблем зі здоров'ям. Зверніть увагу на те, що якщо ви працюєте або працювали раніше на заводі, на будівництві, в автосервісі і т.д. по Umowe zlecenia, то ви маєте право вимагати від свого роботодавця укласти договір Umowy o pracę. Крім того, ви маєте право отримати значну грошову компенсацію за порушення трудових прав і за створення шкідливих умов праці. Ми допоможемо вам отримати повний соціальний пакет, допоможемо підготувати позови і скарги як у досудовому розгляді, так і в судовому розгляді. Навіть якщо ви звільнені, ви все одно маєте право на компенсацію з боку вашого колишнього роботодавця."
              },
              "Service4.processingTime": {
                "title": "Термін розгляду скарг і судових позовів",
                "content": "Термін розгляду скарг і судових позовів індивідуальний. Якщо роботодавець не хоче доводити справи до суду, то можна врегулювати спір протягом місяця."
              },
                "Service5.cost": "Вартість",
                "Service5.terming": "Час очікування",
                "Service5.learnMore": "Дізнатися більше",
                "Service5.orderService": "Замовити послугу",
                "Service5.getConsultation": "Отримати консультацію",
                "Service5.basicPackage": {
                  "title": "Базовий пакет: 500 зл",
                  "content": "1) Консультація. 2) Аналіз актуальних документів та складання списку відсутніх. 3) Перевірка пакета документів перед подачею. 4) Збір та підготовка повного пакета документів.",
                  "button": "ХОЧУ БАЗОВИЙ ПАКЕТ"
                },
                "Service5.allInclusivePackage": {
                  "title": 'Пакет "Все включено": 1500 зл',
                  "content": "1) Консультація. 2) Допомога в підготовці документів. 3) Збір та підготовка повного пакета документів. 4) Заповнення всіх анкет. 5) Реєстрація на особисту подачу. Контроль справи, отримання кореспонденції, здача всіх необхідних документів. 6) Контакт з відомчими установами. 7) Комплексний супровід вашої справи до отримання рішення. 8) Підготовка номера PESEL за необхідності. 9) Реєстрація довіреного профілю (profil zaufany) за необхідності. 10) У разі негативного рішення з нашої вини - допомога в підготовці документів на апеляцію та повне повернення коштів.",
                  "button": "ХОЧУ ПАКЕТ \"ВСЕ ВКЛЮЧЕНО\""
                },
                "Service5.moreInfoService": {
                  "title": "Заміна водійського посвідчення на польське",
                  "content": "Після півроку перебування в Польщі, водійське посвідчення вашої країни необхідно змінити на польське. Очевидно, що якщо ви не бажаєте змінювати водійське посвідчення, навіть за умови тривалого перебування в Польщі, вам загрожує адміністративний штраф."
                },
                "Service5.processingTime": {
                  "title": "Термін виконання адміністративної процедури",
                  "content": "Заміна прав в середньому складає близько 2 місяців."
                },
                "Service6.cost": "Вартість",
                "Service6.terming": "Час очікування",
                "Service6.learnMore": "Дізнатися більше",
                "Service6.orderService": "Замовити послугу",
                "Service6.getConsultation": "Отримати консультацію",
                "Service6.basicPackage": {
                  "title": "Ціна: 0 зл.",
                  "content": "При замовленні будь-якої послуги, ми консультуємо безкоштовно!",
                  "button": "ХОЧУ КОНСУЛЬТАЦІЮ ЗА 0 зл."
                },
                "Service6.allInclusivePackage": {
                  "title": 'Ціна: 350 зл',
                  "content": "Якщо ви хочете самі слідкувати за своєю справою, а також якщо у вас є час та досвід в оформленні документів, але ви сумніваєтесь у юридичних питаннях, то замовте консультацію у нашого юриста.",
                  "button": "ХОЧУ КОНСУЛЬТАЦІЮ ЗА 350 зл."
                },
                "Service6.moreInfoService": {
                  "title": "Консультація",
                  "content": "Можливо, ви самі хочете займатися своєю справою і у вас є на це час. Тому консультація для вас найбільше підходить. Уточніть спірні питання і самі контролюйте свою справу."
                },
                "Service6.processingTime": {
                  "title": "Час консультації",
                  "content": "В середньому консультація займає близько 60 хвилин."
                },
                "Service7.cost": "Вартість",
                "Service7.terming": "Час очікування",
                "Service7.learnMore": "Дізнатися більше",
                "Service7.orderService": "Замовити послугу",
                "Service7.getConsultation": "Отримати консультацію",
                "Service7.basicPackage": {
                  "title": "Ціна: 250 зл.",
                  "content": "Написання резюме з мотиваційним листом",
                  "button": "ЗАМОВИТИ"
                },
                "Service7.allInclusivePackage": {
                  "title": 'Ціна: 150 зл',
                  "content": "Написання резюме без мотиваційного листа",
                  "button": "ЗАМОВИТИ"
                },
                "Service7.moreInfoService": {
                  "title": "Складання резюме (CV)",
                  "content": "Щоб ваша кандидатура виглядала привабливо, потрібно правильно скласти резюме. Це в рази підвищить шанси на схвалення вас, як кваліфікованого співробітника для компанії."
                },
                "Service7.processingTime": {
                  "title": "Термін отримання",
                  "content": "1-2 дні."
                },
                "Service8.cost": "Вартість",
                "Service8.terming": "Час очікування",
                "Service8.learnMore": "Дізнатися більше",
                "Service8.orderService": "Замовити послугу",
                "Service8.getConsultation": "Отримати консультацію",
                "Service8.basicPackage": {
                  "title": "Базовий пакет 750 зл.",
                  "content": "1) Консультація. 2) Аналіз актуальних документів та складання списку відсутніх. 3) Перевірка пакета документів перед подачею. 4) Збір та підготовка повного пакета документів. 5) Заповнення всіх анкет.",
                  "button": "ЗАМОВИТИ"
                },
                "Service8.allInclusivePackage": {
                  "title": 'Пакет "Все включено": 1500 зл',
                  "content": "1) Консультація. 2) Допомога в підготовці документів. 3) Збір та підготовка повного пакета документів. 4) Заповнення всіх анкет. 5) Контроль справи, отримання кореспонденції, здача всіх необхідних документів. 6) Комплексний супровід вашої справи до отримання рішення. 7) У разі негативного рішення з нашої вини - допомога в підготовці документів на апеляцію та повне повернення коштів.",
                  "button": "ЗАМОВИТИ"
                },
                "Service8.moreInfoService": {
                  "title": "Паспорт громадянина Польщі",
                  "content": "Громадянство Польщі дає право на необмежене проживання, офіційне працевлаштування, отримання медичних послуг, гарантований захист держави. Однією з вимог для отримання паспорта є складання спеціального тесту для визначення рівня знання мови, а також культури і історії країни."
                },
                "Service8.processingTime": {
                  "title": "Термін отримання",
                  "content": "В середньому очікування громадянства займає 10 місяців."
              }
              }
            }
          },
    by: {
      translation: {
        "menu.pricelist" : "Прайс-ліст",
        "menu.advantages": "Перавагі",
        "menu.promotions": "Акцыі",
        "menu.services": "Паслугі",
        "menu.about": "Пра нас",
        "menu.contact": "Інфармацыя",

        "servicespromo.0.title": "АКЦЫІ",
        "servicespromo.0.points.0": "Карта побыту за 400 зл. Паспейце набыць пакет \"Базавы\" за 400 зл. Каб скарыстацца акцыяй, назавіце нашаму спецыялісту па працы з кліентамі промакод \"Старт24\". Акцыя дзейнічае толькі да канца верасня 2024 года.",
        "servicespromo.0.points.1": "Карта побыту за 750 зл. Паспейце набыць пакет \"Усё ўключана\" за 750 зл. Каб скарыстацца акцыяй, назавіце нашаму спецыялісту па працы з кліентамі промакод \"Старт24\". Акцыя дзейнічае толькі да канца верасня 2024 года.",
        "servicespromo.0.points.2": "Дакументы на грамадзянства за 1500 зл. Пакет \"Усё ўключана\". Каб скарыстацца акцыяй, назавіце нашаму спецыялісту па працы з кліентамі промакод \"Старт24\". Акцыя дзейнічае толькі да канца верасня 2024 года.",      
       
        "pricelistservices.0.title": "Комплексная дапамога ў падрыхтоўцы дакументаў для падачы на карту пражывання",
"pricelistservices.0.points.0": "На аснове занятасці",
"pricelistservices.0.points.1": "На аснове бізнесу",
"pricelistservices.0.points.2": "На аснове сямейнага пражывання",
"pricelistservices.0.points.3": "На аснове шлюбу з грамадзянінам Польшчы",
"pricelistservices.0.price": "Ад 500 да 1500 PLN",

"pricelistservices.1.title": "Дапамога ў падрыхтоўцы дакументаў для падачы на грамадзянства",
"pricelistservices.1.price": "Ад 750 да 1500 PLN (Цана да 30.09.2024)",

"pricelistservices.2.title": "Працоўныя спрэчкі: Ад 'Umowy zlecenia' да 'Umowy o pracę'",
"pricelistservices.2.points.0": "Пераход ад 'Umowy zlecenia' да 'Umowy o pracę'",
"pricelistservices.2.points.1": "Падаць скаргі наймальніку",
"pricelistservices.2.points.2": "Падаць пазовы",
"pricelistservices.2.points.3": "Патрабаваць кампенсацыі за незаконнае працаўладкаванне",
"pricelistservices.2.price": "Ад 2500 да 3500 PLN",

"pricelistservices.3.title": "Падрыхтоўка дакументаў для рэгістрацыі шлюбу",
"pricelistservices.3.price": "Ад 500 да 1500 PLN",

"pricelistservices.4.title": "Замена вадзіцельскага пасведчання",
"pricelistservices.4.price": "Ад 500 да 1500 PLN",

"pricelistservices.5.title": "Юрыдычная кансультацыя",
"pricelistservices.5.points.0": "Працягласць кансультацыі да 60 хвілін",
"pricelistservices.5.points.1": "Анлайн або па тэлефоне",
"pricelistservices.5.price": "Ад 200 PLN",

"pricelistservices.6.title": "Падрыхтоўка рэзюмэ (CV)",
"pricelistservices.6.points.0": "З суправаджальным лістом",
"pricelistservices.6.points.1": "Без суправаджальнага ліста",
"pricelistservices.6.price": "Ад 150 да 250 PLN",

"consult_button": "Атрымаць кансультацыю",

"reason_texts.reason1": "Мы забяспечваем даступнасць цэн! Цана — гэта ключ!",
"reason_texts.reason2": "Калі мы не ператэлефануем вам на працягу 45 хвілін пасля адпраўкі запыту на сайце, мы дамо вам зніжку 250 PLN на куплю паслугі.",
"reason_texts.reason3": "1. Аплата пасля выканання паслугі! Вы нічым не рызыкуеце. 2. Калі вы не дасягнеце выніку, мы вернем вашы грошы на працягу 7 дзён. Мы працуем па дагаворы!",
        "modal.feedbackButton": "Пакінуць заяўку", 
        feedbackForm: {
          title: "Пакінуць заяўку",
          name: "Вашае імя",
          phone: "Мабільны нумар",
          submit: "Адправіць",
          cancel: "Адмяніць"
        },
        "messageAlert": "Дзякуй за заяўку! Нашы спецыялісты ўжо змагаюцца, хто хутчэй да вас патэлефануе:)",
        "actionToCall": "Патэлефанаваць",
        "cookieMessage": "Мы выкарыстоўваем файлы cookie! Гэты сайт выкарыстоўвае неабходныя файлы cookie для забеспячэння яго правільнай працы і файлы cookie для адсочвання, каб зразумець, як вы ўзаемадзейнічаеце з ім. Апошнія будуць устаноўлены толькі пасля згоды.",
        "allowMeToChoose": "Дазвольце мне выбраць",
        "acceptAll": "Прыняць усе",
        "decline": "Адхіліць",
        "cookieSettings": "Налады файлаў cookie",
        "cookieUsageDescription": "Мы выкарыстоўваем файлы cookie, каб забяспечыць асноўныя функцыі вэб-сайта і палепшыць ваш онлайн-вопыт. Вы можаце выбраць для кожнай катэгорыі, даць згоду або адмовіцца ў любы час. Падрабязней пра файлы cookie і іншыя канфідэнцыйныя даныя.",
        "essentialCookies": "Неабходныя файлы cookie",
        "analyticsCookies": "Файлы cookie прадукцыйнасці і аналітыкі",
        "marketingCookies": "Маркетынгавыя і таргетынгавыя файлы cookie",
        "acceptSelected": "Прыняць выбраныя",
        "necessaryCookies": "Неабходныя файлы cookie",
        footer: {
          contacts: "Кантакты",
          info: "Інфармацыя",
          services: "Паслугі",
          address: "80-369 Gdańsk, al. Rzeczypospolitej 4/152",
          company: "Sp. z o.o. \"Ominor\", NIP: 5842805362",
          timework: "Штодня з 9:00 да 17:00, субота-нядзеля - выхадны",
          privacyPolicy: "Палітыка прыватнасці",
          question: "Задаць пытанне бясплатна",
          rights: "Усе правы абаронены."
        },
        header: {
          slogan: "Легалізацыя ў Польшчы па даступнай цане",
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
    "temporaryResidenceCard": "Карта часовага знаходжання (Karta czasowego pobytu)",
    "permanentResidenceCard": "Карта пастаяннага знаходжання (Karta stałego pobytu)",
    "marriageAgreement": "Заключэнне шлюбу (Małżeństwo)", 
    "businessVisa": "Працоўныя спрэчкі. З \"Umowy zlecenia\" у \"Umowy o pracę\"",
    "familyReunion": "Замена вадзіцельскіх правоў",
    "konsultation": "Кансультацыя",
    "resume": "Складанне рэзюмэ (CV)",
    "civilDocs": "Дакументы на грамадзянства", 
    
            "Service1.cost": "Кошт",
            "Service1.terming": "Тэрмін атрымання карты",
            "Service1.learnMore": "Даведацца больш пра карту",
            "Service1.orderService": "Замовіць паслугу",
            "Service1.getConsultation": "Атрымаць кансультацыю",
            "servicesTitle": "Мы аказваем наступныя паслугі ў Гданьску",
            "Service1.basicPackage": {
              "title": "Базавы пакет: 500 зл",
              "content": "1) Кансультацыя. 2) Аналіз актуальных дакументаў і складанне спісу недастаючых. 3) Праверка пакета дакументаў перад падачай. 4) Збор і падрыхтоўка поўнага пакета дакументаў. 5) Запаўненне ўсіх анкет. 6) Рэгістрацыя на асабістую падачу.",
              "button": "ХАЧУ БАЗАВЫ ПАКЕТ"
            },
            "Service1.allInclusivePackage": {
              "title": 'Пакет "Усё ўключана": 1500 зл',
              "content": "1) Кансультацыя. 2) Дапамога ў падрыхтоўцы дакументаў ад працадаўцы. 3) Збор і падрыхтоўка поўнага пакета дакументаў. 4) Запаўненне ўсіх анкет. 5) Рэгістрацыя на асабістую падачу. 6) Атрыманне штампа ў пашпарт. 7) Здача адбіткаў пальцаў. 8) Кантроль справы, атрыманне карэспандэнцыі, здача ўсіх неабходных дакументаў. 9) Кантакт з інспектарам, які вядзе вашу справу. 10) Комплекснае суправаджэнне вашай справы да атрымання рашэння. 11) Падрыхтоўка нумара PESEL пры неабходнасці. 12) Рэгістрацыя даверанага профілю (profil zaufany) пры неабходнасці. 13) У выпадку адмоўнага рашэння па нашай віне - дапамога ў падрыхтоўцы дакументаў на апеляцыю і поўны вяртанне сродкаў.",
              "button": "ХАЧУ ПАКЕТ \"УСЁ ЎКЛЮЧАНА\""
            },
            "Service1.moreInfoService": {
              "title": "Карта часовага знаходжання",
              "content": "Карта часовага знаходжання або від на жыхарства - гэта дакумент, які пацвярджае асобу замежніка падчас яго знаходжання ў Польшчы, а таксама дае права шматразова перасякаць мяжу без атрымання візы, афіцыйна працаваць, набываць рухомую і нерухомую маёмасць у Польшчы."
            },
            "Service1.processingTime": {
              "title": "Тэрмін атрымання",
              "content": "Тэрмін атрымання карты знаходжання ў Гданьску складае ў сярэднім 7 месяцаў."
            },
            "Service2.cost": "Кошт",
            "Service2.terming": "Тэрмін атрымання карты",
            "Service2.learnMore": "Даведацца больш пра карту",
            "Service2.orderService": "Замовіць паслугу",
            "Service2.getConsultation": "Атрымаць кансультацыю",
            "Service2.basicPackage": {
              "title": "Базавы пакет: 500 зл",
              "content": "1) Кансультацыя. 2) Аналіз актуальных дакументаў і складанне спісу недастаючых. 3) Праверка пакета дакументаў перад падачай. 4) Збор і падрыхтоўка поўнага пакета дакументаў. 5) Запаўненне ўсіх анкет. 6) Рэгістрацыя на асабістую падачу.",
              "button": "ХАЧУ БАЗАВЫ ПАКЕТ"
            },
            "Service2.allInclusivePackage": {
              "title": 'Пакет "Усё ўключана": 1500 зл',
              "content": "1) Кансультацыя. 2) Дапамога ў падрыхтоўцы дакументаў ад працадаўцы. 3) Збор і падрыхтоўка поўнага пакета дакументаў. 4) Запаўненне ўсіх анкет. 5) Рэгістрацыя на асабістую падачу. 6) Атрыманне штампа ў пашпарт. 7) Здача адбіткаў пальцаў. 8) Кантроль справы, атрыманне карэспандэнцыі, здача ўсіх неабходных дакументаў. 9) Кантакт з інспектарам, які вядзе вашу справу. 10) Комплекснае суправаджэнне вашай справы да атрымання рашэння. 11) Падрыхтоўка нумара PESEL пры неабходнасці. 12) Рэгістрацыя даверанага профілю (profil zaufany) пры неабходнасці. 13) У выпадку адмоўнага рашэння па нашай віне - дапамога ў падрыхтоўцы дакументаў на апеляцыю і поўны вяртанне сродкаў.",
              "button": "ХАЧУ ПАКЕТ \"УСЁ ЎКЛЮЧАНА\""
            },
            "Service2.moreInfoService": {
              "title": "Карта часовага знаходжання",
              "content": "Карта часовага знаходжання або від на жыхарства - гэта дакумент, які пацвярджае асобу замежніка падчас яго знаходжання ў Польшчы, а таксама дае права шматразова перасякаць мяжу без атрымання візы, афіцыйна працаваць, набываць рухомую і нерухомую маёмасць у Польшчы."
            },
            "Service2.processingTime": {
              "title": "Тэрмін атрымання",
              "content": "Тэрмін атрымання карты знаходжання ў Гданьску складае ў сярэднім 7 месяцаў."
            },
            "Service3.cost": "Кошт",
            "Service3.terming": "Час чакання",
            "Service3.learnMore": "Даведацца больш",
            "Service3.orderService": "Замовіць паслугу",
            "Service3.getConsultation": "Атрымаць кансультацыю",
            "Service3.basicPackage": {
              "title": "Базавы пакет: 500 зл",
              "content": "1) Кансультацыя. 2) Аналіз актуальных дакументаў і складанне спісу недастаючых. 3) Праверка пакета дакументаў перад падачай. 4) Збор і падрыхтоўка поўнага пакета дакументаў.",
              "button": "ХАЧУ БАЗАВЫ ПАКЕТ"
            },
            "Service3.allInclusivePackage": {
              "title": "Пакет \"Усё ўключана\": 1500 зл.",
              "content": "1) Кансультацыя. 2) Дапамога ў падрыхтоўцы дакументаў. 3) Дапамога ў арганізацыі цырымоніі шлюбу онлайн. 4) Падрыхтоўка дакументаў для заключэння шлюбу ў ЗША, фізічна знаходзячыся ў Польшчы. 5) Поўнае суправаджэнне на заключэнне шлюбу на тэрыторыі Польшчы. 6) Запаўненне ўсіх анкет. 7) Кантроль справы, атрыманне карэспандэнцыі, здача ўсіх неабходных дакументаў. 8) Кантакт з установай, якая выдае дазвол на заключэнне шлюбу. 9) Комплекснае суправаджэнне вашай справы да атрымання рашэння на заключэнне шлюбу. 10) Падрыхтоўка нумара PESEL пры неабходнасці. 11) Рэгістрацыя даверанага профілю (profil zaufany) пры неабходнасці. 12) У выпадку адмоўнага рашэння па нашай віне - дапамога ў падрыхтоўцы дакументаў на апеляцыю і поўны вяртанне сродкаў."
            },
            "Service3.moreInfoService": {
              "title": "Шлюбныя справы",
              "content": "Шлюб ў Польшчы ўжо не так проста, як здаецца. Складанасць паўстае ў тым, што разгляд дакументаў можа займаць ад 10 да 12 месяцаў. Мы дапаможам максімальна хутка афарміць усе дакументы і атрымаць дазвол на шлюб у спецыяльных ўстановах."
              },       
          "Service3.processingTime": {
            "title": "Тэрмін атрымання дакументаў для шлюбу",
            "content": "Тэрмін атрымання дакументаў для заключэння шлюбу ў Гданьску складае ў сярэднім 7 месяцаў. Пры заключэнні шлюбу ў ЗША, фізічна знаходзячыся ў Польшчы, тэрміны падрыхтоўкі дакументаў у сярэднім складаюць 2 месяцы."
          },
          "Service4.cost": "Кошт",
          "Service4.terming": "Час чакання",
          "Service4.learnMore": "Даведацца больш",
          "Service4.orderService": "Замовіць паслугу",
          "Service4.getConsultation": "Атрымаць кансультацыю",
          "Service4.basicPackage": {
            "title": "Базавы пакет: 1500 зл",
            "content": "1) Кансультацыя. 2) Вядзенне перамоў з вашым працадаўцам. 3) Складанне прэтэнзій і перадсудовых іскаў. 4) Збор і падрыхтоўка поўнага пакета дакументаў для падачы ў суд.",
            "button": "ХАЧУ БАЗАВЫ ПАКЕТ"
          },
          "Service4.allInclusivePackage": {
            "title": 'Пакет "Усё ўключана": 3000 зл',
            "content": "1) Кансультацыя. 2) Вядзенне перамоў з вашым працадаўцам. 3) Складанне прэтэнзій і перадсудовых іскаў. 4) Збор і падрыхтоўка поўнага пакета дакументаў для падачы ў суд. 5) Поўнае суправаджэнне па працоўных спрэчках як у працэсе дасудовага, так і судовага разгляду. 6) Кантроль справы, атрыманне карэспандэнцыі, здача ўсіх неабходных дакументаў. 7) Кантакт з судом і працадаўцам. 8) Падрыхтоўка дакументаў на запатрабаванне грашовай кампенсацыі за парушэнне працоўных правоў. 9) Падрыхтоўка нумара PESEL пры неабходнасці. 10) Рэгістрацыя даверанага профілю (profil zaufany) пры неабходнасці. 11) У выпадку адмоўнага рашэння па нашай віне - поўны вяртанне сродкаў.",
            "button": "ХАЧУ ПАКЕТ \"УСЁ ЎКЛЮЧАНА\""
          },
          "Service4.moreInfoService": {
            "title": "Працоўныя спрэчкі",
            "content": "Калі вы працуеце або скончылі працу на прадпрыемствах з шкоднымі або цяжкімі ўмовамі працы, звярніце ўвагу на магчымыя парушэнні з боку працадаўцы. Часто польскія працадаўцы заключаюць з работнікамі Umowy zlecenia, а не Umowy o pracę. Як правіла, гэта робіцца для таго, каб эканоміць свае сродкі, каб можна было звольніць супрацоўніка ў любы момант і не выплачваць ніякіх кампенсацый у выпадку праблем са здароўем. Звярніце ўвагу, што калі вы працуеце або працавалі раней на заводзе, на будоўлі, у аўтасэрвісе і т.п. па Umowe zlecenia, вы маеце права патрабаваць ад свайго працадаўцы заключыць дагавор Umowy o pracę. Акрамя таго, вы маеце права атрымаць істотную грашовую кампенсацыю за парушэнні працоўных правоў і за стварэнне шкодных умоў працы. Мы дапаможам вам атрымаць поўны сацыяльны пакет, дапаможам падрыхтаваць іскі і скаргі як у дасудовым разглядзе, так і ў судовым разглядзе. Нават калі вы звольнены, вы ўсё роўна маеце права на кампенсацыю з боку вашага былога працадаўцы."
          },
          "Service4.processingTime": {
            "title": "Тэрмін разгляду скаргаў і судовых іскаў",
            "content": "Тэрмін разгляду скаргаў і судовых іскаў індывідуальны. Калі працадаўца не жадае даводзіць справу да суда, то можна ўрэгуляваць спрэчку на працягу месяца."
          },
          "Service5.cost": "Кошт",
          "Service5.terming": "Час чакання",
          "Service5.learnMore": "Даведацца больш",
          "Service5.orderService": "Замовіць паслугу",
          "Service5.getConsultation": "Атрымаць кансультацыю",
          "Service5.basicPackage": {
            "title": "Базавы пакет: 500 зл",
            "content": "1) Кансультацыя. 2) Аналіз актуальных дакументаў і складанне спісу недастаючых. 3) Праверка пакета дакументаў перад падачай. 4) Збор і падрыхтоўка поўнага пакета дакументаў.",
            "button": "ХАЧУ БАЗАВЫ ПАКЕТ"
          },
          "Service5.allInclusivePackage": {
            "title": 'Пакет "Усё ўключана": 1500 зл',
            "content": "1) Кансультацыя. 2) Дапамога ў падрыхтоўцы дакументаў. 3) Збор і падрыхтоўка поўнага пакета дакументаў. 4) Запаўненне ўсіх анкет. 5) Рэгістрацыя на асабістую падачу. Кантроль справы, атрыманне карэспандэнцыі, здача ўсіх неабходных дакументаў. 6) Кантакт з ведамаснымі ўстановамі. 7) Комплекснае суправаджэнне вашай справы да атрымання рашэння. 8) Падрыхтоўка нумара PESEL пры неабходнасці. 9) Рэгістрацыя даверанага профілю (profil zaufany) пры неабходнасці. 10) У выпадку адмоўнага рашэння па нашай віне - дапамога ў падрыхтоўцы дакументаў на апеляцыю і поўны вяртанне сродкаў.",
            "button": "ХАЧУ ПАКЕТ \"УСЁ ЎКЛЮЧАНА\""
          },
          "Service5.moreInfoService": {
            "title": "Замена вадзіцельскага пасведчання на польскае",
            "content": "Пасля паўгода знаходжання ў Польшчы вадзіцельскае пасведчанне вашай краіны неабходна замяніць на польскае. Відавочна, што калі вы не жадаеце замяняць вадзіцельскае пасведчанне, нават пры ўмове доўгага знаходжання ў Польшчы, вам пагражае адміністрацыйны штраф.",
          },
          "Service5.processingTime": {
            "title": "Тэрмін выканання адміністрацыйнай працэдуры",
            "content": "Замена правоў у сярэднім складае каля 2 месяцаў",
          },
          "Service6.cost": "Кошт",
          "Service6.terming": "Час чакання",
          "Service6.learnMore": "Даведацца больш",
          "Service6.orderService": "Замовіць паслугу",
          "Service6.getConsultation": "Атрымаць кансультацыю",
          "Service6.basicPackage": {
            "title": "Кошт: 0 зл.",
            "content": "Пры замове любой паслугі мы кансультуем бясплатна!",
            "button": "ХАЧУ КАНСУЛЬТАЦЫЮ ЗА 0 зл."
          },
          "Service6.allInclusivePackage": {
            "title": 'Кошт: 350 зл',
            "content": "Калі вы хочаце самі сачыць за сваёй справай, а таксама калі ў вас ёсць час і вопыт у афармленні дакументаў, але вы сумняваецеся ў юрыдычных пытаннях, то замоўце кансультацыю ў нашага юрыста.",
            "button": "ХАЧУ КАНСУЛЬТАЦЫЮ ЗА 350 зл."
          },
          "Service6.moreInfoService": {
            "title": "Кансультацыя",
            "content": "Магчыма, вы самі хочаце займацца сваёй справай і ў вас ёсць на гэта час. Таму кансультацыя для вас найбольш падыходзіць. Удакладніце спрэчныя пытанні і самі кантралюйце сваю справу."
          },
          "Service6.processingTime": {
            "title": "Час кансультацыі",
            "content": "У сярэднім кансультацыя займае каля 60 хвілін",
          },
          "Service7.cost": "Кошт",
          "Service7.terming": "Час чакання",
          "Service7.learnMore": "Даведацца больш",
          "Service7.orderService": "Замовіць паслугу",
          "Service7.getConsultation": "Атрымаць кансультацыю",
          "Service7.basicPackage": {
            "title": "Кошт: 250 зл.",
            "content": "Напісанне рэзюмэ з матывацыйным лістом",
            "button": "ЗАМОВІЦЬ"
          },
          "Service7.allInclusivePackage": {
            "title": 'Кошт: 150 зл',
            "content": "Напісанне рэзюмэ без матывацыйнага ліста",
            "button": "ЗАМОВІЦЬ"
          },
          "Service7.moreInfoService": {
            "title": "Складанне рэзюмэ (CV)",
            "content": "Каб ваша кандыдатура выглядала прывабна, трэба правільна скласці рэзюмэ. Гэта ў разы павысіць шанцы на адабрэнне вас, як кваліфікаванага супрацоўніка для кампаніі."
          },
          "Service7.processingTime": {
            "title": "Тэрмін атрымання",
            "content": "1-2 дні"
          },
          "Service8.cost": "Кошт",
          "Service8.terming": "Час чакання",
          "Service8.learnMore": "Даведацца больш",
          "Service8.orderService": "Замовіць паслугу",
          "Service8.getConsultation": "Атрымаць кансультацыю",
          "Service8.basicPackage": {
            "title": "Базавы пакет 750 зл.",
            "content": "1) Кансультацыя. 2) Аналіз актуальных дакументаў і складанне спісу недастаючых. 3) Праверка пакета дакументаў перад падачай. 4) Збор і падрыхтоўка поўнага пакета дакументаў. 5) Запаўненне ўсіх анкет.",
            "button": "ЗАМОВІЦЬ"
          },
          "Service8.allInclusivePackage": {
            "title": 'Пакет "Усё ўключана": 1500 зл',
            "content": "1) Кансультацыя. 2) Дапамога ў падрыхтоўцы дакументаў. 3) Збор і падрыхтоўка поўнага пакета дакументаў. 4) Запаўненне ўсіх анкет. 5) Кантроль справы, атрыманне карэспандэнцыі, здача ўсіх неабходных дакументаў. 6) Комплекснае суправаджэнне вашай справы да атрымання рашэння. 7) У выпадку адмоўнага рашэння па нашай віне - дапамога ў падрыхтоўцы дакументаў на апеляцыю і поўны вяртанне сродкаў.",
            "button": "ЗАМОВІЦЬ"
          },
          "Service8.moreInfoService": {
            "title": "Пашпарт грамадзяніна Польшчы",
            "content": "Грамадзянства Польшчы дае права на неабмежаванае пражыванне, афіцыйнае працаўладкаванне, атрыманне медыцынскіх паслуг, гарантаваную абарону дзяржавы. Адным з патрабаванняў для атрымання пашпарта з'яўляецца здача спецыяльнага тэсту для вызначэння ўзроўню ведаў мовы, а таксама культуры і гісторыі краіны."
          },
          "Service8.processingTime": {
            "title": "Тэрмін атрымання",
            "content": "У сярэднім чаканне грамадзянства займае 10 месяцаў."
        }
      }
    }
  },    
     ru: {
                translation: {
                  "menu.pricelist" : "Прайс-Лист",
                  "menu.advantages": "Преимущества",
                  "menu.promotions": "Акции",
                  "menu.services": "Услуги",
                  "menu.about": "О нас",
                  "menu.contact": "Информация",
                  "servicespromo.0.title": "АКЦИИ",
                  "servicespromo.0.points.0": "Карта побыту за 400 зл. Успейте приобрести пакет \"Базовый\" за 400 зл. Чтобы воспользоваться акцией, назовите нашему специалисту по работе с клиентами промокод \"Старт24\". Акция действует только до конца сентября 2024 года.",
                  "servicespromo.0.points.1": "Карта побыту за 750 зл. Успейте приобрести пакет \"Все включено\" за 750 зл. Чтобы воспользоваться акцией, назовите нашему специалисту по работе с клиентами промокод \"Старт24\". Акция действует только до конца сентября 2024 года.",
                  "servicespromo.0.points.2": "Документы на гражданство за 1500 зл. Пакет \"Все включено\". Чтобы воспользоваться акцией, назовите нашему специалисту по работе с клиентами промокод \"Старт24\". Акция действует только до конца сентября 2024 года.",
                       
                  "pricelistservices.0.title": "Комплексная помощь в подготовке документов для подачи на Карту Побыта",
                  "pricelistservices.0.points.0": "На основе занятости",
                  "pricelistservices.0.points.1": "На основе бизнеса",
                  "pricelistservices.0.points.2": "На основе семейного проживания",
                  "pricelistservices.0.points.3": "На основе брака с гражданином Польши",
                  "pricelistservices.0.price": "От 500 до 1500 PLN",
        
                  "pricelistservices.1.title": "Помощь в подготовке документов для подачи на гражданство",
                  "pricelistservices.1.price": "От 750 до 1500 PLN (Цена до 30.09.2024)",
        
                  "pricelistservices.2.title": "Трудовые споры: От 'Umowy zlecenia' к 'Umowy o pracę'",
                  "pricelistservices.2.points.0": "Переход от 'Umowy zlecenia' к 'Umowy o pracę'",
                  "pricelistservices.2.points.1": "Подать жалобы работодателю",
                  "pricelistservices.2.points.2": "Подать иски",
                  "pricelistservices.2.points.3": "Требовать компенсации за незаконное трудоустройство",
                  "pricelistservices.2.price": "От 2500 до 3500 PLN",
        
                  "pricelistservices.3.title": "Подготовка документов для регистрации брака",
                  "pricelistservices.3.price": "От 500 до 1500 PLN",
        
                  "pricelistservices.4.title": "Замена водительского удостоверения",
                  "pricelistservices.4.price": "От 500 до 1500 PLN",
        
                  "pricelistservices.5.title": "Юридическая консультация",
                  "pricelistservices.5.points.0": "Продолжительность консультации до 60 минут",
                  "pricelistservices.5.points.1": "Онлайн или по телефону",
                  "pricelistservices.5.price": "От 200 PLN",
        
                  "pricelistservices.6.title": "Подготовка резюме (CV)",
                  "pricelistservices.6.points.0": "С сопроводительным письмом",
                  "pricelistservices.6.points.1": "Без сопроводительного письма",
                  "pricelistservices.6.price": "От 150 до 250 PLN",
        
                  "consult_button": "Получить консультацию",
        
                  "reason_texts.reason1": "Мы обеспечиваем доступность цен! Цена — это ключ!",
                  "reason_texts.reason2": "Если мы не перезвоним вам в течение 45 минут после отправки запроса на сайте, мы дадим вам скидку 250 PLN на покупку услуги.",
                  "reason_texts.reason3": "1.Оплата после выполнения услуги! Вы ничем не рискуете. 2. Если вы не добьетесь результата, мы вернем ваши деньги в течение 7 дней. Мы работаем по договору!",        
                  "modal.feedbackButton": "Оставить заявку", 
                  feedbackForm: {
                    title: "Оставить заявку",
                    name: "Ваше имя",
                    phone: "Мобильный номер",
                    submit: "Отправить",
                    cancel: "Отмена"
                  },
                  "messageAlert" : "Спасибо за заявку! Наши специалисты уже бьются за то, кто быстрее до вас дозвонится:)",
                  "actionToCall": "Позвонить",
                  "cookieMessage": "Мы используем файлы cookie! Этот сайт использует необходимые файлы cookie для обеспечения его правильной работы и файлы cookie для отслеживания, чтобы понять, как вы взаимодействуете с ним. Последние будут установлены только после согласия.",
                  "allowMeToChoose": "Позвольте мне выбрать",
                  "acceptAll": "Принять все",
                  "decline": "Отклонить",
                  "cookieSettings": "Настройки файлов cookie",
                  "cookieUsageDescription": "Мы используем файлы cookie, чтобы обеспечить основные функции веб-сайта и улучшить ваш онлайн-опыт. Вы можете выбрать для каждой категории, дать согласие или отказаться в любое время. Подробнее о файлах cookie и других конфиденциальных данных.",
                  "essentialCookies": "Необходимые файлы cookie",
                  "analyticsCookies": "Файлы cookie производительности и аналитики",
                  "marketingCookies": "Маркетинговые и таргетинговые файлы cookie",
                  "acceptSelected": "Принять выбранные",
                  "necessaryCookies": "Необходимые файлы cookie",
                  footer: {
                    contacts: "Контакты",
                    info: "Информация",
                    services: "Услуги",
                    address: "80-369 Gdańsk, al. Rzeczypospolitej 4/152",
                    company: "Sp. z o.o. \"Ominor\", NIP: 5842805362",
                    timework: "Ежедневно с 9:00 по 17:00, Сб-Вс выходной",
                    privacyPolicy: "Политика конфиденциальности",
                    question: "Задать вопрос бесплатно",
                    rights: "Все права защищены."
                  },
                  header: {
                    slogan: "Легализация в Польше по доступной цене",
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
                  "temporaryResidenceCard": "Карта временного пребывания (Karta czasowego pobytu)",
                  "permanentResidenceCard": "Карта постоянного пребывания (Karta stałego pobytu)",
                  "marriageAgreement": "Заключение брака (Małżeństwo)", 
                  "businessVisa": "Трудовые споры. Из \"Umowy zlecenia\" в  \"Umowy o pracę\"",
                  "familyReunion": "Замена водительских прав",
                  "konsultation": "Консультация",
                  "resume": "Составление резюме (CV)",
                  "civilDocs": "Документы на гражданство", 

                  "Service1.cost": "Стоимость",
                  "Service1.terming": "Срок получения карты",
                  "Service1.learnMore": "Узнать больше о карте",
                  "Service1.orderService": "Заказать услугу",
                  "Service1.getConsultation": "Получить консультацию",
                  servicesTitle: "Мы оказываем следующие услуги в Гданьске",
                  "Service1.basicPackage": {
                    title: "Базовый пакет: 500 зл",
                    content: "1) Консультация. 2) Анализ актуальных документов и составление списка недостающих. 3) Проверка пакета документов перед подачей. 4) Сбор и подготовка полного пакета документов. 5) Заполнение всех анкет. 6) Регистрация на личную подачу.",
                    button: "ХОЧУ БАЗОВЫЙ ПАКЕТ"
                  },
                  "Service1.allInclusivePackage": {
                    title: 'Пакет "Всё включено": 1500 зл',
                    content: "1) Консультация. 2) Помощь в подготовке документов от работодателя. 3) Сбор и подготовка полного пакета документов. 4) Заполнение всех анкет. 5) Регистрация на личную подачу. 6) Получение штампа в паспорт. 7) Сдача отпечатков пальцев. 8) Контроль дела, получение корреспонденции, сдача всех необходимых документов. 9) Контакт с инспектором, который ведет твое дело. 10) Комплексное сопровождение твоего дела до получения решения. 11) Подготовка номера PESEL при необходимости. 12) Регистрация доверенного профиля (profil zaufany) при необходимости. 13) В случае негативного решения по нашей вине - помощь в подготовке документов на аппеляцию и полный возврат средств.",
                    button: "ХОЧУ ПАКЕТ \"ВСЁ ВКЛЮЧЕНО\""
                  },
                  "Service1.moreInfoService": {
                    title: "Карта временного пребывания",
                    content: "Карта временного пребывания или вид на жительство - это документ, который подтверждает личность иностранца во время его пребывания в Польше, а также дает право многократно пересекать границу без получения визы, официально работать, покупать движимое и недвижимое имущество в Польше."
                  },
                  "Service1.processingTime": {
                    title: "Срок получения",
                    content: "Срок получения карты пребывания в Гданьске составляет в среднем 7 месяцев."
                  },
                    "Service2.cost": "Стоимость",
                    "Service2.terming": "Срок получения карты",
                    "Service2.learnMore": "Узнать больше о карте",
                    "Service2.orderService": "Заказать услугу",
                    "Service2.getConsultation": "Получить консультацию",
                    "Service2.basicPackage": {
                      title: "Базовый пакет: 500 зл",
                      content: "1) Консультация. 2) Анализ актуальных документов и составление списка недостающих. 3) Проверка пакета документов перед подачей. 4) Сбор и подготовка полного пакета документов. 5) Заполнение всех анкет. 6) Регистрация на личную подачу.",
                      button: "ХОЧУ БАЗОВЫЙ ПАКЕТ"
                    },
                    "Service2.allInclusivePackage": {
                      title: 'Пакет "Всё включено": 1500 зл',
                      content: "1) Консультация. 2) Помощь в подготовке документов от работодателя. 3) Сбор и подготовка полного пакета документов. 4) Заполнение всех анкет. 5) Регистрация на личную подачу. 6) Получение штампа в паспорт. 7) Сдача отпечатков пальцев. 8) Контроль дела, получение корреспонденции, сдача всех необходимых документов. 9) Контакт с инспектором, который ведет твое дело. 10) Комплексное сопровождение твоего дела до получения решения. 11) Подготовка номера PESEL при необходимости. 12) Регистрация доверенного профиля (profil zaufany) при необходимости. 13) В случае негативного решения по нашей вине - помощь в подготовке документов на аппеляцию и полный возврат средств.",
                      button: "ХОЧУ ПАКЕТ \"ВСЁ ВКЛЮЧЕНО\""
                    },
                    "Service2.moreInfoService": {
                      title: "Карта временного пребывания",
                      content: "Карта временного пребывания или вид на жительство - это документ, который подтверждает личность иностранца во время его пребывания в Польше, а также дает право многократно пересекать границу без получения визы, официально работать, покупать движимое и недвижимое имущество в Польше."
                    },
                    "Service2.processingTime": {
                      title: "Срок получения",
                      content: "Срок получения карты пребывания в Гданьске составляет в среднем 7 месяцев."
                    },
                    "Service3.cost": "Стоимость",
                    "Service3.terming": "Время ожидания",
                    "Service3.learnMore": "Узнать больше",
                    "Service3.orderService": "Заказать услугу",
                    "Service3.getConsultation": "Получить консультацию",
                    "Service3.basicPackage": {
                      title: "Базовый пакет: 500 зл",
                      content: "1) Консультация. 2) Анализ актуальных документов и составление списка недостающих. 3) Проверка пакета документов перед подачей. 4) Сбор и подготовка полного пакета документов.",
                      button: "ХОЧУ БАЗОВЫЙ ПАКЕТ"
                    },
                    "Service3.allInclusivePackage": {
                      title: 'Пакет "Всё включено": 1500 зл',
                      content: "1) Консультация. 2) Помощь в подготовке документов. 3) Помощь в организации церемонии бракосочетания онлайн. 4) Подготовка документов для заключения брака в США, физически находясь в Польше. 5) Полное сопровождение на заключение брака на территории Польши. 6) Заполнение всех анкет. 7) Контроль дела, получение корреспонденции, сдача всех необходимых документов. 8) Контакт с учреждением, выдающий разрешение на заключение брака. 9) Комплексное сопровождение твоего дела до получения решения на заключение брака. 10) Подготовка номера PESEL при необходимости. 11) Регистрация доверенного профиля (profil zaufany) при необходимости. 12) В случае негативного решения по нашей вине - полный возврат средств.",
                      button: "ХОЧУ ПАКЕТ \"ВСЁ ВКЛЮЧЕНО\""
                    },
                    "Service3.moreInfoService": {
                      title: "Заключение брака",
                      content: "Заключить брак в Польше не так просто как кажется. Сложность в том, что рассмотрение документов может доходить до 10-12 месяцев. Мы поможем максимально быстро оформить все документы и получить разрешение на заключение брака в специальных ведомственных учреждениях."
                    },
                    "Service3.processingTime": {
                      title: "Срок получения документов для бракосочетания",
                      content: "Срок получения документов для заключения брака в Гданьске составляет в среднем 7 месяцев. При Заключении брака в США, физически находясь в Польше, сроки подготовки документов в среднем составляют 2 месяца "
                    },
                    "Service4.cost": "Стоимость",
                    "Service4.terming": "Время ожидания",
                    "Service4.learnMore": "Узнать больше",
                    "Service4.orderService": "Заказать услугу",
                    "Service4.getConsultation": "Получить консультацию",
                    "Service4.basicPackage": {
                      title: "Базовый пакет: 1500 зл",
                      content: "1) Консультация. 2) Ведение переговоров с вашим работодателем. 3) Составление претензий и предсудебных исков. 4) Сбор и подготовка полного пакета документов для подачи в суд.",
                      button: "ХОЧУ БАЗОВЫЙ ПАКЕТ"
                    },
                    "Service4.allInclusivePackage": {
                      title: 'Пакет "Всё включено": 3000 зл',
                      content:  "1) Консультация. 2) Ведение переговоров с вашим работодателем. 3) Составление претензий и предсудебных исков. 4) Сбор и подготовка полного пакета документов для подачи в суд. 5) Полное сопровождение по трудовым спорам как в процессе досудебного так и судебного разбирательства. 6) Контроль дела, получение корреспонденции, сдача всех необходимых документов. 7) Контакт с судом и с работодателем. 8)Подготовка документов на истребование денежной компенсации по нарушению трудовых прав.  9) Подготовка номера PESEL при необходимости. 10) Регистрация доверенного профиля (profil zaufany) при необходимости. 11) В случае негативного решения по нашей вине - полный возврат средств.",
                      button: "ХОЧУ ПАКЕТ \"ВСЁ ВКЛЮЧЕНО\""
                    },
                    "Service4.moreInfoService": {
                      title: "Трудовые споры",
                      content: "Если вы работаете или закончили работу на предприятиях с вредными или тяжелыми условиями труда, то обратите внимание на возможные нарушения со стороны работодателя. Часто польские работодатели заключают с работниками Umowy zlecenia, а не Umowy o pracę. Как правило это делается для того, чтобы экономить свои средства, чтобы можно было уволить сотрудника в любой момент и не выплачивать никаких компенсаций в случае проблем со здоровьем. Обратите внимание на то, что если вы работаете или работали ранее на заводе, на стройке, в автосервисе и т.п. по Umowe zlecenia, то вы имеете право требовать от своего работодателя заключить договор Umowy o pracę. Кроме того вы имеете право получить внушительную денежную компенсацию за нарушения трудовых прав и за создание вредных условий труда. Мы поможем вам получить полный социальный пакет, поможем подкотовить иски и жалобы как в досудебном разбирательстве так и в судебном разбирательстве. Даже если вы уволены, вы все равно имеете право на компенсацию со стороны вашего бывшего работодателя.",                    },
                    "Service4.processingTime": {
                      title: "Срок рассмотрения жалоб и судебных исков",
                      content: "Срок рассмотрения жалоб и судебных исков индивидуален. Если работодатель не хочет доводить дела до суда, то можно урегулировать спор в течение месяца.",
                       },
                    "Service5.cost": "Стоимость",
                    "Service5.terming": "Время ожидания",
                    "Service5.learnMore": "Узнать больше",
                    "Service5.orderService": "Заказать услугу",
                    "Service5.getConsultation": "Получить консультацию",
                    "Service5.basicPackage": {
                      title: "Базовый пакет: 500 зл",
                      content: "1) Консультация. 2) Анализ актуальных документов и составление списка недостающих. 3) Проверка пакета документов перед подачей. 4) Сбор и подготовка полного пакета документов.",
                      button: "ХОЧУ БАЗОВЫЙ ПАКЕТ"
                    },
                    "Service5.allInclusivePackage": {
                      title: 'Пакет "Всё включено": 1500 зл',
                      content:  "1) Консультация. 2) Помощь в подготовке документов. 3) Сбор и подготовка полного пакета документов. 4) Заполнение всех анкет. 5) Регистрация на личную подачу. Контроль дела, получение корреспонденции, сдача всех необходимых документов. 6) Контакт с ведомственными учреждениями. 7) Комплексное сопровождение твоего дела до получения решения. 8) Подготовка номера PESEL при необходимости. 9) Регистрация доверенного профиля (profil zaufany) при необходимости. 10) В случае негативного решения по нашей вине - помощь в подготовке документов на аппеляцию и полный возврат средств.",
                      button: "ХОЧУ ПАКЕТ \"ВСЁ ВКЛЮЧЕНО\""
                    },
                    "Service5.moreInfoService": {
                      title: "Замена водительского удостоверения на польское",
                      content: "После полугода нахождения в Польше водительское удостоверение Вашей страны необходимо менять на польское. Очевидно, что если вы не желаете менять водительское удостоверение, даже при условии того, что вы долгое время находитесь в Польше, вам грозит административный штраф.",
                    },
                    "Service5.processingTime": {
                      title: "Срок выполнения административной процедуры",
                      content: "Замена прав в среднем составляет около 2 месяцев",
                     },
                     "Service6.cost": "Стоимость",
                    "Service6.terming": "Время ожидания",
                    "Service6.learnMore": "Узнать больше",
                    "Service6.orderService": "Заказать услугу",
                    "Service6.getConsultation": "Получить консультацию",
                    "Service6.basicPackage": {
                      title: "Цена: 0 зл.",
                      content: "При заказе любой услуги, мы консультируем бесплатно!",
                       button: "ХОЧУ КОНСУЛЬТАЦИЮ ЗА 0 зл."
                    },
                    "Service6.allInclusivePackage": {
                      title: 'Цена: 350 зл',
                      content:  "Если вы хотите сами следить за своим делом, а также если у вас есть время и опыт в оформлении документов, но вы сомнемаетесь в юридических вопросах, то закажите консультацию у нашего юриста.",
                      button: "ХОЧУ КОНСУЛЬТАЦИЮ ЗА 350 зл."
                    },
                    "Service6.moreInfoService": {
                      title: "Консультация",
                      content: "Возможно вы сами хотите заниматься своим делом и у вас есть на это время. Поэтому консультация для вас наиболее всего подходит. Уточните спорные вопросы и сами контролируйте свое дело."},
                    "Service6.processingTime": {
                      title: "Время консультации",
                      content: "В среднем консультация занимает около 60 минут",
                     },
                     "Service7.cost": "Стоимость",
                    "Service7.terming": "Время ожидания",
                    "Service7.learnMore": "Узнать больше",
                    "Service7.orderService": "Заказать услугу",
                    "Service7.getConsultation": "Получить консультацию",
                    "Service7.basicPackage": {
                      title: "Цена: 250 зл.",
                      content: "Написание резюме с мотивационным письмом",
                       button: "ЗАКАЗАТЬ"
                    },
                    "Service7.allInclusivePackage": {
                      title: 'Цена: 150 зл',
                      content:  "Написание резюме без мотивационного письма",
                      button: "ЗАКАЗАТЬ"
                    },
                    "Service7.moreInfoService": {
                      title: "Составление резюме (CV)",
                      content: "Чтoбы вaшa кaндидaтypa выглядeлa пpивлeкaтeльнo, нyжнo пpaвильнo cocтaвить peзюмe. Это в разы повысит шансы на одобрение вас, как квалифицированного сотрудника для компании. "},
                    "Service7.processingTime": {
                      title: "Срок получения",
                      content: "1-2 дня",
                     },
                     "Service8.cost": "Стоимость",
                    "Service8.terming": "Время ожидания",
                    "Service8.learnMore": "Узнать больше",
                    "Service8.orderService": "Заказать услугу",
                    "Service8.getConsultation": "Получить консультацию",
                    "Service8.basicPackage": {
                      title: "Базовый пакет 750 зл.",
                      content: "1) Консультация. 2) Анализ актуальных документов и составление списка недостающих. 3) Проверка пакета документов перед подачей. 4) Сбор и подготовка полного пакета документов. 5) Заполнение всех анкет.",
                       button: "ЗАКАЗАТЬ"
                    },
                    "Service8.allInclusivePackage": {
                      title: 'Пакет "Всё включено": 1500 зл',
                      content:  "1) Консультация. 2) Помощь в подготовке документов. 3) Сбор и подготовка полного пакета документов. 4) Заполнение всех анкет. 5) Контроль дела, получение корреспонденции, сдача всех необходимых документов. 6) Комплексное сопровождение твоего дела до получения решения. 7) В случае негативного решения по нашей вине - помощь в подготовке документов на аппеляцию и полный возврат средств.",
                      button: "ЗАКАЗАТЬ"
                    },
                    "Service8.moreInfoService": {
                      title: "Паспорт гражданина Польши",
                      content: "Гражданство Польши дает право на неограниченное проживание, официальное трудоустройство, получение медицинских услуг, гарантированную защиту государства. Одним из требований для получения паспорта является сдача специального теста для определения уровня знания языка, а также культуры и истории страны."},
                    "Service8.processingTime": {
                      title: "Срок получения",
                      content: "В среднем ожидание гражданства занимает 10 месяцев",
                     }
                    } 
                }
              }
            },
    lng: "ru", // Язык по умолчанию
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false
    },
    debug: true
  });

export default i18n;



