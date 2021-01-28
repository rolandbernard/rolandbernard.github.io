
import { html, readJsonFile } from '../build-util.js';

import { htmlTemplate } from '../html-template.js';

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
            <div>
                <a href="${extractData(info.link, lang)}">
                    ${extractData(info.name, lang)}
                </a>
                ${info.time && html`
                    <span>(${extractData(info.time, lang)})</span>
                `}
            </div>
            ${info.info && html`
                <div>${extractData(info.info, lang)}</div>
            `}
        </div>
    `;
}

export function homeView(lang = 'en') {
    return htmlTemplate('Roland Bernard - Home', html`
        <style>
            .main-info-wrap {
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
            }
            .main-info-image {
                flex: 0 0 auto;
                width: 10rem;
                height: 10rem;
                border-radius: 50%;
                object-fit: cover;
                box-shadow: var(--shadow-small);
                margin: 1rem;
                pointer-events: none;
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
                font-family: Roland;
                font-size: 2.25rem;
                font-weight: bold;
            }
            .main-info-desc {
                font-family: OpenSans;
                font-size: 1.25rem;
            }
            .home-divider {
                position: absolute;
                bottom: -1rem;
                width: 80%;
                border-color: var(--primary);
            }
            .experience {
                font-family: OpenSans;
                font-size: 1rem;
                padding: 1rem;
                display: flex;
                flex-flow: column;
                align-items: center;
            }
            .experience h1 {
                font-family: OpenSans;
                font-weight: bold;
                font-size: 1.75rem;
                margin-top: 2rem;
                margin-bottom: 1rem;
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
                font-family: OpenSans;
                font-size: 1.25rem;
                text-decoration: underline;
                font-weight: normal;
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
                font-family: OpenSans;
            }
            .experience .experience-grid .sub-experience span {
                display: inline-block;
            }
        </style>
        <div>
            <div class="main-info-wrap">
                <div class="main-info">
                    <img class="main-info-image" src="profile.jpg" />
                    <div class="main-info-text">
                        <div class="main-info-name">Roland Bernard</div>
                        <div class="main-info-desc">${{
                            'en': 'Software Developer & Computer Science Student.',
                            'de': 'Software-Entwickler & Informatik-Student.',
                            'it': 'Sviluppatore di software e studente di informatica.',
                        }[lang]}</div>
                    </div>
                    <hr class="home-divider" />
                </div>
            </div>
            <div class="experience">
                <h1>${{
                    'en': 'Experience',
                    'de': 'Erfahrung',
                    'it': 'Esperienza',
                }[lang]}</h1>
                <div class="experience-grid">
                    <div class="sub-experience exp-education">
                        <h2>${{
                            'en': 'Education',
                            'de': 'Ausbildung',
                            'it': 'Educazione',
                        }[lang]}</h2>
                        <div class="sub-experience-content">
                            ${readJsonFile('src/page/info/education.json').map(el => experienceElement(el, lang))}
                        </div>
                    </div>
                    <div class="sub-experience exp-work">
                        <h2>${{
                            'en': 'Work experience',
                            'de': 'Berufserfahrung',
                            'it': 'Esperienze lavorative',
                        }[lang]}</h2>
                        <div class="sub-experience-content">
                            ${readJsonFile('src/page/info/work.json').map(el => experienceElement(el, lang))}
                        </div>
                    </div>
                    <div class="sub-experience exp-competitions">
                        <h2>${{
                            'en': 'Competitions',
                            'de': 'Wettbewerbe',
                            'it': 'Competizioni',
                        }[lang]}</h2>
                        <div class="sub-experience-content">
                            ${readJsonFile('src/page/info/competitions.json').map(el => experienceElement(el, lang))}
                        </div>
                    </div>
                    <div class="sub-experience exp-projects">
                        <h2>${{
                            'en': 'Side projects',
                            'de': 'Nebenprojekte',
                            'it': 'Progetti collaterali',
                        }[lang]}</h2>
                        <div class="sub-experience-content">
                            ${readJsonFile('src/page/info/projects.json').slice(0, 6).map(el => experienceElement(el, lang))}
                            <span class="experience-item">
                                <a href="/${lang}/projects">${{
                                    'en': 'More',
                                    'de': 'Mehr',
                                    'it': 'Altro',
                                }[lang]}</a>
                            </span>
                        </div>
                    </div>
                    <div class="sub-experience exp-other">
                        <h2>${{
                            'en': 'Other',
                            'de': 'Sonstiges',
                            'it': 'Altro',
                        }[lang]}</h2>
                        <div class="sub-experience-content">
                            ${readJsonFile('src/page/info/other.json').map(el => experienceElement(el, lang))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `, lang);
}
