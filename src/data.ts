export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStepData {
  num: string;
  tag: string;
  title: string;
  description: string;
}

export const servicesData: Service[] = [
  {
    icon: "Paintbrush",
    title: "One-Page & einfache Infoseiten",
    description: "Fokussierte und kompakte Webauftritte für Salons, Betriebe und Freiberufler. Alle wichtigen Infos übersichtlich auf einer Seite, modern gestaltet und ohne unnötigen Ballast."
  },
  {
    icon: "CalendarRange",
    title: "Smarte Terminbuchung",
    description: "Ich binde hocheffiziente Online-Terminkalender direkt in deine Infoseite ein (mit oder ohne Buchungs-Funktion spielbar). Keine komplexen Shops, sondern glasklare Buchungswege."
  },
  {
    icon: "Smartphone",
    title: "Responsive & Blitzschnell",
    description: "Deine Infoseite wird von Grund auf sauber programmiert (kein schwerfälliges WordPress/Shop-System). Sie lädt auf jedem Smartphone extrem schnell und ist 100% DSGVO-sicher."
  }
];

export const processStepsData: ProcessStepData[] = [
  {
    num: "01",
    tag: "Kostenlos",
    title: "Erstgespräch (15–20 Min.)",
    description: "Wir sprechen kurz über dein Unternehmen, deine Ziele und was du dir vorstellst. Kein Druck, kein Verkaufsgespräch — nur ein offenes Kennenlernen."
  },
  {
    num: "02",
    tag: "3–5 Tage",
    title: "Angebot & Konzept",
    description: "Du bekommst innerhalb von 3–5 Tagen ein konkretes Angebot mit festem Umfang, präzisem Preis und transparentem Zeitplan. Keine versteckten Kosten."
  },
  {
    num: "03",
    tag: "Design",
    title: "Entwurf & Feedback",
    description: "Ich entwickle ein maßgeschneidertes visuelles Design und zeige dir einen fertigen Entwurf. Du gibst Feedback — ich passe an, bis alles optimal sitzt."
  },
  {
    num: "04",
    tag: "Umsetzung",
    title: "Entwicklung & Buchungssystem",
    description: "Ich programmiere deine Website von Grund auf mit modernster Technologie — inklusive Buchungssystem, perfekter Mobiloptimierung und schnellen Ladezeiten."
  },
  {
    num: "05",
    tag: "Go-Live",
    title: "Launch & persönliche Übergabe",
    description: "Deine Website geht live auf deiner Wunsch-Domain — und ich erkläre dir persönlich alles, was du wissen musst. Du bist sofort startklar und unabhängig."
  }
];

export const legalImpressum = {
  title: "Impressum",
  sections: [
    {
      heading: "Angaben gemäß § 5 TMG",
      content: "Julian Witteler\nAlfred-Delp-Straße 16\n59348 Lüdinghausen\nDeutschland"
    },
    {
      heading: "Kontakt",
      content: "Telefon: 0178 6860610\nE-Mail: julian.witteler@gmail.com\nWeb: www.witteler-webdesign.de"
    },
    {
      heading: "Steuernummer",
      content: "Steuernummer: 333/5151/6481\nEs erfolgt kein Ausweis der Umsatzsteuer aufgrund der Anwendung der Kleinunternehmerregelung gemäß § 19 UStG.\nZuständiges Finanzamt: Lüdinghausen"
    },
    {
      heading: "Berufsbezeichnung & Aufsichtsbehörde",
      content: "Gewerbetreibender · Webdesign & Webentwicklung\nZuständige Behörde: Ordnungsamt Lüdinghausen"
    },
    {
      heading: "Haftung für Inhalte und Links",
      content: "Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen."
    }
  ]
};

export const legalDatenschutz = {
  title: "Datenschutzerklärung",
  sections: [
    {
      heading: "1. Verantwortlicher",
      content: "Julian Witteler · Alfred-Delp-Straße 16 · 59348 Lüdinghausen\nE-Mail: julian.witteler@gmail.com"
    },
    {
      heading: "2. Erhebung und Speicherung personenbezogener Daten",
      content: "Beim Besuch dieser Website werden durch den Hosting-Anbieter automatisch Server-Log-Dateien gespeichert (u.a. anonymisierte IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, Browsertyp). Grundlage ist das berechtigte Interesse nach Art. 6 Abs. 1 lit. f DSGVO."
    },
    {
      heading: "3. Terminbuchung via cal.com",
      content: "Für die bequeme Online-Terminbuchung nutze ich den Dienst cal.com (Cal.com, Inc., USA). Wenn Sie einen Termin buchen, werden die von Ihnen eingegebenen Daten (Name, E-Mail, gewünschter Termin, Nachricht) direkt an cal.com übermittelt. Rechtsgrundlage ist die Vertragsanbahnung nach Art. 6 Abs. 1 lit. b DSGVO."
    },
    {
      heading: "4. Google Fonts",
      content: "Zur ansprechenden Darstellung unserer Schriften lädt diese Website Fonts von Google (Google LLC, USA). Dabei wird Ihre IP-Adresse an Google übertragen. Wenn Sie dies ablehnen, werden lokale Ersatzschriftgruppen verwendet, um Ihre Daten zu schützen."
    },
    {
      heading: "5. Ihre Rechte",
      content: "Sie haben das Recht auf kostenfreie Auskunft, Berichtigung, Löschung oder Einschränkung der gespeicherten Daten sowie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde. Kontaktieren Sie mich einfach per E-Mail."
    },
    {
      heading: "6. Cookies & Tracking",
      content: "Diese Website setzt von sich aus keine zustimmungspflichtigen Cookies und nutzt keine Marketing-Tracker oder Web-Analyse-Tools wie Google Analytics."
    }
  ]
};
