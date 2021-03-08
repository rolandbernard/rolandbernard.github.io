
import { html, readJsonFile } from '../../build/build-util.js';

import { htmlTemplate } from '../html-template.js';
import { background } from '../background.js';

function experienceElement(info, lang) {
    function extractData(obj, lang) {
        if (typeof(obj) === 'string') {
            return obj;
        } else {
            return obj[lang] || Object.values(obj)[0];
        }
    }
    return html`
        <div class="experience-item">
            <span>
                <a href="${extractData(info.link, lang)}" target="_blank" title="${extractData(info.name, lang)}">
                    ${extractData(info.name, lang)}
                </a>
                ${info.time && html`
                    <span>(${extractData(info.time, lang)})</span>
                `}
            </span>
            ${info.info && html`
                <span>${extractData(info.info, lang)}</span>
            `}
        </div>
    `;
}

export function homeView(lang = 'en', url = '/') {
    return htmlTemplate('Roland Bernard - Home', html`
        <style>
            .main-info-wrap {
                height: calc(100vh - 10rem);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .main-info {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                position: relative;
                margin-top: 1rem;
                margin-bottom: 2.5rem;
            }
            .main-info-image {
                flex: 0 0 auto;
                width: 10rem;
                height: 10rem;
                border-radius: 50%;
                margin: 1rem;
                object-fit: cover;
                box-shadow: var(--shadow-small);
                pointer-events: none;
                animation: morph 50s ease-in-out infinite;
            }
            @keyframes morph {
                0%, 100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; } 
                14% { border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%; } 
                28% { border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%; } 
                42% { border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%; } 
                56% { border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%; } 
                70% { border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%; } 
                84% { border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%; } 
            }
            @media (max-width: 500px) {
                .main-info {
                    flex-direction: column;
                }
            }
            .main-info-text {
                margin: 1rem;
                text-align: center;
            }
            .main-info-name {
                font-family: Roland, OpenSans, Arial, Helvetica, sans-serif;
                font-size: 2.25rem;
                font-weight: bold;
            }
            .main-info-desc {
                font-family: OpenSans, Roland, Arial, Helvetica, sans-serif;
                font-size: 1.25rem;
            }
            .main-info-desc span {
                display:inline-block;
            }
            .home-divider {
                position: absolute;
                bottom: -1rem;
                width: 80%;
                border-color: var(--primary);
                background: var(--primary);
            }
            .experience {
                font-family: OpenSans, Roland, Arial, Helvetica, sans-serif;
                font-size: 1rem;
                display: flex;
                flex-flow: column;
                align-items: center;
                width: 100%;
            }
            .experience h1 {
                font-family: OpenSans, Roland, Arial, Helvetica, sans-serif;
                /* font-weight: bold; */
                font-weight: 500;
                font-size: 1.75rem;
            }
            .experience .experience-grid {
                display: grid;
                width: 90%;
                max-width: 1200px;
                grid-template-columns: 1fr 1fr;
                grid-gap: 0.5rem;
            }
            @media (min-width: 1001px) {
                .experience .experience-grid {
                    grid-template-rows: auto auto 1fr;
                }
                .experience .experience-grid .exp-competitions {
                    grid-row: 2/4;
                }
            }
            @media (max-width: 1000px) {
                .experience .experience-grid {
                    grid-template-columns: 1fr;
                    width: 100%;
                }
            }
            .experience .experience-grid .sub-experience {
                display: flex;
                flex-flow: column;
                flex-flow: column;
                align-items: center;
            }
            .experience .experience-grid .sub-experience h2 {
                flex: 0 0 auto;
                font-family: OpenSans, Roland, Arial, Helvetica, sans-serif;
                font-size: 1.25rem;
                text-decoration: underline;
                font-weight: normal;
                padding-top: 2rem;
            }
            .experience .experience-grid .sub-experience .sub-experience-content .experience-item {
                display: flex;
                flex-flow: column;
                flex-flow: column;
                align-items: center;
                padding: 0.5rem;
                text-align: center;
            }
            .experience .experience-grid .sub-experience .sub-experience-content {
                display: flex;
                flex-flow: column;
                flex-flow: column;
                align-items: center;
                flex: 1 1 auto;
                font-family: OpenSans, Roland, Arial, Helvetica, sans-serif;
            }
            .experience .experience-grid .sub-experience span {
                display: inline-block;
            }
            .arrow-down {
                position: absolute;
                top: 90vh;
                left: 50vw;
                transform: translate(-50%, -100%);
            }
            .arrow-down span {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .arrow-down span:before {
                flex: 0 0 auto;
                content: '';
                display: block;
                width: 0.13rem;
                height: 7.5rem;
                max-height: 10vh;
                background: var(--primary);
                animation: elasticus 2s cubic-bezier(1, 0, 0, 1) infinite;
            }
            .arrow-down span:after {
                flex: 0 0 auto;
                content: '';
                display: block;
                width: 1rem;
                height: 1rem;
                border-bottom: 0.14rem solid transparent;
                border-left: 0.14rem solid transparent;
                border-top: 0.14rem solid var(--primary);
                border-right: 0.14rem solid var(--primary);
                transform: rotate(135deg);
                margin-top: -1.4rem;
            }
            @keyframes elasticus {
                0% {
                    transform-origin: 0% 0%;
                    transform: scale(1, 0);
                }
                50% {
                    transform-origin: 0% 0%;
                    transform: scale(1, 1);
                }
                50.1% {
                    transform-origin: 0% 100%;
                    transform: scale(1, 1);
                }
                100% {
                    transform-origin: 0% 100%;
                    transform: scale(1, 0);
                }
            }
        </style>
        <main>
           ${background(0, html`
                <a class="arrow-down" href="#exerience" title="Scroll down">
                    <span></span>
                </a>
                <section
                    class="main-info-wrap"
                    title="${{
                        'en': 'Who am I?',
                        'de': 'Wer bin ich?',
                        'it': 'Chi sono?',
                    }[lang]}"
                >
                    <div class="main-info">
                        <img class="main-info-image" src="/img/profile.jpeg" alt="Not a photo of me" width="160" height="160" />
                        <div class="main-info-text">
                            <div class="main-info-name">Roland Bernard</div>
                            <div class="main-info-desc">
                                ${{
                                'en': html`
                                    <span>Software Developer</span> & <span>Computer Science Student.</span>
                                `,
                                'de': html`
                                    <span>Software-Entwickler</span> & <span>Informatik-Student.</span>
                                `,
                                'it': html`
                                    <span>Sviluppatore di software</span> e <span>studente di informatica.</span>
                                `,
                                }[lang]}
                            </div>
                        </div>
                        <hr class="home-divider" />
                    </div>
                </section>
            `)}
            <div id="exerience">
                ${background(1, html`
                    <section
                        class="experience"
                        title="${{
                            'en': 'Experience',
                            'de': 'Erfahrung',
                            'it': 'Esperienza',
                        }[lang]}"
                    >
                        <h1>${{
                            'en': 'Experience',
                            'de': 'Erfahrung',
                            'it': 'Esperienza',
                        }[lang]}</h1>
                        <div class="experience-grid">
                            <section
                                class="sub-experience exp-education" id="education"
                                title="${{
                                    'en': 'Education',
                                    'de': 'Ausbildung',
                                    'it': 'Educazione',
                                }[lang]}"
                            >
                                <h2>${{
                                    'en': 'Education',
                                    'de': 'Ausbildung',
                                    'it': 'Educazione',
                                }[lang]}</h2>
                                <div class="sub-experience-content">
                                    ${readJsonFile('src/page/info/education.json').map(el => experienceElement(el, lang))}
                                </div>
                            </section>
                            <section
                                class="sub-experience exp-work" id="work"
                                title="${{
                                    'en': 'Work experience',
                                    'de': 'Berufserfahrung',
                                    'it': 'Esperienze lavorative',
                                }[lang]}"
                            >
                                <h2>${{
                                    'en': 'Work experience',
                                    'de': 'Berufserfahrung',
                                    'it': 'Esperienze lavorative',
                                }[lang]}</h2>
                                <div class="sub-experience-content">
                                    ${readJsonFile('src/page/info/work.json').map(el => experienceElement(el, lang))}
                                </div>
                            </section>
                            <section
                                class="sub-experience exp-competitions" id="competitions"
                                title="${{
                                    'en': 'Competitions',
                                    'de': 'Wettbewerbe',
                                    'it': 'Competizioni',
                                }[lang]}"
                            >
                                <h2>${{
                                    'en': 'Competitions',
                                    'de': 'Wettbewerbe',
                                    'it': 'Competizioni',
                                }[lang]}</h2>
                                <div class="sub-experience-content">
                                    ${readJsonFile('src/page/info/competitions.json').map(el => experienceElement(el, lang))}
                                </div>
                            </section>
                            <section
                                class="sub-experience exp-projects" id="projects"
                                title="${{
                                    'en': 'Side projects',
                                    'de': 'Nebenprojekte',
                                    'it': 'Progetti collaterali',
                                }[lang]}"
                            >
                                <h2>${{
                                    'en': 'Side projects',
                                    'de': 'Nebenprojekte',
                                    'it': 'Progetti collaterali',
                                }[lang]}</h2>
                                <div class="sub-experience-content">
                                    ${readJsonFile('src/page/info/projects.json').slice(0, 9).map(el => experienceElement(el, lang))}
                                    <span class="experience-item">
                                        <a href="/${lang}/projects">${{
                                            'en': 'More',
                                            'de': 'Mehr',
                                            'it': 'Altro',
                                        }[lang]}</a>
                                    </span>
                                </div>
                            </section>
                            <section
                                class="sub-experience exp-other" id="other"
                                title="${{
                                    'en': 'Other',
                                    'de': 'Sonstiges',
                                    'it': 'Altro',
                                }[lang]}"
                            >
                                <h2>${{
                                    'en': 'Other',
                                    'de': 'Sonstiges',
                                    'it': 'Altro',
                                }[lang]}</h2>
                                <div class="sub-experience-content">
                                    ${readJsonFile('src/page/info/other.json').map(el => experienceElement(el, lang))}
                                </div>
                            </section>
                        </div>
                    </section>
                `)}
            </div>
        </main>
    `, lang, url);
}
