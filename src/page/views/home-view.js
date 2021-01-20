
import { html } from '../build-util.js';

import { htmlTemplate } from '../html-template.js';

export function homeView(lang = 'en') {
    return htmlTemplate('Page not found', html`
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
                grid-template-columns: 1fr 1fr;
                grid-gap: 0.5rem;
            }
            @media (max-width: 1200px) {
                .experience .experience-grid {
                    grid-template-columns: 1fr;
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
                justify-content: center;
                flex: 1 1 auto;
                font-family: OpenSans;
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
                    <div class="sub-experience">
                        <h2>${{
                            'en': 'Education',
                            'de': 'Ausbildung',
                            'it': 'Educazione',
                        }[lang]}</h2>
                        <div class="sub-experience-content">
                            <span class="experience-item">
                                <div>
                                    <a href="http://www.unibz.it/${lang}/">${{
                                        'en': 'Free University of Bozen-Bolzano',
                                        'de': 'Freie Universität Bozen',
                                        'it': 'Libera Università di Bolzano',
                                    }[lang]}</a>
                                    (2020&nbsp;-&nbsp;today)
                                </div>
                            </span>
                            <span class="experience-item">
                                <div>
                                    <a href="http://tfobz.it">${{
                                        'en': 'Technological High School “Max Valier”',
                                        'de': 'Technologische Fachoberschule „Max Valier“',
                                        'it': 'Istituto industriale “Max Valier”',
                                    }[lang]}</a>
                                    (2015&nbsp;-&nbsp;2020)
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="sub-experience">
                        <h2>${{
                            'en': 'Work experience',
                            'de': 'Berufserfahrung',
                            'it': 'Esperienze lavorative',
                        }[lang]}</h2>
                        <div class="sub-experience-content">
                            <span class="experience-item">
                                <div>
                                    <a href="https://www.infominds.eu/&lang=${{
                                        'en': 'de',
                                        'de': 'de',
                                        'it': 'it',
                                    }[lang]}">Infominds</a>
                                    (2019&nbsp;-&nbsp;2019)
                                </div>
                                <div>${{
                                    'en': 'Internship in software development',
                                    'de': 'Praktikum in der Softwareentwicklung',
                                    'it': 'Stage nello sviluppo di software',
                                }[lang]}</div>
                            </span>
                            <span class="experience-item">
                                <div>
                                    <a href="https://www.raiffeisenverband.it/${{
                                        'en': '',
                                        'de': '',
                                        'it': 'it.html',
                                    }[lang]}">Raiffeisenverband Südtirol</a>
                                    (2019&nbsp;-&nbsp;2019)
                                </div>
                                <div>${{
                                    'en': 'Internship in software development',
                                    'de': 'Praktikum in der Softwareentwicklung',
                                    'it': 'Stage nello sviluppo di software',
                                }[lang]}</div>
                            </span>
                        </div>
                    </div>
                    <div class="sub-experience">
                        <h2>${{
                            'en': 'Competitions',
                            'de': 'Wettbewerbe',
                            'it': 'Competizioni',
                        }[lang]}</h2>
                    </div>
                    <div class="sub-experience">
                        <h2>${{
                            'en': 'Side projects',
                            'de': 'Nebenprojekte',
                            'it': 'Progetti collaterali',
                        }[lang]}</h2>
                    </div>
                </div>
            </div>
        </div>
    `, lang);
}
